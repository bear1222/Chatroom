import {
    withStyles,
    Typography,
    Divider,
    Grid,
    Button,
} from '@material-ui/core'
import AddMembtn from './addMembtn';
import Chattext from './Chattext';
import ChattextMy from './chattextMy';
import Sendtext from './sendtext';
import Othertext from './othertext';
import { ClassNames } from '@emotion/react';
import { Height } from '@material-ui/icons';

const styles = theme => ({
    wrap:{
        height: '100vh',
        backgroundColor: '#DBC8B6',
        overflow: 'hidden'
        
    },
    title:{
        width:'100%',
        height: '80px',
        paddingRight: '10px'
    },
    divide:{
        width: '5px',
    },
    chatContainer:{
        height: 'calc(100vh - 80px - 70px - 0px)',
        width: '100%',
        paddingRight: '10px'
    },
    chatContainer2:{
        width: '100%',
        height: '100%',
        backgroundColor: '#f1ede6' ,
        overflowY: 'scroll',
        '&::-webkit-scrollbar':{display:'none'},
        paddingTop: '10px', 
        paddingRight: '10px',
        paddingBottom: '10px',

    },
    chattext:{
        marginLeft: '10px',
        marginRight: '10px'
    }, 
    sending:{
        height: '70px',
        paddingLeft: '10px',
        paddingRight: '10px',
    }

});

class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            allMessage: []
        };
    }

    processData = (data) => {
        let mes = [];
        for(const [key, value] of Object.entries(data)){
            mes.push(
                firebase.database().ref('userList/' + value.sender).once('value')
                .then(ss => {
                    return ({type: value.type, senderuid: value.sender, sender: ss.val().userName, message: value.message, mesId: key})
                })
            )
        }
        return Promise.all(mes);
    }


    componentDidUpdate(prev){
        if(prev.CRid !== this.props.CRid || (this.props.CRid != null && this.state.allMessage.length == 0)){
            this.updataManual();
        }
    }
    updataManual = () => {
        const CRid = this.props.CRid;
        const chatListRef = firebase.database().ref('chatList/' + CRid);
    
        chatListRef.on('value', (snapshot) => {
            const data = snapshot.val() || [];
            this.processData(data)
            .then(mes => {
                this.setState({allMessage: [...mes]});
            })
            .catch(err => console.error(err));
        });
    }

    sendMes = (type, sender, mes) => {
        // type: 'send'/'addMem'/'unSend'
        if(mes == null || mes === '')
            return;
        const CRid = this.props.CRid;
        const newdata = {type: type, sender: sender, message: mes};
        firebase.database().ref('chatList/' + CRid).push(newdata)
        .then(res => console.log('send ' + mes, 'successfully'))
        .catch(err => console.error('error:', err));
    }

    render(){
        const {classes} = this.props;
        if(this.state.allMessage.length === 0 && this.props.CRid != null){
            console.log('CRid update manual', this.props.CRid );
            this.updataManual();

        }

        return (
            <Grid container direction='column' className={classes.wrap} justifyContent='space-between'>
                <Grid item container direction='row' className={classes.title} justifyContent='space-between' alignItems='center'>
                    <Typography variant='h3'>
                        {this.props.roomName}
                    </Typography>
                    <AddMembtn
                        size = {this.props.size}
                        CRid = {this.props.CRid}
                        sendMes = {this.sendMes}
                    />

                </Grid>
                <Grid item className={classes.chatContainer}>
                    <Grid item className={classes.chatContainer2}>
                    {
                        this.state.allMessage.map((ele, idx) => {
                            return (
                                ele.type === 'send' ? (ele.senderuid !== this.props.uid)? 
                                    <Chattext
                                        className={classes.chattext}
                                        key={idx}
                                        idx={idx}
                                        sender = {ele.sender}
                                        uid = {ele.senderuid}
                                        mes = {ele.message}
                                    />
                                :
                                    <ChattextMy
                                        className={classes.chattext}
                                        key={idx}
                                        idx={idx}
                                        sender = {ele.sender}
                                        mes = {ele.message}
                                        mesId = {ele.mesId}
                                        senderuid = {ele.senderuid}
                                        CRid = {this.props.CRid}
                                        updateManual = {this.updataManual}
                                    />
                                :
                                    <Othertext
                                        className={classes.chattext}
                                        key={idx}
                                        idx={idx}
                                        type = {ele.type}
                                        sender = {ele.sender}
                                        mes = {ele.message}
                                    />


                            );
                        })
                    }
                    </Grid>
                </Grid>
                <Grid item className={classes.sending} container alignItems='center'>
                    <Sendtext
                        sendMes = {this.sendMes}
                        uid = {this.props.uid}
                    />

                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Chat);