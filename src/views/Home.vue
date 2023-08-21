<template>
  <div style="width: 500px; margin: 50px auto">
    <a-form
      :item="form_item"
      :field="form_field"
      :button="form_button"
      :hidden="form_hidden"
      :before-submit="submitForm"
    >
      <template #demo>
        <div style="display: flex">sdf</div>
      </template>
    </a-form>
  </div>
</template>
<script>
import { FormItem } from "element-ui";

export default {
  name: "Home",
  components: {
    "a-form": () => import("@/components/form"),
  },
  data() {
    return {
      form_item: [
        {
          type: "input",
          value_type: "sendcode",
          label: "手机号",
          prop: "a1",
          send_account: 13713746864,
          beforeChange: () => {
            return new Promise((resolve, rejct) => {
              resolve()
            })
          }
        },
        {
          type: "slot",
          prop: "a2",
          slot_name: "demo",
          label: "插槽"
        },
        {
          type: "input",
          value_type: "number",
          label: "手机号",
          prop: "a3",
          required: true,
          
        },
        {
          type: "input",
          value_type: "password",
          prop: "a4",
          label: "密码",
          required: true,
        },
        {
          type: "input",
          value_type: "passwords",
          prop: "a5",
          label: "确认密码",
          required: true,
        },
        {
          type: "radio",
          prop: "a6",
          label: "交互",
          required: true,
          options: [
            { label: "是", value: 1 },
            { label: "否", value: 0 },
          ],
          relation_hidden: [
            { key: "a5", value: { 1: true, 0: false } },
            { key: "a4", value: { 1: true, 0: false } },
          ]
        }
      ],
      form_field: {
        a1: "",
        a2: "",
        a3: "",
        a4: "",
        a5: "",
      },
      form_hidden: {
        a4: true
      },
      form_button: [
        // 确定按钮，取消按钮和其他按钮
        { label: "提交", key: "submit", type: "primary" },
        {
          label: "重置",
          key: "cancel",
          type: "danger",
          border: true,
          callback: (data) => this.cancel(data),
        },
        {
          label: "下一步",
          key: "next",
          type: "success",
          border: true,
          callback: (data) => this.next(data),
        },
      ],
      select_classroom: {
        props: {
          label: "class_name",
          value: "id",
        },
        init_request: true,
        fetch_search: true,
        keyword: "aaaaa",
        url: "/api/classroom/",
        callback: (data) => this.selectClassRoom(data),
      },
    };
  },
  beforeMount() {},
  mounted() {},
  methods: {
    getDetailed() {
      this.$axios({ url: "/api/detailed/" }).then((response) => {
        const data = response.data;
        this.form_field = response.data;
        // 还原日期字段
        this.form_field.createDate = [
          response.data.start_date,
          response.data.end_date,
        ];
        // 异步教室的默认下拉
        const options = [
          { class_name: data.class_item.label, id: data.class_item.id },
        ];
        const select = this.form_item.filter(
          (elem) => elem.prop === "class_room1"
        );
        if (select.length > 0) {
          this.$set(select[0], "options", options);
        }
      });
    },
    apiFuncitonSwitch() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });
    },
    submitForm() {
      return new Promise((resolve, reject) => {
        console.log(this.form_field);
        setTimeout(() => {
          reject();
        }, 2000);
      });
    },
    cancel(data) {
      console.log(data);
    },
    next(data) {
      console.log(data);
    },
    selectClassRoom(data) {
      this.form_field.class_room1 = data;
    },
    phoneEnter(value) {
      this.form_item[1].send_account = value;
    },
    apiGetSms() {
      return new Promise((resolve, reject) => {
        this.$axios("/api/code/").then((response) => {
          this.$message.success(response.data.data);
          resolve();
        });
      });
    },
  },
};
</script>
<style lang="scss">
.select1 .el-select-dropdown__item {
  height: 50px;
}
</style>
