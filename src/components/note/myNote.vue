<template>

    <div>
        <div v-for="note in notes">
            <el-card class="box-card" shadow="hover">
                <div slot="header" class="clearfix">
                    <span>{{note.noteTitle}}</span>
                    <div v-if="!note.noteStatus">
                        <el-button style="float: right; padding: 3px 0" type="text" @click="editNote(note.noteId)">
                            <i class="el-icon-edit"></i>
                        </el-button>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="noteDetail(note.noteId)">
                            查看详情
                        </el-button>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="removeNote(note.noteId)">
                            <i class="el-icon-delete"></i>
                        </el-button>
                    </div>
                    <div v-else> 您的文章被禁用，请联系管理员</div>
                </div>
                <div class="text">
                    <div v-html='note.noteDescription'></div>
                    {{note.updateTime}}

                    <el-button v-if="note.shareStatus" @click="cancelShareNote(note.noteId)">取消分享</el-button>
                    <el-button v-else @click="shareNote(note.noteId)">分享</el-button>

                </div>

            </el-card>

        </div>

        <!-- 分页 -->
        <div class="pagination">
            <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageConf.pageCode"
                    :page-sizes="pageConf.pageOption"
                    :page-size="pageConf.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pageConf.totalPage">
            </el-pagination>
        </div>
    </div>

</template>

<script>
    import qs from 'qs'

    export default {
        name: "myNote",
        data() {
            //用户信息
            //element-ui 的 table 需要的参数必须是 Array 类型的
            return {
                notes: [],
                //定义分页 Config
                pageConf: {
                    //设置一些初始值(会被覆盖)
                    pageCode: 1, //当前页
                    pageSize: 4, //每页显示的记录数
                    totalPage: null, //总记录数
                    pageOption: [4, 10, 20], //分页选项
                    handleCurrentChange: function () {
                        console.log("页码改变了");
                    }
                },
            }
        },
        created() {
            var that = this;
            document.title = that.$route.meta.title;
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
                this.$confirm('是否删除, 是否继续?', '提示', {
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
                                location.reload();
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

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });


            },


            cancelShareNote(noteId) {
                this.$confirm('是否取消分享, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let that = this;
                    this.axios.post('http://localhost:8080/note/cancelShareNote', qs.stringify({
                        noteId: noteId,
                    }))
                        .then(function (response) {
                            var res = JSON.parse(JSON.stringify(response));
                            if (res.data.code == 200) {
                                location.reload();
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

                }).catch(() => {
                    /*  this.$message({
                          type: 'info',
                          message: '操作成功'
                      });*/
                });


            },

            shareNote(noteId) {
                this.$confirm('是否分享, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let that = this;
                    this.axios.post('http://localhost:8080/note/shareNote', qs.stringify({
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
                    /*  this.$message({
                          type: 'info',
                          message: '已取消分享'
                      });*/
                });
            },
            findByPage(pageCode, pageSize) {
                let that = this;
                this.axios.post('http://localhost:8080/note/myNote', qs.stringify({
                    page: pageCode,
                    size: pageSize
                }))
                    .then(function (response) {
                        var res = JSON.parse(JSON.stringify(response));
                        if (res.data.code == 200) {
                            that.pageConf.totalPage = res.data.data.total;
                            that.notes = res.data.data.noteList;
                            console.log(that.notes);

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

            //pageSize 改变时触发的函数
            handleSizeChange(val) {
                this.findByPage(this.pageConf.pageCode, val);
            },
            //当前页改变时触发的函数
            handleCurrentChange(val) {
                this.findByPage(val, this.pageConf.pageSize);
            },


        },
        created() {
            this.findByPage(this.pageConf.pageCode, this.pageConf.pageSize);
        }

    }
</script>

<style scoped>

</style>