import Vue from "vue";
import Router from "vue-router";

import Home from "@/components/Home";
import myNote from "@/components/note/myNote";
import createNote from "@/components/note/createNote";
import myCollection from "@/components/note/myCollection";
import compareNote from "@/components/note/compareNote";
import myNotebook from "@/components/notebook/myNotebook";
import notebookInfo from "@/components/notebook/notebookInfo";
import createNotebook from "@/components/notebook/createNotebook";
import userInfo from "@/components/user/userInfo";
import resetPassword from "@/components/user/resetPassword";
import login from "@/components/user/login";
import register from "@/components/user/register";
import notice from "@/components/notice";
import editor from "@/components/editor";


Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
            meta: {
                title: "首页"
            },
        },
        {
            path: "/editor",
            name: "editor",
            component: editor,
            meta: {
                title: "富文本编辑器"
            },
        },

        {
            path: "/login",
            name: "login",
            component: login,
            meta: {
                title: "登录"
            },
        },

        {
            path: "/register",
            name: "register",
            component: register,
            meta: {
                title: "注册"
            },
        },

        {
            path: "/home",
            name: "home",
            component: Home,
            children: [
                {
                    path: "compareNote",
                    name: "compareNote",
                    component: compareNote,
                    meta: {
                        title: "笔记精选",
                    },
                },
                {
                    path: "myNote",
                    name: "myNote",
                    component: myNote,
                    meta: {
                        title: "我的笔记",
                        requireAuth:true,
                    }
                },
                {
                    path: "createNote",
                    name: "createNote",
                    component: createNote,
                    meta: {
                        title: "新建笔记",
                        requireAuth:true,
                    }
                },
                {
                    path: "myCollection",
                    name: "myCollection",
                    component: myCollection,
                    meta: {
                        title: "我的收藏",
                        requireAuth:true,
                    }
                },
                {
                    path: "myNotebook",
                    name: "myNotebook",
                    component: myNotebook,
                    meta: {
                        title: "我的笔记本",
                        requireAuth:true,
                    }
                },
                {
                    path: "createNotebook",
                    name: "createNotebook",
                    component: createNotebook,
                    meta: {
                        title: "新建笔记本",
                        requireAuth:true,
                    }
                },
                {
                    path: "notebookInfo",
                    name: "notebookInfo",
                    component: notebookInfo,
                    meta: {
                        title: "笔记本内容",
                        requireAuth:true,
                    }
                },
                {
                    path: "resetPassword",
                    name: "resetPassword",
                    component: resetPassword,
                    meta: {
                        title: "重置密码",
                        requireAuth:true,
                    }
                },
                {
                    path: "userInfo",
                    name: "userInfo",
                    component: userInfo,
                    meta: {
                        title: "个人信息",
                        requireAuth:true,
                    }
                },
                {
                    path: "notice",
                    name: "notice",
                    component: notice,
                    meta: {
                        title: "系统公告",
                        requireAuth:true,
                    }
                },
            ]
        }
    ]
});


