import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";

import Home from "@/components/Home";

import FirstPart from "@/components/HomeComponents/FirstPart";
import SecondPart from "@/components/HomeComponents/SecondPart";

Vue.use(Router);


export default new Router({
    routes: [
        {
            path: "/",
            name: "hello",
            component: HelloWorld,
            meta: {
                time: "hello meta中的数据"
            },
        },

        {
            path: "/hello",
            name: "hello",
            component: HelloWorld,
            meta: {
                time: "hello meta中的数据"
            }
        },
        {
            path: "/Home",
            name: "Home",
            component: Home,
            children: [
                {
                    path: "/",
                    name: "FirstPart",
                    component: FirstPart,
                    meta: {
                        time: "sa",
                        keep: true
                    }
                },
                {
                    path: "SecondPart",
                    name: "SecondPart",
                    component: SecondPart
                }
            ]
        }
    ]
});
