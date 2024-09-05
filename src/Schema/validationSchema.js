import * as Yup from 'yup';

export const goalSchema = Yup.object().shape({
    goal: Yup.string()
    .required('Goal NAme is required')
    .max(15, 'Goal name must be 15 char or less'),

    completionDate: Yup.date()
    .required('Completion date is required')
    .min(new Date(), 'Completion date must be in the future'),

    tasks: Yup.array().of(
        Yup.object().shape({
            description: Yup.string()
            .required('Task description is required')
            .max(120, 'Task description must be 120 char or less'),
        })
    ).min(1, 'At least one task is required'),
})