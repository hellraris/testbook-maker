import React, { Component } from 'react';

class TestComplete extends Component {

    constructor(props) {
        super(props);
        
        const {result} = this.props.location.state;
        console.log(result.score);
        console.log(result.failQuestions);

    }

    render() {
        return (
            <div>
                complete
            </div>
        );
    }
}

export default TestComplete;