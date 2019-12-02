<template>
    <div v-loading="loading"
         element-loading-text="请稍后"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <el-form :model="form" :rules="rules" ref="form" class="container" label-width="80px" label-position="left">
            <el-form-item label="选择书籍" prop="book">
                <el-select v-model="form.book" placeholder="请选择书籍">
                    <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="选择图片" prop="file">
                <el-upload action="/api1/resource/getPhoto" :on-success="handleSuccess"
                           :on-error="handleError" :file-list="fileList" list-type="card"
                           :limit="1" accept=".png,.jpeg,.jpg">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传一张jpg/png/jpeg文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>

            <el-form-item label="提交">
                <el-button type="primary" @click="submit">提交</el-button>
                <el-button type="primary" @click="look">查看识别效果</el-button>
            </el-form-item>



        </el-form>

        <div v-bind:style="{display:displayResult}" style="text-align: center">
            <div><span>手指位置: </span><span>{{result['finger']}}</span></div>
            <div><span>页数: </span><span>{{result['page']}}</span></div>
        </div>

        <el-dialog title="识别结果" :visible.sync="dialogVisible" width="30%">
            <el-image :src="imgURL"></el-image>

            <span slot="footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>

        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'Test',
        data() {
            return {
                options: [{
                    value: 'book1',
                    label: 'book1'
                }, {
                    value: 'book2',
                    label: 'book2'
                }
                ],
                form: {
                    book: '',
                    filename:''
                },
                rules: {
                    book: [
                        { required: true, message: '请输入书籍名', trigger: 'blur' }
                    ],
                    file: [
                    ]
                },
                fileList: [],
                book: '',
                result:'',
                imgURL:'',
                dialogVisible:false,
                loading:false,
                displayResult: 'none'

            };
        },
        methods: {
            handleSuccess(response, file, fileList) {
                this.form.filename = response;
                console.log('fileList:', fileList);
                console.log('file:', file);
            },
            handleError(response, file, fileList) {
                console.log('response:', response);
            },
            look(){
              if(this.imgURL === ''){
                  this.$message.info("请先上传图片")
              }
              else{
                  this.dialogVisible = true;
              }
            },
            submit() {
                let that = this;
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        console.log(that.form.filename)
                        console.log(that.form.book)
                        if(that.form.filename !== ""){
                            that.loading = true;
                            that.axios.post('/resource/testPhoto', {
                                filename:that.form.filename,
                                book:that.form.book
                            }).then((response) => {
                                that.result = response.data;
                                //console.log(that.result)
                                that.imgURL ="api1/"+ response.data["img"];
                                that.loading = false;
                                that.displayResult = ""
                                console.log(that.imgURL)
                            }).catch((response) => {
                                that.result = response.data;
                                that.loading = false;
                                that.displayResult = ""

                            });
                        }else{
                            this.$message.error("请选择识别的图片")
                        }
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
        text-align: center;
        background: #fff;
        border: 1px solid seashell;
    }

</style>