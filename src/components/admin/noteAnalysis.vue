<template>
    <div>
        <el-card style="margin-top: 10px">
            <el-row>

                <el-col :span="10" :offset="2">
                    <div id="userTop" style="width: 400px;height: 400px;"></div>
                </el-col>

                <el-col :span="10" :offset="1">
                    <div id="noteShareTop" style="width: 400px;height: 400px;"></div>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="10" :offset="2">
                    <div id="tagTop" style="width: 400px;height: 400px;"></div>
                </el-col>

                <el-col :span="10" :offset="1">
                    <div id="categoryTop" style="width: 400px;height: 400px;"></div>
                </el-col>
            </el-row>
        </el-card>


    </div>
</template>


<script>

    export default {

        name: 'noteAnalysis',

        data() {
            return {
                noteTagAnalysis: [],


                XTagAnalysis: [],
                XShareAnalysis: [],
                XCategoryAnalysis: [],
                XUserAnalysis: [],

                YTagAnalysis: [],
                YShareAnalysis: [],
                YCategoryAnalysis: [],
                YUserAnalysis: [],

            }
        },

        mounted() {

            this.drawLine();
        },

        watch: {
            XTagAnalysis(val) {//监听数据发生改变 刷新图表数据
                this.drawLine();
            },
            XShareAnalysis(val) {//监听数据发生改变 刷新图表数据
                this.drawLine();
            },
            XCategoryAnalysis(val) {//监听数据发生改变 刷新图表数据
                this.drawLine();
            },
            XUserAnalysis(val) {//监听数据发生改变 刷新图表数据
                this.drawLine();
            },
            YTagAnalysis(val) {//监听数据发生改变 刷新图表数据
                this.drawLine();
            },
            YShareAnalysis(val) {//监听数据发生改变 刷新图表数据
                this.drawLine();
            },
            YCategoryAnalysis(val) {//监听数据发生改变 刷新图表数据
                this.drawLine();
            },
            YUserAnalysis(val) {//监听数据发生改变 刷新图表数据
                this.drawLine();
            }
        },

        methods: {
            //echarts 图
            drawLine() {

                // 基于准备好的dom，初始化echarts实例
                let userTop = this.$echarts.init(document.getElementById('userTop'));
                let noteShareTop = this.$echarts.init(document.getElementById('noteShareTop'));
                let tagTop = this.$echarts.init(document.getElementById('tagTop'));
                let categoryTop = this.$echarts.init(document.getElementById('categoryTop'));

                // 绘制图表
                userTop.setOption({
                    title: {text: '上传笔记Top5用户'},
                    tooltip: {},
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            interval: 0,
                            rotate: 40,
                            textStyle: {
                                fontWeight: "bold",  //加粗
                                color: "#000000"   //黑色
                            },
                        },
                        data: this.XUserAnalysis
                    },

                    yAxis: {
                        //如果不设置y轴的大小会自适应
                        //        //y轴最大值
                        //        max: 5,
                        //        //最小值
                        //        min: 0,
                        //        //多少个间隔
                        //        splitNumber: 5,
                    },
                    series: [{
                        name: '用户',
                        type: 'line',//折线图 可以自定义bar柱状图
                        data: this.YUserAnalysis
                    }]
                });
                noteShareTop.setOption({
                    title: {text: '笔记分享top5用户'},
                    tooltip: {},
                    xAxis: {
                        data: this.XShareAnalysis
                    },
                    yAxis: {},
                    series: [{
                        name: '用户',
                        type: 'bar',// 可以自定义line折线图
                        data: this.YShareAnalysis
                    }]
                });
                tagTop.setOption({
                    title: {
                        text: '笔记标签top5',
                        //left right
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} ：{b}<br> 数量{c} (占比：{d}%)"
                    },
                    color: ['#CD5C5C', '#00CED1', '#808000', '#9ACD32', '#FFC0CB'],
                    stillShowZeroSum: false,
                    legend: {
                        // orient: 'vertical',
                        // top: 'middle',
                        bottom: 10,
                        left: 'center',
                        data: this.XTagAnalysis,
                    },
                    series: [
                        {
                            name: '标签',
                            type: 'pie',
                            radius: '55%',
                            data: this.YTagAnalysis,

                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(128, 128, 128, 0.5)'
                                }
                            }
                        }]
                });
                categoryTop.setOption({
                    title: {text: '笔记分类Top5'},
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        // //x轴最大值
                        // max: 200,
                        // //最小值
                        // min: 0,
                        // //多少个间隔
                        // splitNumber: 5,
                    },


                    yAxis: {
                        type: 'category',
                        inverse: true,

                        data: this.XCategoryAnalysis
                    },
                    series: [
                        {
                            name: '数量',
                            type: 'bar',//折线图 可以自定义bar柱状图
                            data: this.YCategoryAnalysis
                        }]
                });
            },

            freshPage(ind) {//点击事件 刷新数据
                this.noteAnalysis();
            },
            //获取服务器数据渲染echarts图
            noteAnalysis() {
                let that = this;
                this.axios.post('http://localhost:8080/admin/noteAnalysis')
                    .then(function (response) {
                        var res = JSON.parse(JSON.stringify(response));
                        if (res.data.code == 200) {
                            that.XTagAnalysis = res.data.data.xtagAnalysis;
                            that.XShareAnalysis = res.data.data.xshareAnalysis;
                            that.XCategoryAnalysis = res.data.data.xcategoryAnalysis;
                            that.XUserAnalysis = res.data.data.xuserAnalysis;


                            that.YShareAnalysis = res.data.data.yshareAnalysis;
                            that.YCategoryAnalysis = res.data.data.ycategoryAnalysis;
                            that.YUserAnalysis = res.data.data.yuserAnalysis;

                            that.noteTagAnalysis = res.data.data.noteTagAnalysis;

                            for (var i = 0; i < that.noteTagAnalysis.length; i++) {
                                var obj = new Object();
                                obj.value = that.noteTagAnalysis[i].num;
                                obj.name = that.noteTagAnalysis[i].name;

                                that.YTagAnalysis[i] = obj;
                            }


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
                    });
            },
        },
        created() {
            this.noteAnalysis();

        }
    }

</script>


<style scoped>


</style>