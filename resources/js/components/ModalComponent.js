import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ReactImageAppear from "react-image-appear";

export default class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title: "",
      posts: [],
      image: "",
      content: "",
      published: false,
      upload_file: [],
      loading: props.loading,

      modalMessage: false,
      messageFrom:props.userId,
      messageForUserId:"",
      messageForUserName:"",
      messageForPostId:"",
      messageForPostName:"",
      message:""

    };

    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.handleChangePublished = this.handleChangePublished.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.loadingStatus = this.loadingStatus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    this.handleChangeMessage = this.handleChangeMessage.bind(this);

  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  toggle2(event) {
    if(typeof event.target.attributes['data-msg-post-id'] !== "undefined" )
    {
    const postId=event.target.attributes['data-msg-post-id'].value;
    const postName=event.target.attributes['data-msg-post-name'].value;
    const msgForUserId=event.target.attributes['data-msg-for-user-id'].value;
    const msgForUserName=event.target.attributes['data-msg-for-user-name'].value;

     this.setState({
      messageForUserId:msgForUserId,
      messageForUserName:msgForUserName,
      messageForPostId:postId,
      messageForPostName:postName
    });
    }

    this.setState({
      modalMessage: !this.state.modalMessage,
    });
  }

  handleChangeTitle(event) {
    this.setState({ title: event.target.value });
  }
  handleChangeContent(event) {
    this.setState({ content: event.target.value });
  }
  handleChangePublished(event) {
    this.setState({ published: event.target.value });
  }
  handleChangeFile(event) {
    this.setState({ upload_file: event.target.files[0] });
  }

  loadingStatus(bool) {
    this.props.onChange(bool);
    this.setState({ loading: bool.value });
  }
  handleChangeMessage(event){
    this.setState({ message: event.target.value });
  }
  handleMessageSubmit(event) {
    event.preventDefault();


    this.loadingStatus(true);
    const form = {
      message: this.state.message,
      from_user_id: this.state.messageFrom,
      for_post_id: this.state.messageForPostId,
      to_user_id: this.state.messageForUserId,
    };

    this.setState({
      modalMessage: !this.state.modalMessage,
    });

     let uri = "http://localhost:8000/new_message";

    axios
      .post(uri,form)
      .then((response) => {
        console.log(response);
        this.loadingStatus(false);
      })
      .catch(function(error) {
        console.log("error" + error);
      });
  }
  handleSubmit(event) {
    event.preventDefault();

    this.loadingStatus(true);
    let formData = new FormData(); //formdata object
    formData.append("title", this.state.title);
    formData.append("content", this.state.content);
    formData.append("published", this.state.published);
    formData.append("upload_file", this.state.upload_file);

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    const form = {
      title: this.state.title,
      content: this.state.content,
      published: this.state.published,
      upload_file: this.state.upload_file,
    };

    this.setState({
      modal: !this.state.modal,
    });

    let uri = "http://localhost:8000/posts";

    axios
      .post(uri, formData, config)
      .then((response) => {
        this.setState({ posts: response.data.postData });

        this.loadingStatus(false);
      })
      .catch(function(error) {
        console.log("error" + error);
      });
  }

  componentDidMount() {
    const id = document.getElementById("app").attributes["data-user-id"].value;

    let postChannel = Echo.channel("posts");

    postChannel.listen(".postE", (data) => {
      this.loadingStatus(true);
      console.log(data.post);
      this.setState({ posts: [data.post, ...this.state.posts] });
      this.loadingStatus(false);
    });


    axios
      .get(`${window.siteurl}/get_all_posts`)
      .then((response) => {
        this.setState({ posts: response.data });
        this.loadingStatus(false);
      })
      .catch(function(error) {
        console.log("error" + error);
      });
  }
  render() {
    return (
      <div>
        <Button
          color="primary"
          className="col-md-2 offset-md-5"
          onClick={this.toggle}
        >
          Post +
        </Button>

        
        <div className="row pt-3">
          <div className="container-fluid">
            {this.state.posts.length == 0
              ? null
              : this.state.posts.map((posts) => (
                  <div key={posts.id}>
                    <div className="card col col-sm-9 mt-4 mb-2 offset-sm-2 divider ">
                      {posts.newMessage == true ? (
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
                      ) : null}
                      <div className="card-body">

                        <h5 className="card-title">{posts.title}</h5>
                        <p>User:{posts.user.name}</p>

                        <p className="card-text">{posts.content}</p>
                    
                        <a href="#" className="btn bg-light rounded-circle">
                          <i
                            className="fa icon-4x text-danger fa-heart"
                            aria-hidden="true"
                          ></i>
                        </a>
                      {typeof posts.files[0] !== "undefined" ? (
                        <ReactImageAppear
                          placeholder
                          src={posts.files[0].file_title}
                          className="post_img mx-auto d-block"
                          placeholderClass="mx-auto d-block"
                        />
                      ) : null}
                        <Button
                        data-msg-post-id={posts.id}
                        data-msg-post-name={posts.title}
                        data-msg-for-user-id={posts.user.id}
                        data-msg-for-user-name={posts.user.name}
                          color="success"
                          className="col-md-4"
                          onClick={this.toggle2}
                        >
                          Ask: {posts.user.name}    <i className="fa fa-comments icon-4x" aria-hidden="true"></i>
                        </Button>
                  </div>
                  </div>
                  </div>

                ))}
          </div>
        </div>
        <Modal isOpen={this.state.modal}>
          <form onSubmit={this.handleSubmit}>
            <ModalHeader>Add new Post</ModalHeader>

            <ModalBody>
              <div className="form-group">
                <label htmlFor="post_title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={this.handleChangeTitle}
                  id="post_title"
                  name="title"
                  placeholder="Title"
                />
              </div>

              <div className="form-group">
                <label htmlFor="post_content">Post Content</label>
                <textarea
                  className="form-control"
                  rows="8"
                  onChange={this.handleChangeContent}
                  id="post_content"
                  name="content"
                  placeholder="Write something amazing..."
                />
              </div>

              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="published"
                    onChange={this.handleChangePublished}
                    value={this.state.published}
                  />
                  Published
                </label>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="exampleFormControlFile1">Add image</label>
                <input
                  type="file"
                  name="upload_file"
                  onChange={this.handleChangeFile}
                  className="form-control-file"
                  id="exampleFormControlFile1"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <input
                type="submit"
                onClick={this.handleSubmit}
                value="Submit"
                color="primary"
                className="btn btn-primary"
              />
              <Button color="danger" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </Modal>

        {/* modal message */}
        <Modal isOpen={this.state.modalMessage}>
          <form onSubmit={this.handleMessageSubmit}>
            <ModalHeader>Message for: <strong>{this.state.messageForUserName} {this.state.messageForUserId}</strong></ModalHeader>
            <ModalBody>
              <h4>About: <strong> {this.state.messageForPostName} {this.state.messageForPostId}</strong></h4>
    <div className="form-group">
                <label htmlFor="message">Message: </label>
                <textarea
                  className="form-control"
                  rows="6"
                  id="message"
                  onChange={this.handleChangeMessage}
                  name="message"
                  placeholder="Write question"
                />
              </div>
              <input
                  type="hidden"
                  name="from_user_id"
                  className="form-control-file"
                  value={this.state.messageFrom}
                />
                     <input
                  type="hidden"
                  name="for_post_id"
                  className="form-control-file"
                  value={this.state.messageForPostId}
                />
                     <input
                  type="hidden"
                  name="to_user_id"
                  className="form-control-file"
                  value={this.state.messageForUserId}
                />
            </ModalBody>
            <ModalFooter>
              <input
                type="submit"
                onClick={this.handleMessageSubmit}
                value="Submit"
                color="primary"
                className="btn btn-primary"
              />
              <Button color="danger" onClick={this.toggle2}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </Modal>

        {/* Modal message */}
      </div>
    );
  }
}
