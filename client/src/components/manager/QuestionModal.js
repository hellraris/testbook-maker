import React, { Component } from 'react';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        outline: 'none',
        height: '85%',
        width: '40%',
        minWidth: '480px'
    },
    scrollPage: {
        overflowY: 'scroll',
        overflowX: 'hidden',
        padding: theme.spacing.unit * 3,
        height: '100%'
    },
    contents: {

    },
    questionPart: {
        padding: 10
    },
    scriptPart: {
        marginBottom: 10
    },
    selection: {
        display: 'flex'
    },
    footer: {
        padding: theme.spacing.unit * 2,
        display: 'flex',
        margin: 'auto auto 0 auto'
    }
});

const modalStyle = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: 5
}

class QuestionModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: null,
            markingSheet: null,
            nowQuestionIdx: 0,
            complete: false,
            results: null,
            correctCnt: 0,
            incorrectCnt: 0
        }
    }

    componentDidMount() {
        this.getQuestions();
    }


    handleModalClose = () => {
        this.resetBuilder();
        this.props.closeModal();
    }

    render() {

        if (this.state.questions === null) {
            return <Typography>please wait</Typography>
        }

        return (
            <Modal open={this.props.openModal}>
                {this.state.complete ? this.resultViewer() : this.questionViewer()}
            </Modal>
        );
    }

    questionViewer = () => {
        const { classes } = this.props;
        const { scripts, subQuestions } = this.state.questions[this.state.nowQuestionIdx];

        return (
            <div style={modalStyle} className={classes.paper}>
                <div style={{ backgroundColor: '#fbbb4b', height: 13 }}></div>
                <div className={classes.scrollPage}>
                    <div className={classes.contents}>
                        <div>
                            {scripts ? scripts.map((script, index) => {
                                return (
                                    <div className={classes.scriptPart} key={index}>
                                        <div style={{ marginLeft: 15 }}>
                                            <Typography variant="subtitle1" gutterBottom>{script.subtilte}</Typography>
                                        </div>
                                        <div style={{ marginLeft: 10, padding: 10, border: '1px dashed grey', borderRadius: 5 }}>
                                            <Typography>{script.contents}</Typography>
                                        </div>
                                    </div>
                                )
                            })
                                : {}}
                        </div>
                        <div>
                            {subQuestions ? subQuestions.map((subQuestion, subQuestionIdx) => {
                                return (
                                    <div className={classes.questionPart} key={subQuestionIdx}>
                                        <div style={{ marginLeft: 15 }}>
                                            <Typography variant="subtitle1">Q{subQuestionIdx + 1}.{subQuestion.subtilte}</Typography>
                                        </div>
                                        <Divider variant="middle" />
                                        <div style={{ marginLeft: 15 }} >
                                            {subQuestion.selections.map((selection, selectionIdx) => {
                                                return (
                                                    <div className={classes.selection}
                                                        key={selectionIdx}
                                                    >
                                                        <Checkbox
                                                            checked={this.state.markingSheet[subQuestion.subQuestionNo].has(selection.id)}
                                                            onChange={() => this.handleMarking(subQuestion.selectionType, subQuestion.subQuestionNo, selection.id, subQuestion.answer.length)}
                                                        />
                                                        <div onClick={() => this.handleMarking(subQuestion.selectionType, subQuestion.subQuestionNo, selection.id, subQuestion.answer.length)}>
                                                            <Typography style={{ marginTop: 14 }}>
                                                                {selection.text}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })
                                : {}}
                        </div>
                    </div>
                </div>
                <div className={classes.footer}>
                    <div onClick={this.prevQuestion}>
                        <Button>prev</Button>
                    </div>
                    {
                        this.state.nowQuestionIdx === this.state.questions.length - 1 ?
                            <div onClick={() => this.checkComplteTest()}>
                                <Button>submit</Button>
                            </div> :
                            <div onClick={this.nextQuestion}>
                                <Button>next</Button>
                            </div>
                    }
                </div>
            </div>
        );
    }

    // resultViewer = () => {
    //     const { classes } = this.props;

    //     return (
    //         <div style={modalStyle} className={classes.paper}>
    //             <div style={{ backgroundColor: '#00b07b', height: 13 }}></div>
    //             <div className={classes.scrollPage}>
    //                 <div className={classes.contents}>
    //                     <div>
    //                         {this.state.results ?
    //                             <div>
    //                                 <div>
    //                                     correct: {this.state.correctCnt} Incorrect: {this.state.incorrectCnt}
    //                                 </div>
    //                                 {this.state.results.map((result, index) => {
    //                                     return (
    //                                         <ExpansionPanel defaultExpanded>
    //                                             <ExpansionPanelSummary
    //                                                 expandIcon={<ExpandMoreIcon />}
    //                                                 aria-controls="panel1c-content"
    //                                                 id="panel1c-header"
    //                                             >
    //                                                 <div className={classes.column}>
    //                                                     <Typography className={classes.heading}>Location</Typography>
    //                                                 </div>
    //                                                 <div className={classes.column}>
    //                                                     <Typography className={classes.secondaryHeading}>Select trip destination</Typography>
    //                                                 </div>
    //                                             </ExpansionPanelSummary>
    //                                             <ExpansionPanelDetails className={classes.details}>
    //                                                 <div>
    //                                                     <Typography variant="caption">
    //                                                         Select your destination of choice
    //                                               <br />
    //                                                         <a href="#sub-labels-and-columns" className={classes.link}>
    //                                                             Learn more
    //                                               </a>
    //                                                     </Typography>
    //                                                 </div>
    //                                             </ExpansionPanelDetails>
    //                                             <Divider />
    //                                             <ExpansionPanelActions>
    //                                                 <Button size="small">Cancel</Button>
    //                                                 <Button size="small" color="primary">
    //                                                     Save
    //                                           </Button>
    //                                             </ExpansionPanelActions>
    //                                         </ExpansionPanel>
    //                                     )
    //                                 })}
    //                             </div>
    //                             : <Typography>please wait</Typography>
    //                         }
    //                     </div>
    //                 </div>
    //             </div>
    //             <div className={classes.footer}>
    //                 <Button>close</Button>
    //             </div>
    //         </div>
    //     )
    // }

    resultViewer = () => {
        const { classes } = this.props;

        return (
            <div style={modalStyle} className={classes.paper}>
                <div style={{ backgroundColor: '#00b07b', height: 13 }}></div>
                <div className={classes.scrollPage}>
                    <div className={classes.contents}>
                        <div>
                            {this.state.results ?
                                <div>
                                    <div>
                                        correct: {this.state.correctCnt} Incorrect: {this.state.incorrectCnt}
                                    </div>
                                    {this.state.results.map((result, index) => {
                                        return (
                                            <ListItem key={index}>
                                                <ListItemText
                                                    primary={"Q." + (result.subQuestionNo + 1)}
                                                    secondary={"Answer: " + (Number(result.answer) + 1) + "  YourMarking: " + (Number(result.marking) + 1)}
                                                />
                                            </ListItem>
                                        )
                                    })}
                                </div>
                                : <Typography>please wait</Typography>
                            }
                        </div>
                    </div>
                </div>
                <div className={classes.footer}>
                    <Button>close</Button>
                </div>
            </div>
        )
    }

    // functions

    getQuestions = () => {

        const bookId = '99999999';

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
        if (result) {
            this.submitTest();
        }
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

    setResult = () => {

        const results = [];
        let correctCnt = 0;
        let incorrectCnt = 0;

        this.state.questions.forEach((question, questionIdx) => {
            question.subQuestions.forEach((subQuestion) => {
                let isAnswer = true;
                if (this.state.markingSheet[subQuestion.subQuestionNo].size === subQuestion.answer.length) {
                    this.state.markingSheet[subQuestion.subQuestionNo].forEach((value) => {
                        if (!subQuestion.answer.includes(value)) {
                            isAnswer = false;
                        }
                    })
                } else {
                    isAnswer = false;
                }

                const answerIdx = subQuestion.answer;
                const markingIdx = [...this.state.markingSheet[subQuestion.subQuestionNo]];

                results.push({ questionIdx: questionIdx, subQuestionNo: subQuestion.subQuestionNo, answer: answerIdx.sort(), marking: markingIdx.sort(), isAnswer: isAnswer })
            })
        })

        return results;
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
        const results = this.setResult();
        let correctCnt = 0;
        let incorrectCnt = 0;

        results.forEach((data) => {
            data.isAnswer ? correctCnt = correctCnt + 1 : incorrectCnt = incorrectCnt + 1
        })


        this.setState({
            ...this.state,
            results: results,
            correctCnt: correctCnt,
            incorrectCnt: incorrectCnt,
            complete: true
        })
    }

}

export default withStyles(styles)(QuestionModal);