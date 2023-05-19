// importing dependencies
import React, { useState, useEffect } from "react";

// importing 3rd party dependencies
import { Outlet, useLocation } from "react-router-dom";
import { Layout } from 'antd';

// importing styles
import './main-layout.css';

// importing components
import Navbar from "../../components/nav/navbar";

const { Content } = Layout;

// creating a function for main layout
const MainLayout = () => {
    const location = useLocation();

    const [navSelectedIndex, setNavSelectedIndex] = useState();

    useEffect(() => {
        onActiveNavItem();
    }, [])

    const onActiveNavItem = () => {

        switch (location.pathname) {
            case "/":
                setNavSelectedIndex(0);
                return 0;
                break;
            case "/about":
                setNavSelectedIndex(1);
                return 1;
                break;
            case "/contact":
                setNavSelectedIndex(2);
                return 2;
                break;
            case "/help":
                setNavSelectedIndex(3);
                return 3;
                break;
            case "/tryMocapV1":
                setNavSelectedIndex(4);
                return 4;
                break;
        }

    }

    return (
        <>
            <Layout>
                <Navbar selectedNav={navSelectedIndex} selectednavindex={onActiveNavItem} />
                <Content>
                    <Outlet />
                </Content>
            </Layout>
        </>
    )
}

export default MainLayout