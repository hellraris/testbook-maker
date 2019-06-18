import React, { Component } from 'react';
import { connect } from 'react-redux';

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

const mapStateToProps = state => ({
    scripts: state.script.scripts,
    files: state.audio.audioList,
    subQuestions: state.subQuestion.subQuestions,
    explanations: state.explanation.explanations

});

class QuestionCreator extends Component {

    constructor(props) {
        super(props);
    }

    addQuestion = () => {
        let requestData = {
            scripts: JSON.stringify(this.props.scripts),
            files: JSON.stringify(this.props.files),
            subQuestions: JSON.stringify(this.props.subQuestions),
            explanations: JSON.stringify(this.props.explanations),
        }
        requestData.info = {};
        requestData.info.title = "test";
        requestData.version = "1";
        const testbookId = 99999999;

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
                    <Script />
                    <Audio />
                    <SubQuestion />
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