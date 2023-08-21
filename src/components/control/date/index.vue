<template>
    <el-date-picker
        v-model="val"
        :type="config.model || 'datetime'"
        :placeholder="config.placeholder || '请选择日期'"
        :start-placeholder="config.start_placeholder || '请选择开始日期'"
        :end-placeholder="config.end_placeholder || '请选择结日期'"
        :range-separator="config.range || '-'"
        :picker-options="pickerOptions()"
        :format="config.format"
      @change="handlerChange"
    >
    </el-date-picker>
</template>

<script>
import { props, mixin } from "../basis";
export default {
    name: "DateComponent",
    mixins: [mixin],
    props: {
        ...props
    },
    data(){
        return {
            val: '',
        }
    },
    computed: {},
    watch: {},
    methods: {
        pickerOptions(){
            const disabled_data = this.config.disabled_data
            const disabled_today = this.config.disabled_today
            const disabled_ruls = this.config.disabled_data_rule && Object.prototype.toString.call(this.config.disabled_data_rule) === '[object Function]'
            return {
                disabledDate: (time) => {
                    if(disabled_ruls) {
                        return this.config.disabled_data_rule(time)
                    }else if(disabled_data) {
                        return time.getTime() < new Date() - 8.64e7
                    }else if(disabled_today){
                        return time.getTime() < new Date()
                    }else{
                        return false
                    }
                }
            }
        }
    }
}
</script>
<style></style>