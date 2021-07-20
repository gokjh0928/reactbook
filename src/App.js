import React, { Component } from 'react'
import Main from './views/Main'

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    // Pulling data from Flask API
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        this.setState({
          posts: data
        })
      })

      // Pulling data from .json file
    // fetch('./posts.json')
    //   .then(res => res.json())
    //   .then(data => {
    //     this.setState({
    //       posts: data
    //     })
    //   })
  }

  render() {

    return (
      <div>
        <Main posts={this.state.posts} />
      </div>
    )
  }
}
