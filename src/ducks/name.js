//ACTIONS
export const SAVE_NAME = 'employee_app/name/SAVE_NAME';

//REDUCER
export default function reducer(state = { name: '' }, action = {}) {
    switch (action.type) {
        case SAVE_NAME:
            return {
                ...state,
                name: action.payload
            };
        default:
            return {
                ...state
            };
    }
}

//ACTION CREATORS
export function saveName(name) {
    return { type: SAVE_NAME, payload: name };
}
