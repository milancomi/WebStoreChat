import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ReactImageAppear from 'react-image-appear';

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
      modal: !this.state.modal,
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
    console.log(formData);

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

    let channel = Echo.channel("posts");

    channel.listen(".postE", (data) => {
      this.loadingStatus(true);
        console.log(data.post);
      this.setState({ posts: [data.post, ...this.state.posts] });
      this.loadingStatus(false);

    });






 axios.get(`${window.siteurl}/get_all_posts`)
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
                <label htmlFor="exampleFormControlFile1">Add file/image</label>
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

        <div>
          <h1>Posts</h1>
          <div className="container-fluid">
            {this.state.posts.length == 0
              ? null
              : this.state.posts.map((posts) => (
                  <div key={posts.id}>

                    <div className="card col col-lg-6 mt-4 mb-2 offset-md-3 ">
                    {posts.newMessage==true ? 
                  <div className="alert alert-success alert-block">
                  <button type="button" className="close" data-dismiss="alert">×</button>	
                        <strong>New Post</strong>
                </div>
                  : null}
                      <div className="card-body">
                        <h5 className="card-title">{posts.title}</h5>
                        <p className="card-text">{posts.content}</p>
                        <a href="#" className="btn bg-light rounded-circle">
                          <i
                            className="fa icon-4x text-danger fa-heart"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                      {typeof posts.files[0] !== 'undefined' ?
                      <ReactImageAppear 
                      placeholder
                      src={posts.files[0].file_title}
                      className="post_img mx-auto d-block"
                      placeholderClass="mx-auto d-block"
                      />
                      :
                      null
                      }
                      </div>
                    </div>
                ))}
          </div>
        </div>
      </div>
    );
  }
}
