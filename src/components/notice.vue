<template>
    <div>系统公告</div>
</template>

<script>
    export default {
        name: "notice",
        data() {
            return {}
        },
        created() {
            var that = this;
            document.title = that.$route.meta.title;
        }
    }

</script>

<style scoped>

</style>