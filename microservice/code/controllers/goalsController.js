import { JSONFilePreset } from "lowdb/node";

const defaultData = {
  meta: { title: "Goals" },
  goals: [],
  userGoals: [],
};
const db = await JSONFilePreset("db.json", defaultData);
const goals = db.data;

export async function getGoal(req, res) {
  const allGoals = db.data.goals || [];
  res.status(200).json(allGoals);
}

export async function updateGoal(req, res) {
  const { id, Omschrijving, Beloning, Deadline, Type, Goal } = req.query;

  if (!id || !Omschrijving || !Beloning || !Deadline || !Type || !Goal) {
    return res.status(400).send("Missing required fields");
  }

  const existingGoal = db.data.goals.find((g) => g.id === id);
  if (existingGoal) {
    return res.status(400).send("Goal with this ID already exists");
  }

  const time = new Date().toLocaleString();
  const newGoal = {
    id,
    Omschrijving,
    Beloning: parseInt(Beloning, 10),
    Deadline,
    Type,
    Goal: parseInt(Goal, 10),
    claimed,
  };

  db.data.Goals.push(newGoal);
  await db.write();

  res.status(201).send(`Goal added: ${JSON.stringify(newGoal)}`);
}
export async function editGoal(req, res) {
  const { id, omschrijving, beloning, deadline, type, goal, claimed } =
    req.query;

  if (!id) {
    return res.status(400).send("Missing required field: id");
  }

  const thisgoal = db.data.goals.find((g) => g.id === parseInt(id, 10));
  if (!thisgoal) {
    return res.status(404).send("Goal not found");
  }

  if (omschrijving !== undefined) goal.omschrijving = omschrijving;
  if (beloning !== undefined) goal.beloning = parseInt(beloning, 10);
  if (deadline !== undefined) goal.deadline = deadline;
  if (type !== undefined) goal.type = type;
  if (goal !== undefined) goal.goal = parseInt(goal, 10);
  if (claimed !== undefined) goal.claimed = claimed === "true";

  await db.write();

  res.status(200).send(`Goal updated: ${JSON.stringify(thisgoal)}`);
}

export async function getByIdGoal(req, res) {
  try {
    const { id } = req.params;
    const goal = db.data.goals.find((g) => g.id === id);
    if (goal) {
      res.status(200).json(goal);
    } else {
      res.status(404).send("Goal not found");
    }
  } catch (error) {
    console.error("Error fetching goal by ID:", error);
    res.status(500).send("Internal Server Error");
  }
}
