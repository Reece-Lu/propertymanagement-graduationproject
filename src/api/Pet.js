import request from "@/utils/request";
/*登录*/

export function ProprietorRegisterPet(data){
    return request.post('/pms/pet/proprietorregisterPet', data)
}
