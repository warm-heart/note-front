import Vue from "vue";
import Router from "vue-router";

import Home from "@/components/Home";
import myNote from "@/components/note/myNote";
import createNote from "@/components/note/createNote";
import myCollection from "@/components/note/myCollection";
import noteDetail from "@/components/note/NoteDetail";
import updateNote from "@/components/note/updateNote";
import compareNote from "@/components/note/compareNote";
/*笔记分类*/
import myNotebook from "@/components/notebook/myNotebook";
import notebookInfo from "@/components/notebook/notebookInfo";
import createNotebook from "@/components/notebook/createNotebook";
/*用户信息*/
import userInfo from "@/components/user/userInfo";
import resetPassword from "@/components/user/resetPassword";
/*登陆注册*/
import login from "@/components/user/login";
import register from "@/components/user/register";
/*公告*/
import notice from "@/components/user/notice";
/*admin start*/
import admin from "@/components/admin/admin";
import noteManager from "@/components/admin/noteManager";
import userManager from "@/components/admin/userManager";
import noticeManager from "@/components/admin/noticeManager";
import createNotice from "@/components/admin/createNotice";

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
                        requireAuth: true,
                    }
                },
                {
                    path: "createNote",
                    name: "createNote",
                    component: createNote,
                    meta: {
                        title: "新建笔记",
                        requireAuth: true,
                    }
                },
                {
                    path: "updateNote",
                    name: "updateNote",
                    component: updateNote,
                    meta: {
                        title: "修改笔记",
                        requireAuth: true,
                    }
                },

                {
                    path: "noteDetail",
                    name: "noteDetail",
                    component: noteDetail,
                    meta: {
                        title: "笔记详情",
                        requireAuth: true,
                    }
                },
                {
                    path: "myCollection",
                    name: "myCollection",
                    component: myCollection,
                    meta: {
                        title: "我的收藏",
                        requireAuth: true,
                    }
                },
                {
                    path: "myNotebook",
                    name: "myNotebook",
                    component: myNotebook,
                    meta: {
                        title: "我的笔记本",
                        requireAuth: true,
                    }
                },
                {
                    path: "createNotebook",
                    name: "createNotebook",
                    component: createNotebook,
                    meta: {
                        title: "新建笔记本",
                        requireAuth: true,
                    }
                },
                {
                    path: "notebookInfo",
                    name: "notebookInfo",
                    component: notebookInfo,
                    meta: {
                        title: "笔记本内容",
                        requireAuth: true,
                    }
                },
                {
                    path: "resetPassword",
                    name: "resetPassword",
                    component: resetPassword,
                    meta: {
                        title: "重置密码",
                        requireAuth: true,
                    }
                },
                {
                    path: "userInfo",
                    name: "userInfo",
                    component: userInfo,
                    meta: {
                        title: "个人信息",
                        requireAuth: true,
                    }
                },
                {
                    path: "notice",
                    name: "notice",
                    component: notice,
                    meta: {
                        title: "系统公告",
                        requireAuth: true,
                    }
                },
            ]
        },

        {
            path: "/admin",
            name: "admin",
            component: admin,
            meta: {
                title: "管理员",
                requireAuth: true,
            },
            children: [
                {
                    path: "userManager",
                    name: "userManager",
                    component: userManager,
                    meta: {
                        title: "用户管理",
                        requireAuth: true
                    }
                },
                {
                    path: "noteManager",
                    name: "noteManager",
                    component: noteManager,
                    meta: {
                        title: "笔记管理",
                        requireAuth: true
                    }
                },
                {
                    path: "noticeManager",
                    name: "noticeManager",
                    component: noticeManager,
                    meta: {
                        title: "公告管理",
                        requireAuth: true
                    }
                },
                {
                    path: "createNotice",
                    name: "createNotice",
                    component: createNotice,
                    meta: {
                        title: "创建公告",
                        requireAuth: true
                    }
                },
            ]

        },
    ]
});
