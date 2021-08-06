import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
// import firebase from '../firebase';

// doesn't use this.props anymore since not a class component anymore
export const Post = (props) => {
    // const db = firebase.firestore();
    // console.log(moment(props.post.dateCreated.toDate()).fromNow())
    // const name = db.collection('posts')

    return (
        <li className="list-group-item">
            <p>
                {
                    !props.match
                        ?
                        // props.post.postId will become the match.params.id bc of code in Main.js that sets id 
                        // Post(w/ link) -> href link -> BlogSingle -> Post(just the post's body)...
                        (<Link to={`/blog/${props.post.postId}`}>{props.post.body}</Link>)
                        :
                        // ... over here
                        props.post.body
                }
            </p>
            <div>
                <span>
                    <cite>&mdash; {props.post.userId}</cite>
                    {/* <cite>&mdash; {props.post.user.first_name} {props.post.user.last_name}</cite> */}
                    {/* Get the days passed since the post was created using moment library */}
                    <small className="float-right">{moment(props.post.dateCreated.toDate()).fromNow()}</small>
                </span>

            </div>
        </li>
    )
}