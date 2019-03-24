import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';
import AddCircle from '@material-ui/icons/AddCircle';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    selection: {
        width: theme.spacing.unit * 50
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
    icon: {
        margin: theme.spacing.unit * 2,
        "&:hover": {
            cursor: 'pointer'
        },
        '&:active': {
            transform: 'translateY(3px)'
        }
    },
});

class InfoPage extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <div>
                    <div>
                        <TextField
                            name='title'
                            label="Title"
                            margin="normal"
                            className={classes.selection}
                            value={this.props.title}
                            onChange={this.props.handleTextChange}
                        />
                    </div><br />
                    <div>
                        <TextField
                            name="part"
                            label="Part"
                            margin="normal"
                            multiline
                            className={classes.selection}
                            value={this.props.part}
                            onChange={this.props.handleTextChange}
                        />
                    </div><br />
                    <div>
                        <TextField
                            name="tag"
                            label="Tag"
                            margin="normal"
                            multiline
                            value={this.props.tag}
                            onChange={this.props.handleTextChange}
                        />
                        <Icon color="action">
                            <AddCircle className={classes.icon} onClick={() => this.props.addTag(this.props.tag)} />
                        </Icon>
                    </div>
                    <br />
                    <div>
                        {this.props.tagList.map((c, index) => {
                            return (
                                <Chip
                                    key={index}
                                    label={c}
                                    onDelete={() => this.props.deleteTag(index)}
                                    className={classes.chip}
                                />
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default withStyles(styles)(InfoPage);