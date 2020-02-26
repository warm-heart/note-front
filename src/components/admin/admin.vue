<template>

    <div>


        <el-menu

                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
            <el-menu-item index="1" @click="userManager">用户管理</el-menu-item>
            <el-submenu index="2">
                <template slot="title">公告管理</template>
                <el-menu-item index="2-1" @click="noticeManager">查看公告</el-menu-item>
                <el-menu-item index="2-2" @click="createNotice">发布公告</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
                <el-submenu index="2-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="2-4-1">选项1</el-menu-item>
                    <el-menu-item index="2-4-2">选项2</el-menu-item>
                    <el-menu-item index="2-4-3">选项3</el-menu-item>
                </el-submenu>
            </el-submenu>

            <el-menu-item index="3">
                <router-link to="/admin/noteManager">笔记管理</router-link>
            </el-menu-item>
            <el-submenu index="4">
                <template slot="title">个人中心</template>
                <el-menu-item index="4-1" @click="logout">退出登录</el-menu-item>
                <el-menu-item index="4-2"  @click="adminInfo">个人中心</el-menu-item>
            </el-submenu>

            <el-menu-item index="3">
                <router-link to="/home">前台</router-link>
            </el-menu-item>

        </el-menu>


        <router-view ></router-view>

    </div>
</template>

<script>
    import qs from 'qs';
    import globalVal from '../../utils/global_val';

    export default {
        name: "admin",
        data() {
            return {

                token:localStorage.getItem("token"),
            }
        },
        methods: {

            handleSelect(key, keyPath) {
                console.log();
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
                        });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退出'
                    });
                });
            },
            //用户管理
            userManager() {

                this.$router.push({
                    name: "userManager"
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
            //创建公告
            adminInfo() {
                this.$router.push({
                    name: "adminInfo"
                });
            },
        },
        created() {
            var that = this;
            document.title = that.$route.meta.title;
        }
    }
</script>
<style scoped>

    .router-link-active {
        text-decoration: none;
    }

    a {
        text-decoration: none;
    }


</style>

