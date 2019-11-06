<template>

    <div>

        <h1> This is Home Page </h1>

        {{userName}} {{password}}  {{description}}


        <router-link id="FirstPart" to="/Home">第一部分</router-link>

        <router-link id="SecondPart" to="/Home/SecondPart">第二部分</router-link>

        <router-view></router-view>

    </div>

</template>


<script>

    export default {
        name: "Home",

        data() {
            return {
                userName:'',
                password:'',
                description: 'today'
            }
        },
        mounted() {
            this.userName =this.$route.params.userName,
            this.password =this.$route.params.password
        }

    };
</script>







