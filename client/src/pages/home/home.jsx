// importing dependencies
import React from "react";

// importing 3rd party dependencies
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";

// importing styles
import './home.css'

// creating a function for home
const Home = () => {

    return (
        <>
            {/* <!-- Carousel --> */}
            <div id="demo" class="carousel slide" data-bs-ride="carousel">

                {/* <!-- Indicators/dots --> */}
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
                </div>

                {/* <!-- The slideshow/carousel --> */}
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="/images/02.gif" alt="Los Angeles" class="d-block w-100" />
                        <div className="carousel-caption d-flex flex-column justify-content-center h-100" style={{ top: 0 }}>
                            <div className="carousel-caption_bg p-5 rounded-5">
                                <h1 className="pb-1">Welcome to MocapV1</h1>
                                <p className="pb-1">Motion capturing for Mobile VR</p>
                                <center>
                                    <a href="/tryMocapV1"><button className="btn btn-primary btn-lg text-white rounded-5 w-50">Try MocapV1</button></a>
                                </center>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="/images/03.gif" alt="Chicago" className="d-block w-100" />
                        <div className="carousel-caption d-flex flex-column justify-content-center h-100" style={{ top: 0 }}>
                            <div className="carousel-caption_bg p-5 rounded-5">
                                <h1 className="pb-1">Welcome to MocapV1</h1>
                                <p className="pb-1">Motion capturing for Mobile VR</p>
                                <center>
                                    <a href="/tryMocapV1"><button className="btn btn-primary btn-lg text-white rounded-5 w-50">Try MocapV1</button></a>
                                </center>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="/images/01.png" alt="New York" class="d-block w-100" />
                        <div className="carousel-caption d-flex flex-column  justify-content-center h-100" style={{ top: 0 }}>
                            <div className="carousel-caption_bg p-5 rounded-5">
                                <h1 className="pb-1">Welcome to MocapV1</h1>
                                <p className="pb-1">Motion capturing for Mobile VR</p>
                                <center>
                                    <a href="/tryMocapV1"><button className="btn btn-primary btn-lg text-white rounded-5 w-50">Try MocapV1</button></a>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Left and right controls/icons --> */}
                <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                    <span className="carousel-control-next-icon"></span>
                </button>
            </div>
            <section id="#about">
                <div className="container">
                    <div className="row mt-5">
                        <h2 className="text-center text-primary">What is MocapV1 ?</h2>
                        <p className="mt-4 lead">
                            Virtual Reality is one of the most popular when it comes to immersive technologies. As the result of research and innovations of scientists and engineers, it has become one of the trending technologies in this decade. It can be used to develop and improve many domains, such as entertainment, gaming, education, medicine, military etc. However, it needs to have hardware devices to get a better user experience. Quality hardware components are mostly expensive and aren’t in an affordable price range. This leads to lower user acceptance and usability of VR technology. When it comes to Smartphone VR devices, they are very affordable and anyone who has a smartphone can easily access them.
                            <br /><br />
                            When using VR devices, Users need to use a VR controller to control VR devices. There are many types of VR controllers in the market. Using controllers or physical devices may reduce user experience in some use cases. It can be used in Real-Time Motion capturing technologies to enhance the user experience of VR. It is trendy to use computer vision technologies such as human pose estimation to motion capture and track them. There are a few technologies that have recently been developed using human pose estimation to capture the movements for controlling the VR environment in PC VR devices and standalone VR devices.
                            <br /><br />
                            When it comes to smartphone VR devices, there are limited technologies that use computer vision for motion capturing to control the VR environment. They aren’t stable and are still under research and development. This research aims to find an accurate way to capture the motions using human pose estimation technologies and animate those motions in real-time in a 3D human avatar according to the detected landmarks. It will be helpful for developers when developing various use cases that need to capture the motions for controlling objects in a VR environment without using any physical device.
                        </p>
                    </div>
                </div>
            </section>
            <div className="container">
                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <div className="col-md-4 d-flex align-items-center">
                        <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                            <svg className="bi" width="30" height="24"><use href="#bootstrap"></use></svg>
                        </a>
                        <span className="text-muted">© 2023 A.B Geethan Imal</span>
                    </div>

                    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                        <li className="ms-3"><a class="text-muted" href="#"><svg class="bi" width="24" height="24"><use href="#twitter"></use></svg></a></li>
                        <li className="ms-3"><a class="text-muted" href="#"><svg class="bi" width="24" height="24"><use href="#instagram"></use></svg></a></li>
                        <li className="ms-3"><a class="text-muted" href="#"><svg class="bi" width="24" height="24"><use href="#facebook"></use></svg></a></li>
                    </ul>
                </footer>
            </div>
        </>

    )
}

export default Home