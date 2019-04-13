import React, { Component } from 'react';
import Script from './parts/script'
import Selection from './parts/selection'

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

})

class TemplateCreator extends Component {
    render() {
        return (
            <div>
                <Script></Script>
                <Selection></Selection>
            </div>
        );
    }
}

export default withStyles(styles)(TemplateCreator);