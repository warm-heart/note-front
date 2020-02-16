<template>
    <div>

        <el-form :model="user" :rules="rules" ref="user" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="userName">
                <el-input v-model="user.userName"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input v-model="user.password" show-password></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
                <el-button @click="resetForm('user')">重置</el-button>
            </el-form-item>
        </el-form>

    </div>


</template>

<script>
    import globalVal from '../../utils/global_val';
    import qs from 'qs';

    export default {
        name: "login",
        data() {
            return {
                token: '',
                user: {
                    userName: null,
                    password: null,
                },
                userIcon: '',
                rules: {
                    userName: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 24, message: '长度在 3 到 24 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'change'}
                    ],
                },
            }
        },
        methods: {
            login() {
                let that = this;
                //登陆成功跳转之前页面

                this.axios.post('http://localhost:8080/login', /*qs.stringify({
                    'userName': that.userName,
                    'password': that.password*/
                    {
                        userName: that.user.userName,
                        userPassword: that.user.password
                    }
                )
                    .then(function (response) {
                        var res = JSON.parse(JSON.stringify(response));
                        if (res.data.code == 200) {
                            that.token = res.data.data[0];
                            that.userIcon = res.data.data[1];
                            localStorage.setItem("user-icon", that.userIcon);
                            localStorage.setItem("user-name", res.data.data[2]);
                            that.$store.commit(globalVal.LOGIN, that.token);
                            that.$message({
                                message: '登陆成功',
                                type: 'success',
                                duration: 1000
                            })
                            let redirect = decodeURIComponent(that.$route.query.redirect || '/');
                            that.$router.push({
                                path: redirect
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
                        //alert(error.response.data.msg)
                    });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }

        }
    }
</script>

<style scoped>

</style>