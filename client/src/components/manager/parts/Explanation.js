import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import AddCircle from '@material-ui/icons/AddCircle';
import Clear from '@material-ui/icons/Clear';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    body: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '480px',
        margin: '5px'
    },
    head: {
        display: 'flex',
        height: '40px'
    },
    headLabel: {
        margin: 'auto auto auto 20px',
    },
    addBtn: {
        margin: 'auto 10px 10px auto'
    },
    contents: {

    },
    item: {
        display: 'flex',
        flexDirection: 'row-reverse'
    },
    itemBar: {
        display: 'flex'
    },
    itemBody: {
        width: '94%'
    },
    itemScript: {
    },
    removeBtnConteiner: {
        margin: '14px auto auto auto'
    },
    itemSubtitle: {
        marginTop: '12px',
        width: '97%'
    },
    removeBtn: {
        fontSize: '20px'
    }
});

class Explanation extends Component {

    constructor(props) {
        super(props)

        this.state = {
            explanations: []
        }

    }

    addExplanation = () => {
        this.setState({
            explanations: this.state.explanations.concat({ subtilte: '', contents: '' })
        })
    }

    deleteExplanation = (explanationIdx) => {
        this.setState({
            explanations: this.state.explanations.filter((_, index) => index !== explanationIdx)
        })
    }

    handleSubtilte = (event, explanationIdx) => {
        this.setState({
            explanations: this.state.explanations.map((explanation, index) => {
                return index === explanationIdx ? { ...explanation, subtilte: event.target.value } : explanation
            })
        })
    }

    handleExplanation = (event, explanationIdx) => {
        this.setState({
            explanations: this.state.explanations.map((explanation, index) => {
                return index === explanationIdx ? {...explanation, contents: event.target.value } : explanation
            })
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.body}>
                <Paper className={classes.head}>
                    <Typography className={classes.headLabel} variant="title" gutterBottom>Explanation</Typography>
                    <Icon className={["btn", classes.addBtn].join(' ')} color="action">
                        <AddCircle onClick={this.addExplanation} />
                    </Icon>
                </Paper>
                <div className={classes.contents}>
                    {this.state.explanations ?
                        this.state.explanations.map((explanation, explanationIdx) => {
                            return <div key={explanationIdx} className={classes.item}>
                                <div className={classes.itemBar}>
                                    <Icon className={classes.removeBtnConteiner} color="action">
                                        <Clear className={["btn", classes.removeBtn].join(' ')} onClick={() => this.deleteExplanation(explanationIdx)}/>
                                    </Icon>
                                </div>
                                <div className={classes.itemBody}>
                                    <TextField
                                        placeholder="Subtitle"
                                        className={classes.itemSubtitle}
                                        fullWidth
                                        multiline
                                        value={explanation.subtilte}
                                        onChange={(event) => this.handleSubtilte(event, explanationIdx)}
                                    />
                                    <TextField
                                        value={explanation.contents}
                                        onChange={(event) => this.handleExplanation(event, explanationIdx)}
                                        multiline
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                            </div>
                        })
                        :
                        ''
                    }
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Explanation);
