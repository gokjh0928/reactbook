import React, { useContext } from 'react'
import { Product } from '../components/Product';
import { DataContext } from '../contexts/DataProvider'

export const Shop = () => {
    // get the product state from the DataProvider's Context
    const { products } = useContext(DataContext);
    return (
        <React.Fragment>
            <h3>Shop</h3>
            <hr />

            <div className="card-deck">
                {products.map(p => <Product key={p.id} product={p} />)}
            </div>
        </React.Fragment>
    )
}