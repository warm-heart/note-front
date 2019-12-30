<template>
    <div>新建笔记

        <editor  ref="edit"></editor>

        {{bg}}
    </div>
</template>

<script>
    import editor from '@/components/editor.vue'

    export default {
        name: "createNote",
        components: {
            editor
        },
        data() {
            return {
                bg: this.$refs["edit"].str,
            }
        }

    }
</script>

<style scoped>

</style>