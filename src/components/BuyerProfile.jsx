import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteWishlist, getWishlist } from '../Store/ActionCreators/WishlistActionCreators'
import { getCheckout } from '../Store/ActionCreators/CheckoutActionCreators'
import { useDispatch, useSelector } from 'react-redux'
import ProfileComponent from './ProfileComponent'


export default function BuyerProfile() {
  let navigate = useNavigate()

  let [user, setUser] = useState({})
  let [wishlist, setWishlist] = useState([])
  let [order, setOrder] = useState([])

  let dispatch = useDispatch()
  let wishlistStateData = useSelector((state) => state.WishlistStateData)
  let checkoutStateData = useSelector((state) => state.CheckoutStateData)

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

    dispatch(getWishlist())
    if (wishlistStateData.length)
      setWishlist(wishlistStateData.filter((x) => x.userid === localStorage.getItem("userid")))

    dispatch(getCheckout())
    if (checkoutStateData.length)
      setOrder(checkoutStateData.filter((x) => x.userid === localStorage.getItem("userid")))
  }

  function deleteItem(id) {
    if (window.confirm("Are You Sure To Delete This Item")) {
      dispatch(deleteWishlist({ id: id }))
      getAPIData()
    }
  }

  useEffect(() => {
    getAPIData()
  }, [wishlistStateData.length, checkoutStateData.length])


  return (
    <>
      {/* <!-- Single Page Header start --> */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Buyer Profile</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/" className='text-light'>Home</Link></li>
          <li className="breadcrumb-item active text-white">Buyer</li>
        </ol>
      </div>
      {/* <!-- Single Page Header End --> */}

      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-6">
            {
              user.pic ? <img src={`/product-images/${user.pic}`} height="430px" width="100%" alt="" className='rounded-circle' /> : <img src="/img/no-user-image.jpg" height="430px" width="100%" alt='' />
            }
          </div>

          <div className="col-md-6">
            <ProfileComponent heading="Buyer Profile" user={user} />
          </div>
        </div>
        <h5 className='bg-primary text-light text-center p-2 my-3'>Wishlist Section</h5>
        {
          wishlist.length ?
            <div className='table-responsive'>
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th>Pic</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    wishlist.map((item, index) => {
                      return <tr key={index}>
                        <td>
                          <a href={`/product-images/${item.pic}`} target='_blank' rel='noreferrer'>
                            <img src={`/product-images/${item.pic}`} height={50} width={50} className='rounded' alt="" />
                          </a>
                        </td>
                        <td>{item.name}</td>
                        <td>{item.brand}</td>
                        <td>{item.color}</td>
                        <td>{item.size}</td>
                        <td>&#8377;{item.price}</td>
                        <td><Link to={`/product/${item.productid}`} className='btn btn-primary text-light'><i className='fa fa-shopping-bag'></i></Link></td>
                        <td><button className='btn btn-danger' onClick={() => deleteItem(item.id)}> <i className='fa fa-times'></i></button></td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
            </div> :
            <div className='text-center'>
              <p>No Item in Wishlist</p>
              <Link to="/shop" className='btn btn-primary text-light'>Shop Now</Link>
            </div>
        }
      </div>



      <h5 className='bg-primary text-light text-center p-2 my-3'>Order History Section</h5>
      {
        order.length ?
          order.map((item, index) => {
            return <div className='row' key={index}>
              <div className="col-md-4 col-sm-6">
                <div className="table-responsive">
                  <table className='table table-bordered'>
                    <tbody>
                      <tr>
                        <th>Id</th>
                        <td>{item.id}</td>
                      </tr>
                      <tr>
                        <th>Order Status</th>
                        <td>{item.orderStatus}</td>
                      </tr>
                      <tr>
                        <th>Payment Status</th>
                        <td>{item.paymentStatus}</td>
                      </tr>
                      <tr>
                        <th>payment Mode</th>
                        <td>{item.paymentMode}</td>
                      </tr>
                      <tr>
                        <th>Subtotal</th>
                        <td>&#8377;{item.subtotal}</td>
                      </tr>
                      <tr>
                        <th>Shipping</th>
                        <td>&#8377;{item.shipping}</td>
                      </tr>
                      <tr>
                        <th>total</th>
                        <td>&#8377;{item.total}</td>
                      </tr>
                      <tr>
                        <th>Date</th>
                        <td>{(new Date(item.date).toDateString())}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="col-md-8 col-sm-6">
                <table className='table table-bordered'>
                  <thead>
                    <tr>
                      <th>Pic</th>
                      <th>Name</th>
                      <th>Brand</th>
                      <th>Color</th>
                      <th>Size</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      item.product.map((item, index) => {
                        return <tr key={index}>
                          <td>
                            <a href={`/product-images/${item.pic}`} target='_blank' rel='noreferrer'>
                              <img src={`/product-images/${item.pic}`} height={50} width={50} className='rounded' alt="" />
                            </a>
                          </td>
                          <td>{item.name}</td>
                          <td>{item.brand}</td>
                          <td>{item.color}</td>
                          <td>{item.size}</td>
                          <td>&#8377;{item.price}</td>
                          <td>{item.qty}</td>
                          <td>&#8377;{item.total}</td>
                        </tr>
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          })
          :
          <div className='text-center'>
            <p>No Order History Found</p>
            <Link to="/shop" className='btn btn-primary text-light'>Shop Now</Link>
          </div>
      }

    </>
  )
}
