import React, { Component } from 'react';
import axios from 'axios';
import PostList from './PostList';
import PostForm from './PostForm';
import ReactDOM from 'react-dom';

export interface IState {
  allPosts: any,
  editPost: any,
  isFormEditing: boolean
}
export default class Posts extends Component<{}, IState> {
  constructor(props: any, state: IState) {
    super(props);
    this.state = {
      allPosts: [] as any[],
      editPost: {},
      isFormEditing: false
    }
  }

  componentDidMount() {
    this.fetchPosts();    
  }

  /**calls the API for fetching the posts */
  fetchPosts = () => {
    console.log("fetching posts...");
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        this.setState({
          allPosts: response.data
        })
      }
      );
  }

  /**creates new posts */
  createPost = (postData: any) => {
    // console.log("create post called", postData)
    var a = this.state.allPosts
    a.unshift(postData);
    console.log("a: ", a);
    axios.post('https://jsonplaceholder.typicode.com/posts',
      { postData })
      // .then(res => console.log(res.data))   
      .then(res => {
        console.log(res);
        this.setState({
          allPosts: a
        })
      })
  }

/**gets the details of a particular post, so that the data can be used for editing. */
  getPost = (id: any) => {
    console.log("get post called", id);
    axios.get('https://jsonplaceholder.typicode.com/posts/' + id)
      .then(response => {
        console.log("getPost response: ", response.data)
        this.setState({
          editPost: response.data,
          isFormEditing: true
        })
      }
      );
  }

  /**Updates the edited post. Called on saving the Updated post */
  updatePost = (postData: any, id: any) => {
    console.log("update post called", postData, id);
    // console.log(this.state.allPosts.findIndex((i: any) => i.id == id));
    var a = this.state.allPosts.findIndex((i: any) => i.id == id);
    this.state.allPosts[a] = postData;
    axios.put('https://jsonplaceholder.typicode.com/posts/' + id,
      { postData })     
      .then(res => {       
        this.setState({
          allPosts: this.state.allPosts,
          editPost: {
            title: '',
            body: ''
          }
        })
      })
  }

  render() {

    return (
      <React.Fragment>
        <div>
          <PostForm
            onCreatePost={this.createPost}
            formValues={this.state.editPost}
            isFormEditing={this.state.isFormEditing}
            updatePost={this.updatePost}
          />
          <hr />
          <PostList
            allPosts={this.state.allPosts}
            getPost={this.getPost}
          />
        </div>
      </React.Fragment>
    )
  }
}
