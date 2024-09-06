import {
SET_GOALS, COMPLETE_TASK, EDIT_GOALS, COMPLETE_GOAL
} from '../actionTypes'



export const initialState = {
    goals: {},
    completedGoals: [
        {name: 'goal 1'},
        {name: 'goal 2'},
        {name: 'goal 3'}
    ]
}

export const reducer = (state= initialState, action) => {
    switch (action.type) {
        case SET_GOALS:
            return {
                ...state, 
                goals: {...state.goals, 
                    [action.payload.name]: {
                        id: action.payload.id,
                        name: action.payload.name,
                        tasks: action.payload.tasks,
                        completionDate: action.payload.completionDate,
                        completedTasksCount: 0
                    }
                
                }};
        case COMPLETE_TASK:
            const goal = state.goals[action.payload.goal];

            const updatedTasks = goal.tasks.map(task => 
                task.id === action.payload.taskId 
                ? {...task, completed: !task.completed }
                : task
            );
            const updatedCompletedTasksCount = updatedTasks
            .filter(task => task.completed).length;

            return {
                ...state,
                goals: {...state.goals,
                    [action.payload.goal]:
                     {...goal,
                        tasks: updatedTasks,
                        completedTasksCount: updatedCompletedTasksCount

                     }
                }
            };
        case COMPLETE_GOAL:{
            const { goal } = action.payload; 
            const completedGoal = state.goals[goal];
      
            if (!completedGoal) return state;
      
            const { [goal]: removedGoal, ...remainingGoals } = state.goals;
      
            return {
              ...state,
              goals: remainingGoals, 
              completedGoals: [...state.completedGoals, completedGoal], 
            };
          }
        default:
            return state;
    }
}

