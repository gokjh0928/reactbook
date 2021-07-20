import React from 'react'
import { PostList } from '../components/PostList'

export const Home = (props) => {
    return (
        <div>
            <h3>Home</h3>
            <hr />

            <form action="" method="POST">
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

            <PostList posts={props.posts} />

        </div>
    )
}
