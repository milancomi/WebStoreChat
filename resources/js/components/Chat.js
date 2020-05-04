import React from "react";
import ReactDOM from "react-dom";
import { Button } from "reactstrap";

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      id: "",
    }
    this.msgsById = this.msgsById.bind(this);

  }
  msgsById(e){
    console.log(e);
  }
  componentDidMount() {
    axios.get("/messages").then((response) => {
      console.log(response.data);
      this.setState({ users: response.data });
    });
  }


  render() {
    let i  = 1 ;
    return (
      <div className="container">
        <div className="row">
   
          <div className="col-12 col-md-3">
             <h3>Select user:</h3>
            {this.state.users.length == 0
              ? null
              : this.state.users.map((users) => (
                  <ul onClick={()=>this.msgsById(users.id)} className="list-group" key={users.id}  >
                    <li className="list-group-item d-flex align-items-center"> 
                         <span className="badge badge-primary badge-pill">
                        {i++}.
              </span>&nbsp;<strong>{users.name}</strong>
                     
          
                    </li>
                  </ul>
              ))}
          </div>
          <div className="col-md-7">
            <h3>Messages:</h3>
          <div className="col-md-12 border border-secondary rounded-lg pt-3">
            <div className="row">
              <div className="ml-3 pl-0 col-md-8 rounded-right bg-secondary border border-dark mb-3">
                <p className="ml-3">moja moja poru porukamoja poruka</p>
                <div className="triangle-left"></div>
              </div>
            </div>
            <div className="row pr-3">
              <div className="col pr-0 col-md-7 rounded-left offset-md-5 bg-primary border border-dark mb-3 mr-1">
                <p className="">tvoja</p>
                <div className="triangle-right float-right"></div>
              </div>
            </div>
            
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Chat;
