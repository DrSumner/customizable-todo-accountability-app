import React from "react";
import ProgressBar from "./ProgressBar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { COMPLETE_TASK } from "../state/actionTypes";

const Tasks = (props) => {

    const dispatch = useDispatch()


const {currentGoal} = props
const tasks = useSelector(state => state.goals[currentGoal].tasks)
const progress = [
    useSelector(state => state.goals[currentGoal].completedTasksCount),
    useSelector(state => state.goals[currentGoal].tasks.length)
]
const completionDate = new Date(useSelector(state => state.goals[currentGoal].completionDate))
const today = new Date()
const timeDiff = completionDate.getTime() - today.getTime()
const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))

const completeTask= (taskId) =>{
    const goal = currentGoal

    dispatch({type:COMPLETE_TASK, payload: {goal, taskId }})

}

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
                    onClick={() => completeTask(task.id)}
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