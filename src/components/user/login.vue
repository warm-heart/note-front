<template>
    <div>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
                <!-- <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>-->
                <el-button @click="resetForm('ruleForm')">重置</el-button>
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
                userName: 'cooper',
                password: '123456',
                data: [],
                userIcon: '',
                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
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
                        userName: that.userName,
                        userPassword: that.password
                    }
                )
                    .then(function (response) {
                        var res = JSON.parse(JSON.stringify(response));
                        if (res.data.code == 200) {
                            that.token = res.data.data[0];
                            that.userIcon = res.data.data[1];
                            localStorage.setItem("user-icon", that.userIcon);
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

        }
    }
</script>

<style scoped>

</style>