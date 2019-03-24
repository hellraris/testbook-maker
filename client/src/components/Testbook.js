import React, { Component } from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import QuestionModal from './QuestionModal';

const styles = theme => ({
    questionTable: {
        "& td": {
            textAlign: 'center'
        }
    }
});

class Testbook extends Component {

    constructor(props) {
        super(props)

        this.state = {
            openModal: false,
            questions: [],
            bookId: '5c95e5dad06b5943d4904dc0',
            qusetionId: ''
        }

    }

    componentDidMount() {
        this.getQuestisonList()
    }

    getQuestisonList = async () => {
        await axios({
            method: 'get',
            url: '/api/book/' + this.state.bookId + '/question/list'
        }).then(res => this.setState({ questions: res.data }))
            .catch(err => console.log(err));
    }

    refreshQuestions = () => {
        this.getQuestisonList()
    }

    closeModal = () => {
        this.setState({
            ...this.state,
            openModal: false,
            qusetionId: ''
        })
    }

    openAddModal = () => {
        this.setState({
            ...this.state,
            openModal: true,
            qusetionId: ''
        })
    }

    openEditModal = (id) => {
        this.setState({
            ...this.state,
            openModal: true,
            qusetionId: id
        })
    }

    deleteQuestion = (questionId) => {
        axios({
            method: 'delete',
            url: '/api/book/' + this.state.bookId + '/question/' + questionId,
        }).
            then(this.refreshQuestions())
            .catch(err => console.log(err));
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <QuestionModal
                    openModal={this.state.openModal}
                    bookId={this.state.bookId}
                    questionId={this.state.qusetionId}
                    closeModal={this.closeModal}
                    refreshQuestions={this.refreshQuestions}>
                </QuestionModal>
                <div>
                    <Button onClick={this.openAddModal}>ADD</Button>
                </div>
                <div>
                    <Table className={classes.questionTable}>
                        <TableBody>
                            <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Part</TableCell>
                                <TableCell>Tag</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            {this.state.questions.map((c, index) => {
                                return <TableRow key={index} className={classes.questionLine}>
                                    <TableCell >{index + 1}</TableCell>
                                    <TableCell >{c.info.title}</TableCell>
                                    <TableCell >{c.info.part}</TableCell>
                                    <TableCell>
                                        {c.info.tagList.map((tag, index) => {
                                            return <Chip key={index} label={tag} />
                                        })}
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => this.openEditModal(c._id)} >EDIT</Button>
                                        <Button onClick={() => this.deleteQuestion(c._id)} >DELETE</Button>
                                    </TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Testbook);