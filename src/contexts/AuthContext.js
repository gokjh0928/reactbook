import React, { useContext, useEffect, useRef, useState } from 'react';
import firebase from '../firebase';


// AuthContext's purpose is to provide a context for the entire app so any component knows
// whether or not a person is logged in and if so, who it is

// When a user logs in, we will inject a key value pair representing the user into the
// entire application-wide context

// create the React Context itself for this app which provides access to Provider and Consumer component
const AuthContext = React.createContext();


// this allows for a component to access the AuthContext above, which acts as a sort of global variable
export function useAuth() {
    // https://reactjs.org/docs/hooks-reference.html#usecontext
    // useContext accepts a context object(returned from React.createContext), AuthContext
    // then returns current context value for that context
    // Current context value is value prop of nearest 
    // < MyContext.Provider > above the calling component in the tree.
    return useContext(AuthContext);
}

// { children } == {children: children}
// AuthProvider will be a component used as a "wrapper" of sorts(like "Router") that will allow for
// the children to use useAuth thus accessing the authContext, along with setting up current user and authentication processes
export const AuthProvider = ({ children }) => {
    const childRef = useRef();
    // initialize state for current user, which is object containing a loggedIn property initialized to false
    const [currentUser, setCurrentUser] = useState({ loggedIn: false });

    // sets up the Google authentication
    const auth = new firebase.auth.GoogleAuthProvider();
    
    function signIn() {
        // altered the sign in functionality from // https://firebase.google.com/docs/auth/web/google-signin?authuser=0  
        // with https://firebase.google.com/docs/auth/web/auth-state-persistence?authuser=0
        // persist data AKA hold data(LOCAL lets it persist even when browser is closed, like modern services)
        return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                firebase.auth().signInWithPopup(auth)
                    .then((res) => {
                        console.log(res.user);
                        // now get the uid of the user once they sign in with Google account and check if it's inside firestore
                        firebase.firestore().collection('users').doc(res.user.uid).get()
                            .then((snapshot) => {
                                // if the user's uid isn't in the database(likely first time signing in with Google account)...
                                if (!snapshot.exists) {
                                    // ... then add a new document containing user's name
                                    firebase.firestore().collection('users').doc(res.user.uid).set({
                                        name: res.user.displayName
                                    })
                                }
                            })
                    });
            })
            // catch error(err.code, err.message, err.email, err.credential)
            .catch(err => console.error(`${err.code}\n${err.message}`))
    }

    function logout() {
        firebase.auth().signOut()
            .then(() => console.log('Logged out sucessfully.'))
            .catch(err => console.error(err))
    }

    // useEffect Hook is componentDidMount, componentDidUpdate, componentWillUnmount combined
    useEffect(() => {
        // onAuthStateChanged adds an observer for changes to the user's sign-in state.
        // Firebase knows whether we log in or out. If it detects a change, the user object will be updated by setCurrentUser.
        const subscribe = firebase.auth().onAuthStateChanged(u => {
            // user object might be empty, so check if has values
            if (u) {
                setCurrentUser({
                    id: u.uid,
                    name: u.displayName,
                    image: u.photoURL,
                    email: u.email,
                    loggedIn: true
                });
            }
            else {
                setCurrentUser({ loggedIn: false })
            }
        })
        return subscribe;
    }, [])
    
    // created a separate component for the authentication context in order to return these values
    const value = { currentUser, signIn, logout };
    // Above is a shorthand way of doing the code below, assumes that the key and value are the same name
    // const value = { 
    //     currentUser: currentUser,
    //     signIn: signIn
    // };

    return (
        // returns a context provider with the value of { currentUser, signIn, logout } to its children and a reference to childRef
        <AuthContext.Provider value={value} ref={childRef}>
            {/* this means that all children nested within this component(App) will inherit this */}
            {children}
        </AuthContext.Provider>
    )
}
