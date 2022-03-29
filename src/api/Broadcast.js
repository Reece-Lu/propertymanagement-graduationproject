import request from "@/utils/request";
/*小区车辆服务*/

/*物业·新建广播通知*/
export function propertyCreateBroadcast(data){
    return request.post('pms/broadcast/propertycreatebroadcast', data)
}
/* 通用·查询广播内容 */

export function generalSearchBroadcast(data){
    return request.post('pms/broadcast/generalsearchbroadcast', data)
}
/* 业主·删除刚播*/
export function propertyDeleteBroadcast(data){
    return request.post('pms/broadcast/propertydeletebroadcast', data)
}
