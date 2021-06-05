import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import Model from "../models/common";
function CheckLogin(Cmp)  {

        return class Hoc extends Component {
            state={
                isLogin:false,
                isFinish:false
            };
             render(){
              return  <> {this.state.isFinish?(this.state.isLogin?<Cmp
                  {...this.props} />:<Redirect to="/login" />):<div/>}
              </>
             }
             componentDidMount() {
                 let jwt=localStorage.getItem("jwt")
                 if(jwt){
                     Model.checkJWT().then((ret)=>{
                         if(ret.data.errNo===0){
                             this.setState(()=>{
                                 return {
                                     isLogin:true,
                                     isFinish:true
                                 }
                             })
                         }else {
                             this.setState(()=>{
                                 return {
                                     isLogin:false,
                                     isFinish:true
                                 }
                             })
                         }
                     })

                 }else {
                     this.setState(()=>{
                         return {
                             isFinish:true
                         }
                     })
                 }
             }
        }
}

export default CheckLogin;