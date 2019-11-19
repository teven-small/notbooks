import React, { Component } from 'react';
import moment from 'moment'
import { Card, Tag, Button, Table, Modal, Typography, Message, Tooltip } from 'antd'
//导出文件
import xlsx from 'xlsx'
import { getArticles, deleteArticle } from '../../https'

import './index.less'

const ButtonGroup = Button.Group

const tableHead = {
   id: "id",
   title: '标题',
   author: '作者',
   createTime: '发布时间',
   readNumber: '阅读量'
}


class Article extends Component {
   constructor() {
      super()
      this.state = {
         dataSource: [],
         total: 0,
         isLoading: false,
         offset: 0,
         limite: 10,
         modalTitle: '',
         isShowModal: false,
         deleteLoading: false,
         deleteArticleID: null
      }
   }

   columnsFun = (columnKeys) => {
      const columns = columnKeys.map(item => {
         if (item === 'readNumber') {
            return {
               title: tableHead[item],
               key: item,
               render: (record) => {
                  const { readNumber } = record
                  //根据数据的大小来渲染
                  //同理可以根据职位的级别不同渲染不同的颜色
                  //总经理：'001'  经理：'002' 主管：'003'
                  // const titleMap = {
                  //    '001': 'red',
                  //    '002': 'green',
                  //    '003': '#f90'
                  // }
                  // return <Tag color={titleMap[key]}>{record.title}</Tag>
                  return (
                     <Tooltip title={readNumber > 200 ? "超过200" : "没超过200"}>
                        <Tag color={readNumber > 200 ? 'red' : 'green'}>{record.readNumber}</Tag>
                     </Tooltip>
                  )
               }
            }
         }

         if (item === 'createTime') {
            return {
               title: tableHead[item],
               key: item,
               render: (record) => {
                  const { createTime } = record
                  return moment(createTime).format('YYYY年MM月DD日 hh时mm分ss秒')
               }
            }
         }

         return {
            title: tableHead[item],
            dataIndex: item,
            key: item
         }
      })

      columns.push({
         title: '操作',
         key: '动作',
         render: (record) => {
            return (
               <ButtonGroup>
                  <Button size="small" type="primary" onClick={this.toEdit.bind(this, record)}>编辑</Button>
                  <Button size="small" type="danger" onClick={this.deleteArticle.bind(this, record)}>删除</Button>
               </ButtonGroup>
            )
         }
      })

      return columns
   }

   //编辑文章
   toEdit = (record) => {
      this.props.history.push({
         pathname: `/admin/article/edit/${record.id}`,
         state: {
            title: record.title
         }
      })
   }

   //删除文章
   deleteArticle = (record) => {
      // console.log(record)
      // Modal.confirm({
      //    title: '此操作不可逆，请谨慎！',
      //    content: <>确定要删除<span style={{ color: 'red' }}>《{record.title}》</span>么？</>,
      //    cancelText: '我点错了',
      //    okText: '别墨迹，赶紧删除',
      //    onOk: () => {
      //       deleteArticle(record.id)
      //          .then(res => {
      //             console.log(res)
      //          })
      //          .catch(err => {
      //             console.log(err)
      //          })
      //    }
      // })
      this.setState({
         isShowModal: true,
         modalTitle: record.title,
         deleteArticleID: record.id
      })
   }

   hideModal = () => {
      this.setState({
         isShowModal: false,
         modalTitle: '',
         deleteLoading: false
      })
   }

   sendDeleteArticle = () => {
      this.setState({
         deleteLoading: true
      })
      deleteArticle(this.state.deleteArticleID)
         .then(res => {
            Message.success(res.msg)
            this.setState({
               offset: 0
            }, () => {
               this.getDatas()
            })
         })
         .finally(() => {
            this.setState({
               deleteLoading: false,
               isShowModal: false
            })
         })
   }

   setData = (state) => {
      if (!this.updater.isMounted(this)) return
      this.setState(state)
   }

   getDatas = () => {
      this.setState({
         isLoading: true
      })
      getArticles(this.state.offset, this.state.limite)
         .then(res => {
            const columnKeys = Object.keys(res.list[0])
            // const columns = columnKeys.map(item => {
            //    return {
            //       title: tableHead[item],
            //       dataIndex: item,
            //       key: item
            //    }
            // })
            const columns = this.columnsFun(columnKeys)
            this.setData({
               total: res.total,
               dataSource: res.list,
               columns
            })
         })
         .catch(err => {
            console.log(err)
         })
         .finally(() => {
            this.setData({
               isLoading: false
            })
         })
   }

   componentDidMount() {

      this.getDatas()
   }

   onPageChange = (page, pageSize) => {
      this.setState({
         offset: pageSize * (page - 1),
         limite: page
      }, () => {
         this.getDatas()
      })
   }

   onShowSizeChange = (current, size) => {
      this.setState({
         offset: 0,
         limite: size
      }, () => {
         this.getDatas()
      })
   }

   toExcel = () => {
      // const ws = xlsx.utils.aoa_to_sheet([['a', 'b'], [1, 2]])
      // const wb = xlsx.utils.book_new()
      // xlsx.utils.book_append_sheet(wb, ws, 'SheetJS')
      // xlsx.writeFile(wb, `sheetjs-${moment().format('YYYY-MM-DD-HH-MM-SS'.xlsx)}`)

      //组合数据
      const data = [Object.keys(this.state.dataSource[0])]

      for (let i = 0; i < this.state.dataSource.length; i++) {
         data.push([
            this.state.dataSource[i].id,
            this.state.dataSource[i].title,
            this.state.dataSource[i].author,
            this.state.dataSource[i].readNumber,
            moment(this.state.dataSource[i].createTime).format('YYYY年MM月DD日 HH时MM分SS秒')
         ])
      }
      const ws = xlsx.utils.aoa_to_sheet(data)
      const wb = xlsx.utils.book_new()
      xlsx.utils.book_append_sheet(wb, ws, 'SheetJS')
      xlsx.writeFile(wb, `sheetjs-${moment().format('YYYY-MM-DD-HH-MM-SS')}.xlsx`)
   }

   render() {
      return (
         <Card
            title="文章列表"
            extra={<Button onClick={this.toExcel}>导出Excel</Button>}>
            <Table
               rowKey={record => record.id}
               dataSource={this.state.dataSource}
               columns={this.state.columns}
               loading={this.state.isLoading}
               pagination={{
                  // current: this.state.offset / this.state.limite + 1,
                  // current: this.state.offset,
                  total: this.state.total,
                  hideOnSinglePage: true,
                  showQuickJumper: true,
                  showSizeChanger: true,
                  onChange: this.onPageChange,
                  onShowSizeChange: this.onShowSizeChange
               }} />

            <Modal
               title="此操作不可逆，请谨慎！"
               visible={this.state.isShowModal}
               onCancel={this.hideModal}
               confirmLoading={this.state.deleteLoading}
               onOk={this.sendDeleteArticle}
            >
               <Typography>确定要删除<span style={{ color: 'red' }}>《{this.state.modalTitle}》</span>么？</Typography>
            </Modal>
         </Card>
      )
   }
}

export default Article;