<template>
    <div class="login-demo">
        <div class="login-wrap">
            <el-row type="flex" justify="center">

                <el-tabs :stretch=true v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="登录" name="login">
                        <el-form ref="loginUser" :rules="loginRules" :model="loginUser" status-icon label-width="70px">
                            <el-form-item prop="userName" label="用户名">
                                <el-input v-model="loginUser.userName" placeholder="请输入用户名"></el-input>
                            </el-form-item>
                            <el-form-item prop="password" label="密码">
                                <el-input v-model="loginUser.password" show-password placeholder="请输入密码">
                                    <template slot="prepend"></template>
                                </el-input>
                            </el-form-item>

                            <router-link to="/findPassword">忘记密码</router-link>
                            <br> <br>
                            <el-form-item>
                                <el-button type="primary" @click="login">登 录</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>

                    <!-- 注册框 -->
                    <el-tab-pane label="注册" name="register">
                        <el-form ref="registerUser" :rules="registerRules" :model="registerUser" status-icon
                                 label-width="70px">
                            <el-form-item prop="userName" label="用户名">
                                <el-input v-model="registerUser.userName" placeholder="您的用户名"></el-input>
                            </el-form-item>

                            <el-form-item prop="password" label="设置密码">
                                <el-input v-model="registerUser.password" show-password
                                          placeholder="6-16位字母和数字组合"></el-input>
                            </el-form-item>
                            <el-form-item prop="rePassword" label="确认密码">
                                <el-input v-model="registerUser.rePassword" show-password placeholder="确认密码"></el-input>
                            </el-form-item>

                            <el-form-item prop="nickName" label="昵称">
                                <el-input v-model="registerUser.nickName" placeholder="请输入昵称"></el-input>
                            </el-form-item>

                            <el-form-item prop="userPhone" label="手机号">
                                <el-input v-model="registerUser.userPhone" placeholder="请输入手机号"></el-input>
                            </el-form-item>
                            <el-form-item prop="userAddress" label="地址">
                                <el-input v-model="registerUser.userAddress" placeholder="请输入地址"></el-input>
                            </el-form-item>
                            <el-form-item prop="userEmail" label="邮箱">
                                <el-input v-model="registerUser.userEmail" placeholder="请输入邮箱"></el-input>
                            </el-form-item>


                            <el-form-item prop="userSex" label="性别">
                                <el-radio v-model="registerUser.userSex" label=0>男</el-radio>
                                <el-radio v-model="registerUser.userSex" label=1>女</el-radio>
                            </el-form-item>


                            <el-form-item prop="birthday" label="生日">
                                <el-date-picker type="datetime" placeholder="选择生日" value-format="yyyy-MM-dd HH:mm:ss"
                                                v-model="registerUser.birthday"
                                                style="width: 100%;"></el-date-picker>
                            </el-form-item>

                            <el-form-item>
                                <el-button type="primary" @click="register">注册账号</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
                </el-form>
            </el-row>
        </div>

    </div>
</template>
<script>
    import globalVal from '../../utils/global_val';
    import qs from 'qs';

    export default {
        name: "loginAndRegister",
        data() {
            var validatePass = (rule, value, callback) => {
                const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
                if (!value) {
                    callback(new Error('请输入密码'));
                }
                if (!reg.test(value)) {
                    callback(new Error('6-16位字母和数字组合,不包含特殊字符'));
                }
                else {
                    if (this.registerUser.rePassword !== '') {
                        this.$refs.registerUser.validateField('rePassword');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerUser.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                activeName: "login",
                //login start
                token: '',
                loginUser: {
                    userName: null,
                    password: null,
                },
                userIcon: '',
                loginRules: {
                    userName: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 24, message: '长度在 3 到 24 个字符', trigger: 'blur'}
                    ],

                    password: [
                        {required: true, message: '请输入密码', trigger: 'change'}
                    ],
                },
                //login end
                //register start

                registerUser: {},

                registerRules: {

                    userName: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 24, message: '长度在 4 到 16 个字符', trigger: 'blur'},
                        {
                            required: true,
                            pattern: /^[a-zA-Z0-9_-]{4,16}$/,
                            message: '4到16位（字母，数字，下划线，减号）',
                            trigger: 'blur'
                        },
                    ],
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
                    password: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    rePassword: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                },
                // register end
            }
        },
        methods: {
            handleClick(tab, event) {
                // console.log(tab, event);
            },
            login() {
                let that = this;
                //登陆成功跳转之前页面

                this.axios.post('http://localhost:8080/login', /*qs.stringify({
                    'userName': that.userName,
                    'password': that.password*/
                    {
                        userName: that.loginUser.userName,
                        userPassword: that.loginUser.password
                    }
                )
                    .then(function (response) {
                        var res = JSON.parse(JSON.stringify(response));
                        if (res.data.code == 200) {
                            let isAdmin;
                            that.token = res.data.data[0];
                            that.userIcon = res.data.data[1];
                            localStorage.setItem("user-icon", that.userIcon);
                            localStorage.setItem("user-name", res.data.data[2]);
                            isAdmin = res.data.data[3] == 'admin' ? true : false;
                            that.$store.commit(globalVal.LOGIN, that.token);
                            that.$message({
                                message: '登陆成功',
                                type: 'success',
                                duration: 1000
                            });
                            if (isAdmin) {
                                that.$router.push({
                                    path: '/admin'
                                })
                            }
                            else {
                                let redirect = decodeURIComponent(that.$route.query.redirect || '/');
                                that.$router.push({
                                    path: redirect
                                });
                            }
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
            register() {
                let that = this;
                //登陆成功跳转之前页面

                this.axios.post('http://localhost:8080/register',
                    {
                        userName: that.registerUser.userName,
                        nickName: that.registerUser.nickName,
                        userPassword: that.registerUser.password,
                        userAddress: that.registerUser.userAddress,
                        userEmail: that.registerUser.userEmail,
                        userSex: that.registerUser.userSex,
                        userPhone: that.registerUser.userPhone,
                        birthday: that.registerUser.birthday,
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
            },
        },
        created() {
            if (this.$route.name == 'login') {
                this.activeName = 'login';
            }
            if (this.$route.name == 'register') {
                this.activeName = 'register';
            }

        }
    }

</script>
<style scoped>
    li {
        list-style: none;
        float: left;
    }

    .login-demo {
        position: fixed;
        width: 100%;
        height: 100%;
        background: url("../../assets/img/login-bg.jpg") no-repeat center center fixed;
        background-size: 100%;
        top: 0px;
        left: 0px;
        overflow: auto;

    }

    .login-wrap {
        background-color: #d9d9d9;
        width: 400px;
        margin: 100px auto;
        margin-left: 772px;
        border-radius: 6px;
        line-height: 20px;
        padding-top: 0px;
    }

    .el-tabs >>> .el-tabs__item {
        font-size: 18px;
        margin: 5px auto;
    }

    .el-tabs__nav {
        font-size: 18px;
    }

    a {
        text-decoration: none;
        color: #606266;
        font-size: 14px;
        float: right;
    }

    a:hover {
        color: coral;
    }

    .el-checkbox {
        text-indent: 4px;
    }

    >>> .el-form-item__label {
        padding: 0px 4px 0 0;
    }

    >>> .el-checkbox__label {
        padding-left: 0px;
    }

    .el-button {
        width: 118%;
        margin-left: -40px;
        background-color: #16696a;
        letter-spacing: 5px;
        border: 0px;
    } </style>
