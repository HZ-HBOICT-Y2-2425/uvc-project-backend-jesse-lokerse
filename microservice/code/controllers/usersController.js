import { JSONFilePreset } from "lowdb/node";
const defaultData = {
  meta: { title: "Goals" },
  goals: [],
  userGoals: [],
  users: [],
};
const db = await JSONFilePreset("db.json", defaultData);

await db.read();
db.data ||= {
  meta: { title: "Goals" },
  goals: [],
  userGoals: [],
  users: [],
};

export async function getUsers(req, res) {
  try {
    const users = db.data.users|| [];
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching userGoals:", error);
    res.status(500).send("Internal Server Error");
  }
}
