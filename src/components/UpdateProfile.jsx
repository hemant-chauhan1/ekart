import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import formValidation from './customValidation/FormValidation'

export default function UpdateProfile() {

    let [show, setShow] = useState(false)

    let [data, setData] = useState({})
    let navigate = useNavigate()

    let [errorMessages, setErrorMessages] = useState({
        name: "",
        phone: ""
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

    function getInputFile(e) {
        let { name, files } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: files[0].name
            }
        })
    }

    async function getAPIData() {
        let response = await fetch("/user/" + localStorage.getItem("userid"), {
            method: "get",
            headers: {
                "content-type": "application/json"
            }
        })
        response = await response.json()
        if (response)
            setData({ ...response })
        else
            navigate("/login")
    }

    async function postData(e) {
        e.preventDefault()
        if (!(Object.keys(errorMessages).find((x) => errorMessages[x] && errorMessages[x] !== ""))) {
            let response = await fetch("/user/" + localStorage.getItem("userid"), {
                method: "put",
                header: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ ...data })
            })
            response = await response.json()
            if (localStorage.getItem("role") === "Admin")
                navigate("/admin")
            else
                navigate("/profile")
        }
        else
            setShow(true)
    }


    useEffect(() => {
        getAPIData()
    }, [])

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
                                <input type="text" name="name" className='form-control' placeholder='Name' onChange={getInputData} value={data.name ?? ""} />
                                {show ? <p className='text-danger text-capitalize'>{errorMessages.name}</p> : ""}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>phone<span className='text-danger'>*</span></label>
                                <input type="text" name="phone" className='form-control' placeholder='Phone Number' onChange={getInputData} value={data.phone ?? ""} />
                                {show ? <p className='text-danger text-capitalize'>{errorMessages.phone}</p> : ""}
                            </div>
                        </div>
                        <div className='mb-3'>
                            <label>Address</label>
                            <textarea name="address" rows="3" className='form-control' placeholder='Address....' onChange={getInputData} value={data.address ?? ""}></textarea>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>City</label>
                                <input type="text" name="city" className='form-control' placeholder='City' onChange={getInputData} value={data.city ?? ""} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>State</label>
                                <input type="text" name="state" className='form-control' placeholder='state' onChange={getInputData} value={data.state ?? ""} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Pin Code</label>
                                <input type="text" name="pin" className='form-control' placeholder='Pin Code' onChange={getInputData} value={data.pin ?? ""} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Pic</label>
                                <input type="file" name="pic" className='form-control' onChange={getInputFile} />
                            </div>
                        </div>
                        <button type='submit' className='btn btn-primary w-100 text-light my-2'>Update</button>
                    </form>
                </div>
            </div>
        </>
    )
}
