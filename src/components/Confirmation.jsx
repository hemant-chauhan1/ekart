import React from 'react'
import { Link } from 'react-router-dom'

export default function Confirmation() {
  return (
    <>
      {/* <!-- Single Page Header start --> */}
      <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Order Placed</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/" className='text-light'>Home</Link></li>
                    <li className="breadcrumb-item active text-white">Confirmation</li>
                </ol>
            </div>
            {/* <!-- Single Page Header End --> */}

            <div className="container my-3 text-center">
            <h2>Thank You</h2>
            <h3>Your Order Has Been Placed </h3>
            <h3>Now You Can Track Your Order In <Link to="/profile">Profile</Link> Section</h3>
            <Link to="/shop" className='btn btn-primary text-light'>Shop More</Link>
            </div>
    </>
  )
}
