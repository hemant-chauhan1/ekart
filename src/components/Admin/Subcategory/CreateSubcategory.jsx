import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { addSubcategory, getSubcategory } from '../../../Store/ActionCreators/SubcategoryActionCreators'
import formValidation from '../../customValidation/FormValidation'

export default function CreateSubcategory() {
  let name = useRef("")
  let [message, setMessage] = useState("Name Field Must Required")
  let [show, setShow] = useState(false)
  let dispatch = useDispatch()
  let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData)

  let navigate = useNavigate()

  function getInputData(e) {
    setMessage(formValidation(e))
    setShow(true)
    name.current = e.target.value
  }

  function postData(e) {
    e.preventDefault()
    if (message.length === 0) {
      let item = SubcategoryStateData.find((x) => x.name === name.current)
      if (item) {
        setShow(true)
        setMessage("Subcategory already exist")
      }
      else {
        dispatch(addSubcategory({ name: name.current }))
        navigate("/admin/subcategory")
      }

    }
    else
    setShow(true)
  }
  function getAPIData() {
    dispatch(getSubcategory())
  }
  useEffect(() => {
    getAPIData()
  }, [SubcategoryStateData.length])
  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Admin</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/" className='text-light'>Home</Link></li>
          <li className="breadcrumb-item active text-white">Subcategory</li>
        </ol>
      </div>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h5 className='bg-primary text-center text-light p-2'>Subcategory</h5>
            <form onSubmit={postData}>
              <div className="mb-3">
                <label>Name<span className='text-danger'>*</span></label>
                <input type="text" name="name" onChange={getInputData} className='form-control' placeholder='Subcategory Name' />
                {show ? <p className='text-danger fs-6 text-capitalize  '>{message}</p> : ""}
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
