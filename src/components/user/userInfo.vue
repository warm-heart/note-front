<template>
    <div>

        <el-row>
            <!--头像-->
            <el-col :span="8" :offset="3">
                <el-card>

                    <div slot="header" class="clearfix">
                        <i class="font-note-title">个人账户</i>
                    </div>
                    <el-row type="flex">
                        <el-col :span="4" :offset="8">
                            <el-avatar
                                    class="avatar"
                                    :size="100"
                                    :src="userIcon"
                            ></el-avatar>
                        </el-col>

                    </el-row>
                    <el-row>
                        <el-col :span="4" :offset="8">
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
                      padding-left: 35px">修改头像
                                </el-button>
                            </el-popover>
                        </el-col>
                    </el-row>


                    <el-row type="flex" justify="start">
                        <el-col :span="8">
                            <i class="font-note-title" style="font-size: 20px">{{user.userName}}</i>

                            <div v-if="user.userSex==0">
                                <svg class="icon" aria-hidden="true"
                                     style="margin-left: -50px;font-size: 24px;padding-top: 25px">
                                    <use xlink:href="#icon-note-man"></use>
                                </svg>

                                <div style="margin-top: -20px;margin-left: 20px ;font-size: 10px">{{age}}岁</div>
                            </div>

                            <div v-else>
                                <svg class="icon" aria-hidden="true"
                                     style="margin-left: -50px;font-size: 24px;padding-top: 25px">
                                    <use xlink:href="#icon-note-women"></use>
                                </svg>
                                <div style="margin-top: -20px;margin-left: 24px ;font-size: 15px">{{age}}岁</div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-divider></el-divider>
                    <el-row type="flex" justify="start">
                        <router-link to="/home/myNote">我的笔记：{{countNote}}</router-link>
                    </el-row>
                    <el-divider></el-divider>
                    <el-row type="flex" justify="start">
                        <router-link to="/home/myNotebook">我的笔记分类：{{countCategory}}</router-link>
                    </el-row>
                </el-card>
            </el-col>

            <!--修改个人资料-->
            <el-col :span="2">
                <el-popover
                        placement="bottom"
                        width="400"
                        title="修改个人信息"
                        v-model="visible"
                        trigger="click">

                    <el-form :model="user" :rules="updateUserRules" style="margin-top: 20px">
                        <el-form-item label="用户昵称" prop="nickName">
                            <el-input v-model="user.nickName"></el-input>
                        </el-form-item>

                        <el-form-item label="地址" prop="userAddress">
                            <el-input v-model="user.userAddress"></el-input>
                        </el-form-item>
                        <el-form-item prop="userSex" label="性别">
                            <el-radio v-model="user.userSex" label=0>男</el-radio>
                            <el-radio v-model="user.userSex" label=1>女</el-radio>
                        </el-form-item>


                        <el-form-item prop="birthday" label="生日">
                            <el-date-picker type="datetime" placeholder="选择生日" value-format="yyyy-MM-dd HH:mm:ss"
                                            v-model="user.birthday"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="userEmail">
                            <el-input v-model="user.userEmail"></el-input>
                        </el-form-item>
                        <el-form-item label="电话" prop="userPhone">
                            <el-input v-model="user.userPhone"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-row type="flex" justify="end">
                        <el-button type="primary" @click="updateUser">确认修改</el-button>
                        <el-button @click="cancelForm">取 消</el-button>
                    </el-row>
                </el-popover>
            </el-col>
            <!--个人资料-->
            <el-col :span="8" :offset="1">
                <el-card>
                    <div slot="header" class="clearfix">
                        <el-row>
                            <el-col :span="8">
                                <i class="font-note-title">个人资料</i>
                            </el-col>
                            <el-col :span="4" :offset="8">
                                <div style="display: flex;justify-content: end">
                                    <el-button size="mini" icon="el-icon-edit"
                                               slot="reference" @click="visible = !visible">编辑</el-button>
                                </div>
                            </el-col>
                        </el-row>


                    </div>

                    <el-tabs type="border-card">
                        <el-tab-pane label="基本资料">

                            <el-row>
                                <div style="display: flex;justify-content: start">昵称：{{user.nickName}}</div>
                            </el-row>

                            <el-row>
                                <div style="display: flex;justify-content: start;margin-top: 10px">
                                    地址：{{user.userAddress}}
                                </div>
                            </el-row>

                            <el-row>
                                <div style="display: flex;justify-content: start;margin-top: 10px">
                                    性别：<span v-if="user.userSex==0">男</span>
                                    <span v-if="user.userSex==1">女</span>
                                </div>
                            </el-row>

                            <el-row>
                                <div style="display: flex;justify-content: start;margin-top: 10px">
                                    电话：{{user.userPhone}}
                                </div>
                            </el-row>

                            <el-row>
                                <div style="display: flex;justify-content: start;margin-top: 10px">
                                    生日：{{user.birthday}}
                                </div>
                            </el-row>

                            <el-row>
                                <div style="display: flex;justify-content: start;margin-top: 10px">
                                    注册时间：{{user.createTime}}
                                </div>
                            </el-row>

                        </el-tab-pane>
                        <el-tab-pane label="账户安全">

                            <el-row>
                                <div style="display: flex;justify-content: start">手机：{{user.userPhone}}</div>
                            </el-row>

                            <el-row>
                                <div style="display: flex;justify-content: start;margin-top: 10px">
                                    邮箱：{{user.userEmail}}
                                </div>
                            </el-row>
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-col>
        </el-row>


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
                countNote: '',
                countCategory: '',
                //修改个人资料弹窗
                visible: false,
                updateUserRules: {

                    nickName: [
                        {required: true, message: '请输入昵称', trigger: 'blur'},
                        {min: 3, max: 24, message: '长度在 3 到 24 个字符', trigger: 'blur'}
                    ],
                    userPhone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'}
                    ],
                    userAddress: [
                        {required: true, message: '请输入地址', trigger: 'blur'},
                        {min: 6, max: 24, message: '长度在 6 到 24 个字符', trigger: 'blur'}
                    ],
                    userEmail: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
                    ],
                    userSex: [
                        {required: true, message: '请选择性别', trigger: 'change'}
                    ],
                    birthday: [
                        {required: true, message: '请选择生日', trigger: 'change'}
                    ],
                },
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
            getCountNoteAndCategory() {
                let that = this;
                this.axios.post('http://localhost:8080/user/countNoteAndCategory')
                    .then(function (response) {
                        var res = JSON.parse(JSON.stringify(response));
                        if (res.data.code == 200) {
                            that.countNote = res.data.data[0];
                            that.countCategory = res.data.data[1];
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
            cancelForm() {
                this.visible = false;
                clearTimeout(this.timer);
            },
            updateUser() {
                let that = this;
                //登陆成功跳转之前页面

                this.axios.post('http://localhost:8080/user/updateUser',
                    {
                        userName: that.user.userName,
                        nickName: that.user.nickName,
                        userAddress: that.user.userAddress,
                        userSex: that.user.userSex,
                        birthday: that.user.birthday,
                        userEmail: that.user.userEmail,
                        userPhone: that.user.userPhone,

                    }
                )
                    .then(function (response) {
                        var res = JSON.parse(JSON.stringify(response));
                        if (res.data.code == 200) {
                            that.$message({
                                message: res.data.data,
                                type: 'success',
                                duration: 1000
                            });
                            that.activeName = 'login';

                        } else {
                            that.$message({
                                message: res.data.msg,
                                type: 'warning',
                                duration: 1000
                            })
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                        //alert(error.response.data.msg)
                    });

            }

        },
        created() {
            var that = this;
            document.title = that.$route.meta.title;
            this.getUserInfo();
            this.getCountNoteAndCategory();
        }
    }
</script>
<style scoped lang="scss">


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

    .el-card {
        height: 500px;
    }

</style>