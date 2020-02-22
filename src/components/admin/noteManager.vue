<template>
    <div>

        <!--表格-->
        <el-table
                :data="notes.filter(data => !search || data.noteTitle.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%"
                :stripe=true
                :border=true
                :highlight-current-row=true
        >
            <el-table-column
                    type="index"
                    fixed
                    width="80">
            </el-table-column>

            <el-table-column

                    prop="noteTitle"
                    label="笔记标题"
                    sortable
                    width="250rem">

            </el-table-column>
            <el-table-column

                    prop="noteDescription"
                    label="笔记描述"
                    sortable
                    width="250rem">
            </el-table-column>

            <el-table-column
                    prop="shareStatus"
                    label="是否分享"
                    width="200rem">
                <template slot-scope="scope">
                    <p v-if="notes[scope.$index].shareStatus==0">未分享</p>
                    <p v-else="notes[scope.$index].shareStatus==1">已分享</p>
                </template>
            </el-table-column>
            <el-table-column
                    label="是否封禁"
                    width="150rem">
                <template slot-scope="scope">
                    <p v-if="notes[scope.$index].noteStatus==0">正常</p>
                    <p v-else="notes[scope.$index].noteStatus==1">待解封</p>
                </template>
            </el-table-column>

            <el-table-column
                    prop="updateTime"
                    label="上次更新时间"
                    sortable
                    width="200rem">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    width="260">
                <template slot="header" slot-scope="scope">

                    <el-input
                            v-model="search"
                            size="mini"
                            placeholder="输入笔记标题关键字搜索"/>

                </template>
                <template slot-scope="scope">
                    <el-button

                            size="mini"
                            @click="lockNote(scope.$index, scope.row)">封禁
                    </el-button>

                    <el-button @click="deBlockNote(scope.$index, scope.row)" type="danger" size="small"
                    >解封
                    </el-button>

                    <el-button @click="adminNoteDetail(scope.$index, scope.row)" type="danger" size="small"
                    >查看
                    </el-button>
                </template>
            </el-table-column>
        </el-table>


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
    import qs from 'qs';

    export default {
        name: "",
        data() {
            return {
                search: '',
                notes: [],
                //定义分页 Config
                pageConf: {
                    //设置一些初始值(会被覆盖)
                    pageCode: 1, //当前页
                    pageSize: 5, //每页显示的记录数
                    totalPage: null, //总记录数
                    pageOption: [5, 10, 20], //分页选项
                    handleCurrentChange: function () {
                        //console.log("页码改变了");
                    }
                },
            }
        },
        methods: {
            findByPage(pageCode, pageSize) {
                let that = this;
                this.axios.post('http://localhost:8080/admin/getAllNote', qs.stringify({
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
            adminNoteDetail(index, row) {
                this.$router.push({
                    name: 'adminNoteDetail',
                    query: {noteId: row.noteId}

                })
            },
            lockNote(index, row) {
                this.$confirm('是否封禁, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let that = this;
                    this.axios.post('http://localhost:8080/admin/lockNote', qs.stringify({
                        noteId: row.noteId,
                    }))
                        .then(function (response) {
                            var res = JSON.parse(JSON.stringify(response));
                            if (res.data.code == 200) {
                                that.$message({
                                    message: res.data.data,
                                    type: 'success',
                                    duration: 1500
                                });
                                //location.reload();

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
                        message: '已取消封禁'
                    });
                });
            },
            deBlockNote(index, row) {
                this.$confirm('是否解封, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let that = this;
                    this.axios.post('http://localhost:8080/admin/deBlockNote', qs.stringify({
                        noteId: row.noteId,
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
                        message: '已取消解封'
                    });
                });

            },
        },
        created() {
            this.findByPage(this.pageConf.pageCode, this.pageConf.pageSize);
        }
    }
</script>

<style scoped>

</style>