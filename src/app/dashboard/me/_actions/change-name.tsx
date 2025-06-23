"use server"

import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const changeNameSchema = z.object({
    name: z.string( { message: "o username é obrigatório" }).min(4, "Username precisa ter pelo menos 4 caracteres")
})

type ChangeNameSchema = z.infer<typeof changeNameSchema>;


export async function ChangeName(data: ChangeNameSchema) {

 const session = await auth();
    if (!session?.user) {
        return {
            data: null,
            error: "Usuário não autenticado"
        }
    }

    const schema = changeNameSchema.safeParse(data);

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
                name: data.name
            }

        });

        return {
            data: data.name,
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

