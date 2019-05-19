import React, { Component } from 'react';
import { connect } from 'react-redux';

import Script from './parts/Script'
import Audio from './parts/Audio'
import Question from './parts/Question'
import Explanation from './parts/Explanation'

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

})

const mapStateToProps = state => ({
    questionData: {
        scripts: state.script.scripts,
        audioList: state.audio.audioList,
        questions: state.question.questions,
        explanations: state.explanation.explanations
    }
});

class QuestionCreator extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>
                <Script />
                <Audio />
                <Question />
                <Explanation />
                </div>
                <div>
                    
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(
    connect(
        mapStateToProps
    )(QuestionCreator)
);