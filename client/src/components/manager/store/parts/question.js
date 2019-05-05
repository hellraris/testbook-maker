const ADD_QUESTION = 'question/ADD_QUESTION';
const DELETE_QUESITON = 'question/DELETE_QUESTION';
const ADD_SELECTION = 'question/ADD_SELECTION';
const DELETE_SELECTION = 'question/DELETE_SELECTION';
const CHECK_SELECTION = 'qusetion/CHECK_SELECTION';
const UNCHECK_SELECTION = 'question/UNCHECK_SELECTION';
const UPDATE_SUBTITLE = 'question/UPDATE_SUBTILTE';

export const addQuestion = () => ({ type: ADD_QUESTION });
export const deleteQuestion = (questionIdx) => ({ type: DELETE_QUESITON, questionIdx });
export const addSelection = (questionIdx, selectionIdx) => ({ type: ADD_SELECTION, questionIdx, selectionIdx });
export const deleteSelection = (questionIdx, selectionIdx) => ({ type: DELETE_SELECTION, questionIdx, selectionIdx });
export const checkSelection = (questionIdx, selectionIdx) => ({ type: CHECK_SELECTION, questionIdx, selectionIdx });
export const uncheckSelection = (questionIdx, selectionIdx) => ({ type: UNCHECK_SELECTION, questionIdx, selectionIdx });
export const updateSubtitle = () => ({ type: UPDATE_SUBTITLE });

const initialState = {
    questions: []
};

export default function qusetion(state = initialState, action) {
    switch (action.type) {
        case ADD_QUESTION:
            return {
                ...state,
                questions: state.questions.concat({ subtilte: '', selections: [], answers: [] })
            };
        case DELETE_QUESITON:
            return {
                ...state,
                questions: state.questions.filter((_, index) => index !== action.questionIdx)
            };
        case ADD_SELECTION:
            return {
                ...state,
                questions: state.questions.map((question, index) => {
                    if (index === action.questionIdx) {
                        return {
                            ...question,
                            selections: question.selections.concat('')
                        }
                    } else {
                        return question;
                    }
                })
            };
        case DELETE_SELECTION: {
            const updatedSelections = state.questions[action.questionIdx].selections.filter((_, index) => index !== action.selectionIdx);
            const updatedAnswers = state.questions[action.questionIdx].answers.filter((answer) => answer !== action.selectionIdx);

            return {
                ...state,
                questions: state.questions.map((question, index) => {
                    if (index === action.questionIdx) {
                        return {
                            ...question,
                            answers: updatedAnswers,
                            selections: updatedSelections
                        }
                    } else {
                        return question;
                    }
                })
            };
        }
        case CHECK_SELECTION: {
            const updatedAnswers = state.questions[action.questionIdx].answers.filter((answer) => {
                return answer !== action.selectionIdx
            });

            return {
                questions: state.questions.map((question, index) => {
                    if (index === action.questionIdx) {
                        return {
                            ...question,
                            answers: updatedAnswers
                        }
                    } else {
                        return question;
                    }
                })
            };
        }
        case UNCHECK_SELECTION: {
            const updatedAnswers = state.questions[action.questionIdx].answers.concat(action.selectionIdx);

            return {
                questions: state.questions.map((question, index) => {
                    if (index === action.questionIdx) {
                        return {
                            ...question,
                            answers: updatedAnswers
                        }
                    } else {
                        return question;
                    }
                })
            };
        }
        default:
            return state;
    }
}
