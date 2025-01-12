import { JSONFilePreset } from "lowdb/node";
const defaultData = {
  meta: { title: "Goals" },
  goals: [],
  userGoals: [],
};
const db = await JSONFilePreset("db.json", defaultData);

await db.read();
db.data ||= {
  meta: { title: "Goals" },
  goals: [],
  userGoals: [],
};

export async function getUserGoal(req, res) {
  try {
    const userGoals = db.data.userGoals || [];
    res.status(200).json(userGoals);
  } catch (error) {
    console.error("Error fetching userGoals:", error);
    res.status(500).send("Internal Server Error");
  }
}


export async function updateUserGoal(req, res) {
  try {
    const { GoalId, userId, Progress } = req.body;

    if (GoalId === undefined || userId === undefined || Progress === undefined) {
      return res.status(400).send("Missing required fields");
    }

    const existingUserGoal = db.data.userGoals.find(
      (g) => g.GoalId === GoalId && g.userId === userId
    );

    if (existingUserGoal) {
      existingUserGoal.Progress = Progress;
      await db.write();
      return res.status(200).json({ message: "User goal updated", existingUserGoal });
    }

    const newUserGoal = { GoalId, userId, Progress };
    db.data.userGoals.push(newUserGoal);
    await db.write();
    res.status(201).json({ message: "User goal added", newUserGoal });
  } catch (error) {
    console.error("Error updating userGoal:", error);
    res.status(500).send("Internal Server Error");
  }
}
