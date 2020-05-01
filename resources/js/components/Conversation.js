import React from 'react';
import ReactDOM from 'react-dom';

 class Conversation extends React.Component {
     constructor(props){
         super(props);
         this.state = {
             selectedContact: null,
             messages: [],
            contacts:[]



         };
         this.sendMessage = this.sendMessage.bind(this);

     }
sendMessage(text){
    console.log(text);

}

     


    render(){
        return(
        <div className="conversation">
        {this.props.contact ? this.props.contact.name : <h1>'Select a Contact'</h1>}
        {/* <MessagesFeed contact={this.props.contact} messages={this.props.messages}/>
        <MessageComposer send={this.sendMessage}/> */}
        </div>
        );    
    };
} 
export default Conversation;

