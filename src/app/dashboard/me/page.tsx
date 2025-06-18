import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Me() {

  const session = await auth();
  
    if (!session?.user) {
      redirect("/")
    }

  return (
    <main className="w-full h-full flex gap-4 flex-col items-center p-4">
      <section
        className="w-full flex lg:flex-row flex-col lg:items-center mx-auto bg-zinc-900 rounded-md p-4 gap-2"
      >
        <p
          className="w-fit h-9 rounded-md flex items-center font-semibold text-white"
        >
          http://minha_url.com/creator/fulano-dev
        </p>
      </section>


    </main >
  )
}