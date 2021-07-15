import { message } from 'antd';
import { addUser,getUsersByParams,delUserApi, editUserApi } from './service';

const Model = {
  namespace: 'addUserSpace',
  state: {
    list:[],
    pagination:null
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      /**
       *  @call params 参数一 service 请求方法
       *  @call params 参数二 service 请求方法 需要的参数
       */
      const response = yield call(getUsersByParams, payload);
      /**
       * yield put 方法 参数 object 
       * put 方法用来存state数据 参数object
       * 属性 type 是 reducers 定义的 方法/函数 
       * 属性 payload 是存state的参数
       * 
       *  
       */

      const res = response.data.list
      yield put({
        type: 'queryList',
        payload: Array.isArray(res) ? res : [],
      });
      yield put({
        type: 'pagination',
        payload: response.data
      });
    },
    *updPagination({ payload }, { put }) {
      yield put({
        type: 'updpagination',
        payload
      });
    },
    *addUser({ payload }, { call }) {
      yield call(addUser, payload);
      message.success('提交成功');
    },

    /**
     * 
     * @param {*} payload 载荷 是接受的参数
     * @param {*} call  是用来调封装的接口方法的
     */
    *delUser({ payload }, { call }) {
      yield call(delUserApi, payload);
      message.success('删除成功');
    },

    /**
     * 编辑用户
     */
    *editUser({ payload },{ call } ) {
      // eslint-disable-next-line no-console
      console.log("payload", payload )
      yield call( editUserApi, payload)
      message.success('删除成功');
    }
  },
  reducers: { 
    /**
     * 
     * @param {*} state 
     * @param {*} action 
     * @returns 
     */

    queryList(state, action) {
      
      return { 
        ...state, 
        list: action.payload
      };
    },
    updpagination(state, action) {
      return { 
        ...state,
        pagination:action.payload
       }
    },
    pagination(state, action) {
      const { currentPage,pageSize,total,current } = action.payload
      return { 
        ...state,
        pagination:{
          current:currentPage || current,
          pageSize,
          total,
        }
       }
    }
  }
};
export default Model;
