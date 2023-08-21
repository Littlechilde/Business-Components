<template>
    <div class="relative" :style="[styleWidth]">
        <el-input :type="type" v-model="val" :maxlength="maxlength" :disabled="disabled" @input="inputEnter" />
        <div class="code-button" v-if="config.value_type === 'sendcode'">
            <a-button size="mini" :loading="loading" :disabled="disabled_button" type="primary" @click="getSms">{{ text }}</a-button>
        </div>
        <div class="eye-wrap" v-if="['password', 'passwords'].includes(config.value_type)">
            <i class="iconfont" :class="eye" @click="toggleValueType"></i>
        </div>
    </div>
</template>

<script>
import { props, mixin } from "../basis";
export default {
    name: "InputComponent",
    props: {
        ...props,
        value: {
            type: [String, Number],
            default: ""
        }
    },
    mixins: [mixin],
    components: {
        'a-button': () => import("@/components/button"),
    },
    data(){
        return {
            val: "",
            // 密码
            type: 'text',
            // 验证码规则 
            text: "获取验证码",
            loading: false,
            disabled_button: false,
            s: 3,
            timer: null
        }
    },
    watch: {
        value: {
            handler(newValue) {
                this.val = newValue
            },
            immediate: true
        } ,
        'config.value_type': {
            handler(value) {
                if(['password', 'passwords'].includes(value)) {
                    this.type = 'password'
                }
            },
            immediate: true
        }
    },
    computed: {
        eye(){
            return this.type === 'password' ? 'icon-eye-close' : 'icon-browse'
        },
        
    },
    methods: {
        inputEnter(){
            this.$emit("update:value", this.val)
            // 是否有回调函数
            if(this.config.callback && Object.prototype.toString.call(this.config.callback) === '[object Function]') {
                this.config.callback(this.val)
            }
        },
        /**
         * 切换文本类型
         */
        toggleValueType(){
            this.type = this.type === 'password' ? 'text' : 'password'
        },
        getSms(){
            if(!this.config.send_account) {
                alert("请输入手机号")
                return false
            }
            if(this.config.beforeChange && Object.prototype.toString.call(this.config.beforeChange) === '[object Function]') {
                this.text = '发送中'
                this.loading = true
                this.config.beforeChange(this.val).then(() => {
                    this.text = `倒计时${this.s}秒`
                    this.loading = false
                    this.disabled_button = true
                    // 倒计时
                    this.countdown()
                }).catch(() => {
                    this.text = '重新获取'
                    this.disabled_button = false
                })
            }
        },
        countdown(){
            this.timer && clearInterval(this.timer)
            this.timer = setInterval(() => {
                this.s--
                this.text = `倒计时${this.s}秒`
                if(this.s <= 0) {
                    clearInterval(this.timer)
                    this.timer = null
                    this.text = '重新获取'
                    this.disabled_button = false
                    this.s = 3
                }
            }, 1000)
        }
    }
}
</script>

<style lang="scss" scoped>
.relative {
    position: relative;
}
.code-button {
    position: absolute;
    right: 10px;
    top: 0;
}
.eye-wrap {
    position: absolute;
    right: 10px;
    top: 0;
    cursor: pointer;
    > i {
        font-size: 20px;
    }
}
</style>