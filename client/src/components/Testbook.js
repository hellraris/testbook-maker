import React, { Component } from 'react';
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

    addQuestion = (value) => {
        this.state.question.push(value);
    }

    render() {
        return (
            <div>
                <QuestionModal addQuestion={this.addQuestion}></QuestionModal>
                <Table>
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