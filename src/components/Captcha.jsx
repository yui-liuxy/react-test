import React, {Component} from 'react';
import axios from "axios";
class Captcha extends Component {
    state={
        img:"",
    }
    render() {
        return (
            <div>
                <img src={this.state.img} alt="captcha"
                 height={this.props.height} onClick={this.loadCaptcha}
                />
            </div>
        );
    }
    componentDidMount() {
        this.loadCaptcha();
    }
    //获取验证码
    loadCaptcha=()=>{
         axios.get("https://reactapi.iynn.cn/captcha/api/math").then(ret=>{
             this.setState(()=>{
                return {img:ret.data.img}
            })
             this.props.setKey(ret.data.key)
         })
    }
}

export default Captcha;