<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="hello">



        <h1> {{$route.meta.time}}</h1>

        <ul>
            <router-link id="Home" to="/Home">Home</router-link>
        </ul>

        <input type="text" v-model="message" placeholder="请输入..."/>

        <button v-on:click="get">get</button>

        <button @click="routerTo">click here to news page</button>

        <ol>
            <li v-for="todo in user">
                {{ todo.userName }}
                {{todo.userId}}
            </li>

        </ol>
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
                user: {},
            }
        },
        created() {
            this.$http.post("http://localhost:8082/vue", {userId: 123, password: this.message, userName: 1234})
                .then((result) => {
                    var res = JSON.parse(JSON.stringify(result))
                    console.log(res)
                    if (res.data.code == 200) {
                        this.user = res.data.data
                    }
                    else alert(res.data.msg)
                })
                .catch((err) => {
                    return err
                })

        },

        methods: {
            get: function () {

                this.$http.post("http://localhost:8082/vue", {userId: 123, password: this.message, userName: 1234})
                    .then((result) => {
                        var res = JSON.parse(JSON.stringify(result))
                        console.log(res)
                        if (res.data.code == 200) {
                            this.user = res.data.data
                        }
                        else alert(res.data.msg)
                    })
                    .catch((err) => {
                        alert(err)
                    })
            },
            routerTo: function () {

                this.$router.push({name: 'Home', params: {userName:'cooper',password:'1122'}});

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
