import React, { Component } from 'react';
import Axios from 'axios';

export interface Istate {
  userid: any,
  id: any,
  title: any,
  body: any,
  enteredValue: any
}

export interface IProps {
  onCreatePost: any,
  formValues: any,
  isFormEditing: boolean,
  updatePost: any
}

class PostForm extends Component<IProps, Istate> {
  constructor(props: IProps, state: Istate) {
    super(props);
    this.state = {
      userid: 0,
      id: 0,
      title: '',
      body: '',
      enteredValue: {}
    }
  }

  componentWillReceiveProps(newProps: any) {
    console.log("newProps: ", newProps);
    const recvdProps = JSON.stringify(newProps.formValues);
    const PropsNew = JSON.parse(recvdProps);
    // const { userid, id, title, body } = PropsNew ? PropsNew : { userid: 0, id: 0, title: "", body: "" }
    this.setState({
      userid: PropsNew.userid,
      id: PropsNew.id,
      title: PropsNew.title,
      body: PropsNew.body
    })
  }

  onInputChange = (e: any) => {
    var enteredValue: any = {};
    enteredValue[e.target.name] = e.target.value;
    console.log("on Input Change", enteredValue);

    if (e.target.value != null) {
      this.setState({ enteredValue: enteredValue });
    }
    console.log(this.state)
  }

  onFormSubmit = (e: any) => {
    const { userid, id, title, body } = this.state ? this.state : { userid: 0, id: 0, title: "", body: "" }
    e.preventDefault();
    if (this.props.isFormEditing) {
      const post = {
        userid: userid,
        id: id,
        title: title,
        body: body
      }
      console.log("updating form");
      this.props.updatePost(post, this.props.formValues.id)
    }
    else {
      const post = {
        title: title,
        body: body
      }
      console.log("create post")
      this.props.onCreatePost(post);
    }
  }

  render() {
    // console.log("props: ", this.props, this.state)
    const { title, body } = this.state ? this.state : { title: "", body: "" };
    return (
      <React.Fragment>
        <div>
          <h2>
            Add Posts
                    </h2>
          <form onSubmit={this.onFormSubmit}>
            <label>
              Title:
                        </label>
            <br></br>
            <input
              type="text"
              name="title"
              value={title}
              onChange={this.onInputChange}
            />
            <br />
            <label>
              Body:
            </label>
            <br />
            <textarea
              name="body"
              rows={5}
              value={body}
              onChange={this.onInputChange}
            />
            <br />
            <input type="submit" />
          </form>
        </div>
      </React.Fragment>
    )
  }
}

export default PostForm;
