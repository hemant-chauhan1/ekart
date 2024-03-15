import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
    let navigate = useNavigate()

    function logout() {
        localStorage.clear()
        navigate("/login")
    }

    return (
        <>
            {/* <!-- Navbar start --> */}
            <div className="container-fluid fixed-top">
                <div className="container topbar bg-primary d-none d-lg-block">
                    <div className="d-flex justify-content-between top-info ps-2">
                        <small><i className="fa fa-map me-2 text-light"></i> <a href="#" target='_blank' rel='noreferrer' className="text-white">Ballabgarh Faridabad </a></small>
                        <small><i className="fa fa-envelope me-2 text-light"></i><a href="mailto:hemantchouhan@gmail.com" target='_blank' rel='noreferrer' className="text-white">hemantchauhan9998@gmail.com</a></small>
                        <small><i className="fa fa-phone me-2 text-light"></i><a href="tel:9773958530" target='_blank' rel='noreferrer' className="text-white">+91-9773958530</a></small>
                        <small><i className="fa fa-whatsapp me-2 text-light"></i><a href="https://wa.me/+919773958530" target='_blank' rel='noreferrer' className="text-white">+91-9773958530</a></small>
                    </div>
                </div>
                <div className="container px-0">
                    <nav className="navbar navbar-light bg-white navbar-expand-xl">
                        <Link to="/" className="navbar-brand"><h1 className="text-primary display-6">ekart</h1></Link>
                        <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                            <span className="fa fa-bars text-primary"></span>
                        </button>
                        <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
                            <div className="navbar-nav mx-auto">
                                <Link to="/" className="nav-item nav-link active">Home</Link>
                                <Link to="/shop" className="nav-item nav-link">Shop</Link>
                                <div className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                                    <div className="dropdown-menu m-0 bg-primary rounded-0">
                                        <Link to="/cart" className="dropdown-item">Cart</Link>
                                        <Link to="/checkout" className="dropdown-item">Checkout</Link>
                                        <Link to="/testimonial" className="dropdown-item">Testimonial</Link>
                                    </div>
                                </div>
                                <Link to="/contactus" className="nav-item nav-link">Contact</Link>
                                <Link to="/admin" className="nav-item nav-link">Admin</Link>
                            </div>
                            <div className="d-flex m-3 me-0">
                                <button className="btn-search btn border border-primary btn-md-square rounded-circle bg-white me-4" data-bs-toggle="modal" data-bs-target="#searchModal"><i className="fas fa-search text-primary"></i></button>

                                {
                                    localStorage.getItem("login") ?
                                        <>
                                            <div className="navbar-nav mx-auto">
                                                <div className="nav-item dropdown">
                                                    <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">{localStorage.getItem("name")}</a>
                                                    <div className="dropdown-menu m-0 bg-primary rounded-0">
                                                        {
                                                            localStorage.getItem("role") === "Buyer" ?
                                                                <>
                                                                    <Link to="/profile" className="dropdown-item">Profile</Link>
                                                                    <Link to="/cart" className="dropdown-item">Cart</Link>
                                                                    <Link to="/checkout" className="dropdown-item">Checkout</Link>
                                                                </> :
                                                                <Link to="/admin" className="dropdown-item">Profile</Link>
                                                        }
                                                        <button className="dropdown-item" onClick={logout}>Logout</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </> :
                                        <Link to="/login" className="nav-item nav-link active">Login</Link>
                                }
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            {/* <!-- Navbar End --> */}


            {/* <!-- Modal Search Start --> */}
            <div className="modal fade" id="searchModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content rounded-0">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Search by keyword</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex align-items-center">
                            <div className="input-group w-75 mx-auto d-flex">
                                <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                                <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Modal Search End --> */}

        </>
    )
}
