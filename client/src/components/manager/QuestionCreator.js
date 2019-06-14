import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';
import Script from './parts/Script'
import Audio from './parts/Audio'
import Question from './parts/Question'
import Explanation from './parts/Explanation'
import Button from '@material-ui/core/Button'

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    body: {
        maxWidth: '480px',
        margin: '5px'
    }
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

    addQuestion = () => {
        let requestData = {}
        let questionData = this.props.questionData;
        questionData.info = {};
        questionData.info.title = "test";
        requestData.version = "1";
        requestData.contents = JSON.stringify(questionData);
        const testbookId = 99999999;

        axios({
            method: 'post',
            url: '/api/book/' + testbookId + '/question/add',
            data: requestData
        }).then(res => {
            console.log(res);
            /*
            if (res.data == "100" && res.status === 200) {
                this.props.history.push("/test");
            }
            */
        }).catch(err => console.log(err));
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.body}>
                <div>
                    <Script />
                    <Audio />
                    <Question />
                    <Explanation />
                </div>
                <div>
                    <Button onClick={() => this.props.history.push("/test")}>CANCEL</Button>
                    <Button onClick={() => this.addQuestion()}>Add</Button>
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