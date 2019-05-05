const ADD_SCRIPT = 'script/ADD_SCRIPT';
const DELETE_SCRIPT = 'script/DELETE_SCRIPT';
const UPDATE_SCRIPT = 'script/UPDATE_SCRIPT';
const UPDATE_SUBTITLE = 'script/UPDATE_SUBTITLE';

export const addScript = () => ({ type: ADD_SCRIPT });
export const deleteScript = (scriptIdx) => ({ type: DELETE_SCRIPT, scriptIdx });
export const updateScript = (scriptIdx, text) => ({ type: UPDATE_SCRIPT, scriptIdx, text });
export const updateSubtitle = (scriptIdx, text) => ({ type: UPDATE_SUBTITLE, scriptIdx, text });

const initialState = {
    scripts: []
};

export default function script (state = initialState, action) {
    switch (action.type) {
        case ADD_SCRIPT:
            return {
                ...state,
                scripts: state.scripts.concat({ subtilte: '', contents: '' })
            };
        case DELETE_SCRIPT:
            return {
                ...state,
                scripts: state.scripts.filter((_, index) => index !== action.scriptIdx)
            };
        case UPDATE_SCRIPT:
            return {
                ...state,
                scripts: state.scripts.map((script, index) => {
                    return index === action.scriptIdx ? { ...script, contents: action.text } : script
                })
            };
        case UPDATE_SUBTITLE:
            return {
                ...state,
                scripts: state.scripts.map((script, index) => {
                    return index === action.scriptIdx ? { ...script, subtilte: action.text } : script
                })
            };
        default:
            return state;
    }
}