import Img from "@/assets/background.jpg"
import React, {Component} from 'react';
import { Tabs } from 'antd';
import { LockOutlined, ShakeOutlined } from '@ant-design/icons';
import NormallLogin from "./NormallLogin";
import MobileLogin from "./MobileLogin";
import styled from "styled-components";
const { TabPane } = Tabs;

//样式
const Main=styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${Img});
  background-size: cover;
  position: relative;
`
const FromStyle=styled.div`
  margin: 0 auto;
  width: 500px;
  height: 350px;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  opacity: 1;
`

class Index extends Component {
    render() {
        return (
            <Main>
                <FromStyle>
                <Tabs defaultActiveKey="1" centered="true" size="large">
                    <TabPane
                        tab={
                            <span >
         <LockOutlined />
          常规登录
        </span>
                        }
                        key="1"
                    >
                        <NormallLogin ></NormallLogin>
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
         <ShakeOutlined />
          短信登录
        </span>
                        }
                        key="2"
                    >
                       <MobileLogin></MobileLogin>
                    </TabPane>
                </Tabs>
                </FromStyle>
            </Main>
        );
    }
}

export default Index;