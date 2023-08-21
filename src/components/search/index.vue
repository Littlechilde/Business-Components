<template>
    <el-form ref="form" :model="field" :label-width="labelWidth" :label-position="labelPosition" :class="{'label-block': labelPosition === 'top'}">
        <el-row :gutter="gutter">
            <template v-for="item in form_item">
                <el-col :key="item.prop" :span="item.col || col">
                    <el-form-item 
                        :label="item.label" 
                        :prop="item.prop"
                        :label-width="item.label_width"
                    >
                        <span v-if="item.label_html" slot="label" class="label-html">
                            <span>{{ item.label_html.label}}</span>
                            <span @click="item.label_html.callback && item.label_html.callback(item)" v-html="item.label_html.html" />
                        </span>
                        <slot v-if="item.type === 'slot'" :name="item.slot_name"></slot>
                        <component v-else :value.sync="field[item.prop]" :disabled="disabled[item.prop]" :is="`com-${item.type}`" :config="item" @callback="callback"  />
                    </el-form-item>
                </el-col>
            </template>
            <el-col :span="colButton">
                <div class="button-group">
                    <el-button type="primary" @click="submit">提交</el-button>
                    <el-button @click="reset">重置</el-button>
                    <el-button v-for="item in button" :loading="item.loading" :key="item.key" :type="item.type" @click="item.callback && item.callback(item)">{{ item.label }}</el-button>
                </div>
            </el-col>
        </el-row>
        
        <!-- <el-form-item>
            <el-button v-for="item in button" :loading="item.loading" :key="item.key" :type="item.type" @click="handlerButton(item)">{{ item.label }}</el-button>
        </el-form-item> -->
    </el-form>
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
    name: "Form",
    components: {
        ...modules
    }, 
    props: {
        item: {
            type: Array,
            default: () => []
        },
        field: {
            type: Object,
            default: () => ({})
        },
        hidden: {
            type: Object,
            default: () => ({})
        },
        disabled: {
            type: Object,
            default: () => ({})
        },
        button: {
            type: Array,
            default: () => []
        },
        beforeSubmit: Function,
        col: {
            type: Number,
            default: 24
        },
        colButton: {
            type: Number,
            default: 0
        },
        gutter: {
            type: Number,
            default: 0
        },
        labelWidth: {
            type: String,
            default: '100px'
        },
        labelPosition: {
            type: String,
            default: 'right'
        },
        validateSubmitField: {
            type: Array,
            default: () => []
        }
    },
    data(){
        return {
            form_item: []
        }
    },
    beforeMount(){
        this.form_item = this.item
    },
    methods: {
        submit(){
            /**
             * string, array, number
             */
            const request_data = {}
            for(const key in this.field) {
                if(this.field[key]) {
                    request_data[key] = this.field[key]
                }
            }
            this.$emit("callback", request_data, 'search')
        },
        reset(){
            this.$emit("callback", {}, 'init')
            this.$refs.form.resetFields()
        },
        cancel(data){
            console.log("重置表单")
        },
        callback(params){}
    }
}
</script>

<style lang="scss" scoped>
::v-deep.label-block .el-form-item__label { 
    display: flex;
}
.label-html {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.button-group {
    float: right;
}
</style>