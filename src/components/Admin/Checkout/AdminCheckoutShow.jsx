import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getCheckout, updateCheckout } from '../../../Store/ActionCreators/CheckoutActionCreators'


export default function AdminCheckoutShow() {
  let [data, setData] = useState({})
  let [user,setUser] = useState({})
  let[orderStatus,setOrderStatus] = useState("")
  let[paymentStatus,setPaymentStatus] = useState("")

  let {id} = useParams()
  let navigate = useNavigate()
  
  let dispatch = useDispatch()
  let CheckoutStateData = useSelector((state) => state.CheckoutStateData)


  function updateQuery(){
    dispatch(updateCheckout({...data, orderStatus:orderStatus, paymentStatus:paymentStatus}))
    setData((old)=>{
      return{
        ...old,
        "orderStatus":orderStatus,
        "paymentStatus": paymentStatus
      }
    })
  }

  async function getAPIData() {
    dispatch(getCheckout())
    if (CheckoutStateData.length)
      setData(CheckoutStateData.find((x)=>x.id===id))
    
    let response = await fetch("/user/"+localStorage.getItem("userid"),{
      method:"get",
      headers:{
        "content-type":"application/json"
      }
    })
    response = await response.json()
    setUser(response)
    setOrderStatus(orderStatus)
    setPaymentStatus(paymentStatus)
  }

  useEffect(() => {
    getAPIData()
  }, [CheckoutStateData.length])
  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Admin</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/" className='text-light'>Home</Link></li>
          <li className="breadcrumb-item active text-white">Checkouts</li>
        </ol>
      </div>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h5 className='bg-primary text-center text-light p-2'>Checkout</h5>
            <table className='table table-bordered'>
              <tbody>
                <tr>
                  <th>Id</th>
                  <td>{data.id}</td>
                </tr>
                <tr>
                  <th>User</th>
                  <td>
                     <b>Buyer</b>                : {user.name}<br/>
                      <b>Contact Details</b>     : {user.phone} / {user.email}<br/>
                      <b>Address Details</b>     : {user.address}<br/>
                                                   {user.pin},{user.state},{user.city}
                  </td>
                </tr>
                <tr>
                  <th>Order Status</th>
                  <td>{data.orderStatus}
                  {data.orderStatus!=="Delivered"?
                  <>
                  <br/>
                  <select name="orderStatus" className='form-select' onChange={(e)=>setOrderStatus(e.target.value)} value={orderStatus}>
                    <option>Order is placed</option>
                    <option>Ready to ship</option>
                    <option>Shipped</option>
                    <option>Order is reached to the final delivery station</option>
                    <option>Out for delivery</option>
                    <option>Delivered</option>
                  </select>
                  </>: ""
                }
                  </td>
                </tr>
                <tr>
                  <th>Payment Mode</th>
                  <td>{data.paymentMode}</td>
                </tr>
                <tr>
                  <th>Payment Status</th>
                  <td>{data.paymentStatus}
                  {data.paymentStatus!=="Done"?
                  <>
                  <br/>
                  <select name="paymentStatus" className='form-select' onChange={(e)=>setPaymentStatus(e.target.value)} value={paymentStatus}>
                    <option>Pending</option>
                    <option>Done</option>
                  </select>
                  </>: ""
                }
                  </td>
                </tr>
                <tr>
                  <th>Subtotal</th>
                  <td>&#8377;{data.subtotal}</td>
                </tr>
                <tr>
                  <th>Shipping</th>
                  <td>&#8377;{data.shipping}</td>
                </tr>
                <tr>
                  <th>total</th>
                  <td>&#8377;{data.total}</td>
                </tr>
                <tr>
                  <th>Date</th>
                  <td>{new Date(data.date).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    {
                      data.orderStatus!=="Delivered" && data.paymentStatus==="Done"?
                      <button className='btn btn-primary text-light w-100' onClick={updateQuery}>Update</button>:
                      ""
                    }
                  </td>
                </tr>
              </tbody>
            </table>

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
                      data?.product?.map((item, index) => {
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
      </div>
    </>
  )
}
