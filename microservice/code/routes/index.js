import express from "express";
import {getGoal, updateGoal, editGoal} from "../controllers/goalsController.js";
import {getUserGoal, updateUserGoal} from "../controllers/userGoalsController.js";
import {getUsers} from "../controllers/usersController.js";
import {getPersonalGoal, updatePersonalGoal, getPersonalGoalById, deletePersonalGoal} from "../controllers/personalGoalsContoller.js";

const router = express.Router();

router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); 
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

router.get("/", (req, res) => {
  res.json("Welcome to the Goals API!");
});

router.get("/goals", getGoal);
router.post("/goals", updateGoal);
router.post("/goals", editGoal);
router.get("/userGoals", getUserGoal);
router.post("/userGoals", updateUserGoal);
router.get("/users", getUsers);
router.get("/personalGoals", getPersonalGoal);
router.post("/personalGoals", updatePersonalGoal);
router.get('/personalGoals/:id', getPersonalGoalById);
router.put("/personalGoals/:id", updatePersonalGoal);
router.delete("/personalGoals/:id", deletePersonalGoal);

export default router;
