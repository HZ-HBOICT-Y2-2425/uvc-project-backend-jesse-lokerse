import { JSONFilePreset } from "lowdb/node";

const defaultData = {
  meta: { title: "Goals" },
  goals: [],
  userGoals: [],
  users: [],
  personalGoals: [],
};
const db = await JSONFilePreset("db.json", defaultData);
const personalGoals = db.data.personalGoals;
export async function getPersonalGoal(req, res) {
  const allPersonalGoals = db.data.personalGoals || []; 
  res.status(200).json(allPersonalGoals);
}

export async function updatePersonalGoal(req, res) {
  try {
    const { id } = req.params; 
    const { omschrijving, type, goal, userId, claimed } = req.body;

    if (!omschrijving || goal === undefined || userId === undefined || typeof claimed !== "boolean") {
      return res.status(400).send("Missing or invalid required fields");
    }

    const existingPersonalGoal = db.data.personalGoals.find(
      (g) => g.id === String(id)
    );

    if (!existingPersonalGoal) {
      return res.status(404).send("Goal not found");
    }


    existingPersonalGoal.omschrijving = omschrijving;
    existingPersonalGoal.type = type; 
    existingPersonalGoal.goal = goal;
    existingPersonalGoal.userId = userId;
    existingPersonalGoal.claimed = claimed;

    await db.write(); 

    res.status(200).json(existingPersonalGoal); 
  } catch (error) {
    console.error("Error updating goal:", error);
    res.status(500).send("Internal Server Error");
  }
}



export async function getPersonalGoalById(req, res) {
  try {
    const { id } = req.params;
    console.log(id)
    const personalGoal = db.data.personalGoals.find((g) => g.id === String(id));


    if (personalGoal) {
      res.status(200).json(personalGoal);
    } else {
      res.status(404).send("Goal not found");
    }
  } catch (error) {
    console.error("Error fetching goal by ID:", error);
    res.status(500).send("Internal Server Error");
  }
}

export async function deletePersonalGoal(req, res) {
  console.log(personalGoals)
  const index = personalGoals.findIndex((r) => r.id === req.params.id);
  if (index !== -1) {
    personalGoals.splice(index, 1);
    await db.write();
    res.status(200).send("Goal deleted");
  } else {
    res.status(404).send("Goal not found.");
  }
}