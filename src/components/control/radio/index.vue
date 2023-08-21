<template>
    <el-radio-group v-model="val" @change="handlerChange">
        <el-radio v-for="item in option" :key="item.id" :label="item[props.value]">{{ item[props.label] }}</el-radio>
    </el-radio-group>
</template>

<script>
import { props, mixin } from "../basis";
export default {
    name: "RadioComponent",
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