// export default allows for no {} brackets since only one thing is imported
// regular export means using {} to specify what to import
import React, { useCallback, useEffect, useState } from 'react';
import { Main } from './views/Main';
// this firebase is the one we initialized in firebase.js and exported
import firebase from './firebase';
// import the useAuth from the context
import { useAuth } from './contexts/AuthContext';

// Class methods would do export default class
export const App = () => {
  // useState adds state to function components, and is the only thing that can change state
  // only argument to the useState() Hook is the initial state, and
  // returns current state and function that updates it
  const [posts, setPosts] = useState([]);

  // creates a database using firebase
  const db = firebase.firestore();
  // import signIn function from the context
  const { signIn } = useAuth();
  // console.log(signIn) WARNING THIS WILL CAUSE SO MANY READS

  // useCallback returns a memoized version of getPosts that only changes when 
  // anything in dependency array changes(db in this case)
  const getPosts = useCallback(() => {
    let newPosts = [];
    // https://firebase.google.com/docs/firestore/query-data/queries?authuser=0
    // connect to our posts collection through querying with get()
    // ourPosts is a querySnapshot that we will use as a sort of generator
    db.collection('posts').get().then(ourPosts => {
      // loop over posts in the collection(post is current post instance in the generator)
      ourPosts.forEach(post => {
        // spread post and add document's key into list(replaces slug field)
        newPosts.push({ ...post.data(), postId: post.id, })

        // post.postId wasn't available in BlogSingle, so adding a postId field to the actual document
        var post_to_update = db.collection("posts").doc(post.id);
        post_to_update.update({
          postId: post.id
        })
      })

      // update state of posts to be the newPosts list we got from querying
      setPosts(newPosts);
    })
  }, [db]);

  // useEffect deals with side effects, and when used with useCallback can prevent reloading on functions(like getPosts below)
  // getPosts will run every time there's a change in getPosts' callback dependency(the array in 2nd input)
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  // remember! render is not used in function components so you return instead
  return (
    <div>
      {/* pass in the signIn function above as a prop named signIn */}
      <Main signIn={signIn} posts={posts} />
    </div>
  )
}