import React, {Component,createRef} from 'react';
import { Form, Input, Button, Row,Col,Modal ,message} from 'antd';
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

class MobileLogin extends Component {
    constructor(props) {
        super(props);
        this.ref_cpt=createRef();
        this.ref_Captcha=createRef();
        this.ref_Mobile=createRef();
    }
    state={
        key:"",
        token:"",
        expire:0,
        isModalVisible:false,
        requestId:"",
        count:60,
        //按钮的状态
        can:true,

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
                        label="手机号"
                        name="mobile"
                        rules={[
                            {
                                required: true,
                                message: '请输入手机号!',
                            },
                        ]}
                    >
                        <Input ref={this.ref_Mobile} />
                    </Form.Item>
                    <Form.Item label="短信验证码" >
                        <Row gutter={8}>
                            <Col span={14}>
                                <Form.Item
                                    name="code"
                                    noStyle
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入短信验证码!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                <Button block onClick={this.getCode}>
                                    {this.state.can?"获取短信":this.state.count+"秒后获取"}
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" block>
                            登陆
                        </Button>
                    </Form.Item>
                </Form>
                {/*模态窗口*/}
                <Modal title="验证码" visible={this.state.isModalVisible}
                       onOk={this.handleOk} onCancel={this.handleCancel}
                       cancelText="取消" okText="确认"
                >
                    <Form>
                    <Form.Item label="验证码" >
                        <Row gutter={8}>
                            <Col span={14}>
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
                                    <Input ref={this.ref_cpt} />
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                <Captcha height="31.6" setKey={this.setKey}
                                         ref={this.ref_Captcha}
                                ></Captcha>
                            </Col>
                        </Row>
                    </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }

   onFinish = (values) => {
        values['requestId']=this.state.requestId
       console.log(values)
        Model.mobileLogin(values).then((ret)=>{
            if (ret.data.errNo===0){
                console.log(ret)
                message.success(ret.data.message,2,()=>{
                    this.props.history.push("/dashboard")
                })
            }else {
                message.error(ret.data.errText);
            }
        })
    };

   onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
   getCode=()=>{
       let mobile=this.ref_Mobile.current.props.value
            if(/^1[3-9]\d{9}$/.test(mobile)){
                if(this.state.can){
                    this.showModal(true)
                }
       }else{
                message.error("请输入正确的手机号")
            }
}
 setKey=(key)=>{
       this.setState(()=>{
           return {
               key
           }
       })
 }
//倒计时
countDown=()=>{
       if(this.state.count===1){
           this.setState(()=>{
               return{
                   count:60,
                   can:true,
              }
           })
       }else {
           this.setState((state)=>{
               return{
                   count:state.count-1
               }
           })
           setTimeout(()=>{
                    this.countDown()
           },1000)
       }
}
//模态窗口控制
showModal = (flag) => {
        this.setState(()=>{
            return{
                isModalVisible:flag,
            }
        })
    };

    handleOk = () => {
        let values={};
        let mobile=this.ref_Mobile.current.props.value;
        values['captcha']=this.ref_cpt.current.props.value;
        values["key"]=this.state.key;
        Model.verifyCpt(values).then(ret=>{
          if(ret.data.errNo===0){
              message.success(ret.data.message,2,()=>{
                  this.setState(()=>{
                      return{
                          token:ret.data.context.token,
                          expire:ret.data.context.expire,
                      }
                  },
                      ()=>{
                         this.showModal(false);
                          let data={};
                          data['token']=this.state.token;
                          data["mobile"]=mobile;
                          data['type']=0;
                          Model.getCode(data).then((ret)=>{
                              if (ret.data.errNo===0){
                                  this.setState(()=>{
                                      return{can:false}
                                  })
                                  this.countDown();
                                  message.success(ret.data.message,2,()=>{
                                      this.setState(()=>{
                                          return{
                                              requestId:ret.data.requestId,
                                          }
                                      })
                                  })
                              }else {
                                  message.error(ret.data.errText);
                              }
                          })
                      }
                  )
              });
          }else {
              message.error(ret.data.errText);
              this.ref_Captcha.current.loadCaptcha();
          }
        })

    };
     handleCancel = () => {
         this.showModal(false)
    };


    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }

    }

export default withRouter(MobileLogin);