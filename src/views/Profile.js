import React, { Component } from 'react'
import PostList from '../components/PostList';

export default class Profile extends Component
{
    constructor() {
        super();

        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        fetch('/api/blog/user')
            .then( res => res.json() )
            .then( data => this.setState({ posts: data }) )
    }

    handleClick = (event) => {
        event.preventDefault();

        let formData = {
            firstName: event.target.first_name.value,
            lastName: event.target.last_name.value,
            email: event.target.email.value,
            bio: event.target.bio.value,
            profileImage: event.target.profile_image.value,
        }

        console.log(formData);
    }

    render()
    {
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
                        <form onSubmit={(e) => this.handleClick(e)} action="" method="POST" encType="multipart/form-data">
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
                        <PostList posts={this.state.posts} />
                    </div>
                </div>
            </div>
        )
    }
}
