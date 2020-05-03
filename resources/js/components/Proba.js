import React from 'react';
import ReactDOM from 'react-dom';
import ContactsList from './ContactsList';
import Conversation from './Conversation';
 class Proba extends React.Component {
     constructor(props){
         super(props);

         this.state = {
            whichComponentToShow:props.whichComponentToShow

         };

     }


    //  startConversationWith(contact){
    //      axios.get(`/conversation/${contact.id}`)
    //      .then((response)=>
    //      {
    //          this.messages = response.data;
    //          this.selectedContact = contact;
    //      }) 
    //  }
     componentDidMount(){
        // axios.get('/contacts')
        // .then((response)=>{
        //     this.setState({ contacts: response.data});
 
        // });

  
    }
    render(){
        return(
        <div>
<h1>Proba</h1>
        </div>
        );    
    }
}

export default Proba;

