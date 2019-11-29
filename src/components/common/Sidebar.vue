<template>
    <div class="sidebar">
        <el-menu
                class="sidebar-el-menu"
                :collapse="collapse"
                background-color="#324157"
                text-color="#bfcbd9"
                active-text-color="#ffd04b"
                router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                    v-if="subItem.subs"
                                    :index="subItem.index"
                                    :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                        v-for="(threeItem,i) in subItem.subs"
                                        :key="i"
                                        :index="threeItem.index"
                                >{{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                    v-else
                                    :index="subItem.index"
                                    :key="subItem.index"
                            >{{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';

    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-lx-home',
                        index: 'home',
                        title: '系统首页'
                    },
                    {
                        icon: 'el-icon-notebook-2',
                        index: 'books',
                        title: '书籍管理',
                        subs:[

                            {
                                title:'书籍管理',
                                index:'bookManage'
                            },
                            {
                                title:'添加书籍',
                                index:'bookAdd'
                            },
                            {
                                title:'书籍信息上传',
                                index:'bookUpload'
                            }
                        ]
                    },
                    {
                        icon:'el-icon-discount',
                        index:'resource',
                        title:'资源管理',
                        subs:[
                            {
                                title:'资源管理',
                                index:'resourceManage'
                            },
                            {
                                title:'资源制作',
                                index:'resourceMake'
                            }
                        ]
                    },
                    {
                      icon:'el-icon-table-lamp',
                      index:'test',
                      title:'测试页面'
                    },

                    {
                        icon:'el-icon-setting',
                        title:'系统管理',
                        index:'systemManage',
                        subs:[
                            {
                                title: '管理员列表',
                                index: 'adminManage'
                            }
                        ]
                    }
                ]
            };
        },
        computed: {

        },
        created() {
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
                bus.$emit('collapse-content', msg);
            });
        }
    };
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom: 0;
        overflow-y: scroll;
    }

    .sidebar::-webkit-scrollbar {
        width: 0;
    }

    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 250px;
    }

    .sidebar > ul {
        height: 100%;
    }
</style>
