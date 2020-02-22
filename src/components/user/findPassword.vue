<template>

    <div>
        <h1>找回密码</h1>
        <el-steps :active="active" finish-status="success">
            <el-step title="输入邮箱"></el-step>
            <el-step title="输入验证码"></el-step>
            <el-step title="完成验证"></el-step>
        </el-steps>

        <div v-if="active===0">第一步</div>
        <div v-if="active===1">第二步</div>
        <div v-if="active===2">第三步 完成重置 去登陆吧</div>

        <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                active: 0
            };
        },

        methods: {
            next() {
                if (this.active++ > 2) this.active = 0;
            }
        }
    }
</script>

<style scoped>

    .el-steps{
        margin-top: 150px;
    }

</style>