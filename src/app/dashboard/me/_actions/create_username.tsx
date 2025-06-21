"use server"

import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const createUsernameSchema = z.object({
    username: z.string( { message: "o username é obrigatório" }).min(4, "Username precisa ter pelo menos 4 caracteres")
})

type CreateUsernameFormData = z.infer<typeof createUsernameSchema>;

export async function creatUsername(data: CreateUsernameFormData){

    const session = await auth();
    if (!session?.user) {
        return {
            data: null,
            error: "Usuário não autenticado",
        }
    }
    
    const schema = createUsernameSchema.safeParse(data);
    if (!schema.success) {
        console.log(schema)
        return {
            data: null,
            error: schema.error.issues[0].message,
        }
    }

    try {
        const userId = session.user.id

        prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                username: data.username
            }
        })

        return {
            data: "Deu certo!",
            error: null
        }
        
    } catch (err) {
       return {
            data: null,
            error: "Falha ao atualizar o username"
        }
    }
}