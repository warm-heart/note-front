<template>
    <el-container class="container">
        <!-- 头部 -->
        <el-header>
            <el-row>
                <el-col :span="6">

                    <div style="display: flex;justify-content: start ">

                        <span class="font-note_logo">在线笔记系统</span>
                    </div>

                </el-col>


                <el-col :span="6" v-if="!isLogin" :offset="12">

                    <div style="display: flex;justify-content: end;margin-top: 10px;float: right">
                        <el-button @click="toLogin" type="text">登录</el-button>
                        <el-button @click="toRegister" type="text">注册</el-button>
                    </div>

                </el-col>

                <el-col v-else :span="6" :offset="12">
                    <div style="display: flex;justify-content: end;float: right">
                        <div style="margin-right: 10px">
                            <el-avatar
                                    :src="userIcon"
                            ></el-avatar>
                        </div>

                        <el-dropdown trigger="click" @command="handleCommand" class="nav">
                           <span class="el-dropdown-link">
                               {{userName}} <i class="el-icon-caret-bottom"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="userDetail">个人中心</el-dropdown-item>
                                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </el-col>

            </el-row>


        </el-header>

        <el-container>
            <!-- 侧边栏 -->
            <el-aside width="260px">
                <Aside></Aside>

            </el-aside>

            <!-- 内容区 -->
            <el-main>
                <template>
                    <el-backtop target="" :bottom="10">
                        <div
                                style="{
                                           height: 100%;
                                           width: 100%;
                                           background-color: #f2f5f6;
                                           box-shadow: 0 0 6px rgba(0,0,0, .12);
                                           text-align: center;
                                           line-height: 40px;
                                           color: #1989fa;
                                           }"
                        >
                            up
                        </div>

                    </el-backtop>

                </template>
                <router-view></router-view>
            </el-main>

        </el-container>

    </el-container>

</template>

<script>
    // 导入组件
    import Aside from "@/components/commons/aside.vue";
    import globalVal from '../utils/global_val';
    import qs from 'qs';

    export default {
        name: "home",
        components: {
            Aside,

        },
        data() {
            return {
                currentPath: [],
                token: localStorage.getItem("token"),
                isLogin: localStorage.getItem("token"),
                userIcon: localStorage.getItem("user-icon"),
                userName: localStorage.getItem("user-name"),
                fits: ["fill", "contain", "cover", "none", "scale-down"],
                isCollapse: true,

            };
        },
        methods: {
            handleCommand(command) {
                if (command == 'logout') {
                    this.logout();
                }
                if (command == 'userDetail') {
                    this.$router.push({
                        name: "userInfo"
                    });
                }
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
                                    path: '/home/compareNote'
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
            //注册
            toRegister() {
                this.$router.push({
                    name: "register"
                });
            },
            //登录
            toLogin() {
                this.$router.push({
                    name: "login"

                });
            },
        },
        created() {
            var that = this;
            document.title = that.$route.meta.title;
        }
    };
</script>
<style lang="scss" scoped>


    .el-header {
        /*background-color: #07c4a8;*/
        background-color: #232325;
        display: block;
        color: white;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #545c64;
        text-align: center;

    }

    .el-main {
        /*  background-color: #E9EEF3;
          color: #333;
          text-align: center;
          line-height: 160px;*/

        background-color: #e9eef3;
        text-align: center;

    }

    .el-footer {
        /*background-color: #07c4a8;*/
        background-color: #d9d9d9;
        color: #232325;
        display: block;
        text-align: center;
        line-height: 60px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    .container {
        height: 630px;
    }

    .el-dropdown-link {
        color: white;
        cursor: pointer;
        text-align: center;
    }

    .el-dropdown-menu__item {
        text-align: center;
    }

    .el-avatar {
        margin-top: 8px;
    }

    .navOperater {
        width: 80px;
        height: 80px;
        float: left;
        line-height: 50px;

    }

    .cate-list {
        padding-right: 20px;
    }

    .list_item {
        font-size: 14px;
        line-height: 34px;
    }

</style>