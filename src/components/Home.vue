<template>
    <el-container class="container">
        <!-- 头部 -->
        <el-header>
            <el-row>
                <el-col :span="12">
                    <!--<el-image style="width: 210px; height: 54px" :src="./assets/logo.png"></el-image>-->
                    <img alt="Vue logo" style="width: 74px; height: 58px;" src="../assets/logo2.png">
                </el-col>

                <el-col class="logout" :span="12">
                    <template>
                        <div class="navOperater">
                            <el-link type="info" @click="logout">退出登录{{this.$store.state.token}}</el-link>
                        </div>
                        <div class="navOperater">
                            <el-avatar
                                    class="avatar"
                                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                            ></el-avatar>
                        </div>
                    </template>
                </el-col>
            </el-row>
        </el-header>

        <el-container>
            <!-- 侧边栏 -->
            <el-aside width="210px">
                <Aside/>
            </el-aside>

            <!-- 内容区 -->
            <el-main>
                <template>
                    <router-view></router-view>
                </template>
            </el-main>
        </el-container>
    </el-container>

</template>

<script>
    // 导入组件
    import Aside from "@/components/aside.vue";
    import globalVal from '../utils/global_val';
    import qs from 'qs';

    export default {
        name: "home",
        components: {
            Aside
        },
        data() {
            return {
                token: this.$store.state.token,
                url: "",
                fits: ["fill", "contain", "cover", "none", "scale-down"],

            };
        },
        methods: {
            logout() {
                this.$confirm('确定退出?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let that = this;
                    const params = new URLSearchParams();
                    params.append('token', this.token);

                    this.axios.post('http://localhost:8080/logout',  qs.stringify({
                        'token':this.token
                    }))
                        .then(function (response) {
                            var res = JSON.parse(JSON.stringify(response));
                            if (res.data.code == 200) {
                                that.$store.commit(globalVal.LOGOUT);
                                that.$message({
                                    type: 'success',
                                    message: res.data.data,
                                    duration: 1000
                                });
                                that.$router.push({
                                    path: '/'
                                });

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
                            alert(error.response.data.msg)
                        });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退出'
                    });
                });
            }
        },
        created() {
            var that = this;
            document.title = that.$route.meta.title;
        }
    };
</script>
<style lang="scss" scoped>
    body > .el-container {
        margin-bottom: 40px;
    }

    .container {
        height: 630px;
    }

    .el-header {
        text-align: left;
        background-color: #212121;

    .logout {
        text-align: right;

    .navOperater {
        width: 80px;
        height: 80px;
        float: right;
        line-height: 50px;

    }

    }
    }
    .el-main {
        background-color: #e9eef3;
        text-align: center;
    }

    .el-aside {
        background-color: #545c64;
        text-align: center;

    }

    /*todo 分页  https://www.cnblogs.com/web-aqin/p/10769435.html
    https://blog.csdn.net/weixin_33896726/article/details/91428629
    */
</style>