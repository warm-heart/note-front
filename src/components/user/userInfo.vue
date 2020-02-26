<template>
    <div class="userInfo">

        <el-card class="head">
            <el-row>
                <el-col :span="2">
                    <el-avatar
                            class="avatar"
                            :size="100"
                            :src="userIcon"
                    ></el-avatar>
                    <el-popover
                            placement="right"
                            width="180">
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

                        <el-button slot="reference" type="text" plain style="float: left;padding-top: 25px;
                    padding-left: 25px">更换头像<i class="el-icon-upload el-icon--right"></i>
                        </el-button>
                    </el-popover>
                </el-col>

                <el-col :span="4">
                    <div style="padding-left: 0px;padding-top:20px">
                        <i class="font-note-title" style="font-size: 18px">{{user.userName}}</i>
                        <div v-if="user.userSex==0">
                            <svg class="icon" aria-hidden="true"
                                 style="margin-left: -50px;font-size: 20px;padding-top: 25px">
                                <use xlink:href="#icon-note-man"></use>
                            </svg>
                            <div style="margin-top: -20px;margin-left: 20px ;font-size: 10px">{{age}}岁</div>
                        </div>


                        <div v-else>
                            <svg class="icon" aria-hidden="true"
                                 style="margin-left: -50px;font-size: 20px;padding-top: 25px">
                                <use xlink:href="#icon-note-women"></use>
                            </svg>
                            <div style="margin-top: -20px;margin-left: 20px ;font-size: 15px">{{age}}岁</div>
                        </div>


                    </div>
                </el-col>

                <el-col :span="4">
                    我的笔记分类
                    <el-progress type="circle" :percentage="25"></el-progress>
                </el-col>
                <el-col :span="4">
                    我的笔记
                    <el-progress type="circle" :percentage="25"></el-progress>
                </el-col>
                <el-col :span="2" :offset="4">
                    <div style="font-family: 'Microsoft YaHei';font-size: 20px ;color: black">
                        我的资料
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <el-divider></el-divider>


        <el-card>
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item name="1">
                    <template slot="title">
                        <span class="font-note-title">账户信息</span><i class="iconfont icon-note-info"></i>
                    </template>

                    <el-row type="flex" justify="start">
                        账户名：{{user.userName}}
                    </el-row>
                    <el-divider></el-divider>
                    <el-row type="flex" justify="start">
                        注册时间：{{user.createTime}}
                    </el-row>
                </el-collapse-item>

                <el-collapse-item name="2">
                    <template slot="title">
                        <span class="font-note-title">基本信息</span><i class="iconfont icon-note-info"></i>
                    </template>
                    <el-row type="flex" justify="start">
                        昵称：{{user.nickName}}
                    </el-row>
                    <el-divider></el-divider>
                    <el-row type="flex" justify="start">
                        性别：
                        <span v-if="user.userSex==0">男</span>
                        <span v-if="user.userSex==1">女</span>
                    </el-row>
                    <el-divider></el-divider>
                    <el-row type="flex" justify="start">
                        地址：{{user.userAddress}}
                    </el-row>
                    <el-divider></el-divider>
                    <el-row type="flex" justify="start">
                        出生日期：{{user.birthday}}
                    </el-row>

                </el-collapse-item>
                <el-collapse-item name="3">
                    <template slot="title">
                        <span style="font-size: 18px">账号安全</span><i class="iconfont icon-note-info"></i>
                    </template>
                    <el-row type="flex" justify="start">
                        手机号绑定：{{user.userPhone}}
                    </el-row>
                    <el-divider></el-divider>
                    <el-row type="flex" justify="start">
                        邮箱绑定：{{user.userEmail}}
                    </el-row>
                </el-collapse-item>

            </el-collapse>
        </el-card>


        <!--<el-row type="flex" justify="right">
            <el-col :span="4" :offset="2">
                <li>用户名</li>
                <li>昵称</li>
                <li>姓名</li>
                <li>生日</li>
                <li>性别</li>
                <li>邮箱</li>
                <li>电话</li>
                <li>地址</li>
            </el-col>
            <el-col :span="12" :offset="6">
                <div class="block">
                    <el-timeline>
                        <el-timeline-item timestamp="2018/4/12" placement="top">
                            <el-card>
                                <h4>更新 Github 模板</h4>
                                <p>王小虎 提交于 2018/4/12 20:46</p>
                            </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/4/3" placement="top">
                            <el-card>
                                <h4>更新 Github 模板</h4>
                                <p>王小虎 提交于 2018/4/3 20:46</p>
                            </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2019/4/12" placement="top">
                            <el-card>
                                <h4>更新 Github 模板</h4>
                                <p>王小虎 提交于 2018/4/12 20:46</p>
                            </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/4/2" placement="top">
                            <el-card>
                                <h4>更新 Github 模板</h4>
                                <p>王小虎 提交于 2018/4/2 20:46</p>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </div>

            </el-col>
        </el-row>
    -->

    </div>
</template>

<script>

    export default {
        name: "userInfo",
        data() {
            return {
                userIcon: localStorage.getItem("user-icon"),
                //上传头像显示
                imageUrl: '',
                //上传头像
                formData: '',
                //用户信息
                user: {},
                //折叠面板 默认展开第一个
                activeNames: ['1'],
                //年龄
                age: '',
            }
        },
        methods: {
            handleChange(val) {
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
                            that.userIcon = res.data.data;
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
            getUserInfo() {
                let that = this;
                this.axios.post('http://localhost:8080/user/userInfo')
                    .then(function (response) {
                        var res = JSON.parse(JSON.stringify(response));
                        if (res.data.code == 200) {
                            that.user = res.data.data;
                            that.getAge();
                        } else {
                            that.$message({
                                message: res.data.msg,
                                type: 'warning',
                                duration: 1500
                            })
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        //alert(error.response.data.msg)
                    });
            },
            //判断用户的年龄
            getAge() {
                let birthdays = new Date(this.user.birthday.replace(/-/g, "/"));
                let d = new Date();
                let age = d.getFullYear() -
                    birthdays.getFullYear() -
                    (d.getMonth() < birthdays.getMonth() ||
                    (d.getMonth() == birthdays.getMonth() && d.getDate() < birthdays.getDate()) ? 1 : 0);
                this.age = age;
            },

        },
        created() {
            var that = this;
            document.title = that.$route.meta.title;
            this.getUserInfo();
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

    .el-avatar {
        margin-left: 10px;
    }

    .head {

        background-color: tan;
    }


</style>