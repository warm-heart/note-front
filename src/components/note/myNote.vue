<template>

    <div>

        <el-row>
            <el-col :span="6" :offset="14">
                <el-input
                        placeholder="请输入笔记标题"
                        v-model="noteTitle">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </el-col>
            <el-col :span="4">
                <el-button icon="el-icon-search" type="primary" @click="search">点击搜索</el-button>
            </el-col>
        </el-row>


        <div v-for="note in notes">
            <el-card class="box-card" shadow="hover">
                <span class="font-note-title">{{note.noteTitle}}</span>

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
                    <div style="margin-top: 20px;font-size: 20px">您的文章被封禁，请联系管理员或在公告界面反馈</div>
                </template>
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
                noteTitle: '',
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
                                location.reload();
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
            search() {
                let that = this;
                that.$router.push({
                    name: 'noteSearch',
                    query: {noteTitle: that.noteTitle,}
                })
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
                            that.notes = res.data.data.notes;

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
                this.pageConf.pageSize = val;
                this.findByPage(this.pageConf.pageCode, val);
            },
            //当前页改变时触发的函数
            handleCurrentChange(val) {
                this.pageConf.pageCode = val;
                this.findByPage(val, this.pageConf.pageSize);
            },


        },
        created() {
            this.findByPage(this.pageConf.pageCode, this.pageConf.pageSize);
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
        margin-top: 8px;
    }

    .el-row {
        margin-top: 15px;
        text-align: left;
    }


</style>