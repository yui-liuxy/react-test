import React, {Component} from 'react';
import { PageHeader, Button, Table, Tag, Space,Pagination ,Modal ,message} from 'antd';
import Model from "../../../models/users";
import * as echarts from 'echarts/core';
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent
} from 'echarts/components';
import {
    PieChart
} from 'echarts/charts';
import {
    CanvasRenderer
} from 'echarts/renderers';

echarts.use(
    [TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer]
);


class Index extends Component {
    state={
        paginate:{},
        page:1,
        keywords:"",
        visible:false,
        statistics: [],
    }
    columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '性别',
            dataIndex: 'gender',
            key: 'gender',
            render:(gender)=>{
                if(gender==="1"){
                    return "男"
                }
                if(gender==="2"){
                    return "女"
                }else {
                    return "保密"
                }
            }
        },
        {
            title: '状态',
            key: 'status',
            dataIndex: 'status',
            render: status => (
                <>
                    {
                        status==="1"?(<Tag color="green">正常</Tag>):(
                            <Tag color="red">禁用</Tag>
                        )
                    }
                </>
            ),
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={()=>this.updateRow(record)}>编辑</a>
                    <a onClick={()=>this.deleteRow(record)} >删除</a>
                </Space>
            ),
        },
    ];
    render() {
        return (
            <div>
                <PageHeader
                    ghost={false}
                    title="用户管理"
                    subTitle="用户列表"
                    extra={[
                        <Button key="2" onClick={this.showMoal}>统计数据</Button>,
                        <Button key="1" type="primary" onClick={this.addMessage}>
                            新增
                        </Button>,
                    ]}
                >
                </PageHeader>
                <Table columns={this.columns} dataSource={this.state.paginate.data}
                       pagination={false} rowKey={(row)=>row.id}
                />
                <Pagination defaultCurrent={this.state.page} total={this.state.paginate.total}
                  style={{marginTop:"20px",textAlign:"center"}} onChange={this.onChange}
                            showSizeChanger={false}
                />

                <Modal
                    title="男女会员比例统计"
                    centered
                    visible={this.state.visible}
                    onOk={() => this.setVisible(false)}
                    onCancel={() =>this.setVisible(false)}
                    width={1000}
                >
                 <div id="main" style={{height:"450px"}}></div>
                </Modal>
            </div>
        );
    }
    setVisible=(flag)=>{
        this.setState(()=>{
            return{
                visible:flag,
            }
        })
    }
    showMoal=()=>{
        Model.getStatistics().then((ret)=>{
            if(ret.data.errNo===0){
                this.setState(()=>{
                    return{
                        visible:true,
                        statistics: ret.data.data,
                    }
                },()=>{
                    var chartDom = document.getElementById('main');
                    var myChart = echarts.init(chartDom);
                    var option;

                    option = {
                        title: {
                            text: '本网站的会员统计',
                            subtext: '数据来源网络',
                            left: 'center'
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: '{a} <br/>{b} : {c} ({d}%)'
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                        },
                        series: [
                            {
                                name: '性别',
                                type: 'pie',
                                radius: '60%',
                                data: this.state.statistics,
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    };
                    option && myChart.setOption(option);
                })
            }
        })

    }
    componentDidMount() {
         this.loadData();
    }
    loadData=()=>{
          let obj={
              keywords: this.state.keywords,
              page: this.state.page,
          }
          Model.getUsersList(obj).then((ret)=>{
              console.log(ret)
              this.setState(()=>{
                return{
                    paginate:ret.data.paginate
                }
              })
          })
    }
    onChange=(page, pageSize)=>{
        this.setState(()=>{
            return{ page}
        },()=>this.loadData())
    }
    addMessage=()=>{
        this.props.history.push('/dashboard/users/addMessage')
    }
    deleteRow = (a) => {
        let id=a.id
        let nowPage=this.state.page
        Model.deleteUser(id).then((ret)=>{
            console.log(ret)
           if(ret.data.errNo===0){
               message.success("删除成功",2,()=>{
                   this.setState(()=>{
                       return{page:nowPage}
                   })
                   this.loadData();
               })
           }else {
               message.error("删除失败，请重试")
           }
        })
    }
    updateRow= (a) => {
        let id=a.id
        Model.detailedUser(id).then((ret)=>{
            console.log(ret)
            if(ret.data.errNo===0){
                this.props.history.push('/dashboard/users/updata')
            }else {
                message.error("请求失败，请重试")
            }
        })
    }

}

export default Index;