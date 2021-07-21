import React, { useEffect, useState } from 'react';
import { Main } from './views/Main';
import firebase from './firebase';

export const App = () => {
  const [posts, setPosts] = useState([]);
  const db = firebase.firestore();

  const getPosts = () => {
    // Pulling data from Flask API
    let newPosts = [];

    // connect to our posts collection
    db.collection('posts').get().then(ourPosts => {

      // loop over the posts in the collection
      ourPosts.forEach(post => {
        // add the new document + the document's key into the list
        newPosts.push({ ...post.data(), postId: post.id,  })
      })
      // set the state of the posts equal to newPosts
      setPosts(newPosts);
    })

    // fetch('/api/blog')
    //   .then(res => res.json())
    //   .then(data =>
    //   {
    //     setPosts(data)
    //   })

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
  }, [db]);

  return (
    <div>
      <Main posts={posts} />
    </div>
  )
}