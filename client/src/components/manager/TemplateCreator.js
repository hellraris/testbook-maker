import React, { Component } from 'react';
import Script from './parts/Script'
import Question from './parts/Question'

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

})

class TemplateCreator extends Component {
    render() {
        return (
            <div>
                <Script></Script>
                <Question></Question>
            </div>
        );
    }
}

export default withStyles(styles)(TemplateCreator);