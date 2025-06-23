"use server"

import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const changeDescriptionSchema = z.object({
    description: z.string().min(4, "A descrição precisa ter pelo menos 4 caracteres")
})

type ChangeDescriptionSchema = z.infer<typeof changeDescriptionSchema>;


export async function ChangeDescription(data: ChangeDescriptionSchema) {

 const session = await auth();
    if (!session?.user) {
        return {
            data: null,
            error: "Usuário não autenticado"
        }
    }

    const schema = changeDescriptionSchema.safeParse(data);

    if (!schema.success) {
        return {
            data: null,
            error: schema.error.issues[0].message
        }
    }

    try {
        const userId = session.user.id;

        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                bio: data.description
            }

        });

        return {
            data: data.description,
            error: null
        }


    } catch (err) {
        console.log(err)
        return {
            data: null,
            error: "Erro ao atualizar o nome"
        }
    }

}

