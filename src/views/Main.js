import React from 'react';
import { Navbar } from '../components/Navbar';
import { Switch, Route } from 'react-router-dom';
import { Home } from './Home';
import { Profile } from './Profile';
import { Contact } from './Contact';
import '../custom.css';
import { Products } from './Products';
import { Cart } from './Cart';

export const Main = (props) =>
{
    return (
        <div>
            <header>
                <Navbar />
            </header>

            <main className="container">
                <Switch>
                    <Route exact path={'/'} render={() => <Home posts={props.posts} />} />
                    <Route exact path={'/profile'} render={() => <Profile />} />
                    <Route exact path={'/contact'} render={() => <Contact />} />
                    <Route exact path={'/shop'} render={() => <Products />} />
                    <Route exact path={'/shop/cart'} render={() => <Cart />} />
                </Switch>
            </main>

            <footer>

            </footer>
        </div>
    )
}