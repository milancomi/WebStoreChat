import React from 'react';
import ReactDOM from 'react-dom';
import ContactsList from './ContactsList';
import Conversation from './Conversation';
 class Example extends React.Component {
     constructor(props){
         super(props);
         const id = document.getElementById('app').attributes['data-user-id'].value;

         this.state = {
             id: id,
             selectedContact: null,
             contacts:[],
             messages:[],
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
        axios.get('/contacts')
        .then((response)=>{
            this.setState({ contacts: response.data});
 
        });

  
    }
    render(){
        return(
        <div>
<h1>Whataver</h1>
<Conversation contact={this.state.selectedContact} messages={this.state.messages} />
<ContactsList contacts={this.state.contacts}  />
        </div>
        );    
    }
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
