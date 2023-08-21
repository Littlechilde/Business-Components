<template>
    <div>
        <a-search v-if="search" v-bind="$attrs" @callback="handlerSearch" />
        <el-table ref="table" border :span-method="spanMethod" :data="table_data"  style="width: 100%" @select="handleSelectionChange" @select-all="handleSelectionChange" @sort-change="sortChange">
            <el-table-column v-if="index" type="index" width="40"></el-table-column>
            <el-table-column v-if="checkbox" type="selection" width="40"></el-table-column>
            <el-table-column v-for="item in column" :sortable="item.sort" :sort-by="item.sort_by" :render-header="item.render_header" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width">
                <template slot-scope="scope">
                    <slot v-if="item.type === 'slot'" :name="item.slot_name" :data="scope.row" />
                    <component v-else :is="!item.type ? 'com-text': `com-${item.type}`" :data="scope.row" :config="item" :prop="item.prop"  />
                </template>
            </el-table-column>
        </el-table>
        <br />
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="current_page"
            :page-size="10"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
// 自动化的规则，通type属性，自动读到目录组件
const modules = {}
const files = require.context("../control", true, /\index.vue$/)
files.keys().forEach(item => {
    const key = item.split("/")
    const name = key[1]
    // 组件集成
    modules[`com-${name}`] = files(item).default
})
export default {
    data() {
        return {
            table_data: [],
            search_params: {},
            // 备份搜索参数
            request_data_backup: {},
            // 合并的数据
            span_method_data: {},
            // 分页
            total: 0,
            current_page: 1, // 页码
            size: 10, // 条数
            // checkbox的数据
            checked_data: {},
            // checkbox的数据ID
            checked_id: []
        }
    },
    components: {
        ...modules,
        'a-search': () => import('../search')
    },    
    props: {
        list: {
            type: Array,
            default: () => []
        },
        checkList: {
            type: Array,
            default: () => []
        },
        column: {
            type: Array,
            default: () => []
        },
        nodeKey: {
            type: String,
            default: "id"
        },
        checkbox: Boolean,
        index: Boolean,
        onLoad: Boolean,
        format: Function,
        merge: Boolean,
        mergeSpan: Function,
        initChecked: Boolean,
        mergeKey: {
            type: String,
            default: "id"
        },
        search: {
            type: Boolean,
            default: true
        },
        initRequest: {
            type: Boolean,
            default: true
        },
        url: {
            type: String,
            default: "",
            require: true
        },
        method: {
            type: String,
            default: "post",
            require: true
        },
        data: {
            type: Object,
            default: () => ({})
        },
        params: {
            type: Object,
            default: () => ({})
        },
        defaultParams: {
            type: Object,
            default: () => ({})
        },
        mergeColIndex: {
            type: Array,
            default: () => []
        },
    },
    watch: {
        list: {
            handler(value) {
                this.table_data = value
                // 开始合并
                this.merge && this.createSpanMethod()
            },
            immediate: true
        }
    },
    beforeDestroy(){
        this.checked_data = {}
        this.checked_id = []
        this.table_data = []
    },
    beforeMount(){
        this.initRequest && this.getTableList()
    },
    methods: {
        /**
         * 复选框
         */
        handleSelectionChange(val){
            // 存储分页选择的数据
            this.checked_data[this.current_page] = val
            // 提取所有数据的唯一字段的
            let check_data = []
            for(const key in this.checked_data) {
                check_data = [...check_data, ...this.checked_data[key]]
            }
            // 存储ID
            this.checked_id = check_data.map(item => item[this.nodeKey])
            this.$emit("update:checkList", check_data)
        },
        /**
         * 初始化选择checkbox
         */
        initCheckedBox(){
            this.$nextTick(() => {
                this.table_data.forEach(item => {
                    if(this.checked_id.includes(item[this.nodeKey])) {
                        this.$refs.table.toggleRowSelection(item)
                    }
                })
            })
        },
        getTableList(){
            const url = this.url
            if(!url) {
                console.log("请求地址不存在")
                return false
            }
            const request_data = {
                url: this.url,
                method: this.method
            }
            // 参数处理
            if(JSON.stringify(this.data) !== '{}') {
                request_data.data = { ...this.data, size: this.size, current: this.current_page, ...this.search_params, ...this.defaultParams }
            }
            if(JSON.stringify(this.params) !== '{}') {
                request_data.params = { ...this.params, size: this.size, current: this.current_page, ...this.search_params, ...this.defaultParams }
            }
            // 备份数据
            this.request_data_backup = request_data
            // 接口的请求
            this.$axios(request_data).then(response => {
                let request_data = response.data.data
                // 总页数更新
                this.total = response.data.total
                // 数据格式化
                if(this.format && typeof this.format === 'function') {
                    request_data = this.format(response.data.data)
                }
                this.table_data = request_data
                // 回调数据
                this.onLoad && this.$emit("onload", response.data.data)
                // 开始合并
                this.merge && this.createSpanMethod()
                // 初始化勾选数据
                this.initChecked && this.initCheckedBox()
            })
        },
        handlerRequest(){
            this.getTableList()
        },
        /** 远程排序 */
        sortChange({ column, prop, order }){
            const sort_by = column.sortBy
            console.log(sort_by, order)
        },
        /**
         * 搜索
         */
        handlerSearch(data, type){
            if(type === 'search' || type === 'init') {
                /**
                 * pageNumber = 1
                 * pageSize = 10
                 */
                this.search_params = data
            }
            this.getTableList()
        },
        createSpanMethod(){
            const data = this.table_data
            if(data && Array.isArray(data) && data.length > 0) {
                let i = 0;
                const json = {}
                data.forEach((item, index) => {
                    if(index && item[this.mergeKey] === data[index - 1][this.mergeKey]){
                        json[i] += 1
                    }else{
                        i = index // 0
                        json[i] = 1
                    }
                })
                this.span_method_data = json
            }
        },
        spanMethod({ row, column, rowIndex, columnIndex }){
            // 是否有自定义的合并规则
            if(this.mergeSpan && Object.prototype.toString.call(this.mergeSpan) === '[object Function]') {
                return this.mergeSpan({ row, column, rowIndex, columnIndex })
            }
            if(this.mergeColIndex.length === 0) {
                return false
            }
            const keys = Object.keys(this.span_method_data)
            // columnIndex（列）、rowIndex（行） 0  ~ .....
            if(this.mergeColIndex.includes(columnIndex)) {
                if(keys.includes(rowIndex.toString())) {
                    return {
                        rowspan: this.span_method_data[rowIndex], // 合并的行
                        colspan: 1  // 合并的列
                    }
                }else{
                    return {
                        rowspan: 0,
                        colspan: 0
                    }
                }
            }
        },
        // 分页
        handleCurrentChange(val){
            this.current_page = val
            this.getTableList()
        },
        handleSizeChange(val){
            this.current_page = 1
            this.size = val
            this.getTableList()
        }
    }
}
</script>
<style>
.category span {
    margin-right: 10px;
}
</style>
