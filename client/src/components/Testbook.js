import React, { Component } from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import QuestionModal from './QuestionModal';

class Testbook extends Component {

    constructor(props) {
        super(props)

        this.state = {
            question: []
        }

    }

    refreshQuestions = () => {
        axios({
            method: 'get',
            url: '/api/question'
        }).then(res => this.setState({ question: res.data }))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <QuestionModal refreshQuestions={this.refreshQuestions}></QuestionModal>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Part</TableCell>
                            <TableCell>Tag</TableCell>
                        </TableRow>
                    </TableBody>
                    {this.state.question.map((c) => {
                        return <TableRow>
                            <TableCell>{c.info.title}</TableCell>
                            <TableCell>{c.info.part}</TableCell>
                            <TableCell>{c.info.tag}</TableCell>
                        </TableRow>
                    })}
                </Table>
            </div>
        );
    }
}

export default Testbook;