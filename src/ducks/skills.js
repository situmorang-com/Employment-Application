import _ from 'lodash';

//ACTIONS
export const ADD_SKILL = 'employee_app/skills/ADD_SKILL';

//REDUCER
export default function reducer(state = { skills: [] }, action = {}) {
    switch (action.type) {
        case ADD_SKILL:
            let skills = state.skills;
            if (action.payload.parentId) {
                let index = _.findIndex(skills, skill => {
                    return skill.id === action.payload.parentId;
                });
                skills[index].subSkills = skills[index].subSkills
                    ? [...skills[index].subSkills, action.payload]
                    : [action.payload];
            } else {
                skills = [...skills, action.payload];
            }
            return {
                ...state,
                skills: skills
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
