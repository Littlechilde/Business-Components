<template>
  <div class="table-wrap">
    <div class="table-content">
      <a-table 
          ref="table" 
          url="/api/name/" 
          on-load 
          checkbox
          init-checked
          @onload="onload" 
          :search="false"
          :list="tableData" 
          :item="search_item" 
          :gutter="20" 
          :button="search_button" 
          :col-button="18" 
          :field="search_field" 
          :check-list.sync="check_list" 
          :column="column" 
          :data="data_1" 
          :default-params="default_params"
        >
        <template v-slot:operation="slot">
          <a-button type="primary" size="mini" @click="jumn(slot.data)">编辑</a-button>
          <a-button size="mini">删除</a-button>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script>
import Search from "./search"
export default {
  name: "Home",
  components: {
    'a-button': () => import("@/components/button"),
    'a-table': () => import("@/components/table"),
  },
  data(){
    return {
      ...Search,
      column: [
        { label: "ID", prop: "id", sort: 'custom', sort_by: 'a.xxxxx' },
        { label: "标题",  prop: "name", edit: true },
        { label: "数值1",  prop: "amount1", },
        { label: "数值2",  prop: "amount2", },
      ],
      tableData: [],
      data_1: {
        name: 22
      },
      check_list: [],
      search_field: {
        a: '',
        b: ''
      },
      default_params: {
        category: 10
      },
      search_button: [
        { label: "下载", type: "primary", callback: (data) => this.aaa(data) }
      ]
    }
  },
  watch: {
    check_list: {
      handler(value) {
        console.log(value)
      }
    }
  },
  mounted(){},
  methods: {
    aaa(data){
      console.log(345, this.$refs.table.request_data_backup)
    },
    getCheckList(){
      // console.log(this.check_list)
    },
    onload(data){
      // console.log(data)
    },
    formatData(data){
      const first_data = [data[0]]
      return first_data
    },
    jumn(data){
      console.log(data)
    },
    category(value){
      this.default_params.category = value
    },
    mergeSpan({ row, column, rowIndex, columnIndex }){
      if(columnIndex === 0) {
          if(rowIndex === 0 || rowIndex === 3) {
              return {
                  rowspan: 3, // 合并的行
                  colspan: 1  // 合并的列
              }
          }else{
              return {
                  rowspan: 0,
                  colspan: 0
              }
          }
      }
    }
  }
};
</script>

<style lang="scss" scoped>

.table-wrap {
  margin: auto;
  background-color: #f8f8f8;
  height: 100vh;
}
.table-content {
  background-color: #fff;
  width: 1440px;
  padding: 16px;
  margin: auto;
}
::v-deep.el-table .el-table__cell { padding: 7px 0; }
::v-deep.el-table tr th  {
  background-color: #ebf4f7;
  border-bottom: 1px solid #e5e5e5;
}
</style>