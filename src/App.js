// export default allows for no {} brackets since only one thing is imported
// regular export means using {} to specify what to import
import React, { useEffect, useState } from 'react';
import { Main } from './views/Main';
import firebase from './firebase';
import { useAuth } from './contexts/AuthContext';
import { useCallback } from 'react/cjs/react.production.min';

// Class methods would do export default class
export const App = () => {
  const [posts, setPosts] = useState([]);
  const db = firebase.firestore();
  const { signIn } = useAuth();
  // console.log(signIn)

  const getPosts = useCallback(() => {
    let newPosts = [];

    // connect to our posts collection
    db.collection('posts').get().then(ourPosts => {

      // loop over the posts in the collection
      ourPosts.forEach(post => {
        // add the new document + the document's key into the list
        newPosts.push({ ...post.data(), postId: post.id, })
      })
      // set the state of the posts equal to newPosts
      setPosts(newPosts);
    })
    },
    [db],
  )

  useEffect(() => {
    getPosts();
  }, [ getPosts ]);

  // render is not used in function components
  return (
    <div>
      <Main signIn={signIn} posts={posts} />
    </div>
  )
}