<template>
    <div>




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
                    label="反馈标题"
                    sortable
                    width="350rem">
            </el-table-column>
            <el-table-column
                    prop="noticeContext"
                    label="反馈内容"
                    width="250rem">
                <template slot-scope="scope">
                    <span>{{scope.row.noticeContext.substring(0,10).concat('......')}}</span>
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
                            placeholder="输入反馈标题搜索"/>

                </template>
                <template slot-scope="scope">
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
        name: "feedBackManager",
        data() {
            return {

                search: '',
                notices: [],
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
            }
        },
        methods: {
            getAllFeedBack(pageCode, pageSize) {
                let that = this;
                this.axios.post('http://localhost:8080/admin/getAllFeedBack', qs.stringify({
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
            adminNoticeDetail(index, row) {
                this.$router.push({
                    name: "adminNoticeDetail",
                    query: {noticeId: row.noticeId}
                })
            },

            //pageSize 改变时触发的函数
            handleSizeChange(val) {
                this.pageConf.pageSize = val;
                this.getAllFeedBack(this.pageConf.pageCode, val);
            },
            //当前页改变时触发的函数
            handleCurrentChange(val) {
                this.pageConf.pageCode = val;
                this.getAllFeedBack(val, this.pageConf.pageSize);
            },

            cancelForm() {
                this.visible = false;
                clearTimeout(this.timer);

            }
        },
        created() {
            this.getAllFeedBack(this.pageConf.pageCode, this.pageConf.pageSize);
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