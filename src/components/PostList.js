import React from 'react'
import { Post } from './Post'

export const PostList = (props) => {
    return (
        <ul class="list-group">
            {/* Get each post from posts and create a Post with a key */}
            {/* Need a key prop for each post since each child in a list should have a unique key prop */}
            {props.posts.map(p => <Post key={p.postId} post={p} />)}
        </ul>
    )
}

