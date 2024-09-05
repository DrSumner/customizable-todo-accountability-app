import {
SET_GOALS, SET_TASKS, COMPLETE_TASK, EDIT_GOALS
} from '../actionTypes'



export const initialState = {
    goals: {
        'Apply for Jobs': {
            id: 'goal1',
            name: 'Apply for Jobs',
            completetionDate: '2024-09-10',
            completedTasksCount: 2,
            tasks: [
                {id: 'task1', description: 'apply for a job', completed: true},
                {id: 'task2', description: 'apply for a job', completed: true},
                {id: 'task3', description: 'apply for a job', completed: false},
                {id: 'task4', description: 'apply for a job', completed: false},
                {id: 'task5', description: 'apply for a job', completed: false},
            ]
        },
        'Outreach': {
            id: 'goal2',
            name: 'Outreach',
            completetionDate: '2024-09-05',
            completedTasksCount: 3,
            tasks: [
                {id: 'task1', description: 'Outreach to someone', completed: true},
                {id: 'task2', description: 'Outreach to someone', completed: true},
                {id: 'task3', description: 'Outreach to someone', completed: true},
                {id: 'task4', description: 'Outreach to someone', completed: false},
                {id: 'task5', description: 'Outreach to someone', completed: false},
            ]
        },
    },
    
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
                        completetionDate: action.payload.completetionDate,
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
        default:
            return state;
    }
}

