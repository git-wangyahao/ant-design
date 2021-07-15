import { addFakeList, queryFakeList, removeFakeList, updateFakeList ,getUsers} from './service';

const Model = {
  namespace: 'listAndbasicList',
  state: {
    list: [],
    table:[1,2,3,4]
  },
  // 做异步请求
  effects: {
    *fetch({ payload }, { call, put }) {
      /**
       *  @call params 参数一 service 请求方法
       *  @call params 参数二 service 请求方法 需要的参数
       */
      const response = yield call(getUsers, payload);
      /**
       * yield put 方法 参数 object 
       * put 方法用来存state数据 参数object
       * 属性 type 是 reducers 定义的 方法/函数 
       * 属性 payload 是存state的参数
       *  
       */

      const res = response.data
      yield put({
        type: 'queryList',
        payload: Array.isArray(res) ? res : [],
      });
    },

    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },

    *submit({ payload }, { call, put }) {
      let callback;

      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
      } else {
        callback = addFakeList;
      }

      const response = yield call(callback, payload); // post

      yield put({
        type: 'queryList',
        payload: response,
      });
    },
  },
  // 做同步操作
  reducers: {
    /**
     * 
     * @param {*} state 
     * @param {*} action 
     * @returns 
     */

    queryList(state, action) {
     
      return { ...state, list: action.payload };
    },

    // 添加数据
    appendList(
      state = {
        list: [],
      },
      action,
    ) {
      return { ...state, list: state.list.concat(action.payload) };
    },
  },
};
export default Model;
