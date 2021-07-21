import React from 'react';
import { Post } from './Post'

export const PostList = (props) => {
    return (
        <ul className="list-group">
            {props.posts.map(p => <Post key={p.postId} post={p} />)}
        </ul>
    )
}
