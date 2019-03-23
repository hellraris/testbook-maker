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

});

class Testbook extends Component {

    constructor(props) {
        super(props)

        this.state = {
            openModal: false,
            questions: [],
            bookId: '5c9529267da488423859b82d'
        }

    }

    componentDidMount() {
        this.getQuestisonList()
    }

    getQuestisonList = async () => {
        await axios({
            method: 'get',
            url: '/api/questions/list/' + this.state.bookId
        }).then(res => this.setState({ questions: res.data.questions }))
            .catch(err => console.log(err));
    }

    refreshQuestions = () => {
        this.getQuestisonList()
    }

    handleModal = () => {
        this.setState({
            openModal: !this.state.openModal
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <QuestionModal
                    openModal={this.state.openModal}
                    bookTilte={this.state.bookTilte}
                    handleModal={this.handleModal}
                    refreshQuestions={this.refreshQuestions}>
                </QuestionModal>
                <div>
                    <Button onClick={this.handleModal}>modal</Button>
                </div>
                <div>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Part</TableCell>
                                <TableCell>Tag</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        {this.state.questions.map((c, index) => {
                            return <TableRow key={index}>
                                <TableCell>{c.info.title}</TableCell>
                                <TableCell>{c.info.part}</TableCell>
                                <TableCell>
                                    {c.info.tagList.map((tag, index)=>{
                                        return  <Chip key={index} label={tag} />
                                    })}
                                </TableCell>
                                <TableCell>
                                    <Button>EDIT</Button>
                                    <Button>DELETE</Button>
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