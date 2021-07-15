import { message } from 'antd';
import { addUser } from './service';

const Model = {
  namespace: 'addUserSpace111',
  state: {

  },
  effects: {
    *addUser({ payload }, { call }) {
      yield call(addUser, payload);
      message.success('提交成功');
    },
  },
};
export default Model;
