<template>
    <div>
        <i class="font-note-title">修改密码</i>
        <el-divider></el-divider>
        <el-card style="width: 500px;margin: 0 auto">
            <el-form status-icon label-width="100px" :rules="resetPasswordRules" :model="resetPassword"
                     style="margin-top: 20px">
                <el-row type="flex" justify="center">
                    <el-form-item prop="oldPassword" password label="原始密码">
                        <el-input v-model="resetPassword.oldPassword" show-password
                                  placeholder="6-16位字母和数字组合"></el-input>
                    </el-form-item>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-form-item prop="newPassword" password label="新密码">
                        <el-input v-model="resetPassword.newPassword" show-password
                                  placeholder="6-16位字母和数字组合"></el-input>
                    </el-form-item>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-form-item prop="rePassword" label="确认新密码">
                        <el-input v-model="resetPassword.rePassword" show-password placeholder="确认密码"></el-input>
                    </el-form-item>
                </el-row>

                <el-row type="flex" justify="center">
                    <el-form-item>
                        <el-button type="primary" @click="updatePassword">立即修改</el-button>
                    </el-form-item>
                </el-row>

            </el-form>
        </el-card>

    </div>
</template>

<script>
    import qs from 'qs'

    export default {
        name: "resetPassword",
        data() {
            return {
                resetPassword: {
                    oldPassword: '',
                    newPassword: '',
                    rePassword: '',
                },
                resetPasswordRules: {
                    oldPassword: [
                        {required: true, message: '请填写原始密码', trigger: 'blur'}
                    ],
                    newPassword: [
                        {required: true, message: '请填写新密码', trigger: 'blur'}
                    ],
                    rePassword: [
                        {required: true, message: '请填写确认密码', trigger: 'blur'}
                    ],
                },
            }
        },
        methods: {
            updatePassword() {
                let that = this;
                const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
                if (!reg.test(that.resetPassword.newPassword)) {
                    that.$message({
                        message: '新密码格式错误',
                        type: 'warning',
                        duration: 1500
                    });
                    return;
                }
                if (!that.resetPassword.newPassword || that.resetPassword.newPassword != that.resetPassword.rePassword) {
                    that.$message({
                        message: '新密码与确认密码不一致',
                        type: 'warning',
                        duration: 1500
                    });
                    return;
                }
                else {
                    this.axios.post('http://localhost:8080/user/resetPassword', qs.stringify({
                        'oldPassword': that.resetPassword.oldPassword,
                        'newPassword': that.resetPassword.newPassword,
                    })).then(function (response) {
                        var res = JSON.parse(JSON.stringify(response));
                        if (res.data.code == 200) {
                            that.$message({
                                message: res.data.data,
                                type: 'success',
                                duration: 1500
                            });
                            that.$router.push({
                                name: 'login'
                            })

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
            }
        },
        created() {
            var that = this;
            document.title = that.$route.meta.title;
        }
    }
</script>

<style scoped>

</style>