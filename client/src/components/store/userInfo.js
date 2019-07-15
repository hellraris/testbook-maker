const SET_USER_ID = 'SET_USER_ID';

export const setUserId = (userId) => ({type: SET_USER_ID, userId});

const initialState = {
    userId: null
}

export default function userInfo(state = initialState, action) {
    switch (action.type) {
        case SET_USER_ID:

            return {
                ...state,
                userId: action.userId
            }
        default:
            return state;

    }
}