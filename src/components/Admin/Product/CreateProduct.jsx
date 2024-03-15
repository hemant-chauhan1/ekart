import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../../Store/ActionCreators/ProductActionCreators'
import { getMaincategory } from '../../../Store/ActionCreators/MaincategoryActionCreators'
import { getSubcategory } from '../../../Store/ActionCreators/SubcategoryActionCreators'
import { getBrand } from '../../../Store/ActionCreators/BrandActionCreators'
import formValidation from '../../customValidation/FormValidation'
import { Editor } from '@tinymce/tinymce-react';

export default function CreateProduct() {
  const editorRef = useRef(null)
  let [maincategory,setMaincategory] = useState([])
  let [subcategory,setSubcategory] = useState([])
  let [brand,setBrand] = useState([])
  let [data, setData] = useState({
    name: "",
    maincategory: "",
    subcategory: "",
    brand: "",
    stock: "In Stock",
    color: "",
    size: "",
    baseprise: "",
    discount: "",
    pic1: "",
    pic2: "",
    pic3: "",
    pic4: ""
  })

  let [errorMessages, setErrorMessages] = useState({
    name: "Name field Must Required",
    color: "Color field Must Required",
    size: "Size field Must Required",
    baseprice: "Baseprice field Must Required",
    discount: "Discount field Must Required",
    pic1: "Pic1 field Must Required"
  })

  let [show, setShow] = useState(false)
  let dispatch = useDispatch()
  let MaincategoryStateData = useSelector((state) => state.MaincategoryStateData)
  let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData)
  let BrandStateData = useSelector((state) => state.BrandStateData)

  let navigate = useNavigate()

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
    if (name === "pic1") {
      setErrorMessages((old) => {
        return {
          ...old,
          [name]: ""
        }
      })
    }
    setData((old) => {
      return {
        ...old,
        [name]: files[0].name      // remove this line when connect with real server
        // [name]: files[0]        //use this line when connect with real server
      }
    })
  }

  function postData(e) {
    e.preventDefault()
    if (!(Object.keys(errorMessages).find((x) => errorMessages[x] && errorMessages[x] !== ""))) {
      let fp = data.baseprice - data.baseprice * data.discount / 100
      let formData = {
        name: data.name,
        maincategory: data.maincategory,
        subcategory: data.subcategory,
        brand: data.brand,
        color: data.color,
        size: data.size,
        baseprice: parseInt(data.baseprice),
        discount: parseInt(data.discount),
        finalprice: fp,
        stock: data.stock,
        description: editorRef.current.getContent(),
        pic1: data.pic1,
        pic2: data.pic2,
        pic3: data.pic3,
        pic4: data.pic4
      }
      // let formData = new FormData()
      //   formData.append("name",data.name)
      //   formData.append("maincategory",data.maincategory)
      //   formData.append("subcategory",data.subcategory)
      //   formData.append("brand",data.brand)
      //   formData.append("color",data.color)
      //   formData.append("size",data.size)
      //   formData.append("baseprice",parseInt(data.baseprice))
      //   formData.append("discount",parseInt(data.discount))
      //   formData.append("finalprice",data.fp)
      //   formData.append("stock",data.stock)
      //   formData.append("description",editorRef.current.getContent())
      //   formData.append("pic1",data.pic1)
      //   formData.append("pic2",data.pic2)
      //   formData.append("pic3",data.pic3)
      //   formData.append("pic4",data.pic4)
      dispatch(addProduct(formData))
      navigate("/admin/product")
    }
    else
      setShow(true)
  }


  function getAPIData() {
    dispatch(getMaincategory())
    dispatch(getSubcategory())
    dispatch(getBrand())
    if(MaincategoryStateData.length)
    setMaincategory(MaincategoryStateData)
    if(SubcategoryStateData.length)
    setSubcategory(SubcategoryStateData)
    if(BrandStateData.length)
    setBrand(BrandStateData)
    if (MaincategoryStateData.length && SubcategoryStateData.length && BrandStateData.length) {
      setData((old) => {
        return {
          ...old,
          'maincategory': MaincategoryStateData[0].name,
          'subcategory': SubcategoryStateData[0].name,
          'brand': BrandStateData[0].name
        }
      })
    }
  }


  useEffect(() => {
    getAPIData()
  }, [MaincategoryStateData.length, SubcategoryStateData.length, BrandStateData.length])
  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Admin</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/" className='text-light'>Home</Link></li>
          <li className="breadcrumb-item active text-white">Product</li>
        </ol>
      </div>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>

          <div className="col-md-9">
            <h5 className='bg-primary text-center text-light p-2'>Product</h5>
            <form onSubmit={postData}>
              <div className="mb-3">
                <label>Name<span className='text-danger'>*</span></label>
                <input type="text" name="name" onChange={getInputData} className='form-control' placeholder='Product Name' />
                {show ? <p className='text-danger fs-6 text-capitalize  '>{errorMessages.name}</p> : ""}
              </div>

              <div className="row">
                <div className="col-md-3 col-sm-6 col-12">
                  <label>Maincategory<span className='text-danger' >*</span></label>
                  <select name="maincategory" onChange={getInputData} className='form-select mb-3'>
                    {
                      maincategory.map((item, index) => {
                        return <option key={index}>{item.name}</option>
                      })
                    }
                  </select>
                </div>

                <div className="col-md-3 col-sm-6 col-12">
                  <label>Subcategory<span className='text-danger' >*</span></label>
                  <select name="subcategory" onChange={getInputData} className='form-select mb-3'>
                    {
                      subcategory.map((item, index) => {
                        return <option key={index}>{item.name}</option>
                      })
                    }
                  </select>
                </div>

                <div className="col-md-3 col-sm-6 col-12">
                  <label>Brand<span className='text-danger' >*</span></label>
                  <select name="brand" onChange={getInputData} className='form-select mb-3'>
                    {
                      brand.map((item, index) => {
                        return <option key={index}>{item.name}</option>
                      })
                    }
                  </select>
                </div>

                <div className="col-md-3 col-sm-6 col-12">
                  <label>Stock<span className='text-danger' >*</span></label>
                  <select name="stock" onChange={getInputData} className='form-select mb-3'>
                    <option>In stock</option>
                    <option>Out of stock</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Color<span className='text-danger'>*</span></label>
                  <input type="text" name="color" onChange={getInputData} className='form-control' placeholder='Color' />
                  {show ? <p className='text-danger fs-6 text-capitalize  '>{errorMessages.color}</p> : ""}
                </div>
                <div className="col-md-6 mb-3">
                  <label>Size<span className='text-danger'>*</span></label>
                  <input type="text" name="size" onChange={getInputData} className='form-control' placeholder='Size' />
                  {show ? <p className='text-danger fs-6 text-capitalize  '>{errorMessages.size}</p> : ""}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Baseprice<span className='text-danger'>*</span></label>
                  <input type="text" name="baseprice" onChange={getInputData} className='form-control' placeholder='Baseprice' />
                  {show ? <p className='text-danger fs-6 text-capitalize  '>{errorMessages.baseprice}</p> : ""}
                </div>
                <div className="col-md-6 mb-3">
                  <label>Discount<span className='text-danger'>*</span></label>
                  <input type="text" name="discount" onChange={getInputData} className='form-control' placeholder='Discount' />
                  {show ? <p className='text-danger fs-6 text-capitalize  '>{errorMessages.discount}</p> : ""}
                </div>
              </div>

              <div className="mb-3">
                <label>Description</label>
                <Editor
                  apiKey='zvdzjnyv90r20aymosae668tjms64r6i5r85215ve56n2jk8'
                  onInit={(evt, editor) => editorRef.current = editor}
                  init={{
                    height: 300,
                    menubar: false,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                      'bold italic forecolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }}
                />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Pic1<span className='text-danger'>*</span></label>
                  <input type="file" name="pic1" className='form-control' onChange={getInputFile} />
                  {show ? <p className='text-danger text-capitalize'>{errorMessages.pic1}</p> : ""}
                </div>
                <div className="col-md-6 mb-3">
                  <label>Pic2</label>
                  <input type="file" name="pic2" className='form-control' onChange={getInputFile} />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Pic3</label>
                  <input type="file" name="pic3" className='form-control' onChange={getInputFile} />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Pic4</label>
                  <input type="file" name="pic4" className='form-control' onChange={getInputFile} />
                </div>
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
