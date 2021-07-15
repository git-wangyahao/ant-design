import request from '@/utils/request-user'

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
export  function delUserApi(id) {
  return request(`/delUser/${id}`, {
    method: 'delete'
  });
}

// 编辑用户
export function editUserApi( data ) {
  return request(`/updateUser`, {
    method: 'put',
    data
  });
}

