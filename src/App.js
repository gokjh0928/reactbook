import React, { Component } from 'react'
import Main from './views/Main'

export default class App extends Component {
  constructor() {
    console.log('Constructed')
    super();

    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    console.log('Mounted')
    fetch('./posts.json')
      .then(res => res.json())
      .then(data => {
        this.setState({
          posts: data
        })
      })
  }

  render() {
    console.log('Rendered')

    return (
      <div>
        <Main posts={this.state.posts} />
      </div>
    )
  }
}
