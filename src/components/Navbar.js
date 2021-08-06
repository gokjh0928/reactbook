import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
// import firebase from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { DataContext } from '../contexts/DataProvider';

export const Navbar = (props) => {
    // get the currentUser and logout function from the React App's context
    const { currentUser, logout } = useAuth();
    const { cart, setCart } = useContext(DataContext);

    // function to handle login onClick
    const handleLogin = (e) => {
        e.preventDefault();
        // signIn: AuthContext -> App -> Main -> Navbar
        props.signIn();
    }

    // function to handle logout onClick
    const handleLogout = (e) => {
        e.preventDefault();
        setCart({ items: {}, quantity: 0, subtotal: 0, grandtotal: 0 });
        logout();
    }
    // https://firebase.google.com/docs/firestore/manage-data/add-data?authuser=0
    // To create or overwrite a single document after querying, use the set() method:

    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link className="navbar-brand" to="/">Reactbook</Link>
            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/profile">Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/contact">Contact</Link>
                    </li>
                    <li className="nav-item dropdown">
                        {/* Have this as an achor tag going nowhere since clicking the Shop link shouldn't do anything */}
                        <a className="nav-link dropdown-toggle" href="." id="dropdownId" data-toggle="dropdown">
                            Shop
                            
                        </a>
                        <div className="dropdown-menu" aria-labelledby="dropdownId">
                            <Link className="dropdown-item" to="/shop">Products</Link>
                            <Link className="dropdown-item" to="/shop/cart">
                                <span style={{ marginRight: '10px' }}>
                                    Cart
                                </span>
                                <span className="badge badge-secondary">
                                    <i className="fa fa-shopping-cart cart-icon"> {cart.quantity} | ${cart.subtotal} </i>
                                </span>
                            </Link>
                            
                        </div>
                        <li className="nav-item">

                            
                            {/* <Link className="nav-link" to="/contact">Contact</Link> */}
                        </li>
                    </li>
                    
                </ul>
                {/* <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form> */}
                <ul className="navbar-nav ml-auto">
                    {
                        !currentUser.loggedIn
                            ?
                            <li className="nav-item">
                                <Link onClick={(e) => handleLogin(e)} className="nav-link" to="">Login</Link>
                            </li>
                            :
                            <li className="nav-item">
                                <Link onClick={(e) => handleLogout(e)} className="nav-link" to="">Logout</Link>
                            </li>
                    }
                </ul>
            </div>
        </nav>
    )
}