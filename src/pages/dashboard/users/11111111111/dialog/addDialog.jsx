import React, { Component } from 'react';
import { Modal } from 'antd';
import { Form, Input, Button } from 'antd';
import { connect,  } from 'umi';

class AddDialog extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      modal2Visible1:false
     }
    // eslint-disable-next-line no-console
    console.log("modal2Visible",props.modal2Visible)
  }



  onFinish(values) {
    // values  表单数据 可做提交
    // eslint-disable-next-line no-console
    console.log("this.props", this.props)
    const { dispatch } = this.props;
    dispatch({
      type: 'addUserSpace/addUser',
      payload: values,
    });
    // this.props.setDialogFalse(false)

  }

  onFinishFailed() {
    // eslint-disable-next-line no-console
    console.log("this.props", this.props)
    // this.props.setDialogFalse(false)
  }


  render() { 
    const { submitting }  = this.props
    return ( 
      <div>
        <Modal
          title="Vertically centered modal dialog"
          centered
          visible={this.props.modal2Visible}
        >
          <Form
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish.bind(this)}
            onFinishFailed={this.onFinishFailed.bind(this)}
          >
            <Form.Item
              label="用户名"
              name="user_name"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="user_password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" loading={submitting}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
     );
  }
}
 
export default connect(({ loading }) => ({
  submitting: loading.effects['addUserSpace/addUser'],
}))(AddDialog);
