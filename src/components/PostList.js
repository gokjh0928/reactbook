import React, { Component } from 'react'
import Post from './Post'

export default class PostList extends Component {
    render() {
        return (
            <ul class="list-group">
                {this.props.posts.map(p => <Post key={p.id} post={p}/>)}
            </ul>
        )
    }
}
