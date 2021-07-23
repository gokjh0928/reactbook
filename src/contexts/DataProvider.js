import React, { useEffect, useState, createContext, useCallback } from 'react';
import firebase from '../firebase';
import { useAuth } from './AuthContext';
import Stripe from 'stripe';

export const DataContext = createContext();

export const DataProvider = (props) => {
    const db = firebase.firestore();
    const [posts, setPosts] = useState([]);
    const [products, setProducts] = useState([])
    const { currentUser } = useAuth();

    useEffect(() => {
        var newProducts = []
        fetch('/api/shop/products')
            .then(res => res.json())
            .then(products => {
                // console.log(products.data)
                newProducts = [...products.data];
                
                // Need to pull penny values of price and tax attributes from each product (only because I want a quick reference to it.)
                // Don't normally want to do any heavy lifting once you're trying to focus on building things in the lower level components 
                let productList = [];
                for (const p of newProducts) {
                    let newP = { 
                        ...p, 
                        price: parseInt(parseFloat(p.metadata.price) * 100), 
                        tax: parseInt(parseFloat(p.metadata.tax) * 100)
                    }
                    productList.push(newP);
                }
                setProducts(productList)
            })
    }, [])

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
        <DataContext.Provider value={ { postList: [posts, setPosts], getPosts, products } }>
            { props.children }
        </DataContext.Provider>
    )
}