import request from "@/utils/request";
/*登录*/

export function loginForPropertyManagement(data){
    return request.post('/pms/login/propertymanagement', data)
}

export function loginForProprietor(data){
    return request.post('/pms/login/proprietor', data)
}


