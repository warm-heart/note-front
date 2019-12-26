<template>
    <div id="psd">
        <h1>我的收藏</h1>
        <div class="con">
            <div class="tip">单文件：</div>
            <input class="file" type="file" title="请选择文件" value="请选择文件">
            <div class="tip">输入姓名：</div>
            <input class="inputS" type="text" v-model="name" placeholder="请在此输入姓名">
            <button class="submit" @click="one">提交</button>
        </div>


        <div class="con">
            <div class="tip">多文件：</div>
            <input class="file" type="file" title="请选择文件" value="请选择文件">
            <input class="file" type="file" title="请选择文件" value="请选择文件">
            <div class="tip">输入姓名：</div>
            <input class="inputS" type="text" v-model="name" placeholder="请在此输入姓名">
            <button class="submit" @click="more">提交</button>
        </div>


    </div>
</template>

<script>
    export default {
        name: "myCollection",
        data() {
            return {
                users: [],
                message: '',
                userName: 'hello world',
                userPhone: '12134i35',

            }
        },
        methods: {
            one() {
                var that = this;

                var formData = new window.FormData();
                formData.append('file', document.querySelector('input[type=file]').files[0]);

                formData.append('userName', this.userName);
                formData.append('userPhone', this.userPhone);
                this.axios.post('http://localhost:8080/file', formData,
                    {
                        headers: {
                            //文件上传设置
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )
                    .then(function (response) {
                        var res = JSON.parse(JSON.stringify(response));
                        if (res.data.code == 200) {
                            that.$message({
                                message: res.data.msg,
                                type: 'success',
                                duration: 1000
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
            more() {
                var that = this;
                var formData = new window.FormData();
                var file=new Array(2);
                file[0] = document.querySelector('input[type=file]').files[1];
                file[1] = document.querySelector('input[type=file]').files[2];
                formData.append("file", file);
                //formData.append('userName', this.userName);
                //formData.append('userPhone', this.userPhone);
                this.axios.post('http://localhost:8080/postUploadMore', formData,
                    {
                        headers: {
                            //文件上传设置
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )
                    .then(function (response) {
                        var res = JSON.parse(JSON.stringify(response));
                        if (res.data.code == 200) {
                            that.$message({
                                message: res.data.msg,
                                type: 'success',
                                duration: 1000
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
        },


        created() {

        },
    }
</script>

<style scoped>

</style>