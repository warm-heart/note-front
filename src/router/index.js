import Vue from "vue";
import Router from "vue-router";

import Home from "@/components/Home";
import myNote from "@/components/note/myNote";
import createNote from "@/components/note/createNote";

import noteDetail from "@/components/note/NoteDetail";
import updateNote from "@/components/note/updateNote";
import compareNote from "@/components/note/compareNote";
import compareNoteDetail from "@/components/note/compareNoteDetail";
import noteSearch from '@/components/note/noteSearch'
/*笔记分类*/
import myNotebook from "@/components/notebook/myNotebook";
import notebookInfo from "@/components/notebook/notebookInfo";
import createNotebook from "@/components/notebook/createNotebook";
/*用户信息*/
import userInfo from "@/components/user/userInfo";
import resetPassword from "@/components/user/resetPassword";
import findPassword from "@/components/user/findPassword";
/*登陆注册*/
import loginAndRegister from "@/components/user/loginAndRegister";
/*公告*/
import notice from "@/components/user/notice";
import noticeDetail from "@/components/user/noticeDetail";

/*admin start*/
import admin from "@/components/admin/admin";
import noteManager from "@/components/admin/noteManager";
import noteAnalysis from "@/components/admin/noteAnalysis";
import lockNote from "@/components/admin/lockNote";
import adminNoteDetail from "@/components/admin/adminNoteDetail";
import userManager from "@/components/admin/userManager";
import lockUser from "@/components/admin/lockUser";
import noticeManager from "@/components/admin/noticeManager";
import feedBackManager from "@/components/admin/feedBackManager";
import createNotice from "@/components/admin/createNotice";
import adminNoticeDetail from "@/components/admin/adminNoticeDetail";
import adminInfo from "@/components/admin/adminInfo";

Vue.use(Router);

export default new Router({
    routes: [

        {
            path: "/",
            redirect: {
                name: "home"
            }
        },
        {
            path: "/login",
            name: "login",
            component: loginAndRegister,
            meta: {
                title: "登录"
            },
        },

        {
            path: "/register",
            name: "register",
            component: loginAndRegister,
            meta: {
                title: "注册"
            },
        },
        {
            path: "/findPassword",
            name: "findPassword",
            component: findPassword,
            meta: {
                title: "找回密码"
            },
        },

        {
            path: "/home",
            name: "home",
            component: Home,
            meta: {
                title: '首页'
            },
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
                    path: "compareNoteDetail",
                    name: "compareNoteDetail",
                    component: compareNoteDetail,
                    meta: {
                        title: "笔记精选详情",
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
                    path: "noteSearch",
                    name: "noteSearch",
                    component: noteSearch,
                    meta: {
                        title: "搜索结果",
                        requireAuth: false,
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
                {
                    path: "noticeDetail",
                    name: "noticeDetail",
                    component: noticeDetail,
                    meta: {
                        title: "公告详情",
                        requireAuth: true,
                    }
                },
            ]
        },

        {
            path: "/admin",
            component: admin,
            meta: {
                title: "管理员",
                requireAuth: true,
            },
            children: [
                {
                    path: "/",
                    redirect: {
                        name: 'adminInfo'
                    }
                },
                {
                    path: "adminInfo",
                    name: "adminInfo",
                    component: adminInfo,
                    meta: {
                        title: "管理员信息",
                        requireAuth: true
                    }
                },
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
                    path: "lockUser",
                    name: "lockUser",
                    component: lockUser,
                    meta: {
                        title: "封禁用户",
                        requireAuth: true
                    }
                },
                {
                    path: "lockNote",
                    name: "lockNote",
                    component: lockNote,
                    meta: {
                        title: "封禁的笔记",
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
                    path: "noteAnalysis",
                    name: "noteAnalysis",
                    component: noteAnalysis,
                    meta: {
                        title: "笔记分析",
                        requireAuth: true
                    }
                },

                {
                    path: "adminNoteDetail",
                    name: "adminNoteDetail",
                    component: adminNoteDetail,
                    meta: {
                        title: "笔记详情",
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
                    path: "feedBackManager",
                    name: "feedBackManager",
                    component: feedBackManager,
                    meta: {
                        title: "反馈管理",
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
                {
                    path: "adminNoticeDetail",
                    name: "adminNoticeDetail",
                    component: adminNoticeDetail,
                    meta: {
                        title: "公告详情",
                        requireAuth: true
                    }
                },
            ]

        },
    ]
});
