<template>
    <div>首页展示分享的笔记</div>
</template>

<script>
    export default {
        name: "compareNote",
        data() {
            return {}
        },
        created() {
            var that = this;
            document.title = that.$route.meta.title;}
    }
</script>

<style scoped>

</style>