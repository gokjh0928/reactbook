import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'

export default class Main extends Component {
    render() {
        return (
            <div>
                <header>
                    <Navbar />
                </header>
                <main>
                    <Switch>
                        <Route path={'/'} render={() => <Home />}/>
                    </Switch>
                </main>
                <footer>

                </footer>
            </div>
        )
    }
}
