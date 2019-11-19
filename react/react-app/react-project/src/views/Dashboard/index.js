import React, { Component, createRef } from 'react';
import { Card, Row, Col } from 'antd'
import echarts from 'echarts'

import { getReadArticleAmount } from '../../https'

import './index.less'


class Dashboard extends Component {
   constructor() {
      super()
      this.elEcharts = createRef()
   }

   //echarts初始化
   initCharts = () => {
      // 基于准备好的dom，初始化echarts实例
      this.elEcharts = echarts.init(this.elEcharts.current)
   }

   componentDidMount() {
      this.initCharts()

      getReadArticleAmount()
         .then(res => {
            console.log(res)
            // 指定图表的配置项和数据
            const option = {
               xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  data: res.list.map(item => item.mouth)
               },
               yAxis: {
                  type: 'value'
               },
               series: [{
                  data: res.list.map(item => item.value),
                  type: 'line',
                  areaStyle: {}
               }]
            }

            this.elEcharts.setOption(option)
         })
   }

   render() {
      return (
         <>
            <Card
               title="概念"
               bordered={false} >
               <Row gutter={16}>
                  <Col className="gutter-col" span={6}>
                     <div className="gutter-col-box" style={{ backgroundColor: '#afbfac' }}>gutter-col 6</div>
                  </Col>
                  <Col className="gutter-col" span={6}>
                     <div className="gutter-col-box" style={{ backgroundColor: '#316f25' }}>gutter-col 6</div>
                  </Col>
                  <Col className="gutter-col" span={6}>
                     <div className="gutter-col-box" style={{ backgroundColor: '#f44336' }}>gutter-col 6</div>
                  </Col>
                  <Col className="gutter-col" span={6}>
                     <div className="gutter-col-box" style={{ backgroundColor: '#ff9800' }}>gutter-col 6</div>
                  </Col>
               </Row>
            </Card>

            <Card title="最近浏览数量" bordered={false}>
               <div ref={this.elEcharts} style={{ height: '400px' }} />
            </Card>
         </>
      );
   }
}

export default Dashboard;