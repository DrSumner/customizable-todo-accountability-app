import React from "react";
import { useState } from "react";
import ProgressBar from "./ProgressBar";

const Tasks = (props) => {

const {currentGoal} = props
const [progress, setProgress] = useState([2,5])
const [tasks, setTasks] = useState([
    'Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'
])

return(
    <div className="bottom-half">
          <ProgressBar progress={progress} currentGoal={currentGoal} />  
         <div className="tasks-container">
            <div className="tasks-header">
            <h1>
                Tasks
            </h1>
            </div>
            <div className="tasks-list">
            {tasks.map((task, idx) => (
                <div key={idx}>
                 <label >
                    <input className="checkbox"
                    type='checkbox'
                    name={task}
                    checked={false}
                    />
                    </label>{task}
                </div>
            ))}
            </div>
        </div>
        
    </div>
)

}

export default Tasks