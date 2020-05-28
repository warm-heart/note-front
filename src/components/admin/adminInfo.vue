<template>


    <div>

        <div style="margin-bottom: 50px" class="font-note-title">
            欢迎您：{{user.userName}}<br>
            您可以管理以下内容
        </div>

        <el-card>


            <el-row style="margin-top: 20px">
                <el-col :span="6" :offset="4">
                    <el-card class="box-card">
                        <el-button @click="userManager" type="primary">
                            查看所有用户
                        </el-button>

                    </el-card>
                </el-col>
                <el-col :span="6">

                    <el-card class="box-card">
                        <el-button @click="lockUser" type="primary">
                            查看封禁的用户
                        </el-button>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="box-card">
                        <el-button @click="noteManager" type="primary">
                            查看所有笔记
                        </el-button>
                    </el-card>
                </el-col>
            </el-row>
            <el-row style="margin-top: 20px">
                <el-col :span="6" :offset="4">
                    <el-card class="box-card">
                        <el-button @click="lockNote" type="warning">

                            查看封禁的笔记
                        </el-button>
                    </el-card>
                </el-col>
                <el-col :span="6">

                    <el-card class="box-card">
                        <el-button @click="noticeManager" type="warning">
                            公告管理
                        </el-button>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="box-card">
                        <el-button @click="createNotice" type="warning">
                            创建公告
                        </el-button>
                    </el-card>
                </el-col>
            </el-row>

            <el-row style="margin-top: 20px">
                <!--   <el-col :span="6" :offset="4">
                       <el-card class="box-card">
                           <el-button @click="feedBackManager">
                               <i class="iconfont icon-note-category">反馈管理</i>
                           </el-button>
                       </el-card>
                   </el-col>-->
                <el-col :span="6" :offset="4">
                    <el-card class="box-card">
                        <el-button @click="logout" type="success">退出登录</el-button>
                    </el-card>

                </el-col>
                <el-col :span="6">
                    <el-card class="box-card">
                        <el-button @click="toFront" type="success">前台</el-button>
                    </el-card>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import qs from 'qs';
    import globalVal from '../../utils/global_val';

    export default {
        name: "adminInfo",
        data() {
            return {
                token: localStorage.getItem("token"),
                user: {},
            }
        },
        methods: {
            getAdminInfo() {
                let that = this;
                this.axios.post('http://localhost:8080/user/userInfo')
                    .then(function (response) {
                        var res = JSON.parse(JSON.stringify(response));
                        if (res.data.code == 200) {
                            that.user = res.data.data;
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
            //用户管理
            userManager() {
                this.$router.push({
                    name: "userManager"
                });
            },
            //封禁的用户
            lockUser() {
                this.$router.push({
                    name: "lockUser"
                });
            },
            //笔记管理
            noteManager() {
                this.$router.push({
                    name: "noteManager"
                });
            },
            //封禁的笔记
            lockNote() {
                this.$router.push({
                    name: "lockNote"
                });
            },
            //公告管理
            noticeManager() {
                this.$router.push({
                    name: "noticeManager"
                });
            },

            //创建公告
            createNotice() {
                this.$router.push({
                    name: "createNotice"
                });
            },
            //反馈管理
            feedBackManager() {
                this.$router.push({
                    name: "feedBackManager"
                });
            },
            //前台
            toFront() {
                this.$router.push({
                    path: "/home"
                });
            },
            logout() {
                this.$confirm('确定退出?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let that = this;
                    this.axios.post('http://localhost:8080/logout', qs.stringify({
                        'token': that.token
                    }))
                        .then(function (response) {
                            var res = JSON.parse(JSON.stringify(response));
                            if (res.data.code == 200) {
                                that.$store.commit(globalVal.LOGOUT);
                                localStorage.removeItem("user-icon");
                                localStorage.removeItem("user-name");
                                that.$message({
                                    type: 'success',
                                    message: res.data.data,
                                    duration: 1500
                                });
                                that.$router.push({
                                    path: '/login'
                                });
                                location.reload();
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
                            alert(error.response.data.msg)
                        });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退出'
                    });
                });
            },

        },
        created() {
            var that = this;
            document.title = that.$route.meta.title;
            this.getAdminInfo();

        }


    }
</script>

<style scoped>
    .box-card {
        height: 100px;
        width: 200px;
    }

</style>