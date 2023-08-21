<template>
    <div class="upload-box">
        <el-upload
            class="avatar-uploader"
            action="http"
            :before-upload="handlerBeforeUpload"
            :on-exceed="handlerExceed"
            :on-preview="handlerPerview"
            :on-remove="handlerRemove"
            :before-remove="handlerBeforeRemove"
            :show-file-list="config.show_file"
            :http-request="handlerUpload"
            :accept="config.accept"
            :multiple="multiple"
            :limit="config.limit || 1"
        >
            <!--同理于原生JS，阻止冒泡-->
            <i v-if="image_url" class="el-icon-delete" @click.stop="clear"></i>
            <el-button v-if="model === 'button'" size="small" type="primary">点击上传</el-button>
            <div v-if="model === 'card'" class="upload-wrap" :class="{'is-round': isRound}" :style="[sizeStyle]">
                <img v-if="image_url" :src="image_url" width="100%" height="100%">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
        </el-upload>
    </div>
</template>

<script>
import { props, mixin } from "../basis";
export default {
    name: "UploadComponent",
    mixins: [mixin],
    props: {
        ...props
    },
    data(){
        return {
            image_url: '',
        }
    },
    computed: {
        model(){
            return this.config?.model
        },
        sizeStyle(){
            const width = this.config?.width || '100px'
            const height = this.config?.height || '100px'
            return { width, height }
        },
        isRound(){
            return this.config?.round || false
        }
    },
    watch: {
        value: {
            handler(newValue) {
                newValue && (this.image_url = newValue)
            },
            immediate: true
        } 
    },
    methods: {
        handlerUpload(data){
            const file = data.file;
            // form
            const form = new FormData();
            form.append("file", file);
            // 调用接口
            const request_data = {
                url: this.url,
                method: this.method,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: form
            }
            this.$axios(request_data).then(response => {
                const data = response.data
                console.log(data)
                this.image_url = data.url
            })
        },
        clear(){
            this.image_url = ''
        },
        /** 上传之前 */
        handlerBeforeUpload(file){
            // 判断文件大小
            const isLt2M = file.size / 1024 / 1024 < this.config.max_size;
            !isLt2M && this.$message.error(`请上传小于${this.config.max_size}M的文件`)
            return isLt2M
        },
        /** 选择文件列表 */
        handlerPerview(file){
            console.log(file)
        },
        /** 超出选择数量  */
        handlerExceed(){
            console.log("超出数量")
        },
        /** 删除动作 */
        handlerBeforeRemove(){
            return new Promise((resolve, reject) => {
                this.$confirm('是否删除文件', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    resolve();
                }).catch(() => {
                    reject();          
                });
            })
        },
        handlerRemove(){
            console.log(333)
        },
    }
}
</script>
<style lang="scss" scoped>
::v-deep .el-upload { position: relative; }
.upload-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover { border-color: #409EFF; }
  }
  .upload-box {
      display: inline-block;
      position: relative;
  }
  .el-icon-delete {
      position: absolute;
      right: 10px;
      top: 10px;
      z-index: 2;
  }
  .is-round {
    border-radius: 100px;
    }
</style>