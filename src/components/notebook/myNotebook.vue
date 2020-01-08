<template>
    <div>我的笔记本<br>

        <div v-for="it in categoryList">
            {{it.categoryName}}
            {{it.categoryId}}
            {{it.categoryDescription}}

            <el-button type="text" @click="open(it.categoryId)">点击打开笔记本</el-button>

        </div>
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
            open(categoryId) {

                this.$router.push({
                    name: "notebookInfo",
                    query: {categoryId: categoryId}
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

    }
</script>

<style scoped>

</style>