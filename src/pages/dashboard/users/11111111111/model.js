import { message } from 'antd';
import { addUser } from './service';

const Model = {
  namespace: 'addUserSpace111',
  state: {

  },
  effects: {
    *addUser({ payload }, { call }) {
      yield call(addUser, payload);
      message.success('ζδΊ€ζε');
    },
  },
};
export default Model;
