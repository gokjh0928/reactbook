import React, { Component } from 'react'

export default class Post extends Component {
    render() {
        return (
            <li className="list-group-item">
                <p>
                    <a href=".">{this.props.post.body}</a>
                </p>
                <div>
                    <span>
                        <cite>&mdash; {this.props.post.user.firstName} {this.props.post.user.lastName}</cite>
                        <small className="float-right">Time</small>
                    </span>

                </div>
            </li>
        )
    }
}
