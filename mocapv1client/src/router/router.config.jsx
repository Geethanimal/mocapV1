
import { useRoutes } from "react-router-dom";

import ComponentFaceMesh from "../components/face-mesh/face-mesh";

const RouterConfig = () => {

    return (useRoutes([{
        path: "/",
        element: <h1>Home</h1>
    }, {
        path: "/facemesh",
        element: <ComponentFaceMesh />
    }]));

}

export default RouterConfig;