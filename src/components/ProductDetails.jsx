import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getProduct } from "../Store/ActionCreators/ProductActionCreators"
import { addCart, getCart } from "../Store/ActionCreators/CartActionCreators"
import { addWishlist, getWishlist } from "../Store/ActionCreators/WishlistActionCreators"
import { useDispatch, useSelector } from 'react-redux'
import ProductSlider from './ProductSlider'




export default function ProductDetails() {
    let [qty, setQty] = useState(1)
    let [products, setProducts] = useState({})
    let [relatedProducts, setRelatedProducts] = useState([])
    let { id } = useParams()

    let navigate = useNavigate()

    let dispatch = useDispatch()
    let productStateData = useSelector((state) => state.ProductStateData)
    let cartStateData = useSelector((state) => state.CartStateData)
    let wishlistStateData = useSelector((state) => state.WishlistStateData)

    function addToCart(){
        let item = cartStateData.find((x)=>x.productid===id && x.userid===localStorage.getItem("userid"))
        if(!item){
            item = {
                productid:id,
                userid:localStorage.getItem("userid"),
                name:products.name,
                brand:products.brand,
                color:products.color,
                size:products.size,
                price:products.finalprice,
                qty:qty,
                total:products.finalprice*qty,
                pic:products.pic1
            }
            dispatch(addCart(item))
        }
        navigate("/cart")
    }

    function addToWishlist(){
        let item = wishlistStateData.find((x)=>x.productid===id && x.userid===localStorage.getItem("userid"))
        if(!item){
            item = {
                productid:id,
                userid:localStorage.getItem("userid"),
                name:products.name,
                brand:products.brand,
                color:products.color,
                size:products.size,
                price:products.finalprice,
                pic:products.pic1
            }
            dispatch(addWishlist(item))
        }
        navigate("/profile")
    }


    function getAPIData() {
        dispatch(getProduct())
        dispatch(getCart())
        dispatch(getWishlist())
        if (productStateData) {
            let item = productStateData.find((x) => x.id === id)
            if (item) {
                setProducts(item)
                setRelatedProducts(productStateData.filter((x) => x.maincategory === item.maincategory))
            }
        }
    }

    useEffect(() => {
        getAPIData()
    }, [productStateData.length,cartStateData.length,wishlistStateData.length])
    return (
        <>
            {/* <!-- Single Page Header start --> */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Shop Detail</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/" className='text-light'>Home</Link></li>
                    <li className="breadcrumb-item active text-white">Product Details</li>
                </ol>
            </div>
            {/* <!-- Single Page Header End --> */}


            {/* <!-- Single Product Start --> */}
            <div className="container-fluid py-5 mt-2">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-6">
                            <div id="carouselExampleIndicators" className="carousel slide">
                                <div className="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                                </div>
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src={`/product-images/${products.pic1}`} height="450px" className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src={`/product-images/${products.pic2}`} height="450px" className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src={`/product-images/${products.pic3}`} height="450px" className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src={`/product-images/${products.pic4}`} height="450px" className="d-block w-100" alt="..." />
                                    </div>
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                                <div className='d-flex my-1'>
                                    <img src={`/product-images/${products.pic1}`} data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" height={100} className='w-100' alt="" />
                                    <img src={`/product-images/${products.pic2}`} data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" height={100} className='w-100' alt="" />
                                    <img src={`/product-images/${products.pic3}`} data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" height={100} className='w-100' alt="" />
                                    <img src={`/product-images/${products.pic4}`} data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" height={100} className='w-100' alt="" />
                                </div>
                        </div>
                        
                        <div className="col-lg-6">
                            <h4 className="fw-bold mb-3">{products.name}</h4>
                            <p className="mb-3">Category: {products.maincategory}/{products.subcategory}/{products.brand}</p>
                            <h5 className="fw-bold mb-3"><del className='text-danger'>&#8377;{products.baseprice}</del>  &#8377;{products.finalprice} <sup className='text-success'>{products.discount}% off</sup></h5>
                            <div className="d-flex mb-4">
                                <i className="fa fa-star text-secondary"></i>
                                <i className="fa fa-star text-secondary"></i>
                                <i className="fa fa-star text-secondary"></i>
                                <i className="fa fa-star text-secondary"></i>
                                <i className="fa fa-star"></i>
                            </div>
                            <p>Color : {products.color}</p>
                            <p>Size : {products.size}</p>
                            <p>Stock : {products.stock === "In Stock" ? "Available" : "Not Available"}</p>

                            {
                                products.stock==="In Stock"?
                                <>
                                <div className="input-group quantity mb-2" style={{ width: "200px" }}>
                                <div className="input-group-btn">
                                    <button className="btn btn-sm btn-minus rounded-circle bg-light border" onClick={() => qty > 1 ? setQty(qty - 1) : ""} >
                                        <i className="fa fa-minus"></i>
                                    </button>
                                </div>
                                <p className='mx-3'>{qty}</p>
                                <div className="input-group-btn">
                                    <button className="btn btn-sm btn-plus rounded-circle bg-light border" onClick={() => setQty(qty + 1)}>
                                        <i className="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <button className="btn border border-primary rounded-pill px-4 py-2 mb-4 text-primary" onClick={addToCart} ><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</button>
                                </>:""
                            }
                            <button className="btn border border-primary rounded-pill px-4 py-2 mb-4 text-primary" onClick={addToWishlist}><i className="fa fa-heart me-2 text-primary"></i> Add to wishlist</button>
                            <div className="mb-4">
                                <div dangerouslySetInnerHTML={{ __html: products.description }} />
                            </div>
                        </div>
                    </div>


                    <h4 className="fw-bold mt-3 text-center">Related products</h4>
                    <ProductSlider data = {relatedProducts}/>
                </div>
            </div>
            {/* <!-- Single Product End --> */}


        </>
    )
}
