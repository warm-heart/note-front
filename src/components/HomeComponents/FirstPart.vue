<template>
    <div>
        <h1>home 下第一个部分</h1>

        <h1>{{ $route.meta.time }}</h1>

        <h1 v-if="$route.meta.keep">根据meta中的keep属性动态数据</h1>

        {{user.age}}
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: {
                    name: 'da',
                    age: 18
                }
            };
        },

        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    };
</script>
