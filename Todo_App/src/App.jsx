import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';



function App() {

  //  Input text todo
  const [todo, setTodo] = useState("")

  // Array that holds all the todos
  const [todos, setTodos] = useState([])

  const [showFinished, setshowFinished] = useState(true)



  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])



  const SaveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }



  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    SaveToLocalStorage()

  }



  const handleDelete = (e, id) => {

    let newTodos = todos.filter(item => {
      return item.id != id
    });
    setTodos(newTodos)
    SaveToLocalStorage()
  }



  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")

    SaveToLocalStorage()
  }




  const handleChange = (e) => {
    setTodo(e.target.value)
  }



  const handleCheckbox = (e) => {

    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    SaveToLocalStorage()
  }


  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-red-500 min-h-[80vh] md:w-1/2">

        <h1 className=' text-slate-300 font-bold text-center text-xl'>Taskify - Manage your to-do's at one place</h1>

        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-lg text-slate-300 font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1 ' />
          <button onClick={handleAdd} disabled={todo.length <= 2} className='bg-slate-600 text-white hover:bg-slate-800 disabled:bg-slate-600 p-2 font-bold py-1 rounded-md '>Save</button>
        </div>

        <input className='my-4 mr-2 text-white' onChange={toggleFinished} type="checkbox" checked={showFinished} />Show Finished

        <h2 className='text-lg text-white font-bold hover:font-bold transition-all duration-10'> Your - Todos</h2>

        <div className="todos">
          {todos.length === 0 && <div className='mx-40 p-16'>No Todos to Display</div>}
          {todos.map(item => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-1/2 my-3 justify-between">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="button flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='text-white bg-slate-600  hover:bg-slate-800 p-2 font-bold py-1 rounded-md mx-2'><FaEdit className='cursor-pointer' /></button>
                <button onClick={(e) => handleDelete(e, item.id)} className='text-white bg-slate-600  hover:bg-slate-800 p-2 font-bold py-1 rounded-md mx-2'><MdDeleteForever className='cursor-pointer' /></button>
              </div>
            </div>
          })}
        </div>

      </div>
    </>
  )
}

export default App
