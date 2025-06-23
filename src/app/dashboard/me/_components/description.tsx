"use client";
import { useState, ChangeEvent, useRef } from "react";
import { debounce } from "lodash"
import { ChangeName } from "../_actions/change-name";
import { toast } from "sonner";





export function Description( {initialDescription}: { initialDescription: string }) {
    const [description, setDescription] = useState(initialDescription);
    const [originalDescription] = useState(initialDescription);



    const debouncedSaveName = useRef(
        debounce(async (currentDescription: string)=> {
            if(currentDescription.trim() === ""){
                setDescription(originalDescription);
                return;
            }


            if(currentDescription !== description){
                try {
                    const response = await ChangeName({ name: currentDescription });

                    if(response.error) {
                        toast.error(response.error);
                        setDescription(originalDescription);
                        return
                    }
                    toast.success("Nome atualizado com sucesso!");
                } catch (err) {
                    console.log(err)
                    setDescription(originalDescription);
                }
            }
        }, 500)
    ).current

    function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value;
        setDescription(value);

        debouncedSaveName(value);
    }


  return (
    <textarea
    className="text-base bg-gray-50 border border-gray-100 rounded-md outline-none p-2 w-full max-w-2xl my-3 h-40 resize-none"
    value={description}
    onChange={handleChange}
    />
  );
}