const ADD_EXPLANATION = 'explanation/ADD_EXPLANATION';
const DELETE_EXPLANATION = 'explanation/DELETE_EXPLANATION';
const UPDATE_SUBTITLE = 'explanation/UPDATE_SUBTITLE';
const UPDATE_EXPLANATION = 'explanation/UPDATE_EXPLANATION';

export const addExplanation = () => ({ type: ADD_EXPLANATION });
export const deleteExplanation = (explanationIdx) => ({ type: DELETE_EXPLANATION, explanationIdx });
export const updateSubtitle = (explanationIdx, text) => ({ type: UPDATE_SUBTITLE, explanationIdx, text });
export const updateExplanation = (explanationIdx, text) => ({ type: UPDATE_EXPLANATION,  explanationIdx, text });

const initialState = {
    explanations: []
};

export default function explanation(state = initialState, action) {
    switch (action.type) {
        case ADD_EXPLANATION:
            return {
                ...state,
                explanations: state.explanations.concat({ subtilte: '', contents: '' })
            }
        case DELETE_EXPLANATION:
            return {
                ...state,
                explanations: state.explanations.filter((_, index) => index !== action.explanationIdx)
            }
        case UPDATE_SUBTITLE: {
            return {
                ...state,
                explanations: state.explanations.map((explanation, index) => {
                    return index === action.explanationIdx ? { ...explanation, subtilte: action.text } : explanation
                })
            }
        }
        case UPDATE_EXPLANATION: {
            return {
                ...state,
                explanations: state.explanations.map((explanation, index) => {
                    return index === action.explanationIdx ? { ...explanation, contents: action.text } : explanation
                })
            };
        }
        default:
            return state;
    }
}