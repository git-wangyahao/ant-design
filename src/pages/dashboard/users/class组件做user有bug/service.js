import request from '@/utils/request-user';

// 查询全部用户
export async function getUsers() {
  return request('/getUsers', {
    method: 'GET',
  });
}
export async function getUsersByParams(data) {
  return request('/getUsersByParams', {
    method: 'POST', 
    data
  });
}



export async function addUser(params) {
  return request('/addUser', {
    method: 'POST',
    data: params,
  });
}

// 删除用户
export async function delUserApi( { id } ) {
  return request(`/delUser/${id}`, {
    method: 'delete'
  });
}

// 编辑用户
export async function editUserApi( data ) {
  return request(`/updateUser`, {
    method: 'put',
    data
  });
}




