"use server";
import { MongoClient, ServerApiVersion } from "mongodb";
import { revalidatePath } from "next/cache";
const uri = "mongodb+srv://eduardobissoli:20202020@cluster0.fc7hplt.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function deleteHabit(habitStreak: string) {
    await client.connect();
    const db = client.db("ClientBank");

    await db.collection("habits").deleteOne({
        name: habitStreak
    });

    revalidatePath("/");
}

type ToggleHabitParams = {
    habit: string;
    habitStreak: any;
    date: string | null;
    done?: boolean;
}

export async function toggleHabit({habit, habitStreak, date, done}: ToggleHabitParams) {
    await client.connect();
    const db = client.db("ClientBank");

    if(!habitStreak || !date) {
        return;
    }

    await db.collection("habits").updateOne(
    { name: habit },
    {
        $set: {
            [date]: done === undefined ? true : !done
        }
    }
);
    revalidatePath("/")
}