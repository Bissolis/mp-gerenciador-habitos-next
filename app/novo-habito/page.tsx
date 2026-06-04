export default function NewHabit(){
    async function newHabit(formData: FormData) {
        "use server";

        const habit = formData.get("habit");
        
        console.log(habit);
    }

    return(
        <main className="container relative flex flex-col gap-8 px-12 pt-16">
            <h1 className="text-4xl font-light text-center text-white">novo hábito</h1>
            <form className="flex flex-col gap-4 mt-4" action={newHabit}>
                <input type="text" name="habit" id="habit" className="p-2 text-xl text-white rounded-md bg-neutral-800"/>
            </form>
            <button className="bg-[#45EDAD] text-neutral-900 text-2xl p-2 rounded-md mt-8" type="submit">Cadastrar</button>
            <button className="bg-neutral-800 text-[#F85858] text-2xl p-2 rounded-md">Cancelar</button>
        </main>
    );
}