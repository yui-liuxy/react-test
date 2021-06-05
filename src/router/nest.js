import {lazy,Suspense} from "react";
import {Route,Switch} from "react-router-dom";
import Loading from "../components/Loading";
const UserList=lazy(()=>import("../views/dashboard/users/index"))
const videoAdmin=lazy(()=>import("../views/dashboard/video/index"))
const uploadingAdmin=lazy(()=>import("../views/dashboard/uploading/index"))
const addMessage=lazy(()=>import("../views/dashboard/users/add"))
//路由规则
const Routes=()=>{
    return(<Suspense fallback={<Loading/>}>
        <Switch>
            <Route exact path="/dashboard/users" component={UserList}></Route>
            <Route path="/dashboard/videos" component={videoAdmin}></Route>
            <Route path="/dashboard/uploading" component={uploadingAdmin}></Route>
            <Route path="/dashboard/users/addMessage" component={addMessage}></Route>
            <Route path="/dashboard/users/updata" component={addMessage}></Route>
        </Switch>
    </Suspense>)
}
export default Routes
