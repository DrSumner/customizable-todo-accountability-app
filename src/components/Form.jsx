import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SET_GOALS } from "../state/actionTypes";
import { goalSchema } from "../Schema/validationSchema";
import * as Yup from 'yup'

const idMaker = () => {
  return Math.random().toString(36).substring(2, 7)
}

export const Form = (props) => {

  const [enabled, setEnabled] = useState(false)
  const {setForm, setCurrentGoal} = props
  const dispatch = useDispatch()

    const [errors, setErrors] = useState({
      goal: '',
      completionDate: '',
      tasks: [
        {  description: '',}
      ]
    })
    const [taskNumber, setTaskNumber] = useState(1)
    const [values, setValues] = useState({
      goal: '',
      completionDate: '',
      tasks: [
        { id: idMaker(), description: '', completed: false }
      ]
    })

    useEffect(() => {
      goalSchema.isValid(values).then(isValid => {
        setEnabled(isValid)
      })
    }, [values])

  const onChange = (e, index) => {
    e.preventDefault()
    const {name, value} = e.target

    if (name === 'tasks') {
      
      const updatedTasks = [...values.tasks];
      updatedTasks[index] = { ...updatedTasks[index], description: value };
      setValues({
        ...values,
        tasks: updatedTasks,
      }); 
    } else if( name === 'completionDate'){
        setValues({
          ...values,
          completionDate: value
        })
    } else{
    setValues({
      ...values, [name]: value
    })
  }

  Yup
  .reach(goalSchema, name)
  .validate(value)
  .then(() => { setErrors({...errors, [name]: ''}) })
  .catch((error) => {setErrors({...errors, [name]:error.errors[0]})})

  }

  const onSubmit = (e) => {
    e.preventDefault()
    const goalId = idMaker()
    const name = values.goal
    const tasks = values.tasks
    const completionDate = values.completionDate
    dispatch({type:SET_GOALS, payload: {id: goalId ,name, tasks, completionDate}})
    setCurrentGoal(name)
    setForm(false)
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
            name='tasks'
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
      <span>Due Date</span>
      <label>
        <input
        type='date'
        name="completionDate"
        onChange={onChange}
        value={values.completionDate}
        >
        </input>
      </label>
      <label><span>Create Goal:</span>
        <input
          // eslint-disable-next-line jsx-a11y/aria-role
          type='submit'
          disabled={!enabled}
        ></input>
      </label>
    </form>
    )
}

