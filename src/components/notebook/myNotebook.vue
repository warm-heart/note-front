<template>
    <div>我的笔记本<br>
        <router-link id="notebookInfo" to="/home/notebookInfo">笔记本里面的内容</router-link>
    </div>
</template>

<script>
    export default {
        name: "myNotebook",
        data() {
            return {

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