<template>

    <div>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{notice.noticeTitle}}</span>
                <span> 发布时间{{notice.updateTime}}</span>
            </div>
            <div>{{notice.noticeContext}}</div>
        </el-card>
    </div>
</template>

<script>
    import qs from 'qs';

    export default {
        name: "noticeDetail",
        data() {
            return {

                notice: {},
            }
        },
        methods: {

            getNotice(noticeId) {
                let that = this;
                this.axios.post('http://localhost:8080/admin/noticeDetail', qs.stringify({
                    noticeId: noticeId
                }))
                    .then(function (response) {
                        var res = JSON.parse(JSON.stringify(response));
                        if (res.data.code == 200) {
                            that.notice = res.data.data;
                            console.log(res.data.data);
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
            this.getNotice(this.$route.query.noticeId);
        }

    }
</script>


<style scoped>

</style>