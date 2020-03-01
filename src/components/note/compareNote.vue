<template>
    <div>


        <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="(img,index) in images" :key="index">
                <img :src="img.url">
            </el-carousel-item>
        </el-carousel>


        <div>
            <div v-for="note in noteShare">
                <template v-if="!note.noteStatus">
                    <el-card class="box-card" shadow="hover">
                        <span class="font-note-title">{{note.noteTitle}}</span>
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

                                    <el-button type="success" size="mini" plain
                                               @click="noteDetail(note.noteId)"><i class="el-icon-view"> 详情</i>
                                    </el-button>

                                </div>
                            </el-col>

                        </el-row>

                    </el-card>
                </template>

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
    </div>
</template>

<script>
    import qs from 'qs'

    export default {
        name: "compareNote",
        data() {
            return {
                images: [
                    {url: require('../../assets/img/carousel-1.jpg')},
                    {url: require('../../assets/img/carousel-2.jpg')},
                    {url: require('../../assets/img/carousel-3.jpg')},
                    {url: require('../../assets/img/carousel-4.jpg')},
                    {url: require('../../assets/img/carousel-5.jpg')},
                    {url: localStorage.getItem("user-icon")},

                ],
                noteShare: [],
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
        methods: {
            findByPage(pageCode, pageSize) {
                let that = this;
                this.axios.post('http://localhost:8080/noteShare/getNoteShare', qs.stringify({
                    page: pageCode,
                    size: pageSize
                }))
                    .then(function (response) {
                        var res = JSON.parse(JSON.stringify(response));
                        if (res.data.code == 200) {
                            that.pageConf.totalPage = res.data.data.total;
                            that.noteShare = res.data.data.noteShareVOS;
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
            noteDetail(noteId) {
                this.$router.push({
                    name: 'compareNoteDetail',
                    query: {noteId: noteId}
                })
            },
            love(noteId) {
                this.$confirm('是否点赞, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let that = this;
                    this.axios.post('http://localhost:8080/noteShare/love', qs.stringify({
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
                        message: '已取消点赞'
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
            var that = this;
            document.title = that.$route.meta.title;
            this.findByPage(this.pageConf.pageCode, this.pageConf.pageSize)
        }
    }
</script>
<style scoped>

    .content {
        float: left;
        text-align: left;
        font-size: 15px;
    }

    .description {
        font-size: 15px;
        float: left;
        margin-top: 15px;
        color: #999;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        width: auto;
        border-radius: 30px;
        margin-top: 8px;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

</style>