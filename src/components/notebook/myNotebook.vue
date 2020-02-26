<template>
    <div>

        <el-button type="primary" @click="toCreateNoteBook" class="add" icon="el-icon-plus">前往新增笔记分类</el-button>

        <!--修改笔记分类-->
        <el-drawer
                title=""
                :before-close="handleClose"
                :visible.sync="dialog"
                direction="ttb"
                custom-class="demo-drawer"
                ref="drawer"
                size="500px"
        >
            <div class="form">
                <el-card>
                    <el-row type="flex" justify="start">
                        修改笔记分类信息
                    </el-row>

                    <el-form :model="noteCategory" :rules="rules" style="margin-top: 20px">
                        <el-form-item label="笔记分类名称" prop="categoryName">
                            <el-input v-model="noteCategory.categoryName"></el-input>
                        </el-form-item>


                        <el-form-item label="笔记分类描述" prop="categoryDescription">
                            <el-input v-model="noteCategory.categoryDescription"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-row type="flex" justify="end">
                        <el-button type="primary" @click="updateNoteBook">确认修改</el-button>
                        <el-button @click="cancelForm">取 消</el-button>
                    </el-row>


                </el-card>

            </div>
        </el-drawer>

        <!--表格-->
        <el-table
                :data="categoryList.filter(data => !search || data.categoryName.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%"
                :stripe=true
        >
            <el-table-column
                    type="index"
                    fixed
                    width="80">
            </el-table-column>

            <el-table-column

                    prop="categoryName"
                    label="分类名称"
                    sortable
                    width="150rem">
            </el-table-column>
            <el-table-column
                    prop="categoryDescription"
                    label="分类描述"
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
                            placeholder="输入笔记名称关键字搜索"/>


                </template>
                <template slot-scope="scope">
                    <el-button
                            icon="el-icon-edit"
                            size="mini"
                            @click="Edit(scope.$index, scope.row)">编辑
                    </el-button>

                    <el-button @click="removeNoteBook(scope.$index, scope.row)" type="danger" size="small"
                               icon="el-icon-delete">删除
                    </el-button>
                    <el-button size="mini"
                               icon="el-icon-view"
                               type="success" @click="openNoteBook(scope.$index, scope.row)">查看
                    </el-button>
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>

<script>
    import qs from 'qs'

    export default {
        name: "myNotebook",
        data() {
            return {
                //开启页面时不弹出修改框
                dialog: false,
                categoryList: [],
                search: '',
                noteCategory: {},
                rules: {
                    categoryName: [
                        {required: true, message: '请输入笔记标题', trigger: 'blur'},
                        {min: 2, max: 64, message: '长度在 2 到 64 个字符', trigger: 'blur'}
                    ],
                    categoryDescription: [
                        {required: true, message: '请输入笔记描述', trigger: 'blur'},
                        {min: 2, max: 64, message: '长度在 2到 64 个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        created() {
            var that = this;
            document.title = that.$route.meta.title;
            this.getNoteCategory();
        },
        methods: {

            Edit(index, row) {
                this.noteCategory = row;
                this.dialog = true;

            },
            openNoteBook(index, row) {

                this.$router.push({
                    name: "notebookInfo",
                    query: {categoryId: row.categoryId}
                });

            },
            getNoteCategory() {
                let that = this;
                this.axios.post('http://localhost:8080/noteCategory/getNoteCategory')
                    .then(function (response) {
                        var res = JSON.parse(JSON.stringify(response));
                        if (res.data.code == 200) {
                            that.categoryList = res.data.data;
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
                        //alert(error.response.data.msg)
                    });
            },

            removeNoteBook(index, row) {
                this.$confirm('确定删除该笔记分类以及相关笔记?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let that = this;
                    this.axios.post('http://localhost:8080/noteCategory/removeCategory', qs.stringify(
                        {
                            categoryName: row.categoryName
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

                                //console.log(that.categoryList);
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
                            //alert(error.response.data.msg)
                        });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            updateNoteBook() {
                this.$confirm('确定修改该笔记分类信息?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let that = this;
                    this.axios.post('http://localhost:8080/noteCategory/updateCategory',
                        {
                            categoryId: that.noteCategory.categoryId,
                            categoryName: that.noteCategory.categoryName,
                            categoryDescription: that.noteCategory.categoryDescription,
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
                            //alert(error.response.data.msg)
                        });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消修改'
                    });
                });

            },
            toCreateNoteBook() {
                this.$router.push({
                    name: "createNotebook"
                });
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

    }
</script>

<style scoped>
    .add {
        margin-bottom: 10px;
        float: left;
    }

    .form {
        height: 400px;
        width: 400px;
        margin: 0px auto;
    }
</style>