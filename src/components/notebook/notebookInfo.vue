<template>
    <div>

        <div v-for="note in notes">

            <el-card class="box-card" shadow="hover">
                <span class="note_title">{{note.noteTitle}}</span>

                <template v-if="!note.noteStatus">

                    <el-row>
                        <el-col>
                            <div v-html='note.noteContext.substring(0,200).concat("......")' class="content">
                            </div>
                        </el-col>
                    </el-row>


                    <el-row>
                        <el-col :span="6">
                            <span class="description"> 更新于&nbsp;{{note.updateTime.substring(0,10)}}</span>
                        </el-col>


                        <el-col :span="8" :offset="10">
                            <div style="display: flex; justify-content: flex-end">
                                <template v-if="note.shareStatus">

                                    <el-button size="mini" type="success"
                                               @click="cancelShareNote(note.noteId)">取消分享
                                    </el-button>

                                </template>
                                <template v-else>

                                    <el-button size="mini" type="primary" icon="el-icon-share"
                                               @click="shareNote(note.noteId)">分享

                                    </el-button>

                                </template>
                                <el-button type="primary" size="mini" plain
                                           @click="editNote(note.noteId)">
                                    <i class="el-icon-edit">编辑</i>
                                </el-button>


                                <el-button type="success" size="mini" plain
                                           @click="noteDetail(note.noteId)"><i class="el-icon-view"> 详情</i>
                                </el-button>


                                <el-button @click="removeNote(note.noteId)"
                                           size="mini" type="danger" plain>
                                    <i class="el-icon-delete"> 删除</i>
                                </el-button>
                            </div>
                        </el-col>
                    </el-row>
                </template>


                <template v-else>
                    <div style="margin-top: 20px;font-size: 20px">您的文章被封禁，请联系管理员</div>
                </template>
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
                this.$confirm('是否删除笔记, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
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
                                });
                                location.reload();

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

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
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
        color: #999;
        margin-top: 10px;
    }

    .content {
        float: left;
        text-align: left;
        font-size: 15px;
    }

    .box-card {
        margin-top: 10px;
    }

    .el-row {
        margin-top: 15px;
        text-align: left;
    }


</style>