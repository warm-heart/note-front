<template>
    <div class="createNoteBook">


        <el-card>
            <el-row type="flex" justify="start">
                <div style="display: flex;justify-content: flex-start;margin-bottom: 20px">
                    新建笔记分类
                </div>

            </el-row>

            <el-form :model="noteBook" :rules="rules" ref="noteBook" label-width="100px">
                <el-row>
                    <el-form-item label="笔记分类名" prop="categoryName">
                        <el-input v-model="noteBook.categoryName"></el-input>
                    </el-form-item>
                </el-row>

                <el-row>
                    <el-form-item label="分类描述" prop="categoryDescription">
                        <el-input v-model="noteBook.categoryDescription"></el-input>
                    </el-form-item>
                </el-row>

                <el-row type="flex" justify="end">
                    <el-form-item>
                        <el-button type="primary" @click="createNoteBook">立即创建</el-button>
                        <el-button @click="resetForm('noteBook')">重置</el-button>
                    </el-form-item>
                </el-row>

            </el-form>

        </el-card>


    </div>


</template>

<script>
    export default {
        name: "createNotebook",

        data() {
            return {
                noteBook: {
                    categoryName: '',
                    categoryDescription: '',
                },
                rules: {
                    categoryName: [
                        {required: true, message: '请输入分类名', trigger: 'blur'},
                        {min: 2, max: 24, message: '长度在 2 到 24 个字符', trigger: 'blur'}
                    ],
                    categoryDescription: [
                        {required: true, message: '请输入分类描述', trigger: 'change'}
                    ],
                },
            }
        },
        methods: {

            createNoteBook() {
                let that = this;
                this.axios.post('http://localhost:8080/noteCategory/createCategory',
                    {
                        categoryName: that.noteBook.categoryName,
                        categoryDescription: that.noteBook.categoryDescription,
                    })
                    .then(function (response) {
                        var res = JSON.parse(JSON.stringify(response));
                        if (res.data.code == 200) {

                            that.$message({
                                message: res.data.data,
                                type: 'success',
                                duration: 1500
                            });
                            //我的笔记分类
                            that.$router.push({
                                name: "myNotebook"
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