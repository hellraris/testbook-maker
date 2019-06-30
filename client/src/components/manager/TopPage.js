import React, { Component } from 'react';
import { Route, NavLink, BrowserRouter } from 'react-router-dom';

import BookList from './BookList';
import TestViewer from './TestViewer';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

class TopPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
        }
    }

    componentDidMount() {

    }

    render() {
        const { classes } = this.props;

        return (
            <BrowserRouter>
                <Route  path='/booklist' component={BookList} />
                <Route  path='/test' component={TestViewer} />
            </BrowserRouter>
        );
    }

    handleChange = (event, newValue) => {
        console.log(newValue);
        this.setState({
            ...this.state,
            menu: newValue
        })
    }
}

const styles = theme => ({
    header: {
        display:'flex'
    },
    headerMenu: {
        textDecoration: 'none',
        padding: 10
    }

});



export default withStyles(styles)(TopPage);