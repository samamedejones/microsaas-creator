"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";

export function CreateAccountButton(){

    const [loading, setLoading ] = useState(false)

    async function handleCreateStripeAccount() {
        setLoading(true)

        //logica para o banco de dados
    }

    return (
        <div>
            <Button 
            className="cursor-pointer"
            onClick={handleCreateStripeAccount}
            disabled={loading}
            >
             {loading ? "Carregando..." : "Ativar conta de pagamentos"}   
            </Button>
        </div>
    )
}