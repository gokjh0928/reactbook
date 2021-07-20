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
                    <li class="list-group-item">
                        <p>
                            <a href=".">Paragraph</a>
                        </p>
                        <div>
                            <span>
                                <cite>&mdash; First Last</cite>
                                <small class="float-right">Time</small>
                            </span>

                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

