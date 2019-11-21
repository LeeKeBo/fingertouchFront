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

            <el-table :data="tableData" border :header-cell-style="{'text-align':'center'}"
                      :cell-style="{'text-align':'center'}">

                <el-table-column prop="name" width="180" label="书籍名"></el-table-column>
                <el-table-column prop="author" label="作者"></el-table-column>
                <el-table-column prop="isbn" label="isbn"></el-table-column>
                <el-table-column prop="publishing" label="出版社"></el-table-column>
                <el-table-column prop="pages" label="页数"></el-table-column>
                <el-table-column prop="describe" label="简介"></el-table-column>
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
                                @click="handleOrder(scope.$index,scope.row)"
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
                <el-form-item label="isbn" prop="isbn" disabled>
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

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelEdit">取 消</el-button>
                <el-button type="primary" @click="saveEdit('form')">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="上传文件" :visible.sysc="uploadVisible" width="50%">
            <el-upload action="/api2/book/uploadPhoto" list-type="picture-card" multiple
                       accept=".png,.jpeg,.jpg" :data=currentBook :file-list="fileList">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button @click="uploadVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitUpload">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog width="32%" title="拖动修改照片顺序" :visible.sysc="orderVisible" @open="orderOpen"
                   @close="orderVisible = false" style="height: 90%;overflow:hidden;overflow-y: auto;">
            <el-table :data="imgList" ref="orderTable" :header-cell-style="{'text-align':'center'}" v-if="tableShow"
                      :cell-style="{'text-align':'center'}">
                <el-table-column type="index" label="序号" border align="center" width="100px"></el-table-column>
                <el-table-column prop="src" label="图片" width="250px">
                    <template scope="scope">
                        <el-popover placement="right" title="" trigger="hover">
                            <img :src="scope.row.src" style="height: 500px;width: 500px">
                            <img slot="reference" :src="scope.row.src" alt="" style="max-height: 50px;max-width: 130px">
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="orderVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitOrder">确 定</el-button>
            </span>

        </el-dialog>

    </div>
</template>

<script>
    import Sortable from 'sortablejs';

    export default {
        name: 'bookUpload',
        data() {
            return {
                tableData: [],
                idx: '',
                editVisible: false,
                uploadVisible: false,
                orderVisible: false,
                form: {
                    name: '',
                    author: '',
                    isbn: '',
                    pages: '',
                    describe: '',
                    publishing: ''
                },
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
                    ],
                    publishing: [
                        { required: true, message: '请输入出版社', trigger: 'blur' }
                    ]
                },
                currentBook: {},
                imgList: [],
                currentImage: '',
                tableShow:true


            };
        },
        mounted() {
            let that = this;
            this.axios.get('/book/bookList')
                .then(function(response) {
                    console.log(response.data);
                    that.tableData = response.data['bookList'];
                })
                .catch(function(response) {
                    that.$message.error('未能获取到书籍列表');
                });
        },
        methods: {
            handleEdit(index, row) {
                this.idx = index;
                // 对象深拷贝！！！
                // 暴力手写
                // this.form = {
                //     name: row.name,
                //     author: row.author,
                //     describe: row.describe,
                //     publishing: row.publishing,
                //     pages: row.pages,
                //     isbn: row.isbn
                // };
                // ES6可用
                //this.form = Object.assign({},row)
                // 高级玩法
                this.form = JSON.parse(JSON.stringify(row));
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                let that = this;
                this.$confirm('是否确定删除' + row.name + ', 删除该书籍携带的资源也会一并删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let param = { 'isbn': row.isbn };
                    that.axios.delete('/book/book', { data: { isbn: row.isbn } })
                        .then(function(response) {
                            if (response.data['code'] == -1) {
                                that.$message.error('未找到书籍，请刷新页面重试');
                            } else {
                                that.$message.success('成功删除');
                                that.tableData.splice(that.idx, 1);
                                //that.$set(that.tableData,that.idx,{})
                            }
                        })
                        .catch(function() {
                            that.$message.error('删除出错，请稍后重试');
                        });
                    console.log(index);

                }).catch(() => {
                    this.$message.info('已取消删除');
                });
            },
            saveEdit(formName) {
                let that = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.axios.post('/book/updateBook', this.form)
                            .then(function(response) {
                                if (response.data['code'] == -1) {
                                    that.$message.error(response.data['result']);

                                } else {
                                    that.$message.success('修改成功');
                                    that.editVisible = false;
                                    that.$set(that.tableData, that.idx, that.form);
                                }
                            })
                            .catch(function(response) {
                                that.$message.error('修改失败,请重试');
                            });
                    } else {
                        this.$message.error('修改有误');
                    }
                });
            },
            cancelEdit() {
                this.editVisible = false;
            },
            handleUpload(index, row) {
                this.currentBook.isbn = row.isbn;
                this.uploadVisible = true;
            },
            submitUpload() {
                this.uploadVisible = false;
                this.fileList = [];
                this.$message.success('上传成功');
            },
            handleOrder(index, row) {
                this.currentBook.isbn = row.isbn;
                this.orderVisible = true;
            },
            orderOpen() {
                let that = this;
                let data = {
                    'isbn': this.currentBook.isbn
                };
                this.axios.get('/book/getPhoto', { params: data })
                    .then(function(response) {
                        that.imgList = response.data;
                        that.imgList.forEach(value => {
                            value.src = 'api2/' + value.src;
                        });
                        let table = document.querySelector('.el-dialog__body .el-table__body tbody');
                        Sortable.create(table, {
                            onEnd: function(/**Event*/evt) {
                                let tempItem = that.imgList.splice(evt.oldIndex, 1)[0];
                                that.imgList.splice(evt.newIndex, 0, tempItem)
                                // evt.oldIndex;
                                // evt.newIndex;
                                // let temp = that.imgList[evt.oldIndex];
                                // that.imgList[evt.oldIndex] = that.imgList[evt.newIndex];
                                // that.imgList[evt.newIndex] = temp;
                            }
                        });
                    })
                    .catch(function(response) {

                    });
            },
            submitOrder() {
                let that = this;
                this.axios.post('/book/uploadOrder', this.imgList)
                    .then(function(response) {
                        if (response.data['code'] == -1) {
                            that.$message.error(response.data['result']);
                        } else {
                            let data = {
                                'isbn': that.currentBook.isbn
                            };
                            that.axios.get('/book/getPhoto', { params: data })
                                .then(function(response) {
                                    that.imgList = response.data;
                                    that.imgList.forEach(value => {
                                        value.src = 'api2/' + value.src;
                                    });
                                    console.log(that.imgList);
                                    // 重新渲染表格
                                    that.tableShow = false
                                    that.$nextTick(() => {
                                        that.tableShow = true
                                    })
                                    that.$message.success(response.data['result']);
                                })
                                .catch(function(response) {
                                    that.$message.error('出错了');
                                });
                        }
                    })
                    .catch(function() {
                        that.$message.error('出错了，请稍后重试');
                    });
                this.orderVisible = false;
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