<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="hello">
        <h1>Hello meta中的数据:{{ $route.meta.time }}</h1>

        <h1>localStorage中的数据：{{token}}</h1>

        <input type="text" v-model="password" placeholder="请输入数据..."/>

        <button v-on:click="get">获取后端数据</button>
        <br>

        <button @click="routerTo">路由带参跳转到home页面</button>

        <div>
            <h2>遍历后端数据</h2>
            <ol>
                <li v-for="user in users">
                    {{ user.userName }}
                    {{ user.userId }}

                </li>
            </ol>
        </div>

        <div>

            <h1> vuex中数据:{{this.$store.state.count}} </h1>
            <button @click="addFun">vuex数据加一</button>
        </div>


        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "HelloWorld",

        meta: {
            keepAlive: true
        },
        data() {
            return {
                users: [],
                token: localStorage.getItem("token"),
                password: '',
            };
        },
        created() {
            var that = this;
            document.title = that.$route.meta.title;
            this.axios.post('http://localhost:8082/vue', {
                    userId: 1234,
                    password: that.password,
                    userName: 1234
                },

                {
                    headers: {
                        'token': localStorage.getItem("token"),
                         'Authorization': 'Bearer',

                        //文件上传设置
                        //'Content-Type': 'multipart/form-data'
                    }
                })
                .then(function (response) {
                    var res = JSON.parse(JSON.stringify(response));

                    if (res.data.code == 200) {
                        that.users = res.data.data;
                        console.log(res.data.data);
                    } else alert(res.data);
                })
                .catch(function (error) {
                    console.log(error);
                    alert(error)
                });
        },

        methods: {
            get: function () {
                localStorage.token = "改变了";
                var that = this;

                this.axios.post('http://localhost:8082/vue', {
                    userId: 123,
                    password: this.password,
                    userName: 1234
                })
                    .then(function (response) {
                        var res = JSON.parse(JSON.stringify(response));

                        if (res.data.code == 200) {
                            that.users = res.data.data;
                            console.log(res.data.data);
                        } else {
                            console.log(res.data.data);
                            alert(res.data);
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                        alert(error);
                    });
            },
            routerTo: function () {
                this.$router.push({
                    name: "Home",
                    params: {userName: "cooper", password: "1122"}
                });
            },
            addFun: function () {
                this.$store.commit("add");
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>

