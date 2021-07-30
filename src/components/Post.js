import React from 'react'
import moment from 'moment'

// doesn't use this.props anymore since not a class component anymore
export const Post = (props) => {
    return (
        <li class="list-group-item">
            <p>
                <a href=".">{props.post.body}</a>
            </p>
            <div>
                <span>
                    <cite>&mdash; {props.post.userId}</cite>
                    {/* <cite>&mdash; {props.post.user.first_name} {props.post.user.last_name}</cite> */}
                    {/* Get the days passed since the post was created using moment library */}
                    <small class="float-right">{moment(props.post.dateCreated).fromNow()}</small>
                </span>
            </div>
        </li>
    )
}
