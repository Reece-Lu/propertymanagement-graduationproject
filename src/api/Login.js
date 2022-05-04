import request from "@/utils/request";
/*登录*/

export function loginForPropertyManagement(data){
    return request.post('/pms/login/propertymanagement', data)
}

export function loginForProprietor(data){
    return request.post('/pms/login/proprietor', data)
}

export function checkPhoneNumberIsUsed(data){
    return request.post('/pms/login/registersmsverification', data)
}

export function proprietorRegister(data){
    return request.post('/pms/login/proprietorregister', data)
}

