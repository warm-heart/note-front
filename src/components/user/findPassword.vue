<template>

    <div>
        <h1 style="text-align: left">找回密码</h1>

        <el-divider></el-divider>
        <el-steps :active="active" finish-status="success" align-center>
            <el-step title="第一步：输入账户信息"></el-step>
            <el-step title="第二步：进行安全验证"></el-step>
            <el-step title="设置新密码"></el-step>
            <el-step title="重置成功"></el-step>
        </el-steps>

        <div v-if="active===0" class="step">


            <el-form status-icon label-width="70px" :rules="accountRules" :model="account">
                <el-row type="flex" justify="center">
                    <el-form-item prop="userName" label="用户名">
                        <el-input v-model="account.userName" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                </el-row>

                <el-row type="flex" justify="center">
                    <el-form-item prop="verifyCode" label="验证码">
                        <el-input v-model="account.verifyCode" placeholder="请输入验证码"></el-input>
                    </el-form-item>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-form-item>
                        <el-col :span="4">
                            <div @click="refreshCode">
                                <s-identify :identifyCode="identifyCode"></s-identify>
                            </div>
                        </el-col>
                        <el-col :span="4" :offset="12">

                            <el-button @click="refreshCode" type='text'>看不清，换一张</el-button>
                        </el-col>
                    </el-form-item>
                </el-row>
            </el-form>
        </div>
        <div v-else-if="active===1" class="step">
            <div class="message">
                输入您账户关联的邮箱和手机号进行认证，如忘记请及时联系管理员。
            </div>

            <el-form status-icon label-width="80px" :rules="accountVerifyRules" :model="accountVerify">
                <el-row type="flex" justify="center">
                    <el-form-item prop="userEmail" label="邮箱">
                        <el-input v-model="accountVerify.userEmail" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-form-item prop="userPhone" label="手机号">
                        <el-input v-model="accountVerify.userPhone" placeholder="请输入手机"></el-input>
                    </el-form-item>
                </el-row>
            </el-form>

        </div>
        <div v-else-if="active===2" class="step">
            <el-row type="flex" justify="center">
                <div class="message">
                    请设置{{account.userName}}的新密码，支持6-16位字母和数字组合,不包含特殊字符。
                </div>

            </el-row>

            <el-form status-icon label-width="80px" :rules="passwordFormRules" :model="passwordForm"
                     style="margin-top: 20px">
                <el-row type="flex" justify="center">

                    <el-form-item prop="password" label="密码">
                        <el-input v-model="passwordForm.password" show-password placeholder="6-16位字母和数字组合"></el-input>
                    </el-form-item>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-form-item prop="rePassword" label="确认密码">
                        <el-input v-model="passwordForm.rePassword" show-password placeholder="请确认密码"></el-input>
                    </el-form-item>
                </el-row>
            </el-form>

        </div>

        <div v-else class="step">

            <div class="message">
                <el-row type="flex" justify="center">
                    重置成功 {{count}}</span>秒后跳转至登陆页面
                </el-row>

                <el-row type="flex" justify="center" style="margin-top: 20px">
                    <router-link to="/login">点击这里直接登录</router-link>
                </el-row>

            </div>


        </div>

        <el-button style="margin-top: 30px;" @click="next" type="primary">下一步</el-button>
    </div>
</template>

<script>
    import sIdentify from "@/components/commons/verifyCode.vue";
    import qs from 'qs';

    export default {
        name: '',
        components: {
            sIdentify,
        },
        data() {

            return {
                active: 0,
                count: '',
                //验证码的所有数字，也可以加字母
                identifyCodes: '1234567890',
                //生成的验证码数字，传给子组件
                identifyCode: '',
                userEmail: '',
                userPhone: '',

                //第一步骤 表单开始
                //账户信息
                account: {
                    userName: '',
                    verifyCode: '',
                },
                //表单验证
                accountRules: {
                    userName: [
                        {required: true, message: '请填写账户', trigger: 'blur'}
                    ],
                    verifyCode: [
                        {required: true, message: '请填写验证码', trigger: 'blur'}
                    ],
                },
                //第二步骤 表单开始
                //账号验证信息
                accountVerify: {
                    userEmail: '',
                    userPhone: '',
                },
                //表单验证
                accountVerifyRules: {
                    userEmail: [
                        {required: true, message: '请填写邮箱', trigger: 'blur'}
                    ],
                    userPhone: [
                        {required: true, message: '请填写手机号', trigger: 'blur'}
                    ],
                },
                //第三步骤 表单开始
                //新密码
                passwordForm: {
                    password: '',
                    rePassword: '',
                },
                //表单验证
                passwordFormRules: {
                    password: [
                        {required: true, message: '请填写新密码', trigger: 'blur'}
                    ],
                    rePassword: [
                        {required: true, message: '请填写确认密码', trigger: 'blur'}
                    ],
                },
            }
        },

        methods: {
            next() {
                if (this.active == 0) {
                    this.getUserVerifyMessage();
                }
                if (this.active == 1) {
                    this.verifyMessage();
                }
                if (this.active == 2) {
                    this.resetPassword();
                }
                if (this.active == 4) {
                    this.active = 0;
                }

            },
            //第一步骤验证
            getUserVerifyMessage() {
                let that = this;
                if (!that.account.verifyCode || that.account.verifyCode != that.identifyCode) {
                    that.$message({
                        message: '验证码错误',
                        type: 'warning',
                        duration: 1500
                    });
                    return;
                }
                else {
                    this.axios.post('http://localhost:8080/getVerifyMessage', qs.stringify({
                        'userName': that.account.userName,
                    })).then(function (response) {
                        var res = JSON.parse(JSON.stringify(response));
                        if (res.data.code == 200) {
                            that.userEmail = res.data.data[0];
                            that.userPhone = res.data.data[1];
                            //进入下一个步骤
                            if (that.active++ > 3) that.active = 0;
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
                }
            },
            //第二步骤验证数据是否正确
            verifyMessage() {
                let that = this;
                if (!that.accountVerify.userEmail || that.accountVerify.userEmail != that.userEmail) {
                    that.$message({
                        message: '邮箱验证失败',
                        type: 'warning',
                        duration: 1500
                    });
                    return;
                }
                if (!that.accountVerify.userPhone || that.accountVerify.userPhone != that.userPhone) {
                    that.$message({
                        message: '手机号验证失败',
                        type: 'warning',
                        duration: 1500
                    });
                    return;
                }
                else {
                    //进入下一个步骤
                    if (that.active++ > 3) that.active = 0;
                    //that.active = 2;
                }

            },
            //第三步骤 重置密码
            resetPassword() {
                let that = this;
                const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
                if (!reg.test(that.passwordForm.password)) {
                    that.$message({
                        message: '密码格式错误',
                        type: 'warning',
                        duration: 1500
                    });
                    return;
                }
                if (!that.passwordForm.password || that.passwordForm.password != that.passwordForm.rePassword) {
                    that.$message({
                        message: '新密码与确认密码不一致',
                        type: 'warning',
                        duration: 1500
                    });
                    return;
                }
                else {
                    this.axios.post('http://localhost:8080/findPassword', qs.stringify({
                        'userName': that.account.userName,
                        'password': that.passwordForm.password,
                    })).then(function (response) {
                        var res = JSON.parse(JSON.stringify(response));
                        if (res.data.code == 200) {
                            that.$message({
                                message: res.data.data,
                                type: 'success',
                                duration: 1500
                            });
                            //进入下一个步骤
                            // if (that.active++ > 3) that.active = 0;
                            that.active = 4;
                            //倒计时
                            that.goGrdoupRecor();
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
                }

            },
            //验证码相关方法开始
            randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            }
            ,
            refreshCode() {
                this.identifyCode = "";
                this.makeCode(this.identifyCodes, 4);
            }
            ,
            makeCode(o, l) {
                for (let i = 0; i < l; i++) {
                    this.identifyCode += this.identifyCodes[
                        this.randomNum(0, this.identifyCodes.length)
                        ];
                }
            }
            ,
            //验证码相关方法结束
            //倒计时方法
            goGrdoupRecor() {
                const TIME_COUNT = 5;
                if (!this.timer) {
                    this.count = TIME_COUNT;
                    this.show = false;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--;
                        } else {
                            this.show = true;
                            clearInterval(this.timer);
                            this.timer = null;
                            this.$router.push({
                                name: 'login',
                            })
                        }
                    }, 1000)
                }
            },
        },
        created() {
            this.refreshCode();
        }
    }
</script>

<style scoped>

    .el-steps {
        margin-top: 30px;
    }

    .step {
        margin-top: 50px;
    }

    .message {
        font-size: 18px;
        font-family: "Microsoft YaHei";
        margin-bottom: 50px;
        text-align: center;

    }


</style>