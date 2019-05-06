const UPDATE_FILE = 'audio/UPDATE_FILE';
const DELETE_FILE = 'audio/DELETE_FILE'

export const updateFile = (file) => ({ type: UPDATE_FILE, file });
export const deleteFile = () => ({ type: DELETE_FILE });

const initialState = {
    audioList: []
}

export default function audio (state = initialState, action) {
    switch (action.type) {
        case UPDATE_FILE: {
            const tempAudioList = [{ fileName: action.file.name, file: action.file }];

            return {
                ...state,
                audioList: tempAudioList
            }
        }
        case DELETE_FILE: {
            const tempAudioList = [];

            return {
                ...state,
                audioList: tempAudioList
            }
        }
        default:
            return state;
    }

}