import React, { useState } from "react";
import { Button } from "react-bootstrap";

export const Form = (props) => {

    const [taskNumber, setTaskNumber] = useState(1)

  const increaseTasksNumber = () =>{
    if(taskNumber >= 10){
      setTaskNumber(10)
    } else
    setTaskNumber(taskNumber + 1)
  }

  const decreaseTasksNumber = () =>{
    if(taskNumber <= 1){
      setTaskNumber(1)
    } else
    setTaskNumber(taskNumber - 1)
  }


    return (
        <form id="goalForm" 
        //onSubmit={onNewQuote}
        >
      <h3>New Goal Form</h3>
      
      <label>
        <input
          type='text'
          name='goalName'
          placeholder='Goal'
          //onChange={onChange}
          //value={state.values.authorName}
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
            name={`task-${index}`}
            placeholder={`type task ${index + 1}`}
            /> 
            
            </div>
        ))}
        <Button 
        onClick={increaseTasksNumber}>
          Add a Task
        </Button>
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

