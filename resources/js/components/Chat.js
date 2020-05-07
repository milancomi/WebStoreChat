import React from "react";
import ReactDOM from "react-dom";
import { Button } from "reactstrap";

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      users: props.users,
      messages: [],
      chatWith: "",
      chatWithUser:"",
      messageContent: "",
      chatFieldVisible:true,

    };

    this.chatToogleVisibility= this.chatToogleVisibility.bind(this);
    this.msgsById = this.msgsById.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
    this.handleChangeNewMessageContent =this.handleChangeNewMessageContent.bind(this);
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.users !== nextProps.users) {
      this.setState({users: nextProps.users});
    }
  }
  handleChangeNewMessageContent(event) {
    this.setState({ messageContent: event.target.value });
  }
  scrollToBottom() {
    let element = document.getElementById("scrolling");
    element.scrollIntoView({ behavior: "smooth" });
  }

  chatToogleVisibility(){
    this.setState({
    chatFieldVisible: !this.state.chatFieldVisible,
  });
  }
  submitMessage(e) {
    let receiver_id = this.state.chatWith;
    if (e.keyCode == 13) {
      if (e.target.value == "" || !e.target.value.replace(/\s/g, "")) {
        console.log("empty message");
      } else {
        const form = {
          message: e.target.value,
          to_user_id: receiver_id,
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
      chatFieldVisible: !this.state.chatFieldVisible,
      chatWith: user_id,
    });

    axios.get(`${window.siteurl}/messages/${user_id}`).then((response) => {
      console.log(response.data);
      this.setState({
        messages: response.data.messages,
        chatWithUser:response.data.user_name
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
        this.setState({
          messages: [...this.state.messages,e.message],
           users: e.users

        });
        this.scrollToBottom();
        return;
      }
      this.setState({
        users:e.users
      });
    });

  }

  render() {

    let i = 1;
    let chatVisibility = this.state.chatFieldVisible ? {display:'none'}  : {}
    let availableUsersAlign = this.state.chatFieldVisible ? 'offset-sm-7' : ''
    return (
      
        <div className="row chatField pr-0">
          <div className="col-sm-7 pr-0" style={chatVisibility} >
              <div className="col-sm-12 bg-mango pt-3 pl-1 pr-1">
                <div className="row mr-0 ml-0">
                  <div className="col-sm-6">
                  <h3><strong>{this.state.chatWithUser}</strong></h3>

                  </div>
                  <div className="col-sm-3 justify-content-center "><div className="dropdown">
  <button className="btn dropdown-toggle font-weight-bold" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
<strong> . . .</strong>  </button>
  <div className="dropdown-menu pt-0 pb-0" aria-labelledby="dropdownMenuButton">
    <a className="dropdown-item bg-success text-white font-weight-bold ltr-spacing" href="#"><i className="fa fa-id-card" aria-hidden="true"></i>
 &nbsp; Prikazi oglase</a>
    <a className="dropdown-item bg-secondary text-white font-weight-bold ltr-spacing" href="#"><i className="fa fa-phone" aria-hidden="true"></i>
    &nbsp; br Telefona</a>
    <a className="dropdown-item bg-secondary text-white font-weight-bold ltr-spacing" href="#"> <i className="fa fa-envelope" aria-hidden="true"></i>
    &nbsp;E-mail</a>
    <a className="dropdown-item bg-pretyRed text-white font-weight-bold ltr-spacing" href="#"><i className="fa fa-trash" aria-hidden="true"></i>
    &nbsp; Obrisi poruke</a>


  </div>
</div></div>
                <div className="col-sm-3 justify-content-center" onClick={this.chatToogleVisibility}>
                <i className="fa fa-times" id="closeIcon" aria-hidden="true"></i>

                </div>
                </div>
                
              </div>

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
          <div className={`col-sm-5 pl-0 availableUsersField ${availableUsersAlign}`} >
          <ul                    className="list-group"

                  >
                    <li className="list-group-item d-flex align-items-center">
                      <span className="badge badge-primary badge-pill">
                      </span>
                    Connected with:
                    </li>
                  </ul>
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

          <div className="col-sm-7 pr-1 msgComposeField" style={chatVisibility} >
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
