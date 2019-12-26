<template>
    <div>login <br>

        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="primary" @click="logout">退出登录</el-button>
        {{token}}
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
                userName: 'wwqwqe',
                password: '123456'
            }
        },
        methods: {
            login() {
                let that = this;
                //登陆成功跳转之前页面

                this.axios.post('http://localhost:8080/login', qs.stringify({
                    'userName':that.userName,
                    'password':that.password
                }))
                    .then(function (response) {
                        var res = JSON.parse(JSON.stringify(response));
                        if (res.data.code == 200) {
                            that.token = res.data.data;
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
            logout() {
                let that = this;
                //登陆成功跳转之前页面
                console.log("退出登录");
                this.$store.commit('logout');
                this.$router.push({
                    path: '/'
                });
            },
        }
    }
</script>

<style scoped>

</style>