import request from "@/utils/request";


export function getProprietorInfo(data){
    return request.post('/pms/proprietorinfo/getproprietorinfo', data)
}


export function changeProprietorInfo(data){
    return request.post('/pms/proprietorinfo/changeInfo', data)
}

