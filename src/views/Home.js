import React, { useContext } from 'react'
import { PostList } from '../components/PostList';
import { useAuth } from '../contexts/AuthContext';
import { DataContext } from '../contexts/DataProvider';
import firebase from '../firebase'
import { NotAuthenticated } from './NotAuthenticated';

export const Home = (props) => {
    // no constructor bc not a class
    const { currentUser } = useAuth();
    // get the Data Context so we can update the posts directly in DataProvider using setPosts
    // destructure and get postList using {} since getting it from an object, { postList: [posts, setPosts], getPosts }
    const { postList, getPosts } = useContext(DataContext);
    // destructure using [] since getting from an array, [posts, setPosts]
    // const [ setPosts ] = postList;


    // addPost now will update Home page in realtime since it will change firebase db: firebase firestore data changes ->
    // getPosts -> useEffect -> update post state -> change in Context Provider changes childrens' values -> Home.js PostList updates
    const addPost = (e) => {
        e.preventDefault();

        // only works when there is a currentUser(logged in user)
        const formData = {
            body: e.target.body.value,
            // use the timestamp object specific to firebase
            dateCreated: firebase.firestore.Timestamp.fromDate(new Date()),
            dateUpdated: null,
            userId: currentUser.id
        }

        // adds a post in Firebase posts collection
        firebase.firestore().collection('posts').add(formData)
            .then((docRef) => {
                // In the db, the posts are already supplied. This is where we will re-render/update our list of posts in the DOM.
                getPosts();
                console.log('New record created');
            })
            .catch(err => console.error(err))

        // console.log(formData);
    }

    return (
        <div>
            {
                !currentUser.loggedIn
                    ?
                    <NotAuthenticated />
                    :
                    <React.Fragment>
                        <h3 style={{ fontSize: '35px' }}>Home</h3>
                        <hr />
                        {/* Use onSubmit to get fields from event object for addPost */}
                        <form onSubmit={(e) => addPost(e)} action="" method="POST">
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-10">
                                        <input className="form-control" type="text" name='body' placeholder="Your blog post here..." />
                                    </div>
                                    <div className="col-md-2">
                                        <input className="btn btn-info btn-block" type="submit" value="Post" />
                                    </div>
                                </div>
                            </div>
                        </form>

                        <hr />
                        {/* Since we're getting postList from DataProvider, we just need to get the list of posts in its 0th index*/}
                        {/* This will allow the postList on Home.js to be updated without refreshing! */}
                        <PostList posts={postList[0]} />
                    </React.Fragment>
            }
        </div>
    )
}