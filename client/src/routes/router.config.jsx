// importing 3rd party dependencies
import { useRoutes } from "react-router-dom";

// importing layouts
import MainLayout from "../layouts/main-layout/main-layout";

// importing pages
import Home from "../pages/home/home";
import Help from "../pages/help/help";
import Contact from "../pages/contact/contact";
import About from "../pages/about/about";
import TryMocapV1 from "../pages/tryMocapV1/tryMocapV1";

// creating a function for router configuration
const RouterConfig = () => {

    // return
    return(
        // using useRoutes dependency
        useRoutes(
            [
                {
                    path:'/',
                    element:<MainLayout/>,
                    children:[
                        {
                            index:true,
                            element:<Home/>
                        },
                        {
                            path:'/about',
                            element:<About/>
                        },
                        {
                            path:'/help',
                            element:<Help/>
                        },
                        {
                            path:'/contact',
                            element:<Contact/>
                        },
                        {
                            path:'/tryMocapV1',
                            element:<TryMocapV1/>
                        }
                    ]
                }
            ]
        )
    );

}

export default RouterConfig;