//ACTIONS
export const ADD_SKILL = 'employee_app/skills/ADD_SKILL';

//REDUCER
export default function reducer(state = { skills: [] }, action = {}) {
    switch (action.type) {
        case ADD_SKILL:
            return {
                ...state,
                skills: [...state.skills, action.payload]
            };
        default:
            return {
                ...state
            };
    }
}

//ACTION CREATORS
export function addSkill(skill) {
    return { type: ADD_SKILL, payload: skill };
}
