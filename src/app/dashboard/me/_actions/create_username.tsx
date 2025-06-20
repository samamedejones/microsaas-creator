"user server"

import { z } from "zod";

const createUsernameSchema = z.object({
    username: z.string( { message: "o username é obrigatório" }).min(3, "Username precisa ter pelo menos 4 caracteres")
})

type CreateUsernameFormData = z.infer<typeof createUsernameSchema>;

export async function creatUsername(data: CreateUsernameFormData){

}