import request from "@/utils/request";


export function getProprietorInfo(data){
    return request.post('/pms/proprietorinfo/getproprietorinfo', data)
}
