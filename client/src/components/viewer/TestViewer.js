import React, { Component } from 'react';
import axios from 'axios';

class TestViewer extends Component {

    constructor (props) {
        super(props);
    }

    componentDidMount() {
        this.getTestData()
    }

    getTestData = () => {
        const testId = this.props.match.params.id;

        axios({
            method: 'get',
            url: '/api/test/'+testId
        }).then(res => {
            console.log(res.data);
        })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                test
            </div>
        );
    }
}

export default TestViewer;