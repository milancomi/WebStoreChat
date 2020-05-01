import React from 'react';
import ReactDOM from 'react-dom';

 class ContactsList extends React.Component {
     constructor(props){
         super(props);
         this.state = {
            contacts: [],
            selected:0

         };

     }

    //  componentDidMount(){
    //      this.setState({contacts:this.props.contacts});
    //  }
    //  componentDidMount(){
  
    //     });

 
    // selectContact(index,contact){
    //     this.selected = index;
    //     this.$emit('selected',contact);
    // }
    render(){
        return(
        <div className="contacts-list">
            <p>ontact </p>
            { this.props.contacts.map((contacts) => (
               <div key={contacts.id}>
                      <p>{contacts.name}ovde</p>

                   </div>
                  

              )
              )
              } 
       </div>
        )  
            }

         
        }
    

export default ContactsList;

