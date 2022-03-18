import request from "@/utils/request";
/*登录*/

export function ProprietorRegisterPet(data){
    return request.post('/pms/pet/proprietorregisterPet', data)
}

export function PropertySearchPet(data){
    return request.post('/pms/pet/propertysearchpet', data)
}

export function ProprietorSearchPet(data){
    return request.post('/pms/pet/proprietorsearchpet', data)
}
