import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        modal: false,
        title: '',
        content :'' ,
        published:false,
        upload_file:[],
        loading: props.loading,
    };

    this.toggle = this.toggle.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.handleChangePublished = this.handleChangePublished.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.loadingStatus = this.loadingStatus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  handleChangeTitle(event) {
    this.setState({title: event.target.value});
  }
  handleChangeContent(event) {
    this.setState({content: event.target.value});
  }
  handleChangePublished(event) {
    this.setState({published: event.target.value});
  }
  handleChangeFile(event) {
    this.setState({upload_file: event.target.value});
  }
  
  loadingStatus(bool) { 
    this.props.onChange(bool);
        this.setState({loading: bool.value
        });
    console.log(bool);
    }


  handleSubmit(event) {
    event.preventDefault();


    this.loadingStatus(true);
    
    const form = {
        title: this.state.title,
        content: this.state.content,
        published: this.state.published,
        upload_file: this.state.upload_file

      }
      this.setState({
        modal: !this.state.modal
      });
      
      let uri = 'http://localhost:8000/posts';
      
      axios.post(uri, form).then((response) => {
        this.loadingStatus(false);


      });
        
      
    }
  


  render() {
    return (

        <div>
        <Button color="primary" className="col-md-2 offset-md-5" onClick={this.toggle}>Post +</Button>

        <Modal isOpen={this.state.modal}>
        <form onSubmit={this.handleSubmit}>
          <ModalHeader>Add new Post</ModalHeader>

          <ModalBody>
          <div className="form-group">
        <label htmlFor="post_title">Title</label>
        <input type="text" className="form-control" onChange={this.handleChangeTitle} id="post_title" name="title" placeholder="Title"/>
      </div>


      <div className="form-group">
        <label htmlFor="post_content">Post Content</label>
        <textarea className="form-control" rows="8" onChange={this.handleChangeContent} id="post_content" name="content" placeholder="Write something amazing..."/>
      </div>

      <div className="form-group">
        <label><input type="checkbox"  name="published" onChange={this.handleChangeContent} value={this.state.published}/>Published</label>
      </div>
      <div className="form-group mb-3">
        <label htmlFor="exampleFormControlFile1">Add file/image</label>
        <input type="file" name="upload_file"  onChange={this.handleChangeFile} className="form-control-file" id="exampleFormControlFile1"/>
      </div>


  
          </ModalBody>
          <ModalFooter>
          <input type="submit" value="Submit" color="primary" className="btn btn-primary" />
            <Button color="danger" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
          </form>
        </Modal>
        </div>

      
    );
  }
}
