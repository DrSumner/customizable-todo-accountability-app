import React from "react";
import { Button } from "react-bootstrap";

const ProgressBar = (props) => {

    const {currentGoal, progress, edit, daysLeft} = props
   
    const tasksToGo = progress[1] - [progress[0]]
    const width = (progress[0] / progress[1]) * 100
    return (
        <div className="progress-container">
        <div className="progress-header">
            <h3>
            {currentGoal}
            </h3>
            <h3>
                {daysLeft} days left!
            </h3>
        </div>
        <h2 id="progress"> Progress:</h2>
        <h4 id="tracker">
             {`${progress[0]}/${progress[1]} tasks, ${tasksToGo} to go!`}
             </h4>
             <div className="progress-bar">
                <div className="progress-bar-fill" style={{width: `${width}%`}}>

                </div>
             </div>
             <div>
                <Button className="edit-button"
                onClick={edit}
                >
                    Edit Goal
                </Button>
             </div>
        </div>
    )

}

export default ProgressBar