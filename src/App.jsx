
import { useState,useEffect } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {


  const[todos,setTodos]=useState([])
  const [todoValue,setTodoValue]=useState('')

  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({ todos: newList }))
  }

  function handleAddTodos(newTodo){
    const newTodolist=[...todos,newTodo]
    persistData(newTodolist)
    setTodos(newTodolist)

  }

  function handleDeleteTodo(index){
    const newTodolist = todos.filter((todo,todoIndex)=>{
      return todoIndex!==index
    })
    persistData(newTodolist)
    setTodos(newTodolist)
  }
  function handleEditTodo(index){
    const valueToBeEdited=todos[index]
    setTodoValue(valueToBeEdited)
 
    handleDeleteTodo(index)
  }
  useEffect(() => {
    if (!localStorage) {
      return
    }

    let localTodos = localStorage.getItem('todos')
    if (!localTodos) {
      return
    }

    console.log(localTodos)
    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)

  }, [])
 
  return (
    <>
     <>
      <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos} />
      <TodoList handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} todos={todos}/>
      
     </>
    </>
  )
}

export default App
