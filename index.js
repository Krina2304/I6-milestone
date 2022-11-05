const { Require, response } = require('express')
const express = require('express');
const app = express()
const { Todo } = require("./models")
const bodyParser = require('body-parser');
const { request } = require('./app');
app.use(bodyParser.json());

app.get("/todos", (require, response) => {
  console.log("Todo list")
})

app.post("/todos" , async (require, response) => {
  console.log("Creating a todo", require.body)

  try{
  const todo = Todo.create({ title: require.body.title, dueDate: require.body.dueDate, completed: false})
  return Response.json(todo)
} catch (error) {
  console.log(error)
  return response.status(422).json(error)
}
})

app.put("/todo/:id/markAsCompleted", async (require, response) => {
  console.log("We have to a update a todo with ID:")
  const todo =  await Todo.findByPk(request.params.id)
  try{
  const updatedTodo = await todo.markAsCompleted()
  return response
  } catch (error) {
    console.log(error)
  return response.status(422).json(error)

  }
})

app.delete("/todos/:id", (require, response) => {
  console.log("Dlete a todo by ID:", require.params.id)
})

app.listen(3000, () => {
  console.log("Started express server at port 3000")
});
