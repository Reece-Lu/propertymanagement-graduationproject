import request from "@/utils/request";
/*装修服务*/

/*业主·登记装修*/
export function proprietorRegisterDecoration(data){
    return request.post('pms/decoration/proprietorregisterdecoration', data)
}
