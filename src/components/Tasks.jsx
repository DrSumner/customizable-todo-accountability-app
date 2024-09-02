import React from "react";
import ProgressBar from "./ProgressBar";

const Tasks = (props) => {

const {currentGoal} = props

return(
    <div>
        <ProgressBar currentGoal={currentGoal} />
    </div>
)

}

export default Tasks