import request from "@/utils/request";
/*报修维修页*/

export function reportRepairSearch(data){
    return request.post('/pms/reportrepairsearch', data)
}

