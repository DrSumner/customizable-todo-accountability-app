import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SET_GOALS } from "../state/actionTypes";

const idMaker = () => {
  return Math.random().toString(36).substring(2, 7)
}

export const Form = (props) => {

  const goals = useSelector(state => state.goals)
  const dispatch = useDispatch()


    const [taskNumber, setTaskNumber] = useState(1)
    const [values, setValues] = useState({
      goal: '',
      completetionDate: '',
      tasks: [
        { id: idMaker(), description: '', completed: false }
      ]
    })

  const onChange = (e, index) => {
    e.preventDefault()
    const {name, value} = e.target

    if (name === 'task') {
      
      const updatedTasks = [...values.tasks];
      updatedTasks[index] = { ...updatedTasks[index], description: value };
      setValues({
        ...values,
        tasks: updatedTasks,
      }); 
    } else if( name === 'date'){
        setValues({
          ...values,
          completetionDate: value
        })
    }
    setValues({
      ...values, [name]: value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const goalId = idMaker()
    const name = values.goal
    const tasks = values.tasks
    const completetionDate = values.completetionDate
    dispatch({type:SET_GOALS, payload: {id: goalId ,name, tasks, completetionDate}})

  }

  const increaseTasksNumber = () =>{
    if(taskNumber >= 10){
      setTaskNumber(10)
    } else
    setTaskNumber(taskNumber + 1)
    setValues({
      ...values,
      tasks: [...values.tasks, 
        { id: idMaker(), description: '', completed: false }
      ] 
    });
  }

  const decreaseTasksNumber = () =>{
    if(taskNumber <= 1){
      setTaskNumber(1)
    } else
    setTaskNumber(taskNumber - 1)
    setValues({
      ...values,
      tasks: values.tasks.slice(0, -1) 
    });
  }


    return (
        <form id="goalForm" 
      onSubmit={onSubmit}
        >
      <h3>New Goal Form</h3>
      
      <label>
        <input
          type='text'
          name='goal'
          placeholder='Goal'
          onChange={onChange}
          value={values.goal}
        />
      </label>
      <label>
      {Array.from({ length: taskNumber }).map((_, index) => (
        <div>
            {index !== 0 && <Button onClick={decreaseTasksNumber} className="remove-button">
              Remove
            </Button>}
          <input
            key={index}
            className="task-input"
            type="text"
            name='task'
            onChange={(e) => onChange(e, index)}
            value={values.tasks[index].description || ''}
            placeholder={`type task ${index + 1}`}
            /> 
            
            </div>
        ))}
        <Button 
        onClick={increaseTasksNumber}>
          Add a Task
        </Button>
      </label>
      <label>
        <span>Due Date</span>
        <input
        type='date'
        name="date"
        onChange={onChange}
        value={values.completetionDate}
        >
        </input>
      </label>
      <label><span>Create Goal:</span>
        <button
          // eslint-disable-next-line jsx-a11y/aria-role
          role='submit'
        >Create Goal</button>
      </label>
    </form>
    )
}

