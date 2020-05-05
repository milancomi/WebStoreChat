import React, { Component } from "react";
import ReactDOM from "react-dom";
// import MediaHandler from '../MediaHandler';
// import Pusher from 'pusher-js';
// import Peer from 'simple-peer';
import ModalComponent from "../components/ModalComponent";
import Example from "./Example";
import Chat from "./Chat";

const APP_KEY = "83c9614fa128f8d6027a";

export default class App extends Component {
  constructor() {
    super();
    const id = document.getElementById("app").attributes["data-user-id"].value;
    this.state = {
      id: id,
      loading: true,
      whichComponentToShow: "Chat",
      // whichComponentToShow: "ModalComponent",

    };

    this.changeLoading = this.changeLoading.bind(this);

  }

  

  changeLoading(bool) {
    this.setState({
      loading: bool,
    });
  }

  render() {
    if (this.state.whichComponentToShow === "Chat") {
      return (
        <div className="App">
          <button
            onClick={() => {
              this.setState({ whichComponentToShow: "ModalComponent" });
            }}
          >
            Oglasi
          </button>

          <Chat whichComponentToShow={this.state.whichComponentToShow} />
        </div>
      );
    } else if (this.state.whichComponentToShow === "ModalComponent") {
      return (
        <div className="App">
          <button
            onClick={() => {
              this.setState({ whichComponentToShow: "Chat" });
            }}
          >
            Messages
          </button>
          <ModalComponent
            userId={this.state.id}
            loading={this.state.loading}
            onChange={this.changeLoading}
          />
          {/* <ComponentOne count={5} userId={this.state.id} /> */}
          {/* {this.state.loading ? <POSTS/> : <i style={{fontSize: "200px"}} className="fa fa-refresh fa-5x fa-spin"></i>} */}

          {this.state.loading ? (
            
            <div
              className="blink"
              style={{ position: "absolute", top: "30%", left: "40%" }}
            >
              <i
                style={{ fontSize: "300px" }}
                className="fa fa-refresh fa-5x fa-spin"
              ></i>
              <br />
            </div>
          ) : (
            null
)}
        </div>
      );
    }
    /*
componentDidMount(){


    const id = document.getElementById('app').attributes['data-user-id'].value;

    let channel = Echo.private(`user.${id}`);

    channel.listen('.UserEvent', function (data){
        console.log(data);
    });

});



*/
    return null;
  }
}

if (document.getElementById("app")) {
  ReactDOM.render(<App />, document.getElementById("app"));
}
