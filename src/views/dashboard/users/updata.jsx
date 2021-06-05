import React, {Component} from 'react';
import Model from "../../../models/users";
import { Form, Input,  Select,   Button,message } from 'antd';
import {Link} from "react-router-dom";
const { Option } = Select;

class Updata extends Component {
    layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 8,
        },
    };
    tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 10,
                offset: 4,
            },
            sm: {
                span: 8,
                offset: 8,
            },
        },
    };


    render() {
        return (
            <div>
                <Link to="/dashboard/users"><Button type="primary" >返回</Button></Link>
                <Form
                    name="register"
                    form={this.form}
                    onFinish={this.onFinish}
                    {...this.layout}
                >
                    <Form.Item
                        name="id"
                        label="id"
                        tooltip="请输入你要修改的id"
                        rules={[
                            {
                                required: true,
                                message: '请输入id!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="username"
                        label="呢称"
                        tooltip="请输入你要添加的昵称"
                        rules={[
                            {
                                required: true,
                                message: '请输入呢称!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="邮箱"
                        rules={[
                            {
                                type: 'email',
                                message: '请输入正确的邮箱!',
                            },
                            {
                                required: true,
                                message: '请输入你的邮箱!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="密码"
                        rules={[
                            {
                                required: true,
                                message: '请输入你的密码!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="cnpassword"
                        label="确认密码"
                        dependencies={['cnpassword']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '请确认你的密码!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('两次密码不一致请重新输入!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="mobile"
                        label="手机号"
                        rules={[
                            {
                                required: true,
                                message: '请输入正确的手机号!',
                            },
                        ]}
                    >
                        <Input
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="gender"
                        label="性别"
                        rules={[
                            {
                                required: true,
                                message: '请选择你的性别!',
                            },
                        ]}
                    >
                        <Select placeholder="选择性别">
                            <Option value="1">男</Option>
                            <Option value="2">女</Option>
                            <Option value="3">保密</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item {...this.tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" block >
                            确认添加
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        );
    }
    onFinish = (values) => {
        values.mobile=parseInt(values.mobile)
        values.gender=parseInt(values.gender)
        delete  values.cnpassword
        Model.updataUser(values).then((ret)=>{
            if(ret.data.errNo===0){
                console.log(1111)
                this.goback()
            }
        })
    }
    goback(){
        message.success("添加成功。返回用户列表",2,()=>{
            this.props.history.push("/dashboard/users")
        })
    }
}

export default Updata;