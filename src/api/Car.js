import request from "@/utils/request";
/*小区车辆服务*/

/*业主·登记车辆*/
export function proprietorRegisterCar(data){
    return request.post('pms/car/proprietyregistercar', data)
}

/*业主·业主查找车辆*/
export function proprietorSearchCar(data){
    return request.post('pms/car/proprietysearchcar', data)
}

/*业主·修改车辆信息*/
export function proprietorChangeCarInfo(data){
    return request.post('/pms/car/proprietychangecarinfo', data)
}
