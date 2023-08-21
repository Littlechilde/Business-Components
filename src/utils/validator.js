const regPhone = /^1[3456789]\d{9}$/;
const resPass = /^[a-zA-Z0-9]{6,18}$/;
const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
/**
 * 校验手机号
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function validatorPhone(rule, value, callback){
    if(!value) { callback() }
    if(regPhone.test(value)) {
        callback()
    }else{
        callback(new Error("请输入11位数字的手机号"))
    }
}

/**
 * 校验邮箱
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
 export function validatorEmail(rule, value, callback){
    if(!value) { callback() }
    if(regEmail.test(value)) {
        callback()
    }else{
        callback(new Error("邮箱格式不正确"))
    }
}

/**
 * 校验密码
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
 export function validatorPass(value){
    return resPass.test(value)
}

/**
 * 校验密码
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
 export function validatorNumber(rule, value, callback){
    if(!value) { callback() }
    if(/^[0-9]+$/.test(value)) {
        callback()
    }else{
        callback(new Error("请输入数字"))
    }
}