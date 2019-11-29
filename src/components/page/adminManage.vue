<template>
    <div>
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-user"></i> 系统管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>
                    管理员列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
            <el-table :data="tempList" border stripe>
                <el-table-column prop="username" label="用户名"></el-table-column>
                <el-table-column prop="type" label="用户类型"></el-table-column>
                <el-table-column prop="last_login" label="上次登录时间"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="changePasswd(scope.row)">修改密码</el-button>
                        <el-button type="text" icon="el-icon-delete" @click="deleteUser(scope.$index,scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="text-align: right">
                <el-button type="text" icon="el-icon-plus" @click="addUser()">添加用户</el-button>
            </div>
            <div id="pagination">
                <el-pagination
                        @current-change="handleCurrentChange" :current-page="currentTablePage" :total="totalSize"
                        layout="total , ->, prev, pager, next, jumper">
                </el-pagination>
            </div>
        </div>

        <!--        密码修改弹出框-->
        <el-dialog title="修改密码" :visible.sync="passwdVisible" @close="passwdVisible=false">
            <el-form :model="changePasswdForm" :rules="rules" ref="changePasswdForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="changePasswdForm.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="输入新密码" prop="newPass">
                    <el-input aria-placeholder="请输入密码" v-model="changePasswdForm.newPass" show-password></el-input>
                </el-form-item>
                <el-form-item label="请重新输入密码" prop="newPass2">
                    <el-input aria-placeholder="请重新输入密码" v-model="changePasswdForm.newPass2" show-password></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="passwdVisible=false">取 消</el-button>
                <el-button type="primary" @click="savePasswd()">确 定</el-button>
            </span>
        </el-dialog>

        <!--        添加用户弹出框-->
        <el-dialog title="添加用户" :visible.sync="addUserVisible" @close="addUserVisible=false">
            <el-form :model="addUserForm" :rules="rules" ref="addUserForm">
                <el-form-item label="用户名" prop="username">
                    <el-input aria-placeholder="请输入用户名" v-model="addUserForm.username"></el-input>
                </el-form-item>
                <el-form-item label="用户类型" prop="type">
                    <el-select v-model="addUserForm.type">
                        <el-option v-for="item in options" :key="item.value" :label="item.label"
                                   :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="输入新密码" prop="newPass">
                    <el-input aria-placeholder="请输入密码" v-model="addUserForm.newPass" show-password></el-input>
                </el-form-item>
                <el-form-item label="请重新输入密码" prop="newPass2">
                    <el-input aria-placeholder="请重新输入密码" v-model="addUserForm.newPass2" show-password></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="addUserVisible=false">取 消</el-button>
            <el-button type="primary" @click="saveUser()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'adminManage',
        data() {
            // 增加自定义校验规则
            let validateComfirmPwd = (rule, value, callback) => {
                if (this.passwdVisible) {
                    if (this.changePasswdForm.newPass != value) {
                        callback(new Error('密码与新密码不一致'));
                    } else if (this.addUserVisible) {
                        if (this.addUserForm.newPass != value) {
                            callback(new Error('密码与新密码不一致'));
                        }
                    }
                } else {
                    callback();
                }
            };
            return {
                // 显示用户列表使用
                userList: [],
                tempList: [],
                currentTablePage: 1,
                tempTable: [],
                totalSize: 0,
                // 修改密码使用
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 15, message: '用户名需在3-15个字符之间', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '请选择用户类型', trigger: 'change' }
                    ],
                    newPass: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        {
                            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,20}$/,
                            message: '密码安全性过低，请包含数字加大小写字母,并且在8-20位之间',
                            trigger: 'blur'
                        }
                    ],
                    newPass2: [
                        { required: true, message: '请输入第二次密码', trigger: 'blur' },
                        { validator: validateComfirmPwd, trigger: 'blur' },
                        { min: 8, max: 20, message: '长度需在8-20位之间', trigger: 'blur' }
                    ]
                },
                passwdVisible: false,
                changePasswdForm: {
                    username: '',
                    newPass: '',
                    newPass2: ''
                },
                // 添加用户使用
                addUserVisible: false,
                addUserForm: { username: '', type: 'normalAdmin', newPass: '', newPass2: '' },
                options: [ { label: 'normalAdmin', value: 'normalAdmin' }]
            };
        },
        mounted() {
            let that = this;
            this.axios.get('/auth/getUser')
                .then((response) => {
                    if (response.data['code'] == 0) {
                        localStorage.removeItem('username');
                        that.$message.error(response.data['result']);
                        that.$router.push('/login');
                    } else {
                        that.userList = response.data;
                        for (let i = 0; i < 10; i++) {
                            if (that.userList[i]) {
                                that.tempList.push(that.userList[i]);
                            }
                        }
                        that.totalSize = that.userList.length;
                    }
                })
                .catch((response) => {
                    that.$message.error('管理员列表获取失败，请稍后重试');
                });
        },
        methods: {
            handleCurrentChange(currentPage) {
                this.currentTablePage = currentPage;
                let from = (currentPage - 1) * 10;
                let to = currentPage * 10;
                console.log(from, '=>', to);
                this.tempList = [];
                for (; from < to; from++) {
                    if (this.userList[from]) {
                        this.tempList.push(this.userList[from]);
                    }
                }
            },
            changePasswd(row) {
                if (localStorage.getItem('type') != 'superAdmin') {
                    this.$message.info('权限不足，请使用superAdmin账号登录');
                } else {
                    this.passwdVisible = true;
                    this.changePasswdForm.username = row.username;
                    this.changePasswdForm.newPass = '';
                    this.changePasswdForm.newPass2 = '';
                }
            },
            savePasswd() {
                this.$refs['changePasswdForm'].validate((valid) => {
                    if (valid) {
                        let that = this;
                        that.axios.post('/auth/updatePassword', this.changePasswdForm)
                            .then(function(response) {
                                if (response.data['code'] == 0) {
                                    localStorage.removeItem('username');
                                    that.$message.error(response.data['result']);
                                    that.$router.push('/login');
                                } else if (response.data['code'] == -1) {
                                    that.$message.error(response.data['result']);
                                } else if (response.data['code'] == 1) {
                                    that.$message.success(response.data['result']);
                                    that.passwdVisible = false;
                                }
                            })
                            .catch(function(response) {
                                that.$message.error('修改失败，请稍后重试');
                            });
                    } else {
                        that.$message.error('尚有字段未填写完整');
                    }
                });
            },
            addUser() {
                if (localStorage.getItem('type') != 'superAdmin') {
                    this.$message.info('只有superAdmin账号才能删除用户');
                    return;
                } else {
                    this.addUserVisible = true;
                    this.addUserForm.username = '';
                    this.addUserForm.newPass = '';
                    this.addUserForm.newPass2 = '';
                }
            },
            saveUser() {
                let that = this;
                this.$refs.addUserForm.validate((valid) => {
                    if (valid) {
                        that.axios.post('/auth/register', this.addUserForm)
                            .then(function(response) {
                                if (response.data['code'] == 0) {
                                    localStorage.removeItem('username');
                                    that.$message.error(response.data['result']);
                                    that.$router.push('/login');
                                } else if (response.data['code'] == -1) {
                                    that.$message.error(response.data['result']);
                                } else if (response.data['code'] == 1) {
                                    that.$message.success(response.data['result']);
                                    that.addUserVisible = false;
                                    that.tempList.push({'username':that.addUserForm['username'],'type':that.addUserForm['type']});
                                }
                            })
                            .catch(function(response) {
                                that.$message.error('修改失败，请稍后重试');
                            });
                    } else {
                        that.$message.error('尚有字段未填写完整');
                    }
                });
            },
            deleteUser(index,row) {
                console.log(row)
                if (localStorage.getItem('type') != 'superAdmin') {
                    this.$message.info('只有superAdmin账号才能删除用户');
                    return;
                }
                if (localStorage.getItem('username') == row.username) {
                    this.$message.info('不能删除自己T_T');
                    return;
                }
                let that = this;
                this.$confirm('是否确定删除此用户', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data = {
                        username: row.username
                    };
                    this.axios.delete('/auth/user', { data: data })
                        .then(function(response) {
                            if (response.data['code'] == 0) {
                                localStorage.removeItem('username');
                                that.$message.error(response.data['result']);
                                that.$router.push('/login');
                            } else if (response.data['code'] == -1) {
                                that.$message.error(response.data['result']);
                            } else if (response.data['code'] == 1) {
                                that.$message.success(response.data['result']);
                                that.tempList.splice(index, 1);
                            }
                        })
                        .catch(function(response) {
                            that.$message.error('删除用户失败，请稍后重试');
                        });
                })
                    .catch(() => {

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
</style>