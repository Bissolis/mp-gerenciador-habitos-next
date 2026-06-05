import DayState from "./components/DayState";
import Link from "next/link";
import { MongoClient, ServerApiVersion } from "mongodb";
import TrashButton from "./components/TrashButton";
const uri = "mongodb+srv://eduardobissoli:20202020@cluster0.fc7hplt.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export default async function Home() {
  "use server";
  await client.connect();

  const habits = await client
  .db("ClientBank")
  .collection("habits")
  .find({})
  .toArray();

  const today = new Date();
  const todayWeekDay = today.getDay();
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  const sortedWeekDays = weekDays.slice(todayWeekDay + 1).concat(weekDays.slice(0, todayWeekDay + 1))

  const last7Days = weekDays.map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - index)

    return date.toISOString().slice(0, 10)
  }).reverse();

  console.log(last7Days)

  console.log(JSON.stringify(habits, null, 2))

  return (
  <main className="container relative flex flex-col gap-8 px-4 pt-16">
    {(!habits || habits.length === 0) && (
      <h1 className="mt-20 text-4xl font-light text-white text-center">
        Você não possui hábitos cadastrados
      </h1>
    )}
    {habits?.map((habitStreak) => (
      <div key={habitStreak._id.toString()} className="flex flex-col gap-2" >
        <div className="flex justify-between items-center">
          <span className="text-xl font-light text-white">
            {habitStreak.name}
          </span>
          <TrashButton habitName={habitStreak.name} />
        </div>
        <Link href={`/habito/${encodeURIComponent(habitStreak.name)}`} >
          <section className="grid grid-cols-7 bg-neutral-800 rounded-md p-2 mb-25">
            {sortedWeekDays.map((day, index) => (
              <div key={day} className="flex flex-col last:font-bold" >
                <span className="flex justify-center text-xs text-white">
                  {day}
                </span>
                <DayState day={habitStreak[last7Days[index]]} />
              </div>
            ))}
          </section>
        </Link>
      </div>
    ))}
    <Link href="/novo-habito" className="fixed text-center bottom-10 w-2/3 left-1/2 -translate-x-1/2 text-neutral-900 bg-[#45EDAD] text-2xl p-2 rounded-md" >
      novo hábito
    </Link>
  </main>
);
}