"use server"

import { prisma } from "@/lib/prisma";
import { z } from "zod"; 

const createPaymentSchema = z.object({
    slug: z.string().min(1, "A slug do criador é obrigatório"),
    name: z.string().min(1, "O name precisa ser preenchido"),
    message: z.string().min(1, "A mensagem é obrigatória"),
    price: z.number().min(10, "Selecionar um valor maior que 10"),
    creatorId: z.string()
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

    try {
        
        console.log(data);

    } catch (err) {
        return {
            data: null,
            err: "Falha ao criar pagamento, tente novamente mais tarde."
        }
    }

    return (
        <div>

        </div>
    )
}