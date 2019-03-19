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
            question: [{info: {
                title: 'aa',
                part: 'bb'
            }}]
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
                    {this.state.question.map((c) => {
                        return <TableRow>
                                <TableCell>{c.info.title}</TableCell>
                                <TableCell>{c.info.part}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                    })}
                    <TableBody>
                        <TableRow>
                            <TableCell>test-name</TableCell>
                            <TableCell>part</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default Testbook;