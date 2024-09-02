import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import GoalButton from "./GoalButton";
const Goals = () => {

    const [goals, setGoals] = useState(
        [
            "10 job applications", '10 Outreachs', "10 code problems"
        ])

        useEffect(() => {

        }, [goals])
        //console.log(goals)
        //goals.map( goal => console.log(goal))

        return (
            <div className="goals-container">
                <h1> Goals:</h1>
                <div className="goal-buttons">
                {
                goals.map((goal, idx) => (
                    <h2 key={idx} >
                        <GoalButton name={goal} />
                    </h2>
                ))
                }
                {goals.length < 5 ?
                    <h2>
                    <GoalButton name='+'/>
                    </h2>
                    : {}
                }
                </div>
                
            </div>
        )
}

export default Goals