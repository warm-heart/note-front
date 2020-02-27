<template>
    <div>

        <el-row type="flex" justify="end" style="margin-bottom: 10px">
            <!--   TODO 移动笔记到其他分类 -->
            <el-button type="primary" @click="removeCategory">移动到其他分类</el-button>
            <el-button type="primary" @click="editNote">修改笔记</el-button>
            <el-button type="danger" @click="removeNote">删除笔记</el-button>
        </el-row>


        <el-card class="box-card">
            <!--标题-->
            <el-row type="flex" justify="start">
                <div style="display: flex;justify-content: flex-start">
                    <span class="title">{{note.noteTitle}}</span>
                </div>
            </el-row>
            <!--分类-->
            <el-row type="flex" justify="start">
                <el-col :span="8">
                    <div style="display: flex;justify-content: flex-start">
                        分类： {{noteCategory.categoryName}}
                    </div>
                </el-col>
                <!--标签-->
                <el-col :span="8" :offset="8">
                    <div style="display: flex; justify-content: flex-end">
                        <el-tag size="mini" type="danger" effect="dark" v-for="tag in noteTags">{{tag}}</el-tag>
                    </div>
                </el-col>
            </el-row>

            <el-row>
                <div style="display: flex;color: #969696; font-size: 12px;margin-top: 10px">
                    上次更新时间： {{note.updateTime}}
                </div>
            </el-row>


            <el-divider></el-divider>

            <div class="content" v-html='note.noteContext'></div>

        </el-card>
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
            removeNote() {
                this.$confirm('是否删除笔记, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let that = this;
                    this.axios.post('http://localhost:8080/note/removeNote', qs.stringify({
                        noteId: that.note.noteId,
                    }))
                        .then(function (response) {
                            var res = JSON.parse(JSON.stringify(response));
                            if (res.data.code == 200) {
                                that.$message({
                                    message: res.data.data,
                                    type: 'success',
                                    duration: 1500
                                });
                                that.$router.push({
                                    name:'myNote',
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

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            editNote() {
                let that=this;
                this.$router.push({
                    name: 'updateNote',
                    query: {noteId: that.note.noteId}

                })
            },
        },
        created() {

            this.getNote(this.$route.query.noteId);
        }

    }
</script>

<style scoped>


    .content {
        text-align: left;
    }

    .title {
        font-size: 30px;
        font-weight: 700;
        word-break: break-word;
        margin-bottom: 8px;
    }

</style>