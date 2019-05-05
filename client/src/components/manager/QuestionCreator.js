import React, { Component } from 'react';
import Script from './parts/Script'
import Audio from './parts/Audio'
import Question from './parts/Question'
import Explanation from './parts/Explanation'

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

})

class QuestionCreator extends Component {

    constructor (props) {
        super (props);
        
        this.state = {
            questions: [],
            scripts: [],
            audioList: [],
            explanations: []
        }
    }



    render() {
        return (
            <div>
                <Script scripts={this.state.scripts}></Script>
                <Audio audioList={this.state.audioList}></Audio>
                <Question questions={this.state.questions}></Question>
                <Explanation explanations={this.state.explanations}></Explanation>
            </div>
        );
    }
}

export default withStyles(styles)(QuestionCreator);