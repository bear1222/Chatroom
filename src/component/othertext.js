import {
    withStyles,
    Typography,
    Divider,
    Grid,
    Button,
} from '@material-ui/core'

const styles = theme => ({
    message:{
        minWidth: '50px',
        backgroundColor: '#ebe4de',
        border: '2px solid #bfb8b2',
        'border-radius': '15px',
        paddingTop: '5px',
        paddingBottom: '5px',
        paddingLeft: '8px',
        paddingRight: '8px',
        textAlign: 'center'
    },
    text:{
        fontSize: '24px',
        color: '#94897f'
    }

});

class Othertext extends React.Component{
    constructor(props){
        super(props);

        this.state = {
        };
    }

    render(){
        const {classes} = this.props;
        console.log('render Chattext');
        // sender, text
        return (
            <Grid container direction='column' alignItems='center'>
                <Grid item className={classes.message}>
                    <Typography className={classes.text}>
                        <b>{this.props.sender}</b> {this.props.mes}
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Othertext);