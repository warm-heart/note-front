<template>
    <div style="margin-top: 20px">
        <el-form :model="notice" :rules="rules" ref="notice" label-width="100px" class="demo-ruleForm">
            <el-form-item label="公告标题" prop="noticeTitle">
                <el-input v-model="notice.noticeTitle"></el-input>
            </el-form-item>

            <el-form-item label="公告内容" prop="noticeContext" >
                <el-input type="textarea" :rows="15" v-model="notice.noticeContext"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="createNotice">立即创建</el-button>
                <!-- <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>-->
                <el-button @click="resetForm('notice')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "",
        data() {
            return {
                notice: {
                    noticeContext: '',
                    noticeTitle: '',
                },
                rules: {
                    noticeTitle: [
                        {required: true, message: '请输入公告标题', trigger: 'blur'},
                        {min: 2, max: 24, message: '长度在 2 到 24 个字符', trigger: 'blur'}
                    ],
                    noticeContext: [
                        {required: true, message: '请输入公告内容', trigger: 'change'}
                    ],
                },
            }
        },
        methods: {

            createNotice() {
                let that = this;
                this.axios.post('http://localhost:8080/admin/createNotice',
                    {
                        noticeTitle: that.notice.noticeTitle,
                        noticeContext: that.notice.noticeContext,
                    })
                    .then(function (response) {
                        var res = JSON.parse(JSON.stringify(response));
                        if (res.data.code == 200) {

                            that.$message({
                                message: res.data.data,
                                type: 'success',
                                duration: 1500
                            });
                            //公告管理
                            that.$router.push({
                                name: "noticeManager"
                            });
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
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }

        }
    }
</script>


<style scoped>

</style>