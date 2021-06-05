import React, { useEffect, useState } from 'react'
import {Link,Route} from  "react-router-dom"
export const StateHooks = () => {

    return(
        <div>
            <ul>
                <li>  <Link to="/home">首页</Link></li>
                <li>  <Link to="/nwes">新闻</Link></li>
                <li>  <Link to="/about">关于</Link></li>
            </ul>
            <Route path="/home" component={Index}></Route>
            <Route path="/news" component={Nwes}></Route>
            <Route path="/about" component={About}></Route>
        </div>
    );
};

const Index=()=>{
    useEffect(()=>{
        return ()=>{
            console.log("Home组件将要解除挂载")
        }
    })
     return(
         <div>首页</div>
     )
}

const Nwes=()=>{
    const [state,setstate]=useState(0)
    useEffect(()=>{
        console.log("Nwes组件已经挂载")
    })
    return(
        <div>
            <h1>新闻</h1>
            <div>当前state值为{state}</div>
            <button onClick={()=>setstate(state+1)}>点击加1</button>
        </div>

    )
}

const About=()=>{
    return(
        <div>关于</div>
    )
}