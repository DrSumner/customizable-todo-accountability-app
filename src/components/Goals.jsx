import React, { useState, useEffect } from "react";
import GoalButton from "./GoalButton";
import Tasks from "./Tasks";
import {  useSelector } from "react-redux";
import { Form } from "./Form";
import { signOutUser } from "../Backend/Auth"; 
import { useNavigate } from "react-router-dom"; 

const Goals = () => {

    const goals = useSelector(state => state.goals)
    const completedGoals = useSelector(state => state.completedGoals)
    const goalsArray = Object.values(goals)
    const navigate = useNavigate();

    console.log(goals)
    const [currentGoal, setCurrentGoal] = useState(goalsArray[0]?.name || '');
    const [form, setForm] = useState(false)
    const [list, setList] = useState(false)
        useEffect(() => {

        }, [currentGoal, goals])

        
        
        const handleClick = (event) => {
            event.preventDefault()
            const {name} = event.target
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

        const handleLogout = async () => {
            await signOutUser();
           // dispatch({ type: "CLEAR_GOALS" }); // Reset goals state if needed
            localStorage.removeItem('userId'); 
            navigate('/'); 
        };

        return (
            
            <div className="parent-container">
                {/* <button onClick={handleLogout} className="logout-btn">
                Log Out
            </button> */}
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
                    <h1 className="create-goal"> Create a Goal !</h1> 
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

                

                    {
                        <div className="completed-goals">
                            <div className="bar">
                             <h4>
                            Here are your completed goals so far! keep it up!
                            </h4>    
                            </div>
                            <ol>

                        {completedGoals.map((goal, index) => (
                            <div >
                                
                                <li className="completed-goals-list">
                                 {`${index +1}. ${goal.name}`}
                                </li>
                                 
                            </div>
                        ))}
                        </ol>
                        </div>
                    }

                </div>}
                 </div>
                 }

            </div>
        )
}

export default Goals