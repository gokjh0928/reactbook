import React from 'react'

export const Product = (props) => {
    const handleClick = (obj) => {
        console.log(obj);
    }

    return (
        <div className="col-4">
            <div className="card">
                <div className="card-header">
                    <h6>
                        { props.product.name }
                        <span className="float-right">${ props.product.metadata.price }</span>
                    </h6>
                </div>
                <div className="card-body">
                    <img className="card-img-top" src={ props.product.images[0] } alt={ props.product.name } />
                    <button onClick={() => handleClick(props.product)} className="btn btn-success btn-block" style={{ marginTop: '10px' }}>Add to cart</button>
                    <p className="card-text" style={{ marginTop: '10px' }}>{ props.product.description }</p>
                </div>
            </div>
        </div>
    )
}
