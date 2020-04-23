import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
export default class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        postss: this.props.posts,
    };

  }

  


  render() {
    return (
      <div>
        <h1>Users</h1>
        {
          this.state.postss.length == 0
            ? 'Loading users...'
            : this.state.posts.map(posts => (
              
              <div key={posts.id}>
                <p>{posts.title}</p>
              </div>

            ))
        }
      </div>
    );
  }
}
