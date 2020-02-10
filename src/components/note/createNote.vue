<template>
    <div class="createNote">


        <!--文本编辑器-->
        <el-form :model="note" :rules="rules" ref="note" label-width="100px" class="demo-ruleForm">
            <el-form-item>
                <note-editor class="editor" v-bind:interestContent="interestContent"
                             @editor-change="e=>{contentGet(e)}"></note-editor>
            </el-form-item>

        </el-form>

        <!--  弹出完善信息-->
        <el-button type="primary" @click="dialog = true">点击完善新建笔记信息</el-button>
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
                <el-form :model="note" :rules="rules">
                    <el-form-item label="笔记标题" prop="noteTitle">
                        <el-input v-model="note.noteTitle"></el-input>
                    </el-form-item>


                    <el-form-item label="笔记描述" prop="noteDescription">
                        <el-input v-model="note.noteDescription"></el-input>
                    </el-form-item>


                    <el-form-item label="" prop="categoryName">
                        <el-select v-model="note.categoryName" placeholder="请选择笔记分类">
                            <el-option v-for="item in categoryList" :key="item.categoryName" :label="item.label"
                                       :value="item.categoryName"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>

                        <el-tag
                                :key="tag"
                                v-for="tag in noteTags"
                                closable
                                :disable-transitions="false"
                                @close="handleClose(tag)">
                            {{tag}}
                        </el-tag>
                        <el-input
                                class="input-new-tag"
                                v-if="inputVisible"
                                v-model="inputValue"
                                ref="saveTagInput"
                                size="small"
                                @keyup.enter.native="handleInputConfirm"
                                @blur="handleInputConfirm"
                        >
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 为笔记添加标签</el-button>
                    </el-form-item>
                </el-form>
                <div class="demo-drawer__footer">
                    <el-button @click="cancelForm">取 消</el-button>
                    <!-- <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中
                         ...' : '确 定' }}
                     </el-button>-->

                    <el-button type="primary" @click="createNote">创建笔记</el-button>
                </div>
            </div>
        </el-drawer>

    </div>
</template>

<script>
    import editor from '@/components/commons/noteEditor.vue'

    export default {
        name: "createNote",
        components: {
            "note-editor": editor
        },
        data() {
            return {
                //开启页面时不弹出完善信息框
                dialog: false,
                interestContent: '',
                content: '',
                note: {
                    content: null,
                    noteTitle: null,
                    noteDescription: null,
                    categoryName: null,
                },
                noteTags: [],
                categoryList: [],
                inputVisible: false,
                inputValue: '',
                rules: {
                    noteTitle: [
                        {required: true, message: '请输入笔记标题', trigger: 'blur'},
                        {min: 3, max: 64, message: '长度在 3 到 64 个字符', trigger: 'blur'}
                    ],
                    noteDescription: [
                        {required: true, message: '请输入笔记描述', trigger: 'blur'},
                        {min: 3, max: 64, message: '长度在 3 到 64 个字符', trigger: 'blur'}
                    ]
                }

            }
        },
        methods: {
            contentGet(e) {
                this.note.content = e;
            },
            handleClose(tag) {
                this.noteTags.splice(this.noteTags.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.noteTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },

            createNote() {
                let that = this;
                this.axios.post('http://localhost:8080/note/createNote',
                    {
                        noteTitle: this.note.noteTitle,
                        noteDescription: this.note.noteDescription,
                        noteContext: that.note.content,
                        noteTagList: this.noteTags,
                        categoryName: this.note.categoryName,
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
            },
            getNoteCategory() {
                let that = this;
                this.axios.post('http://localhost:8080/noteCategory/getNoteCategory')
                    .then(function (response) {
                        var res = JSON.parse(JSON.stringify(response));
                        if (res.data.code == 200) {
                            that.categoryList = res.data.data;
                            console.log(that.categoryList);
                        } else {
                            that.$message({
                                message: res.data.msg,
                                type: 'warning',
                                duration: 1000
                            })
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                        //alert(error.response.data.msg)
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
        created() {
            //获取笔记分类
            this.getNoteCategory();
        }

    }
</script>

<style>

    .editor {
        width: 90%;

    }

    .editor .ql-container {
        height: 20rem;
        width: 100%;
        text-align: left;
    }

    .el-tag + .el-tag {
        margin-left: 10px;
    }

    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }

    .form {

        height: 500px;
        width: 500px;
        margin: 0px auto;
    }

    .createNote {

        margin: 0px auto;
    }

</style>