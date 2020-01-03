<template>
    <div>我的笔记本<br>

        <div v-for="it in categoryList">
            {{it.categoryName}}
            {{it.categoryId}}
            {{it.categoryDescription}}
        </div>
        <el-button type="text" @click="open">点击打开 Message Box</el-button>
    </div>
</template>

<script>
    export default {
        name: "myNotebook",
        data() {
            return {
                categoryList: []
            }
        },
        created() {
            var that = this;
            document.title = that.$route.meta.title;
            this.getNoteCategory();
        },
        methods: {
            open() {
                this.$confirm('是否跳转, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.push({
                        name: "notebookInfo",
                    });
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            getNoteCategory() {
                let that = this;
                this.axios.post('http://localhost:8080/noteCategory/getNoteCategory')
                    .then(function (response) {
                        var res = JSON.parse(JSON.stringify(response));
                        if (res.data.code == 200) {
                            that.categoryList = res.data.data;
                            console.log(that.categoryList);
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

    }
</script>

<style scoped>

</style>