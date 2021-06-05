import React, {Component} from 'react';
import CheckLogin from "../../hoc/CheckLogin";
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import "../../assets/CSS/layout.css";
import logo from "../../assets/logo.png";
import smlogo from "../../assets/favicon.ico"
import Model from "../../models/common";
import Routes from "../../router/nest";
const { Header, Sider, Content } = Layout;

class Index extends Component {
    state = {
        collapsed: false,
        adminInfo:{last_login_addr:{}},
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };


    render() {
        return (
            <Layout style={{height:"100%"}}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" >
                        {this.state.collapsed?<img src={smlogo} alt="" />:<img src={logo} alt=""/>}
                    </div>
                    <Menu theme="dark" mode="inline" >
                        <Menu.Item key="1" icon={<UserOutlined />} onClick={this.changeMune}>
                            用户管理
                        </Menu.Item>
                        <Menu.Item key="2" icon={<VideoCameraOutlined/>} onClick={this.changeMune}>
                            视频管理
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UploadOutlined/>}  onClick={this.changeMune}>
                            上传管理
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: "5 5"}}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}
                      <span>
                          {"  "} 欢迎您:{"  "+this.state.adminInfo.username}!您上次登录于
                          {" " + this.state.adminInfo.last_login_addr.state + " " + this.state.adminInfo.last_login_addr.isp}（
                          {this.state.adminInfo.last_ip}）
                      </span>
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <Routes></Routes>
                    </Content>
                </Layout>
            </Layout>
        );
    }
    componentDidMount() {
        Model.getAdminInfo().then((ret)=>{
            this.setState(()=>{
                return{
                    adminInfo:ret.data.accountInfo,
                }
            })
        })
    }
    changeMune=(obj)=>{
        console.log(obj)
        if(obj.key==="1"){
            this.props.history.push("/dashboard/users")
        }
        if(obj.key==="2"){
            this.props.history.push("/dashboard/videos")
        }
        if(obj.key==="3"){
            this.props.history.push("/dashboard/uploading")
        }
    }
}

export default  CheckLogin(Index);