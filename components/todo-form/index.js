import { useState, useEffect } from 'react'
import userbase from 'userbase-js'


function Todo({ name, done, toggleComplete, deleteTodo }) {
    const [readMore,setReadMore] = useState(false)
    const [changeName,setchangeName] = useState(name.length)
    const [nameMore,setNameMore]= useState(true)
    const [mnameMore,setmNameMore]= useState(true)

    useEffect(()=>{
        if(changeName>=16){
            setNameMore(true)
        }
        else{
            setNameMore(false)
        }
        if(changeName>=47){
            setmNameMore(true)
        }
        else{
            setmNameMore(false)
        }
    },[changeName])

    return (
        <li className="my-3 p-1.5 rounded-sm bg-white shadow-lg shadow-inner">
            <div className="flex items-center justify-between max-w-full">
                <div className="flex items-center w-3/5">
                    <span className={done ? 'text-gray-500 line-through truncate' : '' || readMore ? 'whitespace-wrap' : 'truncate'}>{name}</span>
                    <img className={nameMore ? "" : "hidden"} className={mnameMore ? "" : "lg:hidden"}  onClick={()=> setReadMore(!readMore)} width="20px" height="20px" src={readMore ? "/icons/arrow-up.svg" : "/icons/arrow-down.svg"} alt="arrow"/>
                </div>
                <div className="flex-col sm:flex-row flex ">
                    <button
                        type="button"
                        className="mx-0 sm:mb-0 mb-1 sm:mx-4 p-1 rounded bg-purple-400 text-white font-bold"
                        onClick={(e) => {
                            e.preventDefault()
                            toggleComplete()
                        }}
                    >
                        <img className="font-bold w-6 wx-2 mx-auto" src={done ? "/icons/x.svg" : "/icons/check.svg"} alt="check copmlete"/>
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault()
                            deleteTodo()
                        }}
                        className=" p-1 bg-red-500 text-white rounded font-bold"
                    >
                        delete
                    </button>
                </div>
            </div>
        </li>
    )
}

function TodoForm() {
    const [newTodo, setNewTodo] = useState('')
    const [todos, setTodos] = useState([])
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        async function openDatabase() {
            try {
                console.log('opening db...')
                await userbase.openDatabase({
                    databaseName: 'Starter App',
                    changeHandler: function (items) {
                        setTodos(items)
                    },
                })
            } catch (e) {
                console.error(e.message)
            }
        }
        openDatabase()
    }, [])

    async function addTodo(e) {
        e.preventDefault()
        setDisabled(true)
        try {
            await userbase.insertItem({
                databaseName: 'Starter App',
                item: { name: newTodo, done: false },
            })
            setNewTodo('')
            setDisabled(false)
        } catch (e) {
            console.error(e.message)
            setDisabled(false)
        }
    }

    async function toggleComplete(itemId, currentValue) {
        try {
            await userbase.updateItem({
                databaseName: 'Starter App',
                item: { ...currentValue, done: !currentValue.done },
                itemId,
            })
        } catch (e) {
            console.error(e.message)
        }
    }

    function handleNewTodo(e) {
        e.preventDefault()
        setNewTodo(e.target.value)
    }

    async function deleteTodo(itemId) {
        setDisabled(true)
        try {
            await userbase.deleteItem({
                databaseName: 'Starter App',
                itemId,
            })
            setNewTodo('')
            setDisabled(false)
        } catch (e) {
            console.error(e.message)
            setDisabled(false)
        }
    }

    function checkIt(e) {
        e.preventDefault()
        if(newTodo==''){
            setDisabled(true)
            window.alert("Lütfen bir şeyler yazın")
        }
        else{
            setDisabled(false)
        }
    }

    return (
        <form className="bg-red-100 shadow-md rounded p-8 mb-6 pb-4" onSubmit={addTodo}>
            <h2 className="text-2xl font-semibold border-b-2 border-black pb-1 inline-block">To do App</h2>
            <div className="flex my-4">
                <input
                    type="text"
                    onChange={handleNewTodo}
                    value={newTodo}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button disabled={disabled} className="btn-yellow ml-4 bg-green-400 shadow-lg rounded-sm px-4 py-1 outline-none" type="submit">
                    add
                </button>
            </div>
            <ul>
                {todos.map((todo) => (
                    <Todo
                        key={todo.itemId}
                        name={todo.item.name}
                        done={todo.item.done}
                        toggleComplete={() => toggleComplete(todo.itemId, todo.item)}
                        deleteTodo={() => deleteTodo(todo.itemId)}
                    />
                ))}
            </ul>

        </form>
    )
}

export default TodoForm