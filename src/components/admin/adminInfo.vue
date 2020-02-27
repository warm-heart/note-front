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
                        <i class="el-icon-user-solid" style="text-align: center; margin: 0 auto">查看所有用户</i>
                    </el-card>
                </el-col>
                <el-col :span="6">

                    <el-card class="box-card">
                        <i class="el-icon-unlock">查看封禁的用户</i> 
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="box-card">
                        <i class="iconfont icon-note-category">查看所有笔记</i>
                    </el-card>
                </el-col>
            </el-row>
            <el-row style="margin-top: 20px">
                <el-col :span="6" :offset="4">
                    <el-card class="box-card">
                        <i class="iconfont icon-note-category" style="text-align: center; margin: 0 auto">查看封禁的笔记</i>
                    </el-card>
                </el-col>
                <el-col :span="6">

                    <el-card class="box-card">
                        <i class="iconfont icon-note-category">公告管理</i>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="box-card">
                        <i class="iconfont icon-note-category">创建公告</i>
                    </el-card>
                </el-col>
            </el-row>

            <el-row style="margin-top: 20px">
                <el-col :span="6" :offset="4">
                    <el-card class="box-card">
                        <i class="iconfont icon-note-category" style="text-align: center; margin: 0 auto">前台</i>
                    </el-card>
                </el-col>
                <el-col :span="6">

                    <el-card class="box-card">
                        <i class="iconfont icon-note-category">退出登录</i>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="box-card">
                        <i class="iconfont icon-note-category">todo</i>
                    </el-card>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import qs from 'qs';

    export default {
        name: "adminInfo",
        data() {
            return {

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