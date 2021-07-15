import React, { Component , useEffect, useRef } from 'react';
import {Form, Table, Input, Space, Popconfirm,message,Button,Modal} from 'antd';
import { getUsersByParams,delUserApi,addUser } from './request'

const { Search } = Input;
/**
 * 此组件单纯使用 class组件 一个文件完成
 */
//  dataIndex 是对应的数据库字段

// reset form fields when modal is form, closed
const useResetFormOnCloseModal = ({ form, visible }) => {

  const prevVisibleRef = useRef();
  useEffect(() => {
    prevVisibleRef.current = visible;
  }, [visible]);
  const prevVisible = prevVisibleRef.current;
  useEffect(() => {
    if (!visible && prevVisible) {
      form.resetFields();
    }
  }, [visible]);
};


// 编辑 和 新增
const ModalForm = ({ visible,formData, onCancel, type, refresh }) => {
  const [form] = Form.useForm();

     // 控制表单是否重置
  useResetFormOnCloseModal({
    form,
    visible,
  });
  
  // 表单编辑数据
  useEffect(() => {
    if( type === 'edit') {
      form.setFieldsValue(formData);
    }
  });


  const onOk = () => {
    form.submit();
    form.validateFields().then(async val => {
      const res = await addUser(val)
      if(res.code === 200) {
        message.success('新增成功');
        refresh()
      }
    }).catch(error => {
      console.log(error)
    })
  };

  return (
    <Modal title="Basic Drawer" visible={visible} onOk={ onOk } onCancel={onCancel}>
      <Form form={form} layout="vertical" name="userForm">
        <Form.Item
          name="user_name"
          label="用户名"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="user_password"
          label="密码"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};




class User extends Component {

  state = { 
    pagination : {
      pageSize:10,
      current:1,
      total:0,
      username:''
    },
    age:111111,
    list:[],
    loading: false,
    visible:false,
    form:null,
    type:'add'
  }

  
 handleEdit = (val) =>{
  this.setState({
    ...this.state,
    visible:true,
    form:val,
    type:'edit'
  })
  
 }


  async confirm (val) {
  const res = await delUserApi(val.user_id)
  if(res.code === 200) {
    this.getData()
    message.success('删除成功');
  }
 }

 cancel (e){
  console.log(e);
  message.success('Click on Yes');
 }


 columns = [
    {
      title: '用户名',
      dataIndex: 'user_name',
      render: text => <a>{text}</a>,
    },
    {
      title: '密码',
      dataIndex: 'user_password',
  
    },
    // text, record
    {
      title: 'Action',
      key: 'action',
      width: '180px',
      render: ( text) => (
        <Space size="middle">
          <a onClick={ () => { this.handleEdit (text)} }>编辑 </a>
          <Popconfirm
            title="是否确定删除此记录?"
            onConfirm={ () =>{ this.confirm(text) }}
            onCancel={this.cancel}
            okText="确定"
            cancelText="取消"
          >
             <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];


  handleonChange(page) {
    this.setState({
      pagination: {
        ...this.state.pagination,
        ...page
      }
    },() => {
      this.getData()
    })
  }

  componentDidMount() {
    this.getData()
  }

  async getData() {
    this.setState({ loading: true });
    const res = await getUsersByParams(this.state.pagination)
    this.setState({
      list: res.data.list
    },() => {
      this.setState({ loading: false });
    })
    this.handlePagination(res.data)
  }

  handlePagination(pagination) {
    const { currentPage,pageSize,total } = pagination
    this.setState( { 
      pagination: {
        current:currentPage,
        pageSize,
        total
      }
    })
  
  }

  onSearch = value => {
    this.setState({ 
      pagination: {
        username: value,
        ...this.state.pagination
      }
    }, () => {
      this.getData()
    })
   }

  hideUserModal = () => {
    this.setState({
      ...this.state,
      visible:false,
      form:null
    })
  };

  addShowUserModal = () => {
    this.setState({
      ...this.state,
      visible:true,
      type:'add'
    })
  }

  refresh() {
    this.getData()
    this.setState({
      ...this.state,
      visible:false,
      form:null
    })
  }


  render() {
    const { list, pagination, loading,visible, form,type } = this.state
    return ( 
      <div>
        <Space direction="vertical">
          <Search placeholder="input search text" onSearch={this.onSearch.bind(this)} enterButton />
          <Button type="primary" onClick={ this.addShowUserModal}>新增</Button>
        </Space>
        <Table columns={this.columns} loading={loading} dataSource={list} pagination={pagination} onChange={this.handleonChange.bind(this) }/>
        <ModalForm visible={visible} formData={form} type={type} refresh={this.refresh.bind(this)} onCancel={this.hideUserModal} />
      </div>
    );
  }
}
 
export default User;



