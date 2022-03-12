import request from "@/utils/request";
/*快递代领服务*/

export function getExpressDeliveryInfoForProperty(data){
    return request.post('pms/expressdelivery/propertysearch', data)
}


export function entrustExpressDeliveryForProprietor(data){
    return request.post('pms/expressdelivery/proprietorentrustdelivery', data)
}
