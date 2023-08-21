<template>
  <div>
    <a-form
      :item="form_item"
      :field="form_field"
      :hidden="form_hidden"
      :disabled="form_disabled"
      :gutter="30"
      :button="form_button"
      :before-submit="submitForm"
    >
      <template v-slot:classroom>
        <a-select :config="select_classroom">
          <template v-slot:select="slot">
            <div style="font-size: 30px">{{ slot.data.class_name }}</div>
          </template>
        </a-select>
      </template>
    </a-form>
  </div>
</template>
<script>
export default {
  name: "Home",
  components: {
    "a-form": () => import("@/components/form"),
    "a-button": () => import("@/components/button"),
    "a-select": () => import("@/components/control/select"),
  },
  data() {
    const validateName = (rule, value, callback) => {
      if (value && value !== "10") {
        callback(new Error("请输入10"));
      } else {
        callback();
      }
    };
    return {
      form_item: [
        {
          type: "input",
          prop: "a",
          label: "真实姓名",
          required: true,
          message: "请输入姓名",
          col: 6,
          label_width: "100px",
        },
        {
          type: "input",
          prop: "b",
          label: "性别",
          required: true,
          message: "请输入姓名",
          col: 8,
        },
        {
          type: "input",
          prop: "c",
          label: "手机号码",
          required: true,
          message: "请输入姓名",
          col: 12,
        },
        {
          type: "input",
          prop: "d",
          label: "年龄",
          required: true,
          message: "请输入姓名",
        },
        {
          type: "select",
          prop: "d",
          label: "班级",
          required: true,
          message: "请输入姓名",
          options: [
            { label: "一班", value: 1 },
            { label: "一班", value: 2 },
            { label: "一班", value: 3 },
          ],
        },
        {
          type: "input",
          prop: "e",
          label: "密码",
          required: true,
          message: "请输入姓名",
        },
        {
          type: "radio",
          prop: "f",
          label: "密码",
          required: true,
          message: "请输入姓名",
          options: [
            { label: "隐藏", value: 0 },
            { label: "显示", value: 1 },
          ],
          /**
           * 关联关系
           * key：代表被控制的唯一字段
           * value：代表控制者的值
           */
          relation_hidden: [
            { key: "a", value: { 0: true, 1: false } },
            { key: "b", value: { 0: true, 1: false } },
          ],
        },
        {
          type: "switch",
          prop: "g",
          label: "是否启用",
          required: true,
          message: "请输入姓名",
          options: [
            { label: "深圳", value: 0 },
            { label: "广东", value: 1 },
            { label: "云南", value: 2 },
            { label: "汕尾", value: 3 },
          ],
          /**
           * 关联关系
           * key：代表被控制的唯一字段
           * value：代表控制者的值
           */
          relation_disabled: [
            { key: "a", value: { 0: false, 1: true } },
            { key: "b", value: { 0: false, 1: true } },
          ],
        },
      ],
      form_field: {
        a: "",
        b: "",
        c: "",
        d: "",
        e: "",
        f: 0,
        g: 0,
      },
      form_hidden: {
        a: false,
        b: false,
      },
      form_disabled: {
        a: true,
        b: true,
        d: true,
        e: true,
      },
      form_button: [
        // 确定按钮，取消按钮和其他按钮
        { label: "提交", key: "submit", type: "primary" },
      ],
    };
  },
  mounted() {},
  methods: {
    submitForm() {},
  },
};
</script>
<style lang="scss">
.select1 .el-select-dropdown__item {
  height: 50px;
}
</style>
