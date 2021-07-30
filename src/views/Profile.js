import React, { useEffect, useState } from 'react'
import { PostList } from '../components/PostList'

export const Profile = () => 
{
    // need to use useState since lifecycle methods(componentDidMount, etc) are not available
    // useState takes in two arguments(a list, a function), where function acts on list, like map
    // useState is the only thing that can change state
    // format is const [state, setstate] = useState(initialState)

    const [posts, setPosts] = useState([]);

    // useEffect Hook is componentDidMount, componentDidUpdate, componentWillUnmount combined
    useEffect(() => {
        fetch('/api/blog/user')
            .then(res => res.json())
            // updates the posts "state"
            .then(data => setPosts(data))
    })

    // An event to handle clicking of submit button
    // can pass in event object, which we name e, to actions like onClick so we can prevent page refresh
    const handleClick = (event) => {
        event.preventDefault();
        
        // from the event's target attribute, can get the value of input fields
        let formData = {
            firstName: event.target.first_name.value,
            lastName: event.target.last_name.value,
            email: event.target.email.value,
            bio: event.target.bio.value,
            profileImage: event.target.profile_image.value,
        }

        console.log(formData);
    }

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
                        <img className="img-fluid" src="" alt="profile" />
                    </div>
                    <div className="col-md">
                        {/* Use onSubmit to get all data on the form from event object's target attribute(also give names to input fields to get data) */}
                        <form onSubmit={(e) => handleClick(e)} action="" method="POST" encType="multipart/form-data">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="First Name" name="first_name" defaultValue="" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Last Name" name="last_name" defaultValue="" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input type="email" className="form-control" placeholder="example@email.com" name="email" defaultValue="" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input type="file" className="form-control-file" name="profile_image" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <textarea className="form-control" name="bio" id="" cols="30" rows="10" placeholder="Type bio here"></textarea>
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
                        <PostList posts={posts}/>
                    </div>
                </div>
            </div>
        )
}

