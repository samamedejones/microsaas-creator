"use server"

import { error } from "console";
import { z } from "zod";

const createUsernameSchema = z.object({
    username: z.string( { message: "o username é obrigatório" }).min(4, "Username precisa ter pelo menos 4 caracteres")
})

type CreateUsernameFormData = z.infer<typeof createUsernameSchema>;

export async function creatUsername(data: CreateUsernameFormData){
    
    const schema = createUsernameSchema.safeParse(data);
    if (!schema.success) {
        console.log(schema)
        return {
            data: null,
            error: schema.error.issues[0].message,
        }
    }

    return {
        data: "Username criado com sucesso!",
        error: null,
    }
}