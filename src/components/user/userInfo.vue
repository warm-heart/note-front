<template>
    <div class="userInfo">
        <el-avatar
                class="avatar"
                :size="100"
                :src="userIcon"
        ></el-avatar>

        <div>
            <el-popover
                    placement="left"
                    width="180"
            >
                <el-upload
                        class="avatar-uploader"
                        action=""
                        ref="upload"
                        :http-request='updateUserAvatar'
                        :show-file-list="false"
                        :auto-upload="true"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <p>点击头像框选择上传文件</p>
                <el-button type="primary" @click="submitUpload">点击上传
                </el-button>
                <el-button slot="reference">修改头像</el-button>
            </el-popover>
        </div>

    </div>


</template>

<script>
    export default {
        name: "userInfo",
        data() {
            return {
                userIcon: localStorage.getItem("user-icon"),
                imageUrl: '',
                formData: '',
            }
        },
        methods: {
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
               // this.$refs.upload.submit();
                console.log("进入上传");
                let that = this;
                let config = {
                    'Content-Type': 'multipart/form-data'
                };
                this.axios.post('http://localhost:8080/user/updateUserAvatar', that.formData, config
                )
                    .then(function (response) {
                        var res = JSON.parse(JSON.stringify(response));
                        if (res.data.code == 200) {
                            localStorage.setItem("user-icon", res.data.data);
                            that.$message({
                                message: '上传成功',
                                type: 'success',
                                duration: 1500
                            });
                        } else {
                            that.$message({
                                message: res.data.msg,
                                type: 'warning',
                                duration: 2000
                            })
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    })

            },
            updateUserAvatar(param) {
                let that = this;
                this.formData = new FormData();
                that.imageUrl = URL.createObjectURL(param.file);
                this.formData.append("file", param.file);
            },
        },
        created() {
            var that = this;
            document.title = that.$route.meta.title;
        }
    }
</script>

<style scoped lang="scss">
    .userInfo {
        margin: 0 auto;
        text-align: center;
    }

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