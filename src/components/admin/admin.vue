<template>

    <div>我的笔记
        <!-- 列表 -->
        <el-table
                ref="user"
                :data="user"
                tooltip-effect="dark"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    sortable
                    label="编号"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="username"
                    sortable
                    label="联系人"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    sortable
                    label="联系电话"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="mailbox"
                    label="电子邮箱"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="postalCode"
                    sortable
                    label="邮政编码"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="date"
                    sortable
                    label="注册时间"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="通讯地址"
                    width="200"
                    show-overflow-tooltip>
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
    export default {
        name: "myNote",
        data() {
            //用户信息
            //element-ui 的 table 需要的参数必须是 Array 类型的
            return {
                user: [{
                    username: "da",
                    phone: 'da',
                    mailbox: 'da',
                    postalCode: 'da',
                    date: new Date().getTime(),
                    address: 'da'
                }],
                //定义分页 Config
                pageConf: {
                    //设置一些初始值(会被覆盖)
                    pageCode: 1, //当前页
                    pageSize: 4, //每页显示的记录数
                    totalPage: 19, //总记录数
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
            findByPage(pageCode, pageSize) {
                this.$http.post('/note/findByPage', {pageCode: pageCode, pageSize: pageSize}).then(result => {
                    this.pageConf.totalPage = result.body.total;
                    this.user = result.body.rows;
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

            // 获取所有数据
            findAll() {
                this.$http.post('/note/findAll').then(result => {
                    this.user = result.body;
                });
            }
        },
        created() {
            this.findAll();
            this.findByPage(this.pageConf.pageCode, this.pageConf.pageSize);
        }

    }
</script>

<style scoped>

</style>