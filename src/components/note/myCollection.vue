<template>
    <div id="psd">
        <h1>我的收藏</h1>


        <el-upload
                class="avatar-uploader"
                ref="upload"
                action=""
                :http-request='uploadUserIcon'
                :show-file-list="true"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :auto-upload="false">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">单文件上传到服务器
            </el-button>
        </el-upload>

    </div>
</template>

<script>
    export default {
        name: "myCollection",
        data() {
            return {
                imageUrl: '',
            }
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            submitUpload() {
                this.$refs.upload.submit();
            },

            uploadUserIcon(param) {
                let that = this;
                let formData = new FormData();
                let config = {
                    'Content-Type': 'multipart/form-data'
                };
                formData.append("file", param.file);
                this.axios.post('http://localhost:8080/file', formData, config)
                    .then(function (response) {
                        var res = JSON.parse(JSON.stringify(response));
                        if (res.data.code == 200) {
                            that.$message({
                                message: res.data.msg,
                                type: 'success',
                                duration: 1000
                            });
                        } else {
                            that.$message({
                                message: res.data.msg,
                                type: 'warning',
                                duration: 1000
                            })
                        }
                    }).catch(function (error) {
                    console.log(error);
                })
            },

        },


        created() {

        },
    }
</script>

<style scoped>

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>