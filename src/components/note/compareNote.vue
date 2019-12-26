<template>
    <div>首页展示分享的笔记


        <div v-for="it in todo">
            <el-card class="box-card" shadow="hover">
                <div slot="header" class="clearfix">
                    <span>{{it.title}}</span>
                    <el-button style="float: right; padding: 3px 0" type="text">编辑</el-button>
                    <el-button style="float: right; padding: 3px 0" type="text">删除</el-button>
                </div>
                <div class="text">
                    {{it.name}}
                </div>
            </el-card>
            <el-card :body-style="{ padding: '0px' }">
                第二种{{it.title}}
                <div style="padding: 14px;">
                    <span></span>
                    <div class="bottom clearfix">
                        <div>
                            {{it.name}}
                        </div>
                        <el-button type="text" class="button">操作按钮</el-button>
                        <time class="time">上次修改时间{{ currentDate }}</time>
                    </div>
                </div>
            </el-card>
        </div>


    </div>

</template>

<script>
    export default {
        name: "compareNote",
        data() {
            return {
                currentDate: new Date(),
                todo: [
                    {
                        name: '微积分是......',
                        title: '数学微积分',
                    },

                    {
                        name: '君不见黄河之水之天上来',
                        title: '古诗词',
                    },

                    {
                        name: 'good afternoon',
                        title: '英语',
                    },

                ]
            }
        },
        methods: {},
        created() {
            var that = this;
            document.title = that.$route.meta.title;
        }
    }
</script>

<style scoped>
    .text {
        font-size: 14px;
        font-family: 仿宋;
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
    }
</style>