import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { COMPLETE_GOAL } from "../state/actionTypes";
import confetti from "canvas-confetti";

const ProgressBar = (props) => {

    const {currentGoal, progress, daysLeft, setCurrentGoal, goalsArray} = props
   
    const tasksToGo = progress[1] - [progress[0]]
    const width = (progress[0] / progress[1]) * 100

    const dispatch = useDispatch()

    const triggerConfetti = () => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      };

    const complete = (goal) => {
        if(goal === goalsArray[0].name){
            setCurrentGoal(goalsArray[1]?.name || '')

        } else{
        setCurrentGoal(goalsArray[0]?.name || '')
    }
        dispatch({type:COMPLETE_GOAL, payload:{goal}})

        triggerConfetti();
    setTimeout(() => {
    }, 3000);
    }

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
            {width === 100 && <div>
                <Button className="edit-button"
                onClick={() => complete(currentGoal)}
                >
                    Finito!
                </Button>
             </div>}
        </div>
    )

}

export default ProgressBar