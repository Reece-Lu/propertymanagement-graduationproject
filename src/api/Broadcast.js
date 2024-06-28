import request from "@/utils/request";
/*小区车辆服务*/

/*业主·登记车辆*/
export function propertyCreateBroadcast(data){
    return request.post('pms/broadcast/propertycreatebroadcast', data)
}
