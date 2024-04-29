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

const styles = theme => ({

});

class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            allMessage: []
        };
    }

    //loadMes = () => {
    //    console.log('===loadMes start===');
    //    const CRid = this.props.CRid;
    //    console.log(CRid);
    //    let chatList = firebase.database().ref('chatList/' + CRid);
    //    return chatList.once('value')
    //    .then(snapshot => {
    //        const data = snapshot.val() || [];
    //        let mes = [];
    //        for(const [key, value] of Object.entries(data)){
    //            mes.push(
    //                firebase.database().ref('userList/' + value.sender).once('value')
    //                .then(ss => {
    //                    return ({type: value.type, senderuid: value.sender, sender: ss.val().userName, message: value.message})
    //                })
    //            )
    //        }
    //        
    //        return Promise.all(mes);
    //    })
    //    .catch(err => console.error(err));
    //}
    processData = (data) => {
        let mes = [];
        for(const [key, value] of Object.entries(data)){
            mes.push(
                firebase.database().ref('userList/' + value.sender).once('value')
                .then(ss => {
                    return ({type: value.type, senderuid: value.sender, sender: ss.val().userName, message: value.message})
                })
            )
        }
        return Promise.all(mes);
    }


    componentDidUpdate(prev){
        if(prev.CRid !== this.props.CRid){
            const CRid = this.props.CRid;
            const chatListRef = firebase.database().ref('chatList/' + CRid);
    
            chatListRef.on('value', (snapshot) => {
                const data = snapshot.val() || [];
                this.processData(data)
                .then(mes => {
                    console.log('after process:', mes);
                    this.setState({allMessage: [...mes]});
                })
                .catch(err => console.error(err));
            });
        }
    }

    sendMes = (type, sender, mes) => {
        // type: 'send'/'addMem'/'unSend'
        const CRid = this.props.CRid;
        const newdata = {type: type, sender: sender, message: mes};
        firebase.database().ref('chatList/' + CRid).push(newdata)
        .then(res => console.log('send ' + mes, 'successfully'))
        .catch(err => console.error('error:', err));
    }

    render(){
        console.log('render Chat');
        console.log(this.props.CRid);
        console.log(this.props.roomName);
        console.log('allMes:', this.state.allMessage);
        return (
            <div>
                <p>
                    Chat Room: {this.props.roomName}
                </p>
                <AddMembtn
                    CRid = {this.props.CRid}
                    sendMes = {this.sendMes}
                />
                {
                    this.state.allMessage.map((ele, idx) => {
                        console.log(idx+':', ele);
                        return (
                            ele.type === 'send' ? (ele.senderuid !== this.props.uid)? 
                                <Chattext
                                    key={idx}
                                    idx={idx}
                                    sender = {ele.sender}
                                    mes = {ele.message}
                                />
                            :
                                <ChattextMy
                                    key={idx}
                                    idx={idx}
                                    sender = {ele.sender}
                                    mes = {ele.message}
                                />
                            :
                                <Othertext
                                    key={idx}
                                    idx={idx}
                                    type = {ele.type}
                                    sender = {ele.sender}
                                    mes = {ele.message}
                                />


                        );
                    })
                }
                <Sendtext
                    sendMes = {this.sendMes}
                    uid = {this.props.uid}
                />
            </div>
        );
    }
}

export default withStyles(styles)(Chat);