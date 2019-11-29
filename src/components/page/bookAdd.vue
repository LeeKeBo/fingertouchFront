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
                    <el-form-item label="出版社" prop="publishing">
                        <el-input v-model="form.publishing"></el-input>
                    </el-form-item>
                    <el-form-item label="书籍简介">
                        <el-input type="textarea" v-model="form.describe"></el-input>
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
                    describe: '',
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
                    ],
                    publishing: [
                        { required: true, message: '请输入出版社', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submit(formName) {
                let that = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        that.axios.post('/book/book', that.form)
                            .then(function(response) {
                                if (response.data['code'] == -1) {
                                    that.$message.error('书籍isbn不能重复');
                                } else if(response.data['code'] == 0){
                                    localStorage.removeItem('username');
                                    that.$message.error(response.data['result'])
                                    that.$router.push('/login');
                                } else{
                                    that.$message.success('添加成功');
                                    that.form = {
                                        name: '',
                                        describe: '',
                                        isbn: '',
                                        author: '',
                                        publishing: '',
                                        pages: ''
                                    };
                                }
                            })
                            .catch(function(response) {
                                that.$message.error('出错了，请稍后重试');
                            });
                    } else {
                        that.$message.error('提交失败，请稍后重试');
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