<template>
    <div>
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-notebook-1"></i> 书籍
                </el-breadcrumb-item>
                <el-breadcrumb-item>
                    书籍管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">


            <el-table :data="tableData" border>

                <el-table-column prop="name" width="180" label="书籍名"></el-table-column>
                <el-table-column prop="author" label="作者"></el-table-column>
                <el-table-column prop="isbn" label="isbn"></el-table-column>
                <el-table-column prop="publishing" label="出版社"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >编辑
                        </el-button>
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleUpload(scope.$index, scope.row)"
                        >上传
                        </el-button>
                        <el-button
                                type="text"
                                icon="el-icon-sort"
                        >书籍调序
                        </el-button>

                        <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleDelete(scope.$index, scope.row)"
                        >删除
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>

        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
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

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit('form')">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="上传文件" :visible.sysc="uploadVisible" width="50%">
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" multiple
                       accept="['jpg','png']" :file-list="fileList">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button @click="uploadVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitUpload">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: 'bookUpload',
        data() {
            return {
                tableData: [{
                    name: 'test',
                    author: 'test'

                }

                ],
                idx: '',
                editVisible: false,
                uploadVisible: false,
                form: {},
                fileList: [],
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
            saveEdit() {

            },
            handleEdit(index, row) {
                this.idx = index;
                this.form = row;
                this.editVisible = true;
            },
            handleDelete() {
                this.$message.error('delete');
            },
            saveEdit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$message.success('修改成功');
                        this.editVisible = false;
                    } else {
                        this.$message.error('修改有误');
                    }
                });
            },
            handleUpload(index, row) {
                this.uploadVisible = true;
            },
            submitUpload() {
                this.uploadVisible = false;
                this.fileList = [];
                this.$message.success('上传成功');
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


</style>