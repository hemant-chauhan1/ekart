import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import formValidation from './customValidation/FormValidation'
import { addContactUs } from "../Store/ActionCreators/ContactUsActionCreators"
import { useDispatch } from 'react-redux'

export default function ContactUs() {
    let [show, setShow] = useState(false)
    let [message,setMessage] = useState("")

    let dispatch = useDispatch()

    let [errorMessage, setErrorMessage] = useState({
        name: "name field is required",
        email: "email field is required",
        phone: "phone field is required",
        subject: "subject field is required",
        message: "message field is required",
    })

    let [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    })

    function getInputData(e) {
        let { name, value } = e.target
        setShow(true)
        setErrorMessage((old) => {
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

    function postData(e) {
        e.preventDefault()
        if (!(Object.keys(errorMessage).find((x) => errorMessage[x] && errorMessage[x] !== ""))) {
            dispatch(addContactUs({ ...data, date: new Date(), active: true }))
            setMessage("thanks to share your query with us. our team will response you soon!!!")
            setData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            })
        }
        else
            setShow(true)
    }


    return (
        <>
            {/* <!-- Single Page Header start --> */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Contact Us</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/" className='text-light'>Home</Link></li>
                    <li className="breadcrumb-item active text-white">Contact</li>
                </ol>
            </div>
            {/* <!-- Single Page Header End --> */}


            {/* <!-- Contact Start --> */}
            <div className="container-fluid contact py-2">
                <div className="container">
                    <div className="p-5 bg-light rounded">
                        <div className="row g-4">
                            <div className="col-12">
                                <div className="text-center mx-auto" style={{ maxWidth: "700px" }}>
                                    <h1 className="text-primary">Get in touch</h1>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <p className='text-success text-capitalize '>{message}</p>
                                <form onSubmit={postData}>
                                    <div className="mb-3">
                                        <input type="text" name="name" className='form-control' value={data.name} onChange={getInputData} placeholder='Full Name' />
                                        {show ? <p className='text-danger text-capitalize p-2'>{errorMessage.name}</p> : ""}
                                    </div>
                                    <div className="mb-3">
                                        <input type="email" name="email" className='form-control' value={data.email} onChange={getInputData} placeholder='Email Address' />
                                        {show ? <p className='text-danger text-capitalize p-2'>{errorMessage.email}</p> : ""}
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" name="phone" className='form-control' value={data.phone} onChange={getInputData} placeholder='Phone Number' />
                                        {show ? <p className='text-danger text-capitalize p-2'>{errorMessage.phone}</p> : ""}
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" name="subject" className='form-control' value={data.subject} onChange={getInputData} placeholder='Subject' />
                                        {show ? <p className='text-danger text-capitalize p-2'>{errorMessage.subject}</p> : ""}
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" name="message" className='form-control' value={data.message} onChange={getInputData} placeholder='Message....' />
                                        {show ? <p className='text-danger text-capitalize p-2'>{errorMessage.message}</p> : ""}
                                    </div>
                                    <div>
                                        <button type='submit' className='btn btn-primary text-light w-100'>Submit</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-5">
                                <div className="d-flex p-4 rounded mb-4 bg-white">
                                    <i className="fas fa-map-marker-alt fa-2x text-primary me-4"></i>
                                    <div>
                                        <h4>Address</h4>
                                        <p className="mb-2">Ballabgarh Faridabad(haryana)</p>
                                    </div>
                                </div>
                                <div className="d-flex p-4 rounded mb-4 bg-white">
                                    <i className="fas fa-envelope fa-2x text-primary me-4"></i>
                                    <div>
                                        <h4>Mail Us</h4>
                                        <a href='mailto:hemantchouhan9998@gmail.com'>hemantchauhan9998@gmail.com</a>
                                    </div>
                                </div>
                                <div className="d-flex p-4 rounded bg-white">
                                    <i className="fa fa-phone fa-2x text-primary me-4"></i>
                                    <div>
                                        <h4>Telephone</h4>
                                        <a href='tel:9773958530'>9773958530</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div class="mapouter"><div class="gmap_canvas"><iframe width="100%" height="400" id="gmap_canvas" src="https://maps.google.com/maps?q=%20ballabgarh%20faridabad%20haryana&t=&z=13&ie=UTF8&iwloc=&output=embed"></iframe><a href="https://www.embedgooglemap.net"></a></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Contact End --> */}

        </>
    )
}
