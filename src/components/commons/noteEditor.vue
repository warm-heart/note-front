<template>
    <div>
        <el-upload
                v-show="false"
                id="quill-upload"
                action=""
                :http-request='uploadIcon'
                name="upload_file"
                :show-file-list="false"
                :before-upload="beforeUpload"
        >
            <el-button size="small" type="primary"></el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>


        <quill-editor
                ref="myQuillEditor"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @change="onEditorChange($event)"
                v-model="content"
                :options="editorOption">

        </quill-editor>


    </div>
</template>
<script>
    import VueQuillEditor, {Quill} from 'vue-quill-editor'
    import ImageResize from 'quill-image-resize-module';

    Quill.register('modules/imageResize', ImageResize);


    // 工具栏配置
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        [{'header': 1}, {'header': 2}],               // custom button values
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
        [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
        [{'direction': 'rtl'}],                         // text direction
        [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
        [{'header': [1, 2, 3, 4, 5, 6, false]}],
        [{'color': []}, {'background': []}],          // dropdown with defaults from theme
        [{'font': []}],
        [{'align': []}],
        ['link', 'image', 'video'],
        ['clean']                                         // remove formatting button
    ]

    export default {
        name: "richText",
        //父组件传过来的，将传过来的渲染到富文本编辑器
        props: ['interestContent'],
        watch: {
            interestContent: function (newQuestion, oldQuestion) {
                // console.log(newQuestion);
                this.setContent(newQuestion);
                //this.content = newQuestion+'';
            }
        },
        data() {
            return {
                content: this.interestContent,      //富文本内容
                editorOption: {
                    placeholder: '请在此输入内容',
                    theme: 'snow',  // or 'bubble'
                    modules: {
                        toolbar: {
                            container: toolbarOptions,  // 工具栏
                            handlers: {
                                'image': function (value) {
                                    if (value) {
                                        document.querySelector('#quill-upload input').click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }.bind(this)
                            }
                        },
                        // imageDrop: true,
                        imageResize: {
                            displayStyles: {
                                backgroundColor: 'black',
                                border: 'none',
                                color: 'white'
                            },
                            displaySize: true
                        }
                    }
                }
            }
        },
        methods: {
            onEditorBlur() {//失去焦点事件
                //参数传给父组件
                this.$emit('editor-change', this.content);
            },
            onEditorFocus() {//获得焦点事件

                this.$emit('editor-change', this.content);
            },
            onEditorChange() {//内容改变事件
                console.log(this.content);
                this.$emit('editor-change', this.content);
            },
            setContent(innerHTML) {
                setTimeout(() => {
                    let quill = this.$refs.myQuillEditor.quill;
                    quill.container.querySelector('.ql-editor').innerHTML = innerHTML;
                })
            },
            beforeUpload(file) {               //上传图片之前开启loading
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('插入图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('插入图片大小不能超过 2MB!');
                }

                return isJPG && isLt2M;
            },
            uploadIcon(param) {
                let that = this;
                let quill = this.$refs.myQuillEditor.quill;
                let formData = new FormData();
                formData.append("file", param.file);

                let config = {
                    'Content-Type': 'multipart/form-data'
                };
                this.axios.post('http://localhost:8080/user/uploadIcon', formData, config
                )
                    .then(function (response) {
                        var res = JSON.parse(JSON.stringify(response));
                        if (res.data.code == 200) {
                            let length = quill.getSelection().index;
                            // 插入图片 response.data.url为服务器返回的图片地址
                            quill.insertEmbed(length, 'image', response.data.data);
                            // 调整光标到最后
                            quill.setSelection(length + 1)
                        } else {
                            this.$message.error('图片插入失败')
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
        }
    }
</script>
<style scoped>



</style>