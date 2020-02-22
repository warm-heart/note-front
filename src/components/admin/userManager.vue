<template>
    <div>

        <!--表格-->
        <el-table
                :data="users.filter(data => !search || data.userName.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%"
                stripe
                border
                highlight-current-row

        >
            <el-table-column
                    type="index"
                    fixed
                    width="80">
            </el-table-column>

            <el-table-column

                    prop="userName"
                    label="用户名"
                    sortable
                    width="150rem">
            </el-table-column>
            <el-table-column
                    prop="userEmail"
                    label="用户邮箱"
                    width="200rem">
            </el-table-column>
            <el-table-column
                    prop="userPhone"
                    label="用户电话"
                    width="150rem">
            </el-table-column>
            <el-table-column

                    label="用户状态"
                    width="100rem">

                <template slot-scope="scope">
                    <p v-if="users[scope.$index].userStatus==0">正常</p>
                    <p v-else-if="users[scope.$index].userStatus==1">待解封</p>
                </template>
            </el-table-column>
            <el-table-column
                    label="用户权限"
                    width="100rem">
                <template slot-scope="scope">
                    <p v-if="scope.row.roleId==1">用户</p>
                    <p v-else-if="scope.row.roleId==2">管理员</p>
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
                            placeholder="输入用户名称关键字搜索"/>

                </template>
                <template slot-scope="scope">
                    <el-button
                            :disabled="scope.row.roleId==2"
                            size="mini"
                            @click="lockUser(scope.$index, scope.row)">封禁
                    </el-button>

                    <el-button
                            :disabled="scope.row.roleId==2"
                            type="danger" size="small"
                            @click="deBlockUser(scope.$index, scope.row)"
                    >解封
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
    import qs from 'qs';

    export default {

        data() {
            return {
                search: '',
                users: [],
                //定义分页 Config
                pageConf: {
                    //设置一些初始值(会被覆盖)
                    pageCode: 1, //当前页
                    pageSize: 5, //每页显示的记录数
                    totalPage: null, //总记录数
                    pageOption: [5, 10, 20], //分页选项
                    handleCurrentChange: function () {
                        console.log("页码改变了");
                    }
                },
            }
        },
        methods: {
            findByPage(pageCode, pageSize) {
                let that = this;
                this.axios.post('http://localhost:8080/admin/getAllUser', qs.stringify({
                    page: pageCode,
                    size: pageSize
                }))
                    .then(function (response) {
                        var res = JSON.parse(JSON.stringify(response));
                        if (res.data.code == 200) {
                            that.pageConf.totalPage = res.data.data.total;
                            that.users = res.data.data.users;

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
                        alert(error.response.data.msg);
                    });
            },
            lockUser(index, row) {
                this.$confirm('是否封禁, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let that = this;
                    this.axios.post('http://localhost:8080/admin/lockUser', qs.stringify({
                        userId: row.userId,
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
                            alert(error.response.data.msg);
                        });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消封禁'
                    });
                });
            },
            deBlockUser(index, row) {
                this.$confirm('是否解封, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let that = this;
                    this.axios.post('http://localhost:8080/admin/deBlockUser', qs.stringify({
                        userId: row.userId,
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
                            alert(error.response.data.msg);
                        });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消解封'
                    });
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
        },

    }
</script>

<style scoped>

</style>