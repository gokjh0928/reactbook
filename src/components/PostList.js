import React, { useContext } from 'react'
import { DataContext } from '../contexts/DataProvider'
import { Post } from './Post'

export const PostList = (props) => {
    // This will let us use posts from upper level Component directly(DataProvider) 
    // instead of being passed level-by-level through props
    const { postList } = useContext(DataContext);
    // ES6 destructuring arrays: https://stackoverflow.com/questions/1629539/what-do-square-brackets-around-an-expression-mean-e-g-var-x-a-b
    const [ posts ] = postList;
    

    return (
        <ul className="list-group">
            {/* Get each post from posts and create a Post with a key */}
            {/* Need a key prop for each post bc each child should have a unique key prop so we can target them */}
            {posts.map(p => <Post key={p.postId} post={p} />)}
        </ul>
    )
}

