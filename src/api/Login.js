import request from "@/utils/request";
/*登录*/

export function login(data){
    return request.post('/pms/login', data)
}

