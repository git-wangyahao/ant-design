import React, { Component } from 'react';
import { Table, Tag, Space, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddDialog from  '../dialog/addDialog'

const { Column, ColumnGroup } = Table;

// JSX风格的table
const data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '4',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '5',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '6',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '7',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '8',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '9',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '10',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '11',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

class WangAntTable extends Component {
 
  state = {
    modal2Visible: false,
    dataList: data
  };

  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }

  setDialogFalse(modal2Visible) {
    this.setState({ modal2Visible });
  }

  // 监听删除
  handleDel(text, record,index) {
    const List = this.state.dataList
    List.splice(index,1)
    this.setState({
      dataList: [...List]
    })
  }
  

  render() { 
    return ( 
      <div>
        {/* 栅格组件 */}
        <Button type="primary" onClick={() => this.setModal2Visible(true)}><PlusOutlined />新增</Button>
        <Table dataSource={this.state.dataList} rowKey={(record) => {
                 return (record.key + Date.now()) // 在这里加上一个时间戳就可以了
               }}>
          <ColumnGroup title="Name">
            <Column title="First Name" dataIndex="firstName" key="firstName" />
            <Column title="Last Name" dataIndex="lastName" key="lastName" />
          </ColumnGroup>
          <Column title="Age" dataIndex="age" key="age" />
          <Column title="Address" dataIndex="address" key="address" />
          <Column
            title="Tags"
            dataIndex="tags"
            key="tags"
            render={tags => (
              <>
                {tags.map(tag => (
                  <Tag color="blue" key={tag}>
                    {tag}
                  </Tag>
                ))}
              </>
            )}
          />
          <Column
            title="Action"
            key="action"
            render={(text, record,index) => (
              <Space size="middle">
               <Button type="primary">编辑</Button>
               <Button type="primary" danger onClick={() => { this.handleDel(text, record,index) }}>删除</Button>
              </Space>
            )}
          />
        </Table>
 
        <AddDialog modal2Visible={this.state.modal2Visible}  setDialogFalse={this.setDialogFalse.bind(this)} />
      </div>
    );
  }
}
 
export default WangAntTable;