import React from 'react';
import moment from 'moment';

export const Post = (props) => {
    return (
        <li className="list-group-item">
            <p>
                <a href=".">{props.post.body}</a>
            </p>
            <div>
                <span>
                    <cite>&mdash; {props.post.user.first_name} {props.post.user.last_name}</cite>
                    <small className="float-right">{moment(props.post.date_created).fromNow()}</small>
                </span>

            </div>
        </li>
    )
}
