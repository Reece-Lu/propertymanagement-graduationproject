import request from "@/utils/request";
/*报修维修页*/

/*报修维修列表查询接口（模糊查询、分页查询）*/
export function reportRepairSearch(data){
    return request.post('/pms/reportrepairsearch', data)
}
/*修改维修数据接口*/
export function editStatus(data){
    return request.post('/pms/reportrepairsearch/editstatus', data)
}
/*修改维修数据接口*/
export function createReport(data){
    return request.post('/pms/reportrepairsearch/createreport', data)
}

/*查询历史报修接口*/
export function checkFixingReportList(data){
    return request.post('/pms/reportrepairsearch/checkfixingreport', data)
}
