import React, { Component } from 'react';
import { Table,  Space, Button,Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddDialog from  '../dialog/addDialog'
import EditDialog from  '../dialog/editDialog'
import { connect } from 'umi';

const { Column } = Table;

// JSX风格的table

class WangAntTable extends Component {
 
  state = {
    modal2Visible: false,
    visible:false,
    confirmLoading:false,
    editVisible:false,
  };

  componentDidMount() {
    this.getData()
  }

  getData() {
    this.props.dispatch({
      type: 'addUserSpace/fetch',
      payload: this.props.pagination
    });
  }

  refresh() {
    this.getData()
  }

  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }

  setDialogFalse(modal2Visible) {
    this.setState({ modal2Visible });
  }


  // 编辑

  setEditModal2Visible(editVisible) {
    this.setState({ editVisible });
  }

  setEditDialogFalse(editVisible) {
    this.setState({ editVisible });
  }

  // 监听删除
  handleDel(text) {
    this.props.dispatch({
      type: 'addUserSpace/delUser',
      payload: {
        id: text.user_id,
      },
    });
    this.getData()
  }


  // 取消删除
  handleCancel() {
    
  }

  onShowSizeChange(pagination) {
    console.log("pagination", pagination)
    // 保存数据到state
    // updPagination
    this.props.dispatch({
      type: 'addUserSpace/updPagination',
      payload: pagination,
    })
    this.refresh()
  } 
  
  render() { 
    return ( 
      <div>
        {/* 栅格组件 */}
        <Button type="primary" onClick={() => this.setModal2Visible(true)}><PlusOutlined />新增</Button>
        <Table dataSource={this.props.list} onChange={this.onShowSizeChange.bind(this)} pagination={ this.props.pagination} >
          <Column title="用户名" dataIndex="user_name" key="id" />
          <Column
            title="Action"
            key="action"
            render={(text) => (
              <Space size="middle">
               <Button type="primary" onClick={() => this.setEditModal2Visible(true)}>编辑</Button>
               <Popconfirm
                  title="提示"
                  onConfirm={() => { this.handleDel(text) }}
                  onCancel={this.handleCancel.bind(this)}
                  okText="确定"
                  cancelText="取消"
                >
                 <Button type="primary" danger >删除</Button>
               </Popconfirm>
              </Space>
            )}
          />
        </Table>

        { this.state.modal2Visible? (
          <AddDialog modal2Visible={this.state.modal2Visible} refresh={this.refresh.bind(this)} setDialogFalse={this.setDialogFalse.bind(this)} />
        ) : null}

        { this.state.modal1Visible? (
          <EditDialog editVisible={this.state.editVisible} refresh={this.refresh.bind(this)} setEditDialogFalse={this.setEditDialogFalse.bind(this)} />
        ) : null}
      </div>
    );
  }
}

// 绑定redux 和 react 组件
/**
 * 
 * @param {*} addUserSpace  属于命名空间，是从state解构出来的数据
 * @returns  返回值会与组件内部props合并
 */
// addUserSpace 属于数据源 
const mapStateToProps = ({addUserSpace}) => {
  // eslint-disable-next-line no-console
  // addUserSpace store中的数据  需要返回

  return addUserSpace
}

// ({ addUserSpace }) => ({
//   addUserSpace,
// })
export default connect(mapStateToProps)(WangAntTable);
 