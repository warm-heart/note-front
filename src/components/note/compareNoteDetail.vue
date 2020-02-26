<template>
    <div>


        <el-card class="box-card">
            <el-row type="flex" justify="start">
                <span class="title">{{note.noteTitle}}</span>
            </el-row>
            <el-row type="flex" justify="start">
                <el-col :span="8">
                    <div style="display: flex; justify-content: flex-start">
                        作者： {{userName}}
                    </div>

                </el-col>
                <el-col :span="8">
                    <!--居中-->
                    <div style="display: flex;justify-content: center">
                        分类： {{noteCategory.categoryName}}
                    </div>

                </el-col>
                <el-col :span="8">
                    <!--右对齐-->
                    <div style="display: flex;justify-content: flex-end">
                        <el-tag v-for="tag in noteTags">{{tag}}</el-tag>
                    </div>
                </el-col>

            </el-row>
            <el-row>
                <div style="display: flex; justify-content:flex-start;color: #969696; font-size: 12px">
                    上次更新时间：{{note.updateTime}}
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
        name: "compareNoteDetail",
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