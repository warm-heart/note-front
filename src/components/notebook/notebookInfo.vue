<template>
    <div>

        <div v-for="note in notes">
            <el-card class="box-card" shadow="hover">
                <span>{{note.noteTitle}}</span>

                <el-row>
                    <div v-if="!note.noteStatus">
                        <el-button style="float: right; padding: 3px 0" type="text" @click="editNote(note.noteId)">编辑
                        </el-button>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="noteDetail(note.noteId)">
                            查看详情
                        </el-button>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="removeNote(note.noteId)">删除
                        </el-button>
                    </div>
                    <div v-else> 您的文章被禁用，请联系管理员</div>
                </el-row>
                <el-row>
                    <div v-html='note.noteContext.substring(0,200).concat("......")' class="content"></div>
                </el-row>

                <el-row class="description">
                    At time/{{note.updateTime.substring(0,10)}}
                    <el-button v-if="note.shareStatus">取消分享</el-button>
                    <el-button v-else>分享</el-button>
                </el-row>


            </el-card>

        </div>

    </div>
</template>

<script>
    import qs from "qs"

    export default {

        name: "notebookInfo",
        data() {
            return {
                notes: [],
            }
        },
        methods: {

            editNote(noteId) {
                this.$router.push({
                    name: 'updateNote',
                    query: {noteId: noteId}

                })
            },

            noteDetail(noteId) {
                this.$router.push({
                    name: 'noteDetail',
                    query: {noteId: noteId}

                })
            },
            removeNote(noteId) {
                let that = this;
                this.axios.post('http://localhost:8080/note/removeNote', qs.stringify({
                    noteId: noteId,
                }))
                    .then(function (response) {
                        var res = JSON.parse(JSON.stringify(response));
                        if (res.data.code == 200) {
                            that.$message({
                                message: res.data.data,
                                type: 'success',
                                duration: 1500
                            })

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
                        alert(error.response.data.msg)
                    });
            },

            getByCategoryIdAndUserId(categoryId) {
                let that = this;
                this.axios.post('http://localhost:8080/note/findNoteByCategory', qs.stringify({
                    categoryId: categoryId
                }))
                    .then(function (response) {
                        var res = JSON.parse(JSON.stringify(response));
                        if (res.data.code == 200) {
                            that.notes = res.data.data;
                            console.log(that.notes);
                        } else {
                            that.$message({
                                message: "这里还没有您的笔记，赶快去创建把！",
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
        created() {
            this.getByCategoryIdAndUserId(this.$route.query.categoryId);
        }
    }

</script>

<style scoped>

    .description {
        font-size: 15px;
        float: left;
        margin-top: 15px;
    }

    .content {
        float: left;
        text-align: left;
    }

    .box-card {
        margin-top: 10px;
    }


</style>