<template>
    <el-select 
        v-model="val" 
        @change="handlerChange" 
        :remote-method="keywordRequest"
        :filterable="fetchSearch"
        :remote="fetchSearch"
        :multiple="multiple"
        :collapse-tags="multiple"
        popper-class="select1"
        style="width: 100%"
    >
      <el-option v-for="item in option" :key="item[props.value]" :label="item[props.label]" :value="item[props.value]">
          <slot name="select" :data="item"></slot>
      </el-option>
  </el-select>
</template>

<script>
import { props, mixin } from "../basis";
export default {
    name: "SelectComponent",
    mixins: [ mixin ], 
    props: {
        ...props
    },
    data(){
        return {
            val: "",
        }
    },
    computed: {},
    watch: {},
    methods: {
        handlerFocus(){
            this.getOption()
        }
    }
}
</script>
<style></style>