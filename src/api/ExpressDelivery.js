import request from "@/utils/request";
/*快递代领服务*/

export function getExpressDeliveryInfoForProperty(data){
    return request.post('pms/expressdelivery/propertysearch', data)
}


export function entrustExpressDeliveryForProprietor(data){
    return request.post('pms/expressdelivery/proprietorentrustdelivery', data)
}

export function EditDeliveryInfo(data){
    return request.post('pms/expressdelivery/propertyadddeliveryserviceman', data)
}

export function TrackDeliveryInfoProprietor(data){
    return request.post('pms/expressdelivery/proprietortrackdelivery', data)
}

