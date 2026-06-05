import { MongoClient, ServerApiVersion } from "mongodb";
import Link from "next/link";
import ArrowIcon from "@/app/components/arrowicon";
import Calendar from "@/app/components/Calendar";
const uri = "mongodb+srv://eduardobissoli:20202020@cluster0.fc7hplt.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



export default async function Habit({ params }: { params: Promise<{ habitStreak: string }> }) {
    "use server";
    await client.connect();

    const { habitStreak } = await params;        // ← Await é obrigatório
    const decoded = decodeURIComponent(habitStreak || '');

    const habitSeguiment = await client
    .db("ClientBank")
    .collection("habits")
    .findOne({
        name: decoded,
    });

    if (!habitSeguiment) {
        return <h1>Hábito não encontrado</h1>;
    }

    return (
        <main className="container relative flex flex-col gap-8 px-12 py-16">
            <h1 className="text-2xl text-white text-center font-light">
                {decoded}
            </h1>
            <Link href="/" className="flex items-center font-sans text-xs text-neutral-300 gap-2"><ArrowIcon width={12} height={12} /> Voltar</Link>

            <Calendar habit={decoded} habitStreak={habitSeguiment} />
        </main>
    );
}