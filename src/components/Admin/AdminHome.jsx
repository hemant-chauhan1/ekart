import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function AdminHome() {
  let [user, setUser] = useState({})

  let navigate = useNavigate()

  async function getAPIData(){
    let response = await fetch("/user/" + localStorage.getItem("userid"),{
      method:"get",
      headers:{
        "content-type" : "application/json"
      }
    })
    response = await response.json()
    if(response)
    setUser(response)
  else
  navigate("/login")
  }

  useEffect(()=>{
    getAPIData()
  },[])

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Admin</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/" className='text-light'>Home</Link></li>
          <li className="breadcrumb-item active text-white">Admin-Home</li>
        </ol>
      </div>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h5 className='bg-primary text-center text-light p-2'>Admin Home</h5>
            <div className="row">
              <div className="col-md-6">
                {
                  user.pic?<img src={`/product-images/${user.pic}`} height="360px" width="100%" className='rounded-circle'></img>:<img src="/img/no-user-image.jpg" height="360px" width="100%"></img>
                }
              </div>
              <div className="col-md-6">
                <table className='table table-hover table-bordered'>
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <td>{user.name}</td>
                    </tr>
                    <tr>
                      <th>Username</th>
                      <td>{user.username}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>{user.email}</td>
                    </tr>
                    <tr>
                      <th>Phone</th>
                      <td>{user.phone}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}><Link to="/profile/update" className='btn btn-primary text-light w-100'>Update</Link></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
