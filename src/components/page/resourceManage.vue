<template>
    <div>
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-microphone"></i> 资源
                </el-breadcrumb-item>
                <el-breadcrumb-item>
                    资源管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
            <el-table :data="tableData" border stripe style="text-align: center">
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
                        >区域划分
                        </el-button>
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleUpload(scope.$index, scope.row)"
                        >上传音频
                        </el-button>
                        <!--                        书籍删除功能在书籍列表-->
                        <!--                        <el-button-->
                        <!--                                type="text"-->
                        <!--                                icon="el-icon-delete"-->
                        <!--                                class="red"-->
                        <!--                                @click="handleDelete(scope.$index, scope.row)"-->
                        <!--                        >删除-->
                        <!--                        </el-button>-->
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog id="divDialog" :fullscreen=true title="区域划分" :visible.sync="editVisible"
                   :before-close="areaDivClose">
            <div id="main" style="">
                <div id="leftSidebar" v-bind:style="{width: sidebarWidthLeft+'px'}">
                    <div id="images" v-bind:style="{width: sidebarWidthLeft+'px'}" style="height: 100%; margin-top: 0">
                        <div class="sideImageContainer" v-for="(img,index) in imgList">
                            <el-image :style="index==currentPage?'border:3px solid #96c2f1;':'border: 1px solid black;'"
                                      style="margin-right: 20px" :src="img.src" @click="clickImage(index)"></el-image>
                            <span style="margin-right:30px">{{index+1}}</span>
                        </div>
                    </div>
                </div>

                <div id="canvasDiv"
                     v-bind:style="{backgroundImage:'url('+this.currentUrl+')', left:(sidebarWidthLeft+25)+'px'}"
                     :width="canvasWidth">
                    <canvas id='mainCanvas' :width=canvasWidth :height=canvasHeight :style="{cursor:this.cursor}"
                            @mousedown="canvasDown" @mouseup="canvasUp"
                            @mousemove="canvasMove"></canvas>
                </div>
                <div id="rightSidebar"
                     v-bind:style="{width:sidebarWidthRight+'px',left:(sidebarWidthLeft+canvasWidth+35)+'px'}">
                    <span>分区列表</span>
                    <div id="areasContainer">
                        <div class="areaList" v-for="(info,index) in drawInfo"
                             :style="index==selectedItem ? 'backgroundColor:#FF722C;': 'backgroundColor:#A0FFE2;'">
                            <div class="areaIndex"
                                 :style="{width:sidebarWidthRight*0.1+'px',height:sidebarWidthRight*0.1+'px'}"
                                 @click="selectItem(index)">{{index+1}}
                            </div>
                            <el-input class="areaName" :style="{width:sidebarWidthRight*0.6+'px'}"
                                      v-model="info.name"
                                      @input="updateInput"></el-input>
                            <el-button type="danger" icon="el-icon-delete" circle
                                       @click="deleteInfo(index)"></el-button>
                        </div>
                    </div>

                    <div style="text-align: center">
                        <el-button type="primary" plain @click="scaleDrawInfo" title="改变屏幕大小后，点击重新绘制">重新绘制</el-button>
                        <el-button type="primary" plain @click="submitMarks()">保存分区</el-button>
                    </div>
                </div>
            </div>

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
        name: 'resourceManage',
        props: {
            canDraw: {
                type: Boolean,
                default: true
            },
            info: {
                type: Array
            },
            lineColor: {
                type: String,
                default: '#fc2052'
            },
            selectedLineColor: {
                type: String,
                default: '#ff2078'
            },
            fillColor: {
                type: String,
                default: 'rgba(255,224,157,0.3)'
            },
            selectFillColor: {
                type: String,
                default: 'rgba(255,18,54,0.3)'
            },
            lineWidth: {
                type: Number,
                default: 1
            },
            lineType: {
                type: String,
                default: 'rec'
            }

        }
        ,
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
                fileList: [],
                urls: [
                    'https://s2.ax1x.com/2019/11/14/MtY74J.jpg',
                    'https://s2.ax1x.com/2019/11/14/MtYTN4.jpg',
                    'https://s2.ax1x.com/2019/11/14/MtYoEF.jpg',
                    'https://s2.ax1x.com/2019/11/14/MtYq3R.jpg',
                    'https://s2.ax1x.com/2019/11/14/MtYbC9.jpg',
                    'https://s2.ax1x.com/2019/11/14/MtYLg1.jpg',
                    'https://s2.ax1x.com/2019/11/14/MtYOjx.jpg',
                    'https://s2.ax1x.com/2019/11/14/MttpUe.jpg',
                    'https://s2.ax1x.com/2019/11/14/MtYju6.jpg',
                    'https://s2.ax1x.com/2019/11/14/MtYvDK.jpg',
                    'https://s2.ax1x.com/2019/11/14/MtYxHO.jpg',
                    'https://s2.ax1x.com/2019/11/14/MttSED.jpg'
                    // 'https://cdn.img.wenhairu.com/images/2019/11/05/ADZjP.jpg',
                    // 'https://cdn.img.wenhairu.com/images/2019/11/05/ADPZh.jpg',
                    // 'https://cdn.img.wenhairu.com/images/2019/11/05/ADI7t.jpg',
                    // 'https://cdn.img.wenhairu.com/images/2019/11/05/ADVYC.jpg',
                    // 'https://cdn.img.wenhairu.com/images/2019/11/05/ADOsS.jpg',
                    // 'https://cdn.img.wenhairu.com/images/2019/11/05/ADXys.jpg',
                    // 'https://cdn.img.wenhairu.com/images/2019/11/05/ADeXR.jpg',
                    // 'https://cdn.img.wenhairu.com/images/2019/11/05/ADb8N.jpg',
                    // 'https://cdn.img.wenhairu.com/images/2019/11/05/ADd9B.jpg',
                    // 'https://cdn.img.wenhairu.com/images/2019/11/05/ADi0n.jpg',
                    // 'https://cdn.img.wenhairu.com/images/2019/11/05/ADsLA.jpg',
                    // 'https://cdn.img.wenhairu.com/images/2019/11/05/AD3WT.jpg'
                ],
                imgList:[],
                currentBook: '',
                currentUrl: '',
                currentPage: 0,
                ctx: {},     // canvas 对象
                context: {},//canvas 上下文对象
                canvasMoveUse: false, // 是否处于绘制状态
                beginRec: {
                    x: '',
                    y: '',
                    imageData: this.currentUrl
                },
                drawInfo: [],
                // 判断是否选中元素和获取选中的元素和选中的位置
                isClick: false,
                selectedItem: -1,
                selectedPos: {},
                isDrag: false,
                dragPos: {},
                isScale: false,
                scalePos: {},
                cursor: 'auto',
                screenWidth: document.body.clientWidth,
                isbn: '',
                screenChange: false,
                timer: false,     // 防止频繁触发resize，导致页面卡顿
                interval: null   // 定时器用来区域划分中监听页面宽度改变后重新绘制
            };
        },
        computed: {
            canvasWidth: function() {
                let newCanvasWidth = this.screenWidth * 0.75;
                this.screenChange = true;
                let that = this;

                return newCanvasWidth;
            },
            canvasHeight: function() {
                let newCanvasHeight = this.canvasWidth * 0.5625;
                return newCanvasHeight;
            },
            sidebarWidthLeft: function() {
                return this.screenWidth * 0.1;
            },
            sidebarWidthRight: function() {
                return this.screenWidth * 0.12;
            },
            width: function() {
                return this.canvasWidth;
            },
            height: function() {
                return this.canvasHeight;
            }
        },
        mounted() {
            const that = this;
            //  监测屏幕宽度变化
            window.onresize = () => {
                return (() => {
                    that.screenWidth = document.body.clientWidth;
                })();
            };
            // 获取初始书籍列表
            this.axios.get('/book/bookList')
                .then(function(response) {
                    // console.log(response.data);
                    that.tableData = response.data['bookList'];
                })
                .catch(function(response) {
                    that.$message.error('未能获取到书籍列表，请刷新重试');
                });
        },
        watch: {
            screenWidth(val) {
                if (this.timer) {
                    this.screenWidth = val;
                    this.timer = false;
                    let that = this;
                    setTimeout(function() {
                        that.timer = true;
                    }, 300);

                }//console.log(this.canvasWidth);

            }
        },
        methods: {
            // 点击区域划分窗口
            handleEdit(index, row) {
                this.idx = index;
                this.currentBook = row;
                this.editVisible = true;
                this.currentPage = 0;
                let that = this;

                let data = {
                    isbn: that.currentBook.isbn,
                }
                that.axios.get('/book/getPhoto', { params: data })
                    .then(function(response) {
                        that.imgList = response.data;
                        that.imgList.forEach(value => {
                            value.src = 'api2/' + value.src;
                        });
                        console.log(that.imgList)

                        that.currentUrl = that.imgList[0].src;

                        let canvasDiv = document.getElementById('canvasDiv');
                        // canvasDiv.style.backgroundImage = 'url(' + that.imgList[0].src + ')';
                        // 获取canvas绘制上下文对象和初始化画笔
                        that.ctx = document.getElementById('mainCanvas');
                        that.context = that.ctx.getContext('2d');
                        //that.context.fillRect(10, 10, 10, 10);
                        that.context.lineWidth = that.lineWidth;
                        that.context.strokeStyle = that.lineColor;

                        let data = {
                            isbn: that.currentBook.isbn,
                            page: that.currentPage
                        };
                        that.axios.get('/resource/Area', { params: data })
                            .then(function(response) {
                                that.drawInfo = response.data['areas'];
                                that.drawInfo.forEach(value => {
                                    value.x = value.relativeX * that.canvasWidth;
                                    value.y = value.relativeY * that.canvasHeight;
                                    value.w = value.relativeW * that.canvasWidth;
                                    value.h = value.relativeH * that.canvasHeight;
                                    // console.log(value.x, value.y);
                                });
                                that.rePaint();
                            })
                            .catch(function(response) {
                                that.$message.error('获取失败，请稍后重试');
                                //that.editVisible = false;
                            });
                    })
                    .catch(function() {
                        ;
                    });

                let img = new Image();
                img.src = 'https://s2.ax1x.com/2019/11/14/MtY74J.jpg';
                //.getContext('2d');
                //console.log(ctx)
                img.onload = function() {


                };
            },
            // 保存书籍修改信息
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
            // 上传音频相关
            handleUpload(index, row) {
                this.uploadVisible = true;
            },
            // 上传音频，尚未完成
            submitUpload() {
                this.uploadVisible = false;
                this.fileList = [];
                this.$message.success('上传成功');
            },
            // 选择左侧图片
            clickImage(index) {
                if (index === this.currentPage)
                    return;
                this.$confirm('切换图片前是否保存已经绘制的数据', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let that = this;
                    this.submitMarks();
                    this.currentPage = index;
                    this.currentUrl = that.imgList[index].src;
                    this.drawInfo = [];
                    this.selectedItem = -1;
                    let data = {
                        isbn: this.currentBook.isbn,
                        page: this.currentPage
                    };
                    //console.log('getArea:', data);
                    this.axios.get('/resource/Area', { params: data })
                        .then(function(response) {
                            that.drawInfo = response.data['areas'];
                            that.drawInfo.forEach(value => {
                                value.x = value.relativeX * that.canvasWidth;
                                value.y = value.relativeY * that.canvasHeight;
                                value.w = value.relativeW * that.canvasWidth;
                                value.h = value.relativeH * that.canvasHeight;
                                // console.log(value.x, value.y);
                            });
                            that.rePaint();
                        })
                        .catch(function(response) {
                            that.$message.error('查询出错，请稍后重试');
                        });
                }).catch(() => {
                    // 与确定少了调用submitMarks()
                    let that = this;
                    this.currentPage = index;
                    this.currentUrl = this.imgList[index].src;
                    this.drawInfo = [];
                    this.selectedItem = -1;
                    let data = {
                        isbn: this.currentBook.isbn,
                        page: this.currentPage
                    };
                    this.axios.get('/resource/Area', { params: data })
                        .then(function(response) {
                            that.drawInfo = response.data['areas'];
                            that.drawInfo.forEach(value => {
                                value.x = value.relativeX * that.canvasWidth;
                                value.y = value.relativeY * that.canvasHeight;
                                value.w = value.relativeW * that.canvasWidth;
                                value.h = value.relativeH * that.canvasHeight;
                                // console.log(value.x, value.y);
                            });
                            that.rePaint();
                        })
                        .catch(function(response) {
                            that.$message.error('查询出错，请稍后重试');
                        });
                });

                //console.log(index);
                //this.currentUrl = "https://review.chinabrands.cn/chinabrands_cn/seo/image/20190218/%E8%B0%B7%E6%AD%8C%20-%20%E5%9B%BE%E7%89%87%E6%90%9C%E7%B4%A2%E5%BC%95%E6%93%8E.jpg"
                // let div = document.getElementById('canvasDiv');
                // div.style.backgroundImage="url("+this.currentUrl+")";
            },
            // 区域划分时监测鼠标弹起
            canvasUp(event) {
                //console.log(this.drawInfo);
                let canvasX = event.clientX - event.target.parentNode.offsetLeft;
                let canvasY = event.clientY - event.target.parentNode.offsetTop;
                let that = this;
                this.context.clearRect(0, 0, this.width, this.height);

                // 用户点击了鼠标
                if (this.isClick) {
                    // 舍弃并没有设置宽度的矩形，canvasDown里面先会push一个无宽度的矩形
                    if (this.drawInfo[this.drawInfo.length - 1].w == 0) {
                        if (this.selectedItem == this.drawInfo.length - 1)
                            this.selectedItem = -1;
                        this.drawInfo.pop();
                    }
                    let hasFound = false;
                    // 遍历绘制所有矩形，加红选中的矩形
                    this.drawInfo.forEach(function(info, index) {
                        // console.log(canvasY, canvasY);
                        that.context.beginPath();
                        that.context.rect(info.x, info.y, info.w, info.h);
                        // 判断是否点击了某个矩形
                        if (!hasFound && that.context.isPointInPath(canvasX, canvasY)) {
                            hasFound = true;
                            that.selectedItem = index;
                            that.selectedPos.x = canvasX;
                            that.selectedPos.y = canvasY;
                            that.context.strokeStyle = that.selectedLineColor;
                            that.context.fillStyle = that.selectFillColor;
                        } else {
                            that.context.strokeStyle = that.lineColor;
                            that.context.fillStyle = that.fillColor;
                        }
                        that.context.stroke();
                        that.context.fill();
                    });

                    this.beginRec.imageData = this.context.getImageData(0, 0, this.width, this.height);
                    // 若未选中任何矩形，将selectItem置-1
                    if (!hasFound) {
                        this.selectedItem = -1;
                    }
                    //console.log('选中了:' + that.selectedItem);

                }

                // 用户拖动了鼠标
                else {
                    // 拉伸动作
                    if (this.isScale) {
                        let selectItem = this.drawInfo[this.selectedItem];
                        selectItem.w = canvasX - selectItem.x;
                        selectItem.h = canvasY - selectItem.y;

                        if (selectItem.w < 0) {
                            selectItem.x = selectItem.x + selectItem.w;
                            selectItem.w = Math.abs(selectItem.w);
                        }
                        if (selectItem.h < 0) {
                            selectItem.y = selectItem.y + selectItem.h;
                            selectItem.h = Math.abs(selectItem.h);
                        }

                        selectItem.relativeX = selectItem.x / this.canvasWidth;
                        selectItem.relativeY = selectItem.y / this.canvasHeight;
                        selectItem.relativeW = selectItem.w / this.canvasWidth;
                        selectItem.relativeH = selectItem.h / this.canvasHeight;


                    }
                    // 拖拽动作
                    else if (this.isDrag) {
                        let selectItem = this.drawInfo[this.selectedItem];
                        selectItem.x = canvasX - this.dragPos.x;
                        selectItem.y = canvasY - this.dragPos.y;
                        selectItem.relativeX = selectItem.x / this.canvasWidth;
                        selectItem.relativeY = selectItem.y / this.canvasHeight;
                    }
                    // 绘制动作
                    else {
                        let lastInfo = this.drawInfo[this.drawInfo.length - 1];
                        if (this.drawInfo.length > 0) {
                            // 舍弃绘制的太小的矩形
                            if (Math.abs(lastInfo.w * lastInfo.h) <= 400) {
                                if (this.selectedItem == this.drawInfo.length - 1) {
                                    this.selectedItem = -1;
                                }
                                this.drawInfo.pop();
                            }
                            // 为矩形添加默认名字
                            else {
                                if (lastInfo.w < 0) {
                                    lastInfo.x = lastInfo.x + lastInfo.w;
                                    lastInfo.w = Math.abs(lastInfo.w);
                                }
                                if (lastInfo.h < 0) {
                                    lastInfo.y = lastInfo.y + lastInfo.h;
                                    lastInfo.h = Math.abs(lastInfo.h);
                                }
                                // 生成唯一识别该区域的uuid随机字符串
                                let uuid = Math.random().toString(36).slice(-8);
                                // lastInfo.name = '区域' + (this.drawInfo.length).toString();
                                lastInfo.uuid = uuid;
                                lastInfo.relativeX = lastInfo.x / this.canvasWidth;
                                lastInfo.relativeY = lastInfo.y / this.canvasHeight;
                                lastInfo.relativeW = lastInfo.w / this.canvasWidth;
                                lastInfo.relativeH = lastInfo.h / this.canvasHeight;
                                // console.log(lastInfo);
                            }
                        }

                    }

                }
                // 遍历绘制所有矩形，加红选中的矩形
                this.drawInfo.forEach(function(info, index) {
                    that.context.beginPath();
                    that.context.rect(info.x, info.y, info.w, info.h);

                    //console.log(that.selectedItem)
                    // 判断是否点击了某个矩形
                    if (index === that.selectedItem) {
                        that.context.strokeStyle = that.selectedLineColor;
                        that.context.fillStyle = that.selectFillColor;
                    } else {
                        that.context.strokeStyle = that.lineColor;
                        that.context.fillStyle = that.fillColor;
                    }
                    that.context.stroke();
                    that.context.fill();
                });
                this.beginRec.imageData = this.context.getImageData(0, 0, this.width, this.height);
                //this.context.strokeStyle = that.lineColor;
                if (this.canDraw) {
                    this.canvasMoveUse = false;
                    this.isDrag = false;
                    this.isClick = false;
                    this.isScale = false;
                }
            },
            // 区域划分时监测鼠标左键按下
            canvasDown(event) {
                if (event.buttons != 1)
                    return;
                // 更新绘图
                if (this.screenChange) {
                    let that = this;
                    //console.log('before change:', this.drawInfo);
                    this.drawInfo.forEach(value => {
                        value.x = value.relativeX * that.canvasWidth;
                        value.y = value.relativeY * that.canvasHeight;
                        value.h = value.relativeH * that.canvasHeight;
                        value.w = value.relativeW * that.canvasWidth;
                    });
                    this.rePaint();
                    //console.log('after change:', this.drawInfo);
                    this.screenChange = false;
                }
                // 在图片中的实际坐标 = 屏幕坐标 - 图片距离左和顶部的距离
                let canvasX = event.clientX - event.target.parentNode.offsetLeft;
                let canvasY = event.clientY - event.target.parentNode.offsetTop;
                this.isClick = true;

                if (this.canDraw) {
                    // 若已经选定了一个矩形，则判断鼠标是否在选定的矩形内
                    if (this.selectedItem !== -1) {
                        let selectedInfo = this.drawInfo[this.selectedItem];

                        this.context.rect(selectedInfo.x, selectedInfo.y, selectedInfo.w, selectedInfo.h);
                        this.canvasMoveUse = true;
                        //在选定的矩形内，可以拖拽或拉伸
                        if (this.context.isPointInPath(canvasX, canvasY)) {
                            let rightDownX = selectedInfo.x + selectedInfo.w,
                                rightDownY = selectedInfo.y + selectedInfo.h;
                            // 鼠标在右下角，可以拉伸
                            if (canvasX >= (rightDownX - 20) && canvasX <= rightDownX && canvasY >= (rightDownY - 20) && canvasY <= rightDownY) {
                                this.isScale = true;
                                this.scalePos.x1 = selectedInfo.x;
                                this.scalePos.y1 = selectedInfo.y;
                            }
                            // 鼠标在框内，开始拖拽
                            else {
                                this.isDrag = true;
                                // 获取点击时距离左上角顶点的距离
                                this.dragPos.x = canvasX - selectedInfo.x;
                                this.dragPos.y = canvasY - selectedInfo.y;
                                this.dragPos.w = selectedInfo.w;
                                this.dragPos.h = selectedInfo.h;
                            }
                        } else {        // 不在选定的矩形内，开始绘制新矩形
                            //this.context.clearRect(0,0,this.width,this.height);
                            // 记录起始点和要绘制的图像
                            this.beginRec.x = canvasX;
                            this.beginRec.y = canvasY;
                            this.selectedPos.x = canvasX;
                            this.selectedPos.y = canvasY;
                            // this.beginRec.x = event.clientX;
                            // this.beginRec.y = event.clientY;
                            this.beginRec.imageData = this.context.getImageData(0, 0, this.width, this.height);
                            this.drawInfo.push({
                                x: canvasX,
                                y: canvasY,
                                w: 0,
                                name: '区域' + (this.drawInfo.length).toString(),
                                type: this.lineType
                            });
                        }
                    } else {
                        this.canvasMoveUse = true; //开始绘制
                        // 在图片中的实际坐标 = 屏幕坐标 - 图片距离左和顶部的距离
                        // 记录起始点和要绘制的图像
                        this.beginRec.x = canvasX;
                        this.beginRec.y = canvasY;
                        this.beginRec.w = 0;
                        this.selectedPos.x = canvasX;
                        this.selectedPos.y = canvasY;
                        // this.beginRec.x = event.clientX;
                        // this.beginRec.y = event.clientY;
                        this.beginRec.imageData = this.context.getImageData(0, 0, this.width, this.height);
                        this.drawInfo.push({
                            x: canvasX,
                            y: canvasY,
                            w: 0,
                            name: '区域' + (this.drawInfo.length + 1).toString(),
                            type: this.lineType
                        });
                    }
                }
            },
            // 区域划分时监测鼠标移动
            canvasMove(event) {
                let canvasX = event.clientX - event.target.parentNode.offsetLeft;
                let canvasY = event.clientY - event.target.parentNode.offsetTop;
                if (this.canvasMoveUse) {
                    this.isClick = false;
                    // 如果是拉伸命令
                    if (this.isScale) {
                        this.context.putImageData(this.beginRec.imageData, 0, 0);
                        this.context.beginPath();
                        this.context.rect(this.scalePos.x1, this.scalePos.y1, canvasX - this.scalePos.x1, canvasY - this.scalePos.y1);
                        this.context.strokeStyle = this.selectedLineColor;
                        this.context.fillStyle = this.selectFillColor;
                        this.context.stroke();
                        this.context.fill();
                    }
                    // 如果是拖动命令
                    else if (this.isDrag) {
                        this.context.putImageData(this.beginRec.imageData, 0, 0);
                        this.context.beginPath();
                        this.context.rect(canvasX - this.dragPos.x, canvasY - this.dragPos.y, this.dragPos.w, this.dragPos.h);
                        this.context.strokeStyle = this.selectedLineColor;
                        this.context.fillStyle = this.selectFillColor;
                        this.context.stroke();
                        this.context.fill();
                        //this.context.fillRect(canvasX - this.dragPos.x, canvasY - this.dragPos.y, this.dragPos.w, this.dragPos.h);
                        //this.context.stroke();
                    } else {
                        if (this.lineType === 'rec') {
                            this.context.putImageData(this.beginRec.imageData, 0, 0);
                            this.context.beginPath();

                            this.context.rect(this.beginRec.x, this.beginRec.y, canvasX - this.beginRec.x, canvasY - this.beginRec.y);
                            let info = this.drawInfo[this.drawInfo.length - 1];
                            info.w = canvasX - this.beginRec.x;
                            info.h = canvasY - this.beginRec.y;
                            this.context.strokeStyle = this.selectedLineColor;
                            this.context.fillStyle = this.selectFillColor;
                        }
                        this.context.stroke();
                        this.context.fill();
                        //this.context.strokeStyle = this.lineColor;
                        this.selectedItem = (this.drawInfo.length - 1); // 设定当前绘制的矩形为选中的矩形

                    }
                } else {
                    let flag = true;
                    if (this.selectedItem !== -1) {
                        let selectedInfo = this.drawInfo[this.selectedItem];
                        let rightDownX = selectedInfo.x + selectedInfo.w,
                            rightDownY = selectedInfo.y + selectedInfo.h;
                        if (canvasX >= (rightDownX - 20) && canvasX <= rightDownX && canvasY >= (rightDownY - 20) && canvasY <= rightDownY) {
                            this.cursor = 'se-resize';
                            flag = false;
                        }
                    }
                    if (flag) {
                        let that = this;
                        this.drawInfo.forEach(function(info) {
                            if (canvasX >= info.x && canvasX <= info.x + info.w && canvasY >= info.y && canvasY <= info.y + info.h) {
                                that.cursor = 'pointer';
                                flag = false;
                            }
                        });
                    }
                    if (flag) {
                        this.cursor = 'auto';
                    }
                }
            },
            // 重新绘制函数
            rePaint() {
                // console.log(JSON.stringify(this.context) !== '{}');
                this.context.clearRect(0, 0, this.width, this.height);
                let that = this;
                this.drawInfo.forEach(function(info, index) {
                    that.context.beginPath();
                    that.context.rect(info.x, info.y, info.w, info.h);

                    //console.log(that.selectedItem)
                    // 判断是否点击了某个矩形
                    if (index === that.selectedItem) {
                        that.context.strokeStyle = that.selectedLineColor;
                        that.context.fillStyle = that.selectFillColor;
                    } else {
                        that.context.strokeStyle = that.lineColor;
                        that.context.fillStyle = that.fillColor;
                    }
                    that.context.stroke();
                    that.context.fill();
                });
                this.beginRec.imageData = this.context.getImageData(0, 0, this.width, this.height);

            },
            // 选定一个区域
            selectItem(index) {
                this.selectedItem = index;
                this.rePaint();
            },
            // 强制更新右边栏中的input,不加导致数据更新失效，可能是因为组件层次过深
            updateInput() {
                this.$forceUpdate();
            },
            // 删除选定的一个绘制区域
            deleteInfo(index) {
                this.$confirm('是否确定删除第' + (index + 1) + '项？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // console.log(index);
                    this.drawInfo.splice(index, 1);
                    // 修改相应的selectItem值
                    if (this.selectedItem > index)
                        this.selectedItem--;
                    else if (this.selectedItem === index)
                        this.selectedItem = -1;
                    this.rePaint();
                }).catch(() => {
                    this.$message.info('已取消删除');
                });
            },
            // 提交划分的区域
            submitMarks() {
                let that = this;
                let data = {
                    isbn: this.currentBook.isbn,
                    page: this.currentPage,
                    markAreas: this.drawInfo
                };
                // console.log('submitMark:', data);
                this.axios.post('/resource/Area', data)
                    .then(function(response) {
                        if (response.data['code'] === -1) {
                            that.$message.error(response.data['result']);
                        } else {
                            that.$message.success(response.data['result']);
                        }
                    })
                    .catch(function(response) {
                        that.$message.error('出错了，请稍后重试');
                    });
            },
            // 区域划分关闭
            areaDivClose(done) {
                let that = this;
                this.$confirm('关闭前是否要保存未保存的信息', '提示', {
                    confirmButtonText: '那先保存吧',
                    cancelButtonText: '我不保存了',
                    type: 'warning'
                }).then(function() {
                    that.submitMarks();
                    that.selectedItem = -1;
                    if (that.canDraw) {
                        that.canvasMoveUse = false;
                        that.isDrag = false;
                        that.isClick = false;
                        that.isScale = false;
                    }
                    that.drawInfo = [];
                    done();
                }).catch(function() {
                    that.selectedItem = -1;
                    if (that.canDraw) {
                        that.canvasMoveUse = false;
                        that.isDrag = false;
                        that.isClick = false;
                        that.isScale = false;
                    }
                    that.drawInfo = [];
                    done();
                });


            },
            // 屏幕大小变化，重新绘制
            scaleDrawInfo() {
                if (this.screenChange) {
                    let that = this;
                    // console.log('before change:', this.drawInfo);
                    this.drawInfo.forEach(value => {
                        value.x = value.relativeX * that.canvasWidth;
                        value.y = value.relativeY * that.canvasHeight;
                        value.h = value.relativeH * that.canvasHeight;
                        value.w = value.relativeW * that.canvasWidth;
                    });
                    this.rePaint();
                    // console.log('after change:', this.drawInfo);
                    this.screenChange = false;
                }
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


    .sideImageContainer {
        text-align: center;
        margin-bottom: 5px
    }

    .areaList {
        margin-bottom: 5px;
        padding-top: 2px;
        padding-bottom: 2px;
        margin-left: 2px;
        max-height: 80%
    }

    .areaIndex {
        cursor: pointer;
        display: inline-block;
        border: 1px solid;
        border-radius: 50%;
        text-align: center;
        vertical-align: middle;
        margin-right: 1px
    }

    .areaName {
        width: 100px;
        padding-left: 2px;
        padding-right: 2px;
        margin-right: 1px
    }

    #leftSidebar {
        width: 200px;
        height: 835px;
        overflow-y: scroll;
        overflow-x: hidden;
        float: left;
        display: inline
    }

    #images {
        height: 100%;
        margin-top: 0
    }

    #canvasDiv {
        background-size: 100%, 100%;
        float: left;
        margin-left: 6px;
        position: fixed;
    }

    #divDialog {
        min-width: 900px;
        height: 100%;
    }

    #rightSidebar {
        float: left;
        height: 80%;
        position: fixed;
    }

    #areasContainer {
        height: 95%;
        border: 1px solid #606266;
        margin-bottom: 5px;
        overflow: auto;
    }


</style>