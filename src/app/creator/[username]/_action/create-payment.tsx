"use server"

import { prisma } from "@/lib/prisma";
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
            data: null,
            error: schema.error.errors[0].message
        }
    }

    if(!data.creatorId){
         return {
            data: null,
            error: "Creator não encontrado"
    }
}



    try {
        
        const creator = await prisma.user.findFirst({
            where: {
                connectedStripeAccountId: data.creatorId
            }
        })

        if(!creator){
            return {
            data: null,
            err: "Falha ao criar pagamento, tente novamente mais tarde"
            }
        }

        const aplicationFeeAmount = Math.floor(data.price * 0.1)

        const donation = await prisma.donation.create({
            data: {
                donorName: data.name,
                donorMessage: data.message,
                userId: creator.id,
                status: "PENDING",
                amount: (data.price - aplicationFeeAmount)
            }
        })

         

    } catch (err) {
        return {
            data: null,
            err: "Falha ao criar pagamento, tente novamente mais tarde."
        }
    }
}