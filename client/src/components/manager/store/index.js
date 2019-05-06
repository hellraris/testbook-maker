import { combineReducers } from 'redux';
import script from './parts/script';
import question from './parts/question';
import explanation from './parts/explanation';
import audio from './parts/audio';

export default combineReducers({
    script, question, explanation, audio
});