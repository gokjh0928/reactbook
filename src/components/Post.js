import React from 'react';
import moment from 'moment';

export const Post = (props) => {
    return (
        <li className="list-group-item">
            <p>
                {
                    !props.match
                    ?
                        (<a href={`/blog/${ props.post.postId }`}>{props.post.body}</a>)
                    :
                        (<p>{props.post.body}</p>)
                }
            </p>
            <div>
                <span>
                    <cite>&mdash; {props.post.userId}</cite>
                    {/* <cite>&mdash; {props.post.user.first_name} {props.post.user.last_name}</cite> */}
                    <small className="float-right">{moment(props.post.dateCreated).fromNow()}</small>
                </span>

            </div>
        </li>
    )
}
