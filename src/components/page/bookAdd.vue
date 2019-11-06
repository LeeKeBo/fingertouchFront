<template>
    <div>
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-notebook-1"></i> 书籍
                </el-breadcrumb-item>
                <el-breadcrumb-item>
                    添加书籍
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="left">
                    <el-form-item label="书籍名" prop="name">
                        <el-input v-model="form.name" prefix-icon=""></el-input>
                    </el-form-item>
                    <el-form-item label="作者" prop="author">
                        <el-input v-model="form.author"></el-input>
                    </el-form-item>
                    <el-form-item label="isbn" prop="isbn">
                        <el-input v-model="form.isbn"></el-input>
                    </el-form-item>
                    <el-form-item label="页数" prop="pages">
                        <el-input v-model.number="form.pages"></el-input>
                    </el-form-item>
                    <el-form-item label="出版社">
                        <el-input v-model="form.publishing"></el-input>
                    </el-form-item>
                    <el-form-item label="书籍简介">
                        <el-input type="textarea" v-model="form.description"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submit('form')">提交</el-button>
                        <el-button type="info">取消</el-button>
                    </el-form-item>
                </el-form>

            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'BookManage',
        data() {
            return {
                form: {
                    name: '',
                    description: '',
                    isbn: '',
                    author: '',
                    publishing: '',
                    pages: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入书籍名', trigger: 'blur' }
                    ],
                    author: [
                        { required: true, message: '请输入作者', trigger: 'blur' }
                    ],
                    isbn: [
                        { required: true, message: '请输入isbn号', trigger: 'blur' }
                    ],
                    pages: [
                        { required: true, message: '请输入页数', trigger: 'blur' },
                        { type: 'number', message: '页数需为数字值' }
                    ]
                }
            };
        },
        methods: {
            submit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    };

</script>


<style scoped>

    .container {
        padding: 30px;
        margin-top: 15px;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
    }

    .form-box {
        width: 800px;
        margin-left: 80px;
        margin-top: 60px;
    }

</style>