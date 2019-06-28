import React, { Component } from 'react';

import axios from 'axios';
import Script from './parts/Script'
import Audio from './parts/Audio'
import SubQuestion from './parts/SubQuestion'
import Explanation from './parts/Explanation'
import Button from '@material-ui/core/Button'

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    body: {
        maxWidth: '480px',
        margin: '5px'
    }
})

const questionData = {
    scripts: null,
    subQuestions: null,
    explanations: null
}


class QuestionCreator extends Component {

    constructor(props) {
        super(props);
    }

    updateScriptData= (data) => {
        questionData.scripts = data;
    }

    updateSubQuestionData= (data) => {
        questionData.subQuestions = data;
    }

    updateExplanationData= (data) => {
        questionData.explanations = data;
    }


    addQuestion = () => {
        console.log("requestData", questionData);
        let requestData = {
            scripts: JSON.stringify(questionData.scripts),
            files: JSON.stringify(questionData.files),
            subQuestions: JSON.stringify(questionData.subQuestions),
            explanations: JSON.stringify(questionData.explanations),
        }
        requestData.info = {};
        requestData.info.title = "test";
        requestData.version = "1";
        const testbookId = 99999999;
        console.log("requestDataJson", requestData);

        axios({
            method: 'post',
            url: '/api/book/' + testbookId + '/question/add',
            data: requestData
        }).then(res => {
            if (res.data === "100" && res.status === 200) {
                this.props.history.push("/test");
            }
            this.props.history.push("/test");

        }).catch(err => console.log(err));
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.body}>
                <div>
                    <Script updateScriptData={this.updateScriptData}/>
                    <Audio />
                    <SubQuestion updateSubQuestionData={this.updateSubQuestionData} />
                    <Explanation updateExplanationData={this.updateExplanationData} />
                </div>
                <div>
                    <Button onClick={() => this.props.history.push("/test")}>CANCEL</Button>
                    <Button onClick={() => this.addQuestion()}>Add</Button>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(QuestionCreator);