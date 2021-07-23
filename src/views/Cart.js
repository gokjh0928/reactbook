import React from 'react'

export const Cart = () =>
{
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
                    {/* <!-- PRODUCT --> */}
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-2 text-center">
                            <img className="img-responsive" src="" alt="prewiew" width="120" height="80" />
                        </div>
                        <div className="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
                            <h4 className="product-name"><strong></strong></h4>
                            <h4>
                                <small></small>
                            </h4>
                        </div>
                        <div className="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
                            <div className="col-3 col-sm-3 col-md-6 text-md-right" style={{ paddingTop: "5px" }}>
                                <h6><strong>$ <span className="text-muted">x</span></strong></h6>
                            </div>
                            <div className="col-4 col-sm-4 col-md-4">
                                <div className="quantity">
                                    <input type="number" step="1" max="99" min="1" value="" title="Qty" className="qty" size="4" />
                                </div>
                            </div>
                            <div className="col-2 col-sm-2 col-md-2 text-right">
                                <button type="button" className="btn btn-outline-danger btn-xs">
                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr />
                    {/* <!-- END PRODUCT --> */}
                    <div className="pull-right">
                        <a href="." className="btn btn-outline-secondary pull-right">
                            Update Shopping Cart
                        </a>
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
