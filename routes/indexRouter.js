import express from "express";
import Todo from "../models/todo.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const todoList = await Todo.find();
    res.render("home", { todoList });
  } catch {
    res.redirect("/");
  }
});

router.get("/new", (req, res) => {
  res.render("newTodo");
});
// Create new task - POST
router.post("/", async (req, res) => {
  const todo = new Todo({
    task: req.body.todo,
  });
  try {
    await todo.save();
    res.redirect("/");
  } catch (error) {
    res.redirect("/");
    console.log(error);
  }
});

export default router;
