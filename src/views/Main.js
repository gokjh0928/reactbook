import React from 'react';
import { Navbar } from '../components/Navbar';
import { Switch, Route } from 'react-router-dom';
import { Home } from './Home';
import { Profile } from './Profile';
import { Contact } from './Contact';
import '../custom.css';
import { Cart } from './Cart';
import { BlogSingle } from './BlogSingle';
import { Shop } from './Shop';
import { useAuth } from '../contexts/AuthContext';
import { NotAuthenticated } from './NotAuthenticated';

// index -> App -> Main -> Navbar, Home, Profile, Contact
// posts -> App(state) -> Main(props) -> Home(props)
export const Main = (props) => {
    const { currentUser } = useAuth();
    return (
        <div>
            <header>
                {/* signIn: AuthContext -> App -> Main -> Navbar */}
                <Navbar signIn={props.signIn} />
            </header>

            <main className="container">
                {
                    // Restrict Routes if user is not logged in
                    !currentUser.loggedIn
                        ?
                        <React.Fragment>
                            <NotAuthenticated />
                        </React.Fragment>
                        :
                        <Switch>
                            {/* MAIN ROUTES */}
                            {/* Continue passing posts prop we got from App.js into Home.js */}
                            <Route exact path={'/'} render={() => <Home posts={props.posts} />} />
                            <Route exact path={'/profile'} render={() => <Profile />} />
                            <Route exact path={'/contact'} render={() => <Contact />} />
                            {/* BLOG ROUTE */}
                            {/* https://reactrouter.com/web/api/match */}
                            {/* We can see that the :id portion will dynamically get id from blog Post using href (see Post.js)*/}
                            {/* Pass in the match object as parameter(which contains 'url') and pass into BlogSingle as prop */}
                            {/* Route component as this.props.match
                            Route render as ({ match }) => ()
                            Route children as ({ match }) => () */}
                            <Route exact path={'/blog/:id'} render={({ match }) => <BlogSingle match={match} />} />                            
                            {/* SHOP ROUTES */}
                            <Route exact path={'/shop'} render={() => <Shop />} />
                            <Route exact path={'/shop/cart'} render={() => <Cart />} />
                        </Switch>
                }
            </main>

            <footer>

            </footer>
        </div>
    )
}