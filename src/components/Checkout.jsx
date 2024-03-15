import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCart } from '../Store/ActionCreators/CartActionCreators'
import { useDispatch, useSelector } from 'react-redux'
import ProfileComponent from './ProfileComponent'
import {addCheckout, deleteCheckout} from "../Store/ActionCreators/CheckoutActionCreators"


export default function Checkout() {
    let navigate = useNavigate()

    let [user, setUser] = useState({})
    let [cart, setCart] = useState([])
    let [subtotal, setSubtotal] = useState(0)
    let [shipping, setShipping] = useState(0)
    let [total, setTotal] = useState(0)
    let [mode,setMode] = useState("COD")

    let dispatch = useDispatch()
    let cartStateData = useSelector((state) => state.CartStateData)

    function placeOrder(){
        let item = {
            userid:localStorage.getItem("userid"),
            orderStatus:"Order is Placed",
            paymentStatus:"pending",
            paymentMode:"COD",
            subtotal:subtotal,
            shipping:shipping,
            total:total,
            date:new Date(),
            product:cart
        }
        dispatch(addCheckout(item))
        for(let items of cart){
            dispatch(deleteCheckout({id:items.id}))
        }
        navigate("/confirmation")
    }

    async function getAPIData() {
        let response = await fetch("/user/" + localStorage.getItem("userid"), {
            method: "get",
            headers: {
                "content-type": "application/json"
            }
        })
        response = await response.json()
        if (response) {
            setUser(response)
        }
        else {
            navigate("/login")
        }

        dispatch(getCart())
        if (cartStateData.length) {
            let items = cartStateData.filter((x) => x.userid === localStorage.getItem("userid"))
            setCart(items)
            let subtotal = 0
            let shipping = 0
            let total = 0

            for (let products of items) {
                subtotal = subtotal + products.total
            }
            if (subtotal >= 0 && subtotal <= 1000)
                shipping = 150
            total = subtotal + shipping
            setSubtotal(subtotal)
            setShipping(shipping)
            setTotal(total)
        }
    }


    useEffect(() => {
        getAPIData()
    }, [cartStateData.length])
    return (
        <>
            {/* <!-- Single Page Header start --> */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Checkout</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/" className='text-light'>Home</Link></li>
                    <li className="breadcrumb-item active text-white">Checkout</li>
                </ol>
            </div>
            {/* <!-- Single Page Header End --> */}


            {/* <!-- Checkout Page Start --> */}
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <form action="#">
                        <div className="row g-5">
                            <div className="col-md-12 col-lg-6 col-xl-7">
                                <ProfileComponent heading="Billing Details" user={user} />

                            </div>
                            <div className="col-md-12 col-lg-6 col-xl-5">
                                <h5 className='bg-primary text-light text-center p-2'>Cart Items</h5>
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">Products</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cart.map((item,index)=>{
                                                    return <tr key={index}>
                                                    <th scope="row">
                                                        <div className="d-flex align-items-center mt-2">
                                                            <img src={`/product-images/${item.pic}`} className="img-fluid rounded" style={{ width: "50px", height: "50px" }} alt="" />
                                                        </div>
                                                    </th>
                                                    <td className="py-2">{item.name}</td>
                                                    <td className="py-2">&#8377;{item.price}</td>
                                                    <td className="py-2">{item.qty}</td>
                                                    <td className="py-2">&#8377;{item.total}</td>
                                                </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <table className='table table-bordered'>
                                        <tbody>
                                        <tr>
                                            <th>Subtotal</th>
                                            <tr>&#8377;{subtotal}</tr>
                                        </tr>
                                        <tr>
                                            <th>Shipping</th>
                                            <tr>&#8377;{shipping}</tr>
                                        </tr>
                                        <tr>
                                            <th>Total</th>
                                            <tr>&#8377;{total}</tr>
                                        </tr>
                                        <tr>
                                            <th>Payment Mode</th>
                                            <tr>
                                                <select name="mode" className='form-select'>
                                                    <option value="COD">COD</option>
                                                    <option value="Net Banking">Net Banking/Card/UPI</option>
                                                </select>
                                            </tr>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="row g-4 text-center align-items-center justify-content-center">
                                    <button type="button" className="btn btn-primary text-uppercase w-100 text-light" onClick={placeOrder}>Place Order</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/* <!-- Checkout Page End --> */}

        </>
    )
}
