import express from "express";
import Todo from "../models/todo.js";

const router = express.Router();

// Home displaying tasks - /
router.get("/", async (req, res) => {
  try {
    const todoList = await Todo.find();
    res.render("home", { todoList });
  } catch {
    res.redirect("/");
  }
});

// New tasks page - /new
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
  } catch {
    res.render("newTodo", {
      errorMessage: "Error adding task",
    });
  }
});

// Delete tasks - DELETE
router.delete("/:id", async (req, res) => {
  let todo;
  try {
    todo = await Todo.findById(req.params.id);
    await Todo.deleteOne({ _id: req.params.id });
    res.redirect("/");
  } catch {
    if (todo == null) {
      res.redirect("/");
    }
  }
});

export default router;
