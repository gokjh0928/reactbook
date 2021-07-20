import moment from 'moment'
import React, { Component } from 'react'

export default class Post extends Component
{
    render()
    {
        return (
            <li className="list-group-item">
                <p>
                    <a href=".">{ this.props.post.body }</a>
                </p>
                <div>
                    <span>
                        <cite>&mdash; { this.props.post.user.first_name } { this.props.post.user.last_name }</cite>
                        <small className="float-right">{ moment(this.props.post.date_created).fromNow() }</small>
                    </span>

                </div>
            </li>
        )
    }
}
