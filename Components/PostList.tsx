import React, { Component } from 'react';

export interface IProps {
  allPosts: any
  getPost: any
}
class PostList extends Component<IProps, {}> {
  constructor(props: any, state: any) {
    super(props);
    this.state = {
      allPosts: [] as any[]
    }
  }


  onPostEdit = (id: any) => {
    // console.log("onPostEdit: ", id)
    this.props.getPost(id);
  }
  render() {
    // console.log("allPosts: ", this.props.allPosts)
    const postItems = this.props.allPosts.map((item: any, index: any) => (
      <div key={index}>
        <h3>
          {item.title}
        </h3>
        <p>
          {item.body}
        </p>
        <button onClick={() => this.props.getPost(item.id)}>Edit</button>
      </div>
    ))
    return (
      <React.Fragment>
        <h2>
          Posts
        </h2>
        {postItems}
      </React.Fragment>
    )
  }
}

export default PostList;