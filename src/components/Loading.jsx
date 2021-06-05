import React, {Component} from 'react';
import styled from "styled-components";
import {Spin} from "antd";

class Loading extends Component {
    render() {
        return (
            <Main>
             <Spin tip="请稍等,页面加载中"/>
            </Main>
        );
    }
}
const Main= styled.div`
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 25% 50px;
  text-align: center;
  border-radius: 4px;
`
export default Loading;