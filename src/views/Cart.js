import React, { useContext } from 'react'
import { CartItem } from '../components/CartItem'
import { DataContext } from '../contexts/DataProvider'

export const Cart = () =>
{
    const { cart } = useContext(DataContext);

    const handleUpdate = () => {
        console.log("It works");
        // console.log(prodQty);
    }

    return (
        <div>
            <h3>Cart</h3>
            <hr />

            <div className="card shopping-cart">
                <div className="card-header bg-dark text-light">
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    Shopping Cart
                    <a href="." className="btn btn-outline-info btn-sm pull-right">Continue Shopping</a>
                    <div className="clearfix"></div>
                </div>
                <div className="card-body">

                    {/* <!-- PRODUCTS --> */}
                    { Object.values(cart.items).map(productInfo => <CartItem key={ productInfo.id } data={ productInfo } />) }
                    {/* <!-- END PRODUCTS --> */}

                    <div className="pull-right">
                        <button onClick={() => handleUpdate()} className="btn btn-outline-secondary pull-right">
                            Update Shopping Cart
                        </button>
                    </div>
                </div>
                <div className="card-footer">
                    {/* <!-- <div className="coupon col-md-5 col-sm-5 no-padding-left pull-left">
                                        <div className="row">
                                            <div className="col-6">
                                                <input type="text" className="form-control" placeholder="cupone code">
                    </div>
                                                <div className="col-6">
                                                    <input type="submit" className="btn btn-default" value="Use cupone">
                    </div>
                                                </div>
                                            </div> --> */}
                    <div className="text-right">
                        <div className="cart-totals">
                            Subtotal: <b>$0.00</b>
                        </div>
                        <div className="cart-totals">
                            Tax: <b>$0.00</b>
                        </div>
                        <div className="cart-totals">
                            Grand total: <b>$0.00</b>
                        </div>
                    </div>
                    <div className="pull-right" style={{ margin: "10px" }}>
                        <form id="checkout-form" action="" method="POST">
                            <input type="submit" className="btn btn-success pull-right" value="Checkout" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
