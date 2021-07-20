import React, { Component } from 'react'

export default class Home extends Component {
    render() {
        return (
            <div>
                <h3>Home</h3>
                <hr />
                <form action="" method="POST">
                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-10">
                                <input class="form-control" type="text" name='body' placeholder="Your blog post here..." />
                            </div>
                            <div class="col-md-2">
                                <input class="btn btn-info btn-block" type="submit" value="Post" />
                            </div>
                        </div>
                    </div>
                </form>

                <hr />

                <ul class="list-group">
                    {this.props.posts.map(post => (
                        <li className=""></li>
                    ))}
                </ul>
            </div>
        )
    }
}

