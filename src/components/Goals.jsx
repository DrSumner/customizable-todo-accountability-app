import React, { useState, useEffect } from "react";
import GoalButton from "./GoalButton";
import Tasks from "./Tasks";
import {  useSelector } from "react-redux";
import { Form } from "./Form";
const Goals = () => {

    const goals = useSelector(state => state.goals)
    const completedGoals = useSelector(state => state.completedGoals)
    const goalsArray = Object.values(goals)

    console.log(completedGoals)
    const [currentGoal, setCurrentGoal] = useState(goalsArray[0]?.name || '');
    const [form, setForm] = useState(false)
    const [list, setList] = useState(false)
        useEffect(() => {
            
        }, [currentGoal, goals])
        
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

        const showList = (e) => {
            e.preventDefault()
            setList(!list)
        }

        return (
            <div className="parent-container">
                {goalsArray.length > 0 ? <div className="goals-container"> 

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
                    <Form setForm={setForm} setCurrentGoal={setCurrentGoal} goalsArray={goalsArray} />
                </div>
                
                : <div >
                <Tasks currentGoal={currentGoal} setCurrentGoal={setCurrentGoal} goalsArray={goalsArray} />
                </div>}
                </div>
                : !form ? <div> 
                    <h1> Create a Goal !</h1> 
                    <h2 className="goal-buttons">
                    <GoalButton handleClick={showForm} name='+'/>
                    </h2>
                    </div>
                : form && <div>
                        <Form setForm={setForm} setCurrentGoal={setCurrentGoal} goalsArray={goalsArray} />
                    </div>
            
            }
            {completedGoals.length > 0 && <div>
                <button
                onClick={showList}
                >
                    {!list ? 'show completed Goals so far!'
                    : 'hide completed Goals'    
                }
                </button>
                {list && <div className="footer">

                <h4>
                Here are your completed goals so far! keep it up!
                </h4> 

                    {
                        <div className="completed-goals">

                        {completedGoals.map((goal, index) => (
                            <div >
                                
                                <h4 className="completed-goals-list">
                                 {`${index +1}. ${goal.name}`}
                                </h4>
                                 
                            </div>
                        ))}
                        </div>
                    }

                </div>}
                 </div>
                 }

            </div>
        )
}

export default Goals