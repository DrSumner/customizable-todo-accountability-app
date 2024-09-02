import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import GoalButton from "./GoalButton";
import Tasks from "./Tasks";
const Goals = () => {

    const [goals, setGoals] = useState(
        [
            "Apply for Jobs", 'Outreach', "code problems",
        ])

    const [currentGoal, setCurrentGoal] = useState(goals[0])
        useEffect(() => {

        }, [goals, currentGoal])
        
        const handleClick = (event) => {
            event.preventDefault()
            const {name} = event.target
            console.log(name)
            setCurrentGoal(name)
        }

        const createNewGoal = (event) => {
            event.preventDefault()
            const {name} = event.target
            console.log(name)
        }


        return (
            <div >
                <div className="goals-container"> 

                <h1> Goals:</h1>
                <div className="goal-buttons">
                {
                    goals.map((goal, idx) => (
                        <h2 key={idx} >
                        <GoalButton handleClick={handleClick} name={goal} />
                    </h2>
                ))
            }
                {goals.length < 5 ?
                    <h2>
                    <GoalButton handleClick={createNewGoal} name='+'/>
                    </h2>
                    : null
                }
                </div>
                <div >
                <Tasks currentGoal={currentGoal} />
                </div>
                </div>
            </div>
        )
}

export default Goals