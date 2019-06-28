const ADD_SUBQUESTION = 'question/ADD_SUBQUESTION';
const DELETE_SUBQUESITON = 'question/DELETE_SUBQUESTION';
const ADD_SELECTION = 'question/ADD_SELECTION';
const DELETE_SELECTION = 'question/DELETE_SELECTION';
const CHECK_SELECTION = 'qusetion/CHECK_SELECTION';
const UNCHECK_SELECTION = 'question/UNCHECK_SELECTION';
const UPDATE_SUBTITLE = 'question/UPDATE_SUBTILTE';
const UPDATE_SELECTION = 'question/UPDATE_SELECTION';

export const addSubQuestion = () => ({ type: ADD_SUBQUESTION });
export const deleteSubQuestion = (subQuestionIdx) => ({ type: DELETE_SUBQUESITON, subQuestionIdx });
export const addSelection = (subQuestionIdx, selectionIdx) => ({ type: ADD_SELECTION, subQuestionIdx, selectionIdx });
export const deleteSelection = (subQuestionIdx, selectionId) => ({ type: DELETE_SELECTION, subQuestionIdx, selectionId });
export const checkSelection = (subQuestionIdx, selectionId) => ({ type: CHECK_SELECTION, subQuestionIdx, selectionId });
export const uncheckSelection = (subQuestionIdx, selectionIdx) => ({ type: UNCHECK_SELECTION, subQuestionIdx, selectionIdx });
export const updateSubtitle = (subQuestionIdx, text) => ({ type: UPDATE_SUBTITLE, subQuestionIdx, text });
export const updateSelection = (subQuestionIdx, selectionIdx, text) => ({ type: UPDATE_SELECTION, subQuestionIdx, selectionIdx, text });

const initialState = {
    subQuestions: []
};

export default function question(state = initialState, action) {
    switch (action.type) {
        case ADD_SUBQUESTION:
            return {
                ...state,
                subQuestions: state.subQuestions.concat({ 
                    id: state.subQuestions.length > 0 ?  
                                    ((state.subQuestions[state.subQuestions.length - 1].id) + 1) : 0,
                    subtilte: '',
                    selections: [],
                    answer: new Set()
                })
            };
        case DELETE_SUBQUESITON:
            return {
                ...state,
                subQuestions: state.subQuestions.filter((_, index) => index !== action.subQuestionIdx)
            };
        case ADD_SELECTION:
            return {
                ...state,
                subQuestions: state.subQuestions.map((subQuestion, index) => {
                    if (index === action.subQuestionIdx) {
                        return {
                            ...subQuestion,
                            selections: subQuestion.selections.concat(
                                {id: subQuestion.selections.length > 0 ?  
                                    ((subQuestion.selections[subQuestion.selections.length - 1].id) + 1) : 0 ,
                                    text: ''})
                        }
                    } else {
                        return subQuestion;
                    }
                })
            };
        case DELETE_SELECTION: {
            const updatedSelections = state.subQuestions[action.subQuestionIdx].selections.filter((selection, index) => selection.id !== action.selectionId);
            const updatedAnswer = state.subQuestions[action.subQuestionIdx].answer;

            if(updatedAnswer.has(action.selectionId)) updatedAnswer.delete(action.selectionId)
    
            return {
                ...state,
                subQuestions: state.subQuestions.map((subQuestion, index) => {
                    if (index === action.subQuestionIdx) {
                        return {
                            ...subQuestion,
                            answer: updatedAnswer,
                            selections: updatedSelections
                        }
                    } else {
                        return subQuestion;
                    }
                })
            };
        }
        case CHECK_SELECTION: {

            const updatedAnswer = state.subQuestions[action.subQuestionIdx].answer
            updatedAnswer.has(action.selectionId) ? updatedAnswer.delete(action.selectionId) : updatedAnswer.add(action.selectionId);
               
            return {
                ...state,
                subQuestions: state.subQuestions.map((subQuestion, index) => {
                    if (index === action.subQuestionIdx) {
                        return {
                            ...subQuestion,
                            answer: updatedAnswer
                        }
                    } else {
                        return subQuestion;
                    }
                })
            };
        }
        case UPDATE_SUBTITLE: {
            return {
                ...state,
                subQuestions: state.subQuestions.map((subQuestion, index) => {
                    return index === action.subQuestionIdx ? { ...subQuestion, subtilte: action.text } : subQuestion
                })
            };
        }
        case UPDATE_SELECTION: {
            const updatedSelections = state.subQuestions[action.subQuestionIdx].selections.map((selection, index) => {
                return action.selectionIdx === index ? {...selection, text: action.text} : selection
            })
            return {
                ...state,
                subQuestions: state.subQuestions.map((subQuestion, index) => {
                    if (index === action.subQuestionIdx) {
                        return {
                            ...subQuestion,
                            selections: updatedSelections
                        }
                    } else {
                        return subQuestion;
                    }
                })
            };
        }
        default:
            return state;
    }
}
