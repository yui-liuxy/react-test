import React, {Component,createRef} from 'react';
import { Form, Input, Button,Row,Col,message} from 'antd';
import Captcha from "../../components/Captcha";
import Model from "../../models/common";
import { withRouter } from "react-router-dom";
const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 6,
        span: 14,
    },
};

class NormallLogin extends Component {
    state={
       key:"",
    }
    constructor(props) {
        super(props);
        this.ref_Captcha=createRef();
    }
    render() {
        return (
            <div>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        label="账号"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入账号!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label="验证码" >
                        <Row gutter={6}>
                            <Col span={13}>
                                <Form.Item
                                    name="captcha"
                                    noStyle
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入验证码!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                <Captcha height="31.6" setKey={this.setKey}
                                 ref={this.ref_Captcha}
                                ></Captcha>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }

    onFinish = (values) => {
        values['key']=this.state.key;
        Model.normalLogin(values).then((ret)=>{
            console.log(ret)
           if(ret.data.errNo===0){
               message.success(ret.data.message,2,()=>{
                   this.props.history.push("/dashboard")
               })

           } else {
               message.error(ret.data.errText)
               //刷新验证码
               this.ref_Captcha.current.loadCaptcha()
           }
        })
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    setKey=(key)=>{
        this.setState(()=>{
            return{
                key,
            }
        })
    }
}
export default  withRouter(NormallLogin) ;