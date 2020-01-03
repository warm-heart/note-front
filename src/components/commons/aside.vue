<template>
    <div>
        <!-- 菜单组件 -->
        <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"

        >

            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-s-home"></i>
                    <span>首页</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="11" @click="toHome">首页</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <!-- 子菜单：用户管理 -->
            <el-submenu index="2">
                <template slot="title">
                    <i class="iconfont icon-iconset0123"> </i>
                    <span>我的笔记</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="21" @click="toMyNote">我的笔记</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <el-menu-item index="22" @click="toCreateNote">新建笔记</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <el-menu-item index="23" @click="toMyCollection">我的收藏</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <!-- 子菜单：笔记本管理 -->
            <el-submenu index="3">
                <template slot="title">
                    <i class="iconfont icon-biji"></i>
                    <span>笔记分类</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="31" @click="toMyNotebook">我的笔记分类</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <el-menu-item index="32" @click="toCreateNotebook">新建笔记分类</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <!-- 子菜单：笔记管理 -->
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-s-custom"></i>
                    <span>我的信息</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="41" @click="toUserInfo">个人信息</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <el-menu-item index="42" @click="toResetPassword">修改密码</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <!-- 子菜单：公告 -->
            <el-submenu index="5">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>系统公告</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="51" @click="toNotice">查看公告</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>

    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        methods: {
            handleOpen(key, keyPath) {
                //console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
               // console.log(key, keyPath);
            },
            //首页
            toHome() {
                this.$router.push({
                    //name: "compareNote"
                    path:'/home/compareNote'
                });
            },
            //我的笔记
            toMyNote() {
                this.$router.push({
                    name: "myNote"
                });
            },
            //新建笔记
            toCreateNote() {
                this.$router.push({
                    name: "createNote"
                });
            },
            //我的收藏
            toMyCollection() {
                this.$router.push({
                    name: "myCollection"
                });
            },
            //我的笔记分类
            toMyNotebook() {
                this.$router.push({
                    name: "myNotebook"
                });
            },
            //新建笔记分类
            toCreateNotebook() {
                this.$router.push({
                    name: "createNotebook"
                });
            },
            //我的信息
            toUserInfo() {
                this.$router.push({
                    name: "userInfo"
                });
            },
            //修改密码
            toResetPassword() {
                this.$router.push({
                    name: "resetPassword"
                });
            },
            //查看公告
            toNotice() {
                this.$router.push({
                    name: "notice"
                });
            },


        }
    };
</script>

<style scoped>

</style>
