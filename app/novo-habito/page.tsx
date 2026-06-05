import { MongoClient, ServerApiVersion } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const uri = "mongodb+srv://eduardobissoli:20202020@cluster0.fc7hplt.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

  const today = new Date();
  const todayWeekDay = today.getDay();
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  const sortedWeekDays = weekDays.slice(todayWeekDay + 1).concat(weekDays.slice(0, todayWeekDay + 1))

  const last7Days = weekDays.map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - index)

    return date.toISOString().slice(0, 10)
  }).reverse();


export default function NewHabit(){
    async function newHabit(formData: FormData) {
        "use server";
        await client.connect();

        const habit = formData.get("habit");

        await client
        .db("ClientBank")
        .collection("habits")
        .insertOne({
            name: habit,
            WeekDays: last7Days
        });

        console.log("salvo");
        revalidatePath("/");
        redirect("/")
    }

    return(
        <main className="container relative flex flex-col gap-8 px-12 pt-16">
            <h1 className="text-4xl font-light text-center text-white">novo hábito</h1>
            <form className="flex flex-col gap-4 mt-4" action={newHabit}>
                <input type="text" name="habit" id="habit" className="p-2 text-xl text-white rounded-md bg-neutral-800"/>
                <button className="bg-[#45EDAD] text-neutral-900 text-2xl p-2 rounded-md mt-8" type="submit">Cadastrar</button>
            </form>
            <button className="bg-neutral-800 text-[#F85858] text-2xl p-2 rounded-md">Cancelar</button>
        </main>
    );
}