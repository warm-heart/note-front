<template>
    <div>个人信息</div>
</template>

<script>
    export default {
        name: "userInfo",
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