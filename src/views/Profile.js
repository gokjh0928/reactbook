import React, { useCallback, useEffect, useState } from 'react'
import { PostList } from '../components/PostList'
import { useAuth } from '../contexts/AuthContext';
import firebase from '../firebase';

export const Profile = () => {
    const db = firebase.firestore();
    // need to use useState since lifecycle methods(componentDidMount, etc) are not available
    // useState adds state to function components, and is the only thing that can change state
    // only argument to the useState() Hook is the initial state, and
    // returns current state and function that updates it
    // const [posts, setPosts] = useState([]);
    const [data, setData] = useState({});
    const [upload, setUpload] = useState({});
    // get the current logged in user from context
    const { currentUser } = useAuth();

    // An event to handle clicking of submit button
    // can pass in event object, which we name e, to actions like onClick so we can prevent page refresh
    const handleClick = (event) => {
        event.preventDefault();

        // if user uploaded an image to put on their profile, then upload it in firebase storage
        if (upload != null) {
            firebase.storage().ref(`/${currentUser.id}/profileImage.jpg/`).put(upload);
            // Create a reference to the profileImage file to add to the user document
            firebase.storage().ref().child(`/${currentUser.id}/profileImage.jpg/`).getDownloadURL()
                .then((url) => {
                    // `url` is the download URL for profile image
                    formData = {...formData, profileImage: url};
                    db.collection('users').doc(currentUser.id).set(formData);
                    // change state of form to call getUserData
                    setData(formData);
                })
                .catch((error) => {
                    // Handle any errors
                });
        }
        // from the event's target attribute, can get the value of input fields
        let formData = {
            firstName: event.target.first_name.value,
            lastName: event.target.last_name.value,
            email: event.target.email.value,
            bio: event.target.bio.value,
        }
        // now update the current user's document data with what's in the form
        db.collection('users').doc(currentUser.id).update(formData)
            .then(() => {
                // alert('Updated profile');
                getUserData();
            })
        
    }

    const getUserData = useCallback(() => {
        // console.log(currentUser)
        db.collection('users').doc(currentUser.id).get().then((doc) => {
            if (doc.exists) {
                // console.log("Document data:", doc.data());
                setData(doc.data());
                // console.log(doc.data())
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        // eslint-disable-next-line
    }, [db, currentUser]);

    // useEffect deals with side effects, and when used with useCallback can prevent reloading on functions(like getPosts below)
    // getPosts will run every time there's a change in getPosts' callback dependency(the array in 2nd input)
    useEffect(() => {
        getUserData();
    }, [getUserData]);

    // When it comes to input forms, React dispatches an event when you click the submit button,
    // and we will extract the information we need from the event
    return (
        <div>
            <h3>
                Profile | Welcome User
            </h3>
            <hr />
            <div className="row">
                <div className="col-md-4">
                    {
                        !data.profileImage
                            ?
                            // if not, use their google profile image
                            <img className="img-fluid fill-container profile-img" src={currentUser.image} alt="profile" />
                            :
                            // if user has an uploaded profile picture
                            <img className="img-fluid fill-container profile-img" src={data.profileImage} alt="profile" />
                    }
                </div>
                <div className="col-md">
                    {/* Use onSubmit to get all data on the form from event object's target attribute(also give names to input fields to get data) */}
                    <form onSubmit={(e) => handleClick(e)} action="" method="POST" encType="multipart/form-data">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="First Name" name="first_name" defaultValue={data.firstName} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Last Name" name="last_name" defaultValue={data.lastName} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <input type="email" className="form-control" placeholder="example@email.com" name="email" defaultValue={data.email} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    {/* testing out getting the image file for React */}
                                    <input type="file" onChange={(e) => { setUpload(e.target.files[0]) }} className="form-control-file" name="profile_image" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <textarea className="form-control" name="bio" id="" cols="30" rows="10" placeholder={data.bio}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <input type="submit" className="btn btn-info btn-block" value="Update Profile" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <hr />

            <div className="row">
                <div className="col-md-12">
                    <PostList />
                </div>
            </div>
        </div>
    )
}

