<template>
    <el-checkbox-group v-model="val" @change="handlerChange">
        <el-checkbox v-for="item in option" :key="item.id" :label="item[props.value]">{{ item[props.label] }}</el-checkbox>
    </el-checkbox-group>
</template>

<script>
import { props, mixin } from "../basis";
export default {
    name: "CheckboxComponent",
    mixins: [mixin],
    props: {
        ...props
    },
    data(){
        return {
            val: [],
        }
    },
    computed: {},
    watch: {},
    methods: {}
}
</script>
<style></style>