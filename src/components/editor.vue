<template>
    <div class="edit_container">
        <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)" @change="onEditorChange($event)">

        </quill-editor>

        <div v-html="context" class="ql-editor"> {{context}}</div>

    </div>

</template>
<script>import {quillEditor} from "vue-quill-editor";

'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

export default {
    components: {quillEditor},
    data() {
        return {
            content: `<p></p><p><br></p><ol><li><strong><em>Or drag/paste an image here.</em></strong></li><li><strong><em>rerew</em></strong></li><li><strong><em>rtrete</em></strong></li><li><strong><em>tytrytr</em></strong></li><li><strong><em>uytu</em></strong></li></ol>`,
            str: '',
            editorOption: {}
        }
    },
    methods: {
        onEditorReady(editor) {
        }, onEditorBlur() {


        }, onEditorFocus() {
        }, onEditorChange() {
            console.log(this.context)
        }, escapeStringHTML(str) {
            str = str.replace(/&lt;/g, '<');
            str = str.replace(/&gt;/g, '>');
            return str;
        }
    }, computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
    }, mounted() {
        let content = '';
        this.str = this.escapeStringHTML(content);
    }
}</script>
