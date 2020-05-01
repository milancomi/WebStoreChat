import React from 'react';
import ReactDOM from 'react-dom';

 class MessageComposer extends React.Component {
     constructor(props){
         super(props);
         this.state = {
                message:''



         };
         this.sendMessage = this.sendMessage.bind(this);

     }
send(text){
  
    
}

keyPressed(event) {
    if (event.key === "Enter") {
        if(this.state.message =='')
        {
            return;
        }
        this.$emit('send',this.state.message)
        this.setState({message :''});    }
  }

 
    }
    render(){
        return(
        <div className="composer">
            <textarea onKeyPress={this.keyPressed} placeholder="Message..."/>
        </div>
        );    
    }
} 
export default MessageComposer;

