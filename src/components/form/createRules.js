import {
  validatorPhone,
  validatorEmail,
  validatorPass,
  validatorNumber
} from "@/utils/validator";
const createRules = (data, field) => {
  data.forEach((item) => {
    // 检测规则是一个数组类型 Array
    let rules_array = [];
    if (item.required) {
      const rule = {
        required: true,
        message: item.message || createMessage(item),
      };
      rules_array.push(rule);
    }
    // 校验手机号
    if (item.value_type && item.value_type === "phone") {
      const rule = { validator: validatorPhone, trigger: "change" };
      rules_array.push(rule);
    }
    // 校验邮箱
    if (item.value_type && item.value_type === "email") {
      const rule = { validator: validatorEmail, trigger: "change" };
      rules_array.push(rule);
    }
    // 校验邮箱
    if (item.value_type && item.value_type === "number") {
      const rule = { validator: validatorNumber, trigger: "change" };
      rules_array.push(rule);
    }
    // 校验密码
    if (item.value_type && item.value_type === "password") {
      const validatorPassword = (rule, value, callback) => {
        if (!value) {
          callback(new Error("请输入密码"));
        } else if (!validatorPass(value)) {
          callback(new Error("请输入输入6~18的数字、字母组合"));
        } else {
          callback();
        }
      };
      const rule = { validator: validatorPassword, trigger: "change" };
      rules_array.push(rule);
    }
    if (item.value_type && item.value_type === "passwords") {
      const p1 = data.filter((item) => item.value_type === "password")[0];
      const validatorPassword = (rule, value, callback) => {
        const p1_value = field[p1.prop];
        if (!value) {
          callback(new Error("请输入密码"));
        } else if (!validatorPass(value)) {
          callback(new Error("请输入输入6~18的数字、字母组合"));
        } else if (p1_value && p1_value !== value) {
          callback(new Error("确认密码不一致"));
        } else {
          callback();
        }
      };
      const rule = { validator: validatorPassword, trigger: "change" };
      rules_array.push(rule);
    }
    // 是否有额外的校验规则
    if (item.rules && Array.isArray(item.rules) && item.rules.length > 0) {
      rules_array = rules_array.concat(item.rules);
    }
    item.rules = rules_array;
  });
  console.log(data);

  return data;
};

const createMessage = (data) => {
  let msg = "";
  switch (data.type) {
    case "input":
      msg = "请输入";
      break;
    case "select":
    case "checkbox":
    case "radio": 
      msg = "请选择";
      break;
    case "upload":
      msg = "请上传";
      break;
  }
  return `${msg}${data.label}`;
};
export default createRules;
