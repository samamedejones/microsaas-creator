"use server"

import { stripe } from '@/lib/stripe'

export async function getLoginOnbordAccounts(accountId: string | undefined) {
    

    if(!accountId){
        return null
    }

    try {
        const accountLink = await stripe.accountLinks.create({
        account: accountId,
        refresh_url: `${process.env.HOST_URL}/dashboard`,
        return_url: `${process.env.HOST_URL}/dashboard`,
        type: 'account_onboarding'
    })
    } catch (err) {
       console.log( "## ERRO ACCOUNT ID", err) 
    }
}

