"use client";
import { useState, ChangeEvent, useRef } from "react";
import { debounce } from "lodash"
import { ChangeName } from "../_actions/change-name";





export function Name( {initialName}: { initialName: string }) {
    const [name, setName] = useState(initialName);
    const [originalName] = useState(initialName);



    const debouncedSaveName = useRef(
        debounce(async (currentName: string)=> {
            if(currentName.trim() === ""){
                setName(originalName);
                return;
            }


            if(currentName !== name){
                try {
                    // Vamos tentar salvar o nome do user no banco de dados
                } catch (err) {
                    console.log(err)
                    setName(originalName);
                }
            }
        }, 500)
    )

    function handleChangeName(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setName(value);
    }


  return (
    <input
    className="text-xl md:text-2xl font-bold bg-gray-50 border border-gray-100 rounded-md outline-none p-2 w-full max-w-2xl text-center my-3"
    value={name}
    onChange={handleChangeName}
    />
  );
}