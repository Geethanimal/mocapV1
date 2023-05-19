// importing dependencies
import React,{useState,useEffect} from "react";

// importing 3rd party dependencies
import "bootstrap/dist/css/bootstrap.css";

// creating a function for Navbar
const Navbar = (props) => {

    const [activeButton, setActiveButton] = useState(props.selectednavindex);

    function onActiveNavItem(id){
        setActiveButton(id);
    }

    return (
        <>
            <div className="container-fluid shadow-lg fixed-top bg-white">
                <header className="d-flex justify-content-center py-3">
                    <ul className="nav nav-pills">
                        <li className="nav-item"><a href="/" className={`nav-link ${activeButton ===0 ? 'active':' '}`} aria-current="page" onClick={()=>onActiveNavItem(0)}>Home</a></li>
                        <li className="nav-item"><a href="/about" className={`nav-link ${activeButton ===1 ? 'active':' '}`} onClick={()=>onActiveNavItem(1)}>About</a></li>
                        <li className="nav-item"><a href="/contact" className={`nav-link ${activeButton ===2 ? 'active':' '}`} onClick={()=>onActiveNavItem(2)}>Contact</a></li>
                        <li className="nav-item"><a href="/help" className={`nav-link ${activeButton ===3 ? 'active':' '}`} onClick={()=>onActiveNavItem(3)}>Help</a></li>
                        <li className="nav-item"><a href="/tryMocapV1" className={`nav-link ${activeButton ===4 ? 'active':' '}`} onClick={()=>onActiveNavItem(4)}>Try MocapV1</a></li>
                    </ul>
                </header>
            </div>
        </>
    )
}

export default Navbar