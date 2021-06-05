import {lazy,Suspense} from "react";
import {Route,Redirect,Switch} from "react-router-dom";
import Loading from "../components/Loading";
const Login=lazy(()=>import("../views/login/Index"))
const Dashboard=lazy(()=>import("../views/dashboard/index"))
//路由规则
const Routes=()=>{
    return(<Suspense fallback={<Loading/>}>
          <Switch>
              <Route path="/login" component={Login}></Route>
              <Route path="/dashboard" component={Dashboard}></Route>
              <Redirect from="/" to="/login"></Redirect>
          </Switch>
    </Suspense>)
}
export default Routes
