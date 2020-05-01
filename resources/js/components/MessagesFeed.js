import React from 'react';
import ReactDOM from 'react-dom';

 class MessageComposer extends React.Component {
     constructor(props){
         super(props);
         this.state = {
                messages:[],
                contact:{}



         };
                 }
     
    render(){
        // treba mi state  const contact
        return(
        <div className="contacts-list">
            { this.props.messages.map((message) => (
     <ul>

         <li className={message.to ==contact.id ? 'send' : 'received'} key={message.id}>
             <div className="text">
                 {message.text}
             </div>
         </li>
     </ul>
                
                  

              )
              )
              } 
       </div>
        )  
            }
} 
export default MessageComposer;

