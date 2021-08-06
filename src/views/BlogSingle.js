import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Post } from '../components/Post'
// get firebase instance from firebase.js
import firebase from '../firebase'

// need to alter url for each blog post dynamically(in Main.js)
export const BlogSingle = (props) => {
    const [post, setPost] = useState({})
    const db = firebase.firestore();
    // Initialize the state of the post to indicate it being loaded
    const postState = useRef('LOADING');

    // useCallback returns a memoized version of getPosts that only changes when 
    // anything in dependency array changes(db in this case)
    const getPost = useCallback(() => {
        // props.match.params.id is the post id from the URL, corresponding to the dynamic segments
        db.collection('posts').doc(props.match.params.id).get()
        // query the document from firebase and set the current post state equal to its data
            .then(doc => { 
                // got the post, so change the state of the post from LOADING to LOADED
                postState.current = 'LOADED';
                setPost(doc.data());
            })
            .catch(err => console.log(err))
        },[db, props.match.params.id])

    // useEffect deals with side effects, and when used with useCallback can prevent reloading on functions(like getPosts below)
    // getPosts will run every time there's a change in getPosts' callback dependency(the array in 2nd input)
    useEffect(() => {
        getPost();
    }, [getPost]);

    // FIXED ERROR!!!! YAYYYYY!
    // console.log('post is this')
    // console.log(post.postId)
    // console.log(props.match.params.id)
    return (
        // <Post key={props.match.params.id} post={post}/>
        <React.Fragment>
            {
                // If the postState is not loading, then show the Post, else display loading screen
                postState.current !== 'LOADING'
                    ?
                    // we pass in the match object so that Post can tell that it only needs to display post body
                    <Post match={props.match} key={post.postId} post={post} />
                    :
                    <p>Blog post loading...</p>
            }
        </React.Fragment>
    )
}
