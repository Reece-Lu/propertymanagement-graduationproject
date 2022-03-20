import request from "@/utils/request";
/*小区车辆服务*/

export function proprietorRegisterCar(data){
    return request.post('pms/car/proprietyregistercar', data)
}
