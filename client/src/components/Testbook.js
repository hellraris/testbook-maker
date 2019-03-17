import React, { Component } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import QuestionAdd from './QuestionAdd';

class Testbook extends Component {
    render() {
        return (
            <div>
                <QuestionAdd></QuestionAdd>
                <TableRow>
                    <TableCell>test-name</TableCell>
                    <TableCell>part</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </div>
        );
    }
}

export default Testbook;