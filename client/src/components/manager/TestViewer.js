import React, { Component } from 'react';

import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

class TestViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: null,
            markingSheet: null,
            nowQuestionIdx: 0,
        }
    }

    componentDidMount() {
        this.getQuestions()
    }

    render() {
        if (this.state.questions === null) {
            return <Typography>please wait</Typography>
        }

        const { scripts, subQuestions } = this.state.questions[this.state.nowQuestionIdx];

        const { classes } = this.props;

        return (
            <div className={classes.wrap}>
                <div className={classes.body}>
                    <div className={classes.side}>
                        test
                    </div>
                    <div className={classes.viewer}>
                        <div>
                            <div>
                                {scripts ? scripts.map((script, index) => {
                                    return (
                                        <Paper key={index}>
                                            <div>
                                                <Typography>{script.subtilte}</Typography>
                                            </div>
                                            <div>
                                                <Typography>{script.contents}</Typography>
                                            </div>
                                        </Paper>
                                    )
                                })
                                    : {}}
                            </div>
                            <div>
                                {subQuestions ? subQuestions.map((subQuestion, subQuestionIdx) => {
                                    return (
                                        <Paper key={subQuestionIdx}>
                                            <div>
                                                <Typography>{subQuestion.subtilte}</Typography>
                                            </div>
                                            <div>
                                                {subQuestion.selections.map((selection, selectionIdx) => {
                                                    return (
                                                        <div
                                                            key={selectionIdx}
                                                            onClick={() => this.handleMarking(subQuestion.selectionType, subQuestion.subQuestionNo, selection.id, subQuestion.answer.length)}
                                                        >
                                                            <Checkbox
                                                                style={{ marginBottom: 10 }}
                                                                checked={this.state.markingSheet[subQuestion.subQuestionNo].has(selection.id)}
                                                                onClick={() => this.handleMarking(subQuestion.selectionType, subQuestion.subQuestionNo, selection.id, subQuestion.answer.length)}
                                                            />
                                                            <Typography style={{ marginTop: 5 }}>{selection.text}</Typography>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </Paper>
                                    )
                                })
                                    : {}}
                            </div>
                        </div>
                        <div>
                            <div onClick={this.prevQuestion}>
                                <Typography>prev</Typography>
                            </div>
                            {
                                this.state.nowQuestionIdx === this.state.questions.length - 1 ?
                                    <div onClick={() => this.checkComplteTest()}>
                                        <Typography>submit</Typography>
                                    </div> :
                                    <div onClick={this.nextQuestion}>
                                        <Typography>next</Typography>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // functions

    getQuestions = () => {

        const bookId = this.props.location.state.bookId;

        axios({
            method: 'get',
            url: '/api/testbook/' + bookId
        }).then(res => {
            console.log(res.data);
            this.setTestingState(res.data);
        })
            .catch(err => console.log(err));
    }

    goToQuestion = (index) => {

        let targetQuestionIdx = -1;

        this.state.questions.forEach((question, questionIdx) => {
            question.subQuestions.forEach((subQuestion) => {
                if (subQuestion.subQuestionNo === index) {
                    targetQuestionIdx = questionIdx;
                }
            })
        })

        this.setState({
            ...this.state,
            modalVisible: !this.state.modalVisible,
            nowQuestionIdx: targetQuestionIdx
        })
    }

    checkComplteTest = () => {
        let result = true
        this.state.markingSheet.forEach((data) => {
            if (data.size === 0) {
                result = false;
                return;
            }
        })
    }

    prevQuestion = (event) => {
        event.stopPropagation();
        if (this.state.nowQuestionIdx > 0) {
            let newQuestionIdx = this.state.nowQuestionIdx - 1;
            this.setState({
                ...this.state,
                nowQuestionIdx: newQuestionIdx
            })
        }
    }

    nextQuestion = (event) => {
        event.stopPropagation();
        if (this.state.nowQuestionIdx < this.state.questions.length - 1) {
            let newQuestionIdx = this.state.nowQuestionIdx + 1;
            this.setState({
                ...this.state,
                nowQuestionIdx: newQuestionIdx
            })
        }
    }

    // 테스트 준비 상태 세팅
    setTestingState = async (questions) => {

        if (questions.length === 0) return;

        let subQuestionNo = 0;
        // 서브퀘스트에 questionNo부여
        const newQuestions = questions.map((question) => {
            const newSubQuestion = question.subQuestions.map((subQuestion) => {
                const newSubQuestion = {
                    ...subQuestion,
                    subQuestionNo: subQuestionNo
                }
                subQuestionNo = subQuestionNo + 1;
                return newSubQuestion;
            });
            const newQuestion = {
                ...question,
                subQuestions: newSubQuestion
            }

            return newQuestion;
        });

        // 서브퀘스트 수만큼 답안시트 작성
        const newMarkingSheet = []
        for (let index = 0; index < subQuestionNo; index++) {
            newMarkingSheet.push(new Set());
        }

        await this.setState({
            ...this.state,
            questions: newQuestions,
            markingSheet: newMarkingSheet,
            updated: true
        });
    }

    handleMarking = (selectionType, subQuestionNo, selectionId, answerCnt) => {

        let newMarkingSheet = this.state.markingSheet;

        switch (selectionType) {
            // 답선택수 제한 없음
            case 0: {

                newMarkingSheet[subQuestionNo].has(selectionId) ? newMarkingSheet[subQuestionNo].delete(selectionId) : newMarkingSheet[subQuestionNo].add(selectionId);

                this.setState({
                    ...this.state,
                    markingSheet: newMarkingSheet
                })
                return
            }
            // 1개의 답선택가능
            case 1: {
                if (newMarkingSheet[subQuestionNo].has(selectionId)) {
                    newMarkingSheet[subQuestionNo].clear();
                } else {
                    newMarkingSheet[subQuestionNo].clear();
                    newMarkingSheet[subQuestionNo].add(selectionId);
                }

                this.setState({
                    ...this.state,
                    markingSheet: newMarkingSheet
                })
                return
            }
            // 정답수만큼 답선택가능
            case 2: {
                if (newMarkingSheet[subQuestionNo].has(selectionId)) {
                    newMarkingSheet[subQuestionNo].delete(selectionId)
                } else {
                    if (newMarkingSheet[subQuestionNo].size >= answerCnt) {
                        return
                    }
                    newMarkingSheet[subQuestionNo].add(selectionId);
                }

                this.setState({
                    ...this.state,
                    markingSheet: newMarkingSheet
                })
                return
            }
            default:
                return
        }
    }


    confirmMarking = (subQuestionNo, selectionId) => {
        return this.state.markingSheet[subQuestionNo].has(selectionId);
    }

    submitTest = () => {

        this.setState({
            ...this.state,
            complete: true
        })
    }

    // function End
}

const styles = theme => ({
    wrap: {
        display: 'flex',
        height: '100%'
    },
    body: {
        display: 'flex',
        flex: '0 1 1280px',
        margin: '0 auto',
        height: '100%',
        padding: 10,
        backgroundColor: 'steelblue',
    },
    viewer: {
        flex: '1 1 1000px',
        backgroundColor: 'white',
        overflowY: 'scroll',
        overflowX: 'hidden',
        
    },
    side: {
        flex: '0 1 200px',
        overflowY: 'scroll',
        overflowX: 'hidden',
    }
});

export default withStyles(styles)(TestViewer);