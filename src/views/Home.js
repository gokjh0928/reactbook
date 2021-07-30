import React from 'react'
import { PostList } from '../components/PostList';
import { useAuth } from '../contexts/AuthContext';
import firebase from '../firebase'

export const Home = (props) => {
     // no constructor bc not a class
     
    const { currentUser } = useAuth();

    const addPost = (e) => {
        e.preventDefault();

        const formData = {
            body: e.target.body.value,
            dateCreated: new Date(),
            dateUpdated: null,
            userId: currentUser.id
        }

        firebase.firestore().collection('posts').add(formData)
            .then((docRef) => console.log('New record created'))
            .catch(err => console.error(err))

        console.log(formData);
    }

    return (
        <div>
            <h3>Home</h3>
            <hr />

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
            {/* PostList component, acting as a list of all the posts displayed on home page */}
            <PostList posts={props.posts} />

        </div>
    )
}