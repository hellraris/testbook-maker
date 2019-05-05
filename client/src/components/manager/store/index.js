import { combineReducers } from 'redux';
import script from './parts/script';
import question from './parts/question';

export default combineReducers({
    script, question
});