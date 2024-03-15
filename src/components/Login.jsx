import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import formValidation from './customValidation/FormValidation'

export default function Login() {
    let [data,setData] = useState({
        username:"",
        password:""
    })

    let [show,setShow] = useState(false)
    let navigate = useNavigate()

    let [errorMessages, setErrorMessages] = useState({
        username: "Username Must Required",
        password: "Password Must Required"
      })

    function getInputData(e){
        let {name,value} = e.target
        setErrorMessages((old)=>{
            return{
                ...old,
                [name] : formValidation(e)
            }
        })
        setData((old)=>{
            return{
                ...old,
                [name] :value
            }
        })
    }

    async function postData(e){
        e.preventDefault()
        if (!(Object.keys(errorMessages).find((x) => errorMessages[x] && errorMessages[x] !== ""))) {
            let response = await fetch("/user",{
                method:"get",
                header:{
                    "content-type":"application/json"
                }
            })
            response = await response.json()
            let item = response.find((x)=>(x.username===data.username || x.email===data.username) && x.password===data.password)
            if(item){
                localStorage.setItem("login",true)
                localStorage.setItem("name",item.name)
                localStorage.setItem("userid",item.id)
                localStorage.setItem("role",item.role)
                if(item.role==="Admin")
                navigate("/admin")
            else
                navigate("/profile")
            }
            else{
                setShow(true)
                setErrorMessages((old)=>{
                    return{
                        ...old,
                        "username":"Invalid username or password"
                    }
                })
            }
        }
        else
        setShow(true)
    }


    return (
        <>
            {/* <!-- Single Page Header start --> */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Login</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/" className='text-light'>Home</Link></li>
                    <li className="breadcrumb-item active text-white">Login</li>
                </ol>
            </div>
            {/* <!-- Single Page Header End --> */}

            <div className="container my-3">
                <div className="m-auto w-75">
                    <h4 className='bg-primary text-center text-light p-2'><strong>Login</strong> to Your Account</h4>

                    <form onSubmit={postData}>
                        <div className='mb-3' >
                            <label>Username<span className='text-danger'>*</span></label>
                            <input type="text" name="username" className='form-control' placeholder='Username or Email Address' onChange={getInputData} />
                            {show?<p className='text-danger text-capitalize'>{errorMessages.username}</p>:""}
                        </div>
                        <div className='mb-3' >
                            <label>Password<span className='text-danger'>*</span></label>
                            <input type="password" name="password" className='form-control' placeholder='**********' onChange={getInputData} />
                            {show?<p className='text-danger text-capitalize'>{errorMessages.password}</p>:""}
                        </div>
                        <button type='submit' className='btn btn-primary text-light w-100'>Login</button>
                    </form>
                  <div className='d-flex justify-content-between my-1'>
                  <Link to="#">Forget Password?</Link>
                    <p>New User?<Link to="/signup">Create a Account</Link></p>
                  </div>
                </div>
            </div>
        </>
    )
}
