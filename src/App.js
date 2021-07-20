import React, { useEffect, useState } from 'react';
import { Main } from './views/Main';

export const App = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    // Pulling data from Flask API
    fetch('/api/blog')
      .then(res => res.json())
      .then(data =>
      {
        setPosts(data)
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

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <Main posts={posts} />
    </div>
  )
}