import React from 'react';
import ReactDOM from 'react-dom';

 class Chat extends React.Component {
     constructor(props){
         super(props);

         this.state = {
             
            messages:[],
            id:""
         };

     }



        componentDidMount(){
        axios.get('/messages')
        .then((response)=>{
            console.log(response.data);
            this.setState({ messages: response.data});
        });

  
    }
    render(){
        return(
        <div>
<div className="container-fluid">
            {this.state.messages.length == 0
              ? null
              : this.state.messages.map((messages) => (
                  <div key={messages.id}>
                    <div className="card col col-lg-6 mt-4 mb-2 offset-md-3 divider ">
                      {/* {messages.newMessage == true ? (
                        <div className="alert alert-success alert-block">
                          <button
                            type="button"
                            className="close"
                            data-dismiss="alert"
                          >
                            ×
                          </button>
                          <strong>New Post</strong>
                        </div>
                      ) : null} */}
                      <div className="card-body">

                        <h5 className="card-title">{messages.text}</h5>
                        <p>User:{messages.from}</p>
                        <p className="card-text">{messages.to}</p>
                  </div>
                  </div>
                  </div>

                ))}
          </div>        </div>
        );    
    }
}

export default Chat;

