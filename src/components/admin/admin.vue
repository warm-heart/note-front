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
                <el-menu-item index="2-1">查看公告</el-menu-item>
                <el-menu-item index="2-2">创建公告</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
                <el-submenu index="2-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="2-4-1">选项1</el-menu-item>
                    <el-menu-item index="2-4-2">选项2</el-menu-item>
                    <el-menu-item index="2-4-3">选项3</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item index="3" disabled>消息中心</el-menu-item>
            <el-menu-item index="4"><router-link to="/admin/noteManager">笔记管理</router-link></el-menu-item>

        </el-menu>


        <router-view></router-view>

    </div>
</template>

<script>
    import qs from 'qs'

    export default {
        name: "admin",
        data() {
            return {}
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log();
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
                    name: "notice"
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

    .el-menu{

    }


</style>

