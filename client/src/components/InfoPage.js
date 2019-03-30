import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';
import AddCircle from '@material-ui/icons/AddCircle';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    selection: {
        width: theme.spacing.unit * 50
    },
    tag: {
        display: 'flex'
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
    tagText: {
        margin: 'auto 0',
    },
    tagIcon: {
        margin: 'auto 0',
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
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="part-simple">Part</InputLabel>
                            <Select
                                value={this.props.part}
                                onChange={this.props.handleTextChange}
                                inputProps={{
                                    name: 'part',
                                    id: 'part-simple',
                                }}
                            >
                                <MenuItem value="">
                                </MenuItem>
                                <MenuItem value={'Part5'}>Part2</MenuItem>
                            </Select>
                        </FormControl>
                    </div><br />
                    <div className={classes.tag}>
                        <TextField
                            className={classes.tagText} 
                            name="tag"
                            label="Tag"
                            margin="normal"
                            multiline
                            value={this.props.tag}
                            onChange={this.props.handleTextChange}
                        />
                        <Icon className={classes.tagIcon} color="action">
                            <AddCircle onClick={() => this.props.addTag(this.props.tag)} />
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
            </div >
        );
    }
}
export default withStyles(styles)(InfoPage);