<template>


    <div>

        管理员个人中心
        {{user.userName}}
        {{user.userPhone}}
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

</style>