import request from "@/utils/request";


export function getProprietorInfo(data){
    return request.post('/pms/proprietorinfo/getproprietorinfo', data)
}


export function changeProprietorInfo(data){
    return request.post('/pms/proprietorinfo/changeproprietorinfo', data)
}

export function propertysearchproprietorinfo(data){
    return request.post('/pms/proprietorinfo/propertysearchproprietorinfo', data)
}
