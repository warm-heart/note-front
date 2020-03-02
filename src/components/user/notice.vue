<template>
    <div>

        <el-row type="flex" justify="end" style="margin-bottom: 10px">

            <div style="display: flex;justify-content: end">
                <el-button type="primary" @click="feedBack">填写反馈</el-button>
            </div>
        </el-row>
        <el-row>
            <el-col :span="4" :offset="4">
                <!--反馈弹窗-->
                <el-popover
                        placement="bottom"
                        width="400"
                        title="填写反馈"
                        v-model="visible"
                        trigger="click">

                    <el-form :model="notice" :rules="rules">
                        <el-form-item label="反馈标题" prop="noticeTitle">
                            <el-input v-model="notice.noticeTitle"></el-input>
                        </el-form-item>
                        <el-form-item label="反馈内容" prop="noticeContext">
                            <el-input type="textarea" :rows="8" v-model="notice.noticeContext"></el-input>
                        </el-form-item>

                    </el-form>
                    <el-row type="flex" justify="end">
                        <el-button type="primary" @click="createFeedBack">反馈</el-button>
                        <el-button @click="cancelForm">取 消</el-button>
                    </el-row>

                </el-popover>
            </el-col>
        </el-row>

        <div v-for="notice in notices">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <el-row>
                        <el-col>
                            <span>{{notice.noticeTitle}}</span>
                        </el-col>
                        <el-col style="display: flex;justify-content: start ;font-size: 12px">
                            <span> 发布时间{{notice.updateTime}}</span>
                        </el-col>
                    </el-row>


                </div>
                <div style="text-align: left">{{notice.noticeContext}}</div>
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
    import qs from "qs"

    export default {
        name: "notice",
        data() {
            return {
                visible: false,
                notice: {},
                rules: {
                    noticeTitle: [
                        {required: true, message: '请输入反馈标题', trigger: 'blur'},
                        {min: 2, max: 64, message: '长度在 2 到 64 个字符', trigger: 'blur'}
                    ],
                    noticeContext: [
                        {required: true, message: '请输入反馈内容', trigger: 'blur'},
                        {min: 2, max: 1000, message: '长度在 2到 1000 个字符', trigger: 'blur'}
                    ]
                },
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
            findByPage(pageCode, pageSize) {
                let that = this;
                this.axios.post('http://localhost:8080/notice/getAllNotice', qs.stringify({
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
            feedBack() {
                this.visible = true;
            },
            createFeedBack() {
                this.$confirm('是否反馈, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let that = this;
                    this.axios.post('http://localhost:8080/notice/createFeedBack',
                        {
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
            cancelForm() {
                this.visible = false;
                clearTimeout(this.timer);
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