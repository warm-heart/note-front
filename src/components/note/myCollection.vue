<template>
    <div id="psd">
        <h1>我的收藏</h1>
    </div>
</template>

<script>
    export default {
        name: "myCollection",
        data(){
            return{
                users :[]
            }
        },

        created() {
            var that = this;
            document.title = that.$route.meta.title;
            this.axios.post('http://localhost:8082/vue', {
                    userId: 1234,
                    password: that.password,
                    userName: 1234
                },
                {
                    headers: {
                        'token': localStorage.getItem("token"),
                        'Authorization': 'Bearer',

                        //文件上传设置
                        //'Content-Type': 'multipart/form-data'
                    }
                })
                .then(function (response) {
                    var res = JSON.parse(JSON.stringify(response));

                    if (res.data.code == 200) {
                        that.users = res.data.data;
                        console.log(res.data.data);
                        console.log("返回状态码"+res.status);
                    } else alert(res.data);
                })
                .catch(function (error) {
                    console.log(error);
                    alert(error)
                });
        },
    }
</script>

<style scoped>

</style>