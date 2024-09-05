import React, { useState, useEffect } from "react";
import GoalButton from "./GoalButton";
import Tasks from "./Tasks";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "./Form";
const Goals = () => {

    const goals = useSelector(state => state.goals)
    const goalsArray = Object.values(goals)
    const dispatch = useDispatch()

    //console.log(goalsArray)
    const [currentGoal, setCurrentGoal] = useState(goalsArray[0]?.name || '');
    const [form, setForm] = useState(false)
        useEffect(() => {

        }, [currentGoal])
        
        const handleClick = (event) => {
            event.preventDefault()
            const {name} = event.target
            //console.log(name)
            setCurrentGoal(name)
            setForm(false)
        }

        const showForm = (event) => {
            event.preventDefault()
            const {name} = event.target
            if(name === '+'){
                setForm(!form)
            }
        }


        return (
            <div >
                <div className="goals-container"> 

                <h1> Goals:</h1>
                <div className="goal-buttons">
                {
                    goalsArray?.map((goal, idx) => (
                        <h2 key={idx} >
                        <GoalButton handleClick={handleClick} name={goal.name} />
                    </h2>
                ))
            }
                {!form && goalsArray?.length < 5 ?
                    <h2>
                    <GoalButton handleClick={showForm} name='+'/>
                    </h2>
                    : null
                }
                </div>
                {form 
                ? <div>
                    <Form setForm={setForm} setCurrentGoal={setCurrentGoal} />
                </div>
                
                : <div >
                <Tasks currentGoal={currentGoal} />
                </div>}
                </div>
            </div>
        )
}

export default Goals