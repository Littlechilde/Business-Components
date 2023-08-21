<template>
  <div class="a-switch" :class="[{'a-switch-active': active}, {'a-disabled': loading}]" @click="handlerSwitch">
    <span><i v-if="loading" class="iconfont icon-prefix icon-loading"></i></span>
  </div>
</template>

<script>
import { props, mixin } from "../basis";
export default {
  name: "ASwitch",
  props: {
    ...props
  },
  data(){
    return {
      active_value: true,   // 打开
      inacitve_value: false, // 关闭
      init_defalut_value_type: ['boolean', 'string', 'number'],
      loading: false
    }
  },
  computed: {
    active(){
      return this.value === this.active_value
    }
  },
  watch: {
    'config.active_value': {
      handler(newValue) {
        const bool = this.init_defalut_value_type.includes(typeof newValue)
        bool && (this.active_value = newValue)
      },
      immediate: true
    },
    'config.inactive_value': {
      handler(newValue) {
        const bool = this.init_defalut_value_type.includes(typeof newValue)
        bool && (this.inacitve_value = newValue)
      },
      immediate: true
    }
  },
  mounted(){},
  methods: {
    handlerSwitch(){
      const value = this.value === this.active_value ? this.inacitve_value : this.active_value
      const beforeChange = this.config.beforeChange
      if(beforeChange && Object.prototype.toString.call(beforeChange) === '[object Function]') {
        if(this.loading) { return false }
        this.loading = true
        beforeChange().then(() => {
          this.$emit("update:value", value)
          this.loading = false
        }).catch(() => {
          console.log(888)
          this.loading = false
        })
        return false
      }
      
      this.$emit("update:value", value)
    }
  }
}
</script>

<style lang="scss" scoped>
$primary: #409eff !default;
.a-switch {
  width: 64px;
  padding: 2px;
  border-radius: 100px;
  background-color: #f0f0f0;
  cursor: pointer;
  -webkit-transition: all .4s ease 0s;
  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 28px;
    width: 28px;
    border-radius: 100px;
    background-color: #fff;
    -webkit-transition: all .4s ease 0s;
  }
}
.a-switch-active {
  background-color: $primary;
  span {
    margin-left: 36px;
  }
}
.icon-loading {
  animation: loading 1s infinite linear;
}
@-webkit-keyframes loading {
    0% {
      -webkit-transform: rotate(0deg)
    }
    100% {
      -webkit-transform: rotate(360deg)
    }
}

.a-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

</style>