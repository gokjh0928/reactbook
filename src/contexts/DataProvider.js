import React, { useEffect, useState, createContext, useCallback } from 'react';
import firebase from '../firebase';
// need useAuth bc we're gonna get our current user's Product info in this component
import { useAuth } from './AuthContext';
// import Stripe from 'stripe';


export const DataContext = createContext();

// Top level component("wrapper") that manages the state of all of our posts
export const DataProvider = (props) => {
    const db = firebase.firestore();
    // the states here are the "global" variables that will be used by child components
    const [posts, setPosts] = useState([]);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({ items: {}, quantity: 0, subtotal: 0, grandtotal: 0 });
     // can choose one property out of the multiple, which is feature in ES6
    const { currentUser } = useAuth();

    function getCart() {
        // show their database copy of the cart
        let data = {};
        let quantity = 0;
        let subtotal = 0;
        let grandtotal = 0;
        let taxes = 0;

        db.collection('users').doc(currentUser.id).collection('cart').get()
            .then(snapshot => {
                snapshot.forEach(ref => {
                    let product = ref.data();
                    data[ref.id] = product

                    // update cart values
                    quantity += product.quantity;
                    subtotal += parseFloat(product.price) * quantity;
                    taxes += parseFloat(product.tax) * quantity;
                    grandtotal += subtotal + taxes;
                })
                setCart({
                    items: data,
                    quantity,
                    subtotal: (subtotal / 100).toFixed(2),
                    taxes: (taxes / 100).toFixed(2),
                    grandtotal: (grandtotal / 100).toFixed(2)
                });
            })
    }
    useEffect(() => {
        if (currentUser.loggedIn) {
            // console.log(currentUser);
            // if they have items in their cart
            if (cart.hasOwnProperty('items')) {
                getCart()
            }
        }
        // eslint-disable-next-line
    }, [db, currentUser.loggedIn])

    
    // Stripe wasn't able to list all Products, so doing a workaround using our Flask app
    useEffect(() => {
        var newProducts = []
        fetch('/api/shop/products')
            .then(res => res.json())
            .then(products => {
                // console.log(products.data)
                // spread the products and put each into an array
                newProducts = [...products.data];

                // Need to pull penny values of price and tax attributes from each product (only because I want a quick reference to it.)
                // Don't normally want to do any heavy lifting once you're trying to focus on building things in the lower level components 
                let productList = [];
                for (const p of newProducts) {
                    let newP = {
                        // spread out each detail of the product...
                        ...p,
                        // and then from its metadata convert price into integers and then into cents
                        price: parseInt(parseFloat(p.metadata.price) * 100),
                        tax: parseInt(parseFloat(p.metadata.tax) * 100)
                    }
                    productList.push(newP);
                }
                // set product state
                setProducts(productList)
            })
    }, [])
    // (above empty array's purpose?)
    // If you want to run an effect and clean it up only once (on mount and unmount), 
    // you can pass an empty array ([]) as a second argument. This tells React that your 
    // effect doesn’t depend on any values from props or state, so it never needs to re-run

    const getPosts = useCallback(() => {
        let newPosts = [];

        // connect to our posts collection, order by date with latest post coming first
        db.collection('posts').orderBy('dateCreated', 'desc').get().then(ourPosts => {
            // loop over the posts in the collection
            ourPosts.forEach(post => {
                // add the new document + the document's key into the list
                newPosts.push({ ...post.data(), postId: post.id, })
            })
            // set the state of the posts equal to newPosts
            setPosts(newPosts);
        })
    }, [db])

    // check if currentUser's login status changed or if anything in the posts changed
    useEffect(() => {
        if (currentUser.loggedIn) {
            getPosts();
        }
    }, [currentUser.loggedIn, getPosts])

    return (
        // can pass in a list containing the post state and setPosts to children
        // All consumers that are descendants of a Provider will re-render whenever the Provider’s value prop changes
        <DataContext.Provider value={{ postList: [posts, setPosts], getPosts, products, getCart, cart, setCart }}>
            {props.children}
        </DataContext.Provider>
    )
}
