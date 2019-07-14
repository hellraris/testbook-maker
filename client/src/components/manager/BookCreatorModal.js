import React, { Component } from 'react';

import axios from 'axios';

import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import AddCircle from '@material-ui/icons/AddCircle';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';

class BookCreatorModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            tag: '',
            description: '',
            tagList: []
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.wrap}>
                <div style={{ backgroundColor: '#00b07b', height: 7 }}></div>
                <div className={classes.body}>
                    <Typography style={{ marginTop: 10 }} variant="h4">Create Book</Typography>
                    <div className={classes.contents}>
                        <div>
                            <TextField
                                name='title'
                                label="Title"
                                margin="normal"
                                value={this.state.title}
                                onChange={this.handleTextChange}
                            />
                        </div>
                        <div>
                            <TextField
                                name='description'
                                label="Description"
                                margin="normal"
                                value={this.state.description}
                                onChange={this.handleTextChange}
                            />
                        </div>
                        <div className={classes.tag}>
                            <TextField
                                className={classes.tagText}
                                name="tag"
                                label="Tag"
                                margin="normal"
                                multiline
                                value={this.state.tag}
                                onChange={this.handleTextChange}
                            />
                            <Icon className={classes.tagIcon} color="action">
                                <AddCircle onClick={() => this.addInfoTag(this.state.tag)} />
                            </Icon>
                        </div>
                        <div>
                            {this.state.tagList.map((c, index) => {
                                return (
                                    <Chip
                                        key={index}
                                        label={c}
                                        onDelete={() => this.deleteInfoTag(index)}
                                        className={classes.chip}
                                    />
                                )
                            })
                            }
                        </div>
                    </div>
                    <div className={classes.footer}>
                        <Button onClick={() => this.createBook()}>Create</Button>
                        <Button onClick={() => this.props.closeModal()}>CLOSE</Button>
                    </div>
                </div>
            </div>
        );
    }

    // functions

    addInfoTag = (tag) => {

        if (tag === null || tag === '') {
            return;
        }

        this.setState({
            ...this.state,
            tag: '',
            tagList: this.state.tagList.concat(tag)
        })
    }

    deleteInfoTag = (index) => {
        this.setState({
            ...this.state,
            tagList: this.state.tagList.filter((_, i) => i !== index)
        })
    }

    handleTextChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }

    createBook = () => {

        const requestData = {
            userId: this.props.userId,
            title: this.state.title,
            description: this.state.description,
            tag: this.state.tagList,
        }

        axios({
            method: 'post',
            url: '/api/book',
            data: requestData
        }).then(res => {
            this.props.closeModal()
        }).catch(err => console.log(err));
    }

}

const styles = theme => ({
    wrap: {

    },
    body: {
        padding: '0px 20px'
    },
    contents: {
        marginLeft: 10
    },
    tag: {
        display: 'flex',
        alignItems: 'center'
    },
    footer: {
        display: 'flex',
        marginTop: '50px',
        justifyContent: 'center'
    },
});

export default withStyles(styles)(BookCreatorModal);