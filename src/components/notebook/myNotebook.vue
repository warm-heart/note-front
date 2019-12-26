<template>
    <div>我的笔记本<br>
        <el-button type="text" @click="open">点击打开 Message Box</el-button>
    </div>
</template>

<script>
    export default {
        name: "myNotebook",
        data() {
            return {}
        },
        created() {
            var that = this;
            document.title = that.$route.meta.title;
        },
        methods: {
            open() {
                this.$confirm('是否跳转, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.push({
                        name:"notebookInfo",
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
            }
        }

    }
</script>

<style scoped>

</style>