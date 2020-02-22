<template>
    <div>
        <el-button type="primary" @click="toCreateNotice" class="add" icon="el-icon-plus">前往发布公告</el-button>


        <!--修改公告-->
        <el-drawer
                title=""
                :before-close="handleClose"
                :visible.sync="dialog"
                direction="ttb"
                custom-class="demo-drawer"
                ref="drawer"
                size="600px"
        >
            <div class="form">
                <el-form :model="notice" :rules="rules">
                    <el-form-item label="公告标题" prop="noticeTitle">
                        <el-input v-model="notice.noticeTitle"></el-input>
                    </el-form-item>


                    <el-form-item label="公告内容" prop="noticeContext">
                        <el-input type="textarea" :rows="8" v-model="notice.noticeContext"></el-input>
                    </el-form-item>

                </el-form>
                <div class="demo-drawer__footer">
                    <el-button type="primary" @click="editNotice">确认修改</el-button>
                    <el-button @click="cancelForm">取 消</el-button>

                </div>
            </div>
        </el-drawer>

        <!--表格-->
        <el-table
                :data="notices.filter(data => !search || data.noticeTitle.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%"
                stripe
                highlight-current-row

        >
            <el-table-column
                    type="index"
                    width="150rem"
            >

            </el-table-column>

            <el-table-column

                    prop="noticeTitle"
                    label="公告标题"
                    sortable
                    width="350rem">
            </el-table-column>
            <el-table-column
                    prop="noticeContext"
                    label="公告内容"
                    width="250rem">
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
                            placeholder="输入公告标题搜索"/>

                </template>
                <template slot-scope="scope">

                    <el-button
                            icon="el-icon-edit"
                            size="mini"
                            @click="Edit(scope.$index, scope.row)">编辑
                    </el-button>

                    <el-button @click="removeNotice(scope.$index, scope.row)" type="danger" size="small"
                               icon="el-icon-delete">删除
                    </el-button>
                    <el-button size="mini"
                               type="success"
                               @click="adminNoticeDetail(scope.$index, scope.row)">查看
                    </el-button>


                </template>
            </el-table-column>
        </el-table>

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
        name: "noticeManager",
        data() {
            return {
                //开启页面时不弹出修改框
                dialog: false,
                search: '',
                notices: [],
                notice: {},
                //定义分页 Config
                pageConf: {
                    //设置一些初始值(会被覆盖)
                    pageCode: 1, //当前页
                    pageSize: 5, //每页显示的记录数
                    totalPage: null, //总记录数
                    pageOption: [20, 40, 50], //分页选项
                    handleCurrentChange: function () {
                        console.log("页码改变了");
                    }
                },
                rules: {
                    noticeTitle: [
                        {required: true, message: '请输入公告标题', trigger: 'blur'},
                        {min: 2, max: 64, message: '长度在 2 到 64 个字符', trigger: 'blur'}
                    ],
                    noticeContext: [
                        {required: true, message: '请输入公告内容', trigger: 'blur'},
                        {min: 2, max: 64, message: '长度在 2到 64 个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            findByPage(pageCode, pageSize) {
                let that = this;
                this.axios.post('http://localhost:8080/admin/getAllNotice', qs.stringify({
                    page: pageCode,
                    size: pageSize
                }))
                    .then(function (response) {
                        var res = JSON.parse(JSON.stringify(response));
                        if (res.data.code == 200) {
                            that.pageConf.totalPage = res.data.data.total;
                            that.notices = res.data.data.notices;

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
            removeNotice(index, row) {
                this.$confirm('是否删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let that = this;
                    this.axios.post('http://localhost:8080/admin/removeNotice', qs.stringify({
                        noticeId: row.noticeId,
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
            Edit(index, row) {
                this.notice = row;
                this.dialog = true;

            },
            editNotice(index, row) {
                this.$confirm('是否修改, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let that = this;
                    this.axios.post('http://localhost:8080/admin/updateNotice',
                        {
                            noticeId: that.notice.noticeId,
                            noticeTitle: that.notice.noticeTitle,
                            noticeContext: that.notice.noticeContext,

                        })
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
                            console.log("请求超时了");
                            alert(error.response.data.msg)
                        });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消修改'
                    });
                });

            },
            adminNoticeDetail(index, row) {
                this.$router.push({
                    name: "adminNoticeDetail",
                    query:{noticeId:row.noticeId}
                })
            },

            toCreateNotice() {
                this.$router.push({
                    name: "createNotice"
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

            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            cancelForm() {
                this.loading = false;
                this.dialog = false;
                clearTimeout(this.timer);
                location.reload();
            }
        },
        created() {
            this.findByPage(this.pageConf.pageCode, this.pageConf.pageSize);
        }
    }
</script>

<style scoped>

    /*
        .demo-table-expand {
            font-size: 0;
        }
        .demo-table-expand label {
            width: 90px;
            color: #99a9bf;
        }
        .demo-table-expand .el-form-item {
            margin-right: 0;
            margin-bottom: 0;
            width: 50%;
        }*/
    .add {
        margin-bottom: 10px;
        float: left;
    }

</style>