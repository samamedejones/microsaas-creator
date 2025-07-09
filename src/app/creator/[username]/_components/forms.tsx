"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, Form, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreatePayment } from "../_action/create-payment"
import { toast } from "sonner"
import { getStripeJs } from "@/lib/stripe-js"
 
const formSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  message: z.string().min(1, "A mensagem é obrigatória"),
  price: z.enum(["5", "10", "20", "50", "100"], {
    required_error: "O valor é obrigatório",
  })
})

type FormData = z.infer<typeof formSchema>

 interface FormDonateProps {
    creatorId: string;
    slug: string;
  }

export function FormDonate({ creatorId, slug }: FormDonateProps) {

    const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      message: "",
      price: "5"
      },
  })
 
  async function onSubmit(data: FormData) {

    const priceInCents = Number(data.price) * 100;

    const checkout = await CreatePayment({
      name: data.name,
      message: data.message,
      creatorId: creatorId,
      slug: slug , 
      price: priceInCents
    })

    await handlePaymentResponse(checkout)
    
  }
  
  async function handlePaymentResponse(checkout: {sessionId?: string, error?: string}) {
    
    if(checkout.error){
      toast.error(checkout.error)
      return
    }

    if(!checkout.sessionId){
      toast.error("Falha ao criar pagamento, tente mais tarde.")
      return
    }

    const stripe  = await getStripeJs()

    if(!stripe) {
      toast.error("Falha ao criar pagamnento, tente mais tarde.")
      return
    }

    await stripe?.redirectToCheckout({
      sessionId: checkout.sessionId 
    })

  }
    return (
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu nome" {...field} 
                className="bg-white"
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensagem</FormLabel>
              <FormControl>
                <Textarea placeholder="Digite sua Mensagem" {...field} 
                className="bg-white h-32 resize-none"
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor da doação</FormLabel>
              <FormControl>
                <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex item-center gap-3"
                >

                {["5", "10", "20", "50", "100"].map((value) => (
                  <div key={value} className="flex items-center gap-1   ">
                    <RadioGroupItem value={value} id={value} className="cursor-pointer"/>
                    <label htmlFor={value}>R$ {value}</label>
                   </div>))}

                </RadioGroup>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Carregando..." : "Fazer doação"}
          </Button>
      </form>
    </Form>
    )
}