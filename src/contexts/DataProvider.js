import React, { useEffect, useState, createContext, useCallback } from 'react';
import firebase from '../firebase';
import { useAuth } from './AuthContext';

export const DataContext = createContext();

export const DataProvider = (props) => {
    const [posts, setPosts] = useState([]);
    const db = firebase.firestore();
    const { currentUser } = useAuth();

    const getPosts = useCallback(() => {
        let newPosts = [];

        // connect to our posts collection
        db.collection('posts').orderBy('dateCreated', 'desc').get().then(ourPosts =>
        {
            // loop over the posts in the collection
            ourPosts.forEach(post =>
            {
                // add the new document + the document's key into the list
                newPosts.push({ ...post.data(), postId: post.id, })
            })
            // set the state of the posts equal to newPosts
            setPosts(newPosts);
        })
    }, [db])

    useEffect(() => {
        if (currentUser.loggedIn) {
            getPosts();
        }
    }, [ currentUser.loggedIn, getPosts ])

    return (
        <DataContext.Provider value={ { postList: [posts, setPosts], getPosts } }>
            { props.children }
        </DataContext.Provider>
    )
}