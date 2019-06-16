import { combineReducers } from 'redux';
import script from './parts/script';
import subQuestion from './parts/subQuestion';
import explanation from './parts/explanation';
import audio from './parts/audio';

export default combineReducers({
    script, subQuestion, explanation, audio
});