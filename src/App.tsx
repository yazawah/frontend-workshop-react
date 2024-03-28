import { useState } from 'react'

type Task = {
  id: string,
  title: string,
  completed: boolean
}

function App(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([])
  const [input, setInput] = useState<string>('')

  const hundleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newTask = {
      id: crypto.randomUUID(),
      title: input,
      completed: false
    }

    setTasks([
      ...tasks,
      newTask
    ])
    setInput('')
  }

  const handleCheckboxChange = (task: Task) => {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return {
            ...t,
            completed: !t.completed
          }
        }
        return t
      
      })
    )
  }

  return (
    <>
      <h1>TODO アプリ</h1>

      <div>
        {tasks.length > 0 ? (
          <>
            <h2>My Tasks</h2>
            <ul>
              {tasks.map((task) => (
                <li key={task.id}>
                  <label>
                    <input type='checkbox' checked={task.completed} onChange={() => handleCheckboxChange(task)} />
                    {task.title}
                  </label>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>タスクを追加してください</p>
        )}
      </div>
      <form onSubmit={hundleSubmit}>
        <input type="text" value={input} onChange={(event) => {
          setInput(event.target.value)
        }} />
        <button>Add Task</button>
      </form>
    </>
  )
}

export default App
