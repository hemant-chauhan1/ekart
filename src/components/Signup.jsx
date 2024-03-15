import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import formValidation from './customValidation/FormValidation'

export default function Signup() {
    
    let [show, setShow] = useState(false)
    
    let [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        cpassword: ""
    })
    let navigate = useNavigate()
    
    let [errorMessages, setErrorMessages] = useState({
        name: "Name Must Required",
        username: "Username Must Required",
        email: "Email Must Required",
        phone: "Phone Number Must Required",
        password: "Password Must Required"
    })

    function getInputData(e) {
        let { name, value } = e.target
        setErrorMessages((old) => {
            return {
                ...old,
                [name]: formValidation(e)
            }
        })
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }

    async function postData(e) {
        e.preventDefault()
        if (data.password === data.cpassword) {
            if (!(Object.keys(errorMessages).find((x) => errorMessages[x] && errorMessages[x] !== ""))) {
                let response = await fetch("/user", {
                    method: "get",
                    header: {
                        "content-type": "application/json"
                    }
                })
                response = await response.json()
                let item = response.find((x) => x.username === data.username || x.email === data.email)
                if (item) {
                    setShow(true)
                    setErrorMessages((old) => {
                        return {
                            ...old,
                            "username":item.username===data.username?"username is already taken":"",
                            "email":item.email===data.email?"email address is already taken":""
                        }
                    })
                }
                else {
                    item = {
                        name: data.name,
                        username: data.username,
                        email: data.email,
                        phone: data.phone,
                        password: data.password,
                        role: "Buyer"
                    }
                    let response = await fetch("/user", {
                        method: "post",
                        header: {
                            "content-type": "application/json"
                        },
                        body :  JSON.stringify(item)
                    })
                    response = await response.json()
                    navigate("/login")
                }
            }
            else
                setShow(true)
        }
        else {
            setShow(true)
            setErrorMessages((old) => {
                return {
                    ...old,
                    "password": "password and confirm password does not match"
                }
            })
        }
    }


    return (
        <>
            {/* <!-- Single Page Header start --> */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Create Account</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/" className='text-light'>Home</Link></li>
                    <li className="breadcrumb-item active text-white">Signup</li>
                </ol>
            </div>
            {/* <!-- Single Page Header End --> */}

            <div className="container my-3">
                <div className="m-auto w-75">
                    <h4 className='bg-primary text-center text-light p-2'><strong>Create</strong> a New Account</h4>

                    <form onSubmit={postData}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Name<span className='text-danger'>*</span></label>
                                <input type="text" name="name" className='form-control' placeholder='Name' onChange={getInputData} />
                                {show ? <p className='text-danger text-capitalize'>{errorMessages.name}</p> : ""}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Username<span className='text-danger'>*</span></label>
                                <input type="text" name="username" className='form-control' placeholder='User Name ' onChange={getInputData} />
                                {show ? <p className='text-danger text-capitalize'>{errorMessages.username}</p> : ""}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Email<span className='text-danger'>*</span></label>
                                <input type="email" name="email" className='form-control' placeholder='Email Address' onChange={getInputData} />
                                {show ? <p className='text-danger text-capitalize'>{errorMessages.email}</p> : ""}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>phone<span className='text-danger'>*</span></label>
                                <input type="text" name="phone" className='form-control' placeholder='Phone Number' onChange={getInputData} />
                                {show ? <p className='text-danger text-capitalize'>{errorMessages.phone}</p> : ""}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Password<span className='text-danger'>*</span></label>
                                <input type="password" name="password" className='form-control' placeholder='**********' onChange={getInputData} />
                                {show ? <p className='text-danger text-capitalize'>{errorMessages.password}</p> : ""}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Confirm Password<span className='text-danger'>*</span></label>
                                <input type="password" name="cpassword" className='form-control' placeholder='**********' onChange={getInputData} />
                            </div>
                        </div>
                        <button type='submit' className='btn btn-primary w-100 text-light'>Signup</button>
                    </form>
                    <div className='d-flex justify-content-between my-1'>
                        <p>Already Have Account?<Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}
