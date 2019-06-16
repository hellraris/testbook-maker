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
export const deleteSelection = (subQuestionIdx, selectionIdx) => ({ type: DELETE_SELECTION, subQuestionIdx, selectionIdx });
export const checkSelection = (subQuestionIdx, selectionIdx) => ({ type: CHECK_SELECTION, subQuestionIdx, selectionIdx });
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
                subQuestions: state.subQuestions.concat({ subtilte: '', selections: []})
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
                            selections: subQuestion.selections.concat({text: '', answer: false})
                        }
                    } else {
                        return subQuestion;
                    }
                })
            };
        case DELETE_SELECTION: {
            const updatedSelections = state.subQuestions[action.subQuestionIdx].selections.filter((_, index) => index !== action.selectionIdx);
    
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
        case CHECK_SELECTION: {

            const newSelections = state.subQuestions[action.subQuestionIdx].selections.map((selection, index)=> {
                if (index === action.selectionIdx) {
                    return {
                        ...selection,
                        answer: !selection.answer
                    }
                } else {
                    return selection;
                }
            });
            
            return {
                ...state,
                subQuestions: state.subQuestions.map((subQuestion, index) => {
                    if (index === action.subQuestionIdx) {
                        return {
                            ...subQuestion,
                            selections: newSelections
                        }

                    }
                    return subQuestion;
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
