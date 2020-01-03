<template>
    <div>
        {{note.categoryName}}

        <div v-html="note.content"></div>

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


        </el-form>


    </div>
</template>

<script>
    import qs from 'qs'

    export default {
        name: "NoteDetail",
        data() {
            return {

                note: {
                    content: null,
                    noteTitle: null,
                    noteDescription: null,
                    categoryName: null,
                },
                noteTags: [],
                inputVisible: false,
                inputValue: '',
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


            getNote(noteId) {
                let that = this;
                this.axios.post('http://localhost:8080/note/getNoteById', qs.stringify({
                    noteId: noteId
                }))
                    .then(function (response) {
                        var res = JSON.parse(JSON.stringify(response));
                        if (res.data.code == 200) {
                            that.note.noteTitle = res.data.data.noteTitle;
                            that.note.noteDescription = res.data.data.noteDescription;
                            that.note.content = res.data.data.noteContext;
                            that.noteTags = res.data.data.noteTagList;
                            that.note.categoryName = res.data.data.categoryName;
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
        },
        created() {

            this.getNote(this.$route.query.noteId);
        }

    }
</script>

<style scoped>
    .editor {
        width: 90%;
    }

    .editor .ql-container {
        height: 30rem;
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

</style>