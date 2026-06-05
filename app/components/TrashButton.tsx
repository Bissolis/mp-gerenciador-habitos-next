"use client"
import Image from "next/image";
import { deleteHabit } from "../actions";

export default function TrashButton({ habitName }: { habitName: string }){
    return(
        <button onClick={() => deleteHabit(habitName)}>
            <Image 
            src="/markers/trash.svg"
            width={20}
            height={20}
            alt="trash"
            />
        </button>
    );
}