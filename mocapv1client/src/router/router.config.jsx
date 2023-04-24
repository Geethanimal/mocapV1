
import { useRoutes } from "react-router-dom";

import ComponentFaceMesh from "../components/face-mesh/face-mesh";
import ComponentHPE from "../components/human-pose-estimation/human-pose-estimater";

const RouterConfig = () => {

    return (useRoutes([{
        path: "/",
        element: <h1>Home</h1>
    }, {
        path: "/facemesh",
        element: <ComponentFaceMesh />
    },{
        path: "/humanpose",
        element: <ComponentHPE />
    }]));

}

export default RouterConfig;