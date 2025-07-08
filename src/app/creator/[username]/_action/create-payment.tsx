"use server"

import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { z } from "zod"; 

const createPaymentSchema = z.object({
    slug: z.string().min(1, "A slug do criador é obrigatório"),
    name: z.string().min(1, "O name precisa ser preenchido"),
    message: z.string().min(1, "A mensagem é obrigatória"),
    price: z.number().min(500, "O valor mínimo é R$5,00"),
    creatorId: z.string(),
});

type CreatePaymentSchema = z.infer<typeof createPaymentSchema>;

export async function CreatePayment(data: CreatePaymentSchema) {


    const schema = createPaymentSchema.safeParse(data);

    if (!schema.success) {
        return {
            error: schema.error.errors[0].message
        }
    }

    if(!data.creatorId){
         return {
            error: "Creator não encontrado"
    }
}



    try {
        
        console.log("chegou aq")
        const creator = await prisma.user.findFirst({
            where: {
                connectedStripeAccountId: data.creatorId
            }
        })

        

        if(!creator){
            return {
            data: null,
            error: "Falha ao criar pagamento, tente novamente mais tarde. 1"
            }
        }


        const applicationFeeAmount = Math.floor(data.price * 0.1)

        const donation = await prisma.donation.create({
            data: {
                donorName: data.name,
                donorMessage: data.message,
                userId: creator.id,
                status: "PENDING",
                amount: (data.price - applicationFeeAmount)
            }
        })

        console.log(creator)


        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            success_url: `${process.env.HOST_URL}/creator/${data.slug}`,
            cancel_url: `${process.env.HOST_URL}/creator/${data.slug}`,
            line_items: [
                {
                    price_data: {
                        currency: "brl",
                        product_data: {
                            name: "Apoiar " + creator.name
                        },
                    unit_amount: data.price,
                    },
                    quantity: 1
                }
            ],
            payment_intent_data: {
                application_fee_amount: applicationFeeAmount,
                transfer_data: {
                    destination: creator.connectedStripeAccountId as string
                },
                metadata: {
                    donorName: data.name,
                    donorMessage: data.message,
                    donationId: donation.id
                }    
            }   
        })

        console.log("to testando aq", session)

        return {
            sessionId: session.id
        }

         

    } catch (err) {
        return {
            error: "Falha ao criar pagamento, tente novamente mais tarde.2"
        }
    }
}