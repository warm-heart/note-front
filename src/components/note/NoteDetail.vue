<template>
    <div>
        {{noteCategory.categoryName}}

        <div v-html="note.noteContext"></div>

        <el-tag v-for="it in noteTags">{{it}}</el-tag>


    </div>
</template>

<script>
    import qs from 'qs'

    export default {
        name: "NoteDetail",
        data() {
            return {

                note: {},
                noteTags: [],
                noteCategory: {},
                userName: '',
            }
        },
        methods: {

            getNote(noteId) {
                let that = this;
                this.axios.post('http://localhost:8080/note/noteDetail', qs.stringify({
                    noteId: noteId
                }))
                    .then(function (response) {
                        var res = JSON.parse(JSON.stringify(response));
                        if (res.data.code == 200) {
                            that.note = res.data.data.note
                            that.noteCategory = res.data.data.noteCategory;
                            that.noteTags = res.data.data.noteTagList;
                            that.userName = res.data.data.userName;
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
        created() {

            this.getNote(this.$route.query.noteId);
        }

    }
</script>

<style scoped>


    .el-tag + .el-tag {
        margin-left: 10px;
    }


</style>