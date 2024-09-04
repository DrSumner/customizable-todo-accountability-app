import React from "react";
import ProgressBar from "./ProgressBar";
import { useSelector } from "react-redux";

const Tasks = (props) => {

const {currentGoal} = props
const tasks = useSelector(state => state.goals[currentGoal].tasks)
const progress = [
    useSelector(state => state.goals[currentGoal].completedTasksCount),
    useSelector(state => state.goals[currentGoal].tasks.length)
]
const completetionDate = new Date(useSelector(state => state.goals[currentGoal].completetionDate))
const today = new Date()
const timeDiff = completetionDate.getTime() - today.getTime()
const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))

return(
    <div className="bottom-half">
          <ProgressBar daysLeft={daysLeft} progress={progress} currentGoal={currentGoal} />  
         <div className="tasks-container">
            <div className="tasks-header">
            <h1>
                Tasks
            </h1>
            </div>
            <div className="tasks-list">
            {tasks.map((task, idx) => (
                <div key={task.id} className="task">
                 <label >
                    <input className={`${task.completed ? 'completed' : null} checkbox`}
                    type='checkbox'
                    name={task.description}
                    />
                    </label>{task.description}
                </div>
            ))}
            </div>
        </div>
        
    </div>
)

}

export default Tasks