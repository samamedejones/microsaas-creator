"use client";
import { Button } from "@/components/ui/button";
import { creatUsername } from "../_actions/create_username";
import { useState } from "react";


interface UrlPreviewProps {
  username: string | null;
}

export function UrlPreview({ username: slug }: UrlPreviewProps) {
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState(slug);

  async function submitAction(formData: FormData) {
    const username = formData.get("username") as string

    
    if(username === ""){
      return;
    }
    
    const response = await creatUsername( {username} )
    console.log(response);

    if (response.error) {
      setError(response.error);
    }
  }


  if(!!username){
    return (
      <div className="flex items-center flex-1 p-2 text-gray-100">
        <div className="flex items-center justify-center w-full">
        <p>
            {process.env.NEXT_PUBLIC_HOST_URL}/creator/{username}
        </p>
        </div>
    </div>
    );
  }


  return (
    <div className="flex items-center flex-1 p-2 text-gray-100">
        <form className="flex-1 flex flex-col md:flex-row gap-4 items-start md:items-center"
        action={submitAction}
        > 
        <div className="flex items-center justify-center w-full">
        <p>
            {process.env.NEXT_PUBLIC_HOST_URL}/creator/
        </p>
        <input
          type="text"
          className="flex-1 outline-none border h-9 border-gray-300 text-black rounded-md bg-gray-50 px-1"
          placeholder="Digite seu nome de usuário"
          name="username"
        />
        </div>

        <Button 
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 h-9 w-full md:w-fit text-white px-4 rounded-md cursor-pointer"
        >
          Salvar
        </Button>
        {error && <p className="text-red-500">{error}</p>}
    </form>
    </div>
  );
}