import React from "react";
import ReactDOM from "react-dom";
import { Button } from "reactstrap";

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      users: [],
      messages: [],
      chatWith: "",
      messageContent: "",
    };
    this.msgsById = this.msgsById.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
    this.handleChangeNewMessageContent =this.handleChangeNewMessageContent.bind(this);
  }

  handleChangeNewMessageContent(event) {
    this.setState({ messageContent: event.target.value });
  }
  scrollToBottom() {
    let element = document.getElementById("scrolling");
    element.scrollIntoView({ behavior: "smooth" });
  }

  submitMessage(e) {
    let receiver_id = this.state.chatWith;
    if (e.keyCode == 13) {
      if (e.target.value == "" || !e.target.value.replace(/\s/g, "")) {
        console.log("empty message");
      } else {
        const form = {
          message: e.target.value,
          to_user_id: this.state.chatWith,
        };
    
         let uri = `${window.siteurl}/new_message_chat`;
    
        axios
          .post(uri,form)
          .then((response) => {
            this.setState({ 
              messages: [...this.state.messages,response.data],
              messageContent: ''
            });
            this.scrollToBottom();

            })
          .catch(function(error) {
            console.log("error" + error);
          });
    }
  }
}
  msgsById(user_id) {
    this.setState({
      chatWith: user_id,
    });

    axios.get(`${window.siteurl}/messages/${user_id}`).then((response) => {
      console.log(response.data);
      this.setState({
        messages: response.data,
      });
      this.scrollToBottom();
    });
  }
  componentDidMount() {
    const id = document.getElementById("app").attributes["data-user-id"].value;
    this.setState({
      id: id,
    });
    axios.get("/users_messaged").then((response) => {
      console.log(response.data);
      this.setState({ users: response.data });
    });

    console.log("LOGED USER"+id);
    let msgChannel = Echo.private(`messages.${id}`);
    msgChannel.listen('NewMessageEvent',(e)=>{
      if(this.state.chatWith == e.message.from)
      {
      console.log(e);
      }
      alert("WHATEVER");
    });

  }

  render() {

    let i = 1;
    return (
      
        <div className="row chatField pr-0">
          <div className="col-sm-7 pr-1">
            {/* {this.state.messages.length == 0 ? (
              <h3> Select user</h3>
            ) : (
              <h3>Messages</h3>
            )} */}
            <div className="col-sm-12 border border-secondary rounded-lg pt-3 bg-white msgField">
              {this.state.messages.length == 0
                ? null
                : this.state.messages.map((messages) => (
                    <div key={messages.id}>
                      {messages.from == this.state.id ? (
                        <div className="row">
                          <div className="ml-3 pl-0 col-sm-8 rounded-right bg-mango border border-dark mb-3">
                            <p className="ml-3">{messages.text}</p>
                            <div className="triangle-left"></div>
                          </div>
                          <div className="col-sm-3 pl-1 pr-0 justify-content-md-center pt-23">
                            <span className="timestamp text-center align-bottom font-italic">{messages.created_at}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="row pr-0">
                          <div className="col-sm-3 justify-content-md-center pt-23">
                            {" "}  
                            <span className="timestamp text-center align-bottom font-italic">{messages.created_at}</span>
                          </div>

                          <div className="col-sm-8 rounded-left wdthh90 blClr text-white border border-dark mb-3 ">
                            <p className="">{messages.text}</p>
                            <div className="triangle-right float-right"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              <div
                id="scrolling"
                style={{ float: "left", clear: "both" }}
                ref={(el) => {
                  this.messagesEnd = el;
                }}
              ></div>
            </div>
          </div>
          <div className="col-sm-5 pl-0 availableUsersField" >
            {this.state.users.length == 0
              ? null
              : this.state.users.map((users) => (
                  <ul
                    onClick={() => this.msgsById(users.id)}
                    className="list-group"
                    key={users.id}
                  >
                    <li className="list-group-item d-flex align-items-center">
                      <span className="badge badge-primary badge-pill">
                        {i++}.
                      </span>
                      &nbsp;<strong>{users.name}</strong>
                    </li>
                  </ul>
                ))}
          </div>

          <div className="col-sm-7 pr-1 msgComposeField">
            <textarea
              onKeyDown={this.submitMessage}
              style={{ resize: "none" }}
              className="form-control bg-dark text-white"
              rows="3"
              overflow="auto"
              onChange={e => this.handleChangeNewMessageContent(e)}
              value={this.state.messageContent}

              id="post_content"
              name="content"
             
            />
          </div>
        </div>
    );
  }
}

export default Chat;
