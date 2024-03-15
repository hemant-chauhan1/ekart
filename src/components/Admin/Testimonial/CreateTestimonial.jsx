import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../Sidebar'
import { useDispatch } from 'react-redux'
import { addTestimonial } from '../../../Store/ActionCreators/TestimonialActionCreators'
import formValidation from '../../customValidation/FormValidation'

export default function CreateTestimonial() {
  let [data, setData] = useState({
    name: "",
    profession: "",
    rating: "",
    pic: "",
    message: ""
  })
  let [errorMessage, setErrorMessage] = useState({
    name: "name field must required",
    profession: "profession field must required",
    rating: "rating field must required",
    pic: "pic must required",
    message: "message field must required"
  })
  let [show, setShow] = useState(false)
  let dispatch = useDispatch()
  let navigate = useNavigate()

  function getInputData(e) {
    var { name, value } = e.target
    setErrorMessage((old) => {
      return {
        ...old,
        [name]: formValidation(e)
      }
    })
    setShow(false)
    setData((old) => {
      return {
        ...old,
        [name]: value
      }
    })
  }

  function getInputFile(e) {
    let { name, files } = e.target
    if (name === "pic") {
      setErrorMessage((old) => {
        return {
          ...old,
          [name]: ""
        }
      })
    }
    setData((old) => {
      return {
        ...old,
        [name]: files[0] && files[0].name      // remove this line when connect with real server
        // [name]: files[0]        //use this line when connect with real server
      }
    })
  }

  function postData(e) {
    e.preventDefault()
    if (!(Object.keys(errorMessage).find((x) => errorMessage[x] && errorMessage[x] !== ""))) {
      // let formData = new FormData()
      // formData.append("name",data.name),
      // formData.append("profession",data.profession),
      // formData.append("rating",data.rating),
      // formData.append("pic",data.pic),
      // formData.append("message",data.message)

      let formData = {
        name: data.name,
        profession: data.profession,
        rating: data.rating,
        pic: data.pic,
        message: data.message
      }
      dispatch(addTestimonial(formData))
      navigate("/admin/testimonial")
    }
    else
      setShow(true)
  }

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Admin</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/" className='text-light'>Home</Link></li>
          <li className="breadcrumb-item active text-white">Testimonial</li>
        </ol>
      </div>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h5 className='bg-primary text-center text-light p-2'>Testimonial</h5>
            <form onSubmit={postData}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Name<span className='text-danger'>*</span></label>
                  <input type="text" name="name" onChange={getInputData} className='form-control' placeholder='Name' />
                  {show ? <p className='text-danger fs-6 text-capitalize  '>{errorMessage.name}</p> : ""}
                </div>
                <div className="col-md-6 mb-3">
                  <label>Profession<span className='text-danger'>*</span></label>
                  <input type="text" name="profession" onChange={getInputData} className='form-control' placeholder='Profession' />
                  {show ? <p className='text-danger fs-6 text-capitalize  '>{errorMessage.profession}</p> : ""}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Rating<span className='text-danger'>*</span></label>
                  <input type="number" name="rating" onChange={getInputData} className='form-control' placeholder='Rating' />
                  {show ? <p className='text-danger fs-6 text-capitalize  '>{errorMessage.rating}</p> : ""}
                </div>
                <div className="col-md-6 mb-3">
                  <label>Pic<span className='text-danger'>*</span></label>
                  <input type="file" name="pic" onChange={getInputFile} className='form-control' />
                  {show ? <p className='text-danger fs-6 text-capitalize  '>{errorMessage.pic}</p> : ""}
                </div>
              </div>
              <div className="mb-3">
                <label>Message<span className='text-danger'>*</span></label>
                <textarea name="message" rows="5" onChange={getInputData} className='form-control' placeholder='Message....'></textarea>
                {show ? <p className='text-danger fs-6 text-capitalize  '>{errorMessage.message}</p> : ""}
              </div>
              <div className="mb-3">
                <button type="submit" className='btn btn-primary text-light w-100'>submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
