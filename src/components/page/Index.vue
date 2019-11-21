<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="11" :offset=1>
                <el-card shadow="hover" style="height: 254px; margin-bottom: 20px">
                    <div class="user-info">
                        <img src="../../assets/img/img.jpg" class="user-avator" alt="" >
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">登录时间：<span>{{loginTime}}</span></div>
                    <div class="user-info-list">登录地点：<span>{{loginLocate}}</span></div>
                </el-card>

            </el-col>
            <el-col :span="11" >
                <el-card shadow="hover" style="height:254px; margin-bottom: 20px">
                    <div slot="header">公告列表</div>
                    <div v-for="index in 6">
                        {{'公告' + index}}
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :span="22" :offset=1>
                <el-card shadow="hover">
                    <div slot="header"><span>书本信息</span></div>
                    <div>
                        <div v-for="book in books" class="book-info">
                            <img src="../../assets/img/img.jpg" alt="这是书本封面图片" style="weight:120px;height: 120px;">
                            <div style="padding-left: 10px" ><span>{{book.name}}</span></div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'home',
        data() {
            return {
                name:'用户名',
                role:'管理员',
                loginTime:new Date(),
                loginLocate:'深圳',
                books:[
                    {
                        img:'../../assets/img/img.jpg',
                        name:'book1'
                    },
                    {
                        img:'../../assets/img/img.jpg',
                        name:'book2'
                    },
                    {
                        img:'../../assets/img/img.jpg',
                        name:'book3'
                    },
                    {
                        img:'../../assets/img/img.jpg',
                        name:'book4'
                    },
                ]

            }

        }
    };
</script>

<style scoped>
    .user-info{
        display: flex;
        align-items: center;
        border-bottom: 2px groove #999;
        padding-bottom: 20px;
        margin-bottom: 20px;
    }
    .user-avator{
        border-radius: 50%;
        width: 120px;
        height: 120px;
    }

    .user-info-cont{
        padding-left: 50px;
        font-size: 14px;
    }

    .user-info-cont div:first-child{
        font-size: 30px;
    }

    .user-info-list {
        color: #999;
        line-height: 25px;
    }

    .book-info{
        display: inline-flex;;
        align-items: center;
        padding: 10px;
        margin-right: 10px;

    }


</style>