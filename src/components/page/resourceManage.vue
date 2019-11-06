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
                        >区域划分
                        </el-button>
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleUpload(scope.$index, scope.row)"
                        >上传音频
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

        <el-dialog :fullscreen=true title="区域划分" :visible.sync="editVisible" style=" min-width:900px;height: 100%">
            <div id="main" style="">
                <div class="images" v-bind:style="{width: sidebarWidthLeft+'px'}" style="float: left;display: inline">
                    <div v-bind:style="{width: sidebarWidthLeft+'px'}" style="height: 100%; margin-top: 0">
                        <el-image v-for="(url,index) in urls" :src="url" @click="clickImage(index)"></el-image>
                    </div>

                </div>
                <!--                style="background-image:url(https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg);background-size:100%,100%;margin-left: 6px;min-width: 947px;height:auto;display:inline;width:1500px;">-->

                <div id="canvasDiv" v-bind:style="{backgroundImage:'url('+this.currentUrl+')', left:(sidebarWidthLeft+25)+'px'}"
                     :width="canvasWidth"
                     style="background-image:url(https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg);background-size:100%,100%;float:left;margin-left: 6px;position: fixed;">
                    <canvas id='mainCanvas' :width=canvasWidth :height=canvasHeight v-bind:style="{cursor:this.cursor}"
                            @mousedown="canvasDown" @mouseup="canvasUp"
                            @mousemove="canvasMove"></canvas>
                </div>
                <div id="" v-bind:style="{width:sidebarWidthRight+'px',left:(sidebarWidthLeft+canvasWidth+35)+'px'}" style="float:left;height:100%;position:fixed;overflow :auto;">
                    <div v-for="(info,index) in drawInfo"
                         style="margin-bottom: 5px;padding-top:2px;padding-bottom: 2px"
                         :style="index==selectedItem ? 'backgroundColor:#FF722C;': 'backgroundColor:#A0FFE2;'">
                        <div v-bind:style="{width:sidebarWidthRight*0.1+'px',height:sidebarWidthRight*0.1+'px'}" style="cursor: pointer;display: inline-block;border:1px solid;border-radius:50%;text-align: center;vertical-align: middle;"
                             @click="selectItem(index)">{{index+1}}
                        </div>
                        <el-input v-bind:style="{width:sidebarWidthRight*0.6+'px'}" v-model="info.name" style="width:100px;padding-left:2px;padding-right:2px"
                                  @input="updateInput"></el-input>
                        <el-button type="danger" icon="el-icon-delete" circle @click="deleteInfo(index)"></el-button>
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
                default: '#000'
            },
            lineWidth: {
                type: Number,
                default: 1
            },
            lineType: {
                type: String,
                default: 'rec'
            },

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
                form: {},
                fileList: [],
                urls: [
                    'https://cdn.img.wenhairu.com/images/2019/11/05/ADZjP.jpg',
                    "https://cdn.img.wenhairu.com/images/2019/11/05/ADPZh.jpg",
                    "https://cdn.img.wenhairu.com/images/2019/11/05/ADI7t.jpg",
                    "https://cdn.img.wenhairu.com/images/2019/11/05/ADVYC.jpg",
                    "https://cdn.img.wenhairu.com/images/2019/11/05/ADOsS.jpg",
                    "https://cdn.img.wenhairu.com/images/2019/11/05/ADXys.jpg",
                    "https://cdn.img.wenhairu.com/images/2019/11/05/ADeXR.jpg",
                    "https://cdn.img.wenhairu.com/images/2019/11/05/ADb8N.jpg",
                    "https://cdn.img.wenhairu.com/images/2019/11/05/ADd9B.jpg",
                    "https://cdn.img.wenhairu.com/images/2019/11/05/ADi0n.jpg",
                    "https://cdn.img.wenhairu.com/images/2019/11/05/ADsLA.jpg",
                    "https://cdn.img.wenhairu.com/images/2019/11/05/AD3WT.jpg"
                ],
                currentUrl: '',
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
                screenWidth: document.body.clientWidth

            };
        },
        computed: {
            canvasWidth: function() {
                return this.screenWidth * 0.75;
            },
            canvasHeight: function() {
                return this.canvasWidth * 0.5625;
            },
            sidebarWidthLeft: function() {
                return this.screenWidth * 0.13;
            },
            sidebarWidthRight: function() {
                return this.screenWidth * 0.1;
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
            window.onresize = () => {
                return (() => {
                    that.screenWidth = document.body.clientWidth;
                })();
            };
        },
        watch: {
            screenWidth(val) {
                this.screenWidth = val;
            }
        },
        methods: {
            saveEdit() {

            },
            handleEdit(index, row) {
                this.idx = index;
                this.form = row;
                this.editVisible = true;
                let img = new Image();
                img.src = this.urls[0];
                //.getContext('2d');
                //console.log(ctx)
                let that = this;
                img.onload = function() {
                    let canvasDiv = document.getElementById('canvasDiv');
                    canvasDiv.style.backgroundImage = 'url(' + that.urls[0] + ')';
                    // 获取canvas绘制上下文对象和初始化画笔
                    that.ctx = document.getElementById('mainCanvas');
                    that.context = that.ctx.getContext('2d');
                    //that.context.fillRect(10, 10, 10, 10);
                    that.context.lineWidth = that.lineWidth;
                    that.context.strokeStyle = that.lineColor;
                };
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
            },
            clickImage(index) {
                this.$confirm('是否切换图片，切换图片会保存绘图数据', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.currentUrl = this.urls[index];
                    this.selectedItem = -1;
                    this.drawInfo = [];
                    this.currentUrl = this.urls[index];
                    this.rePaint();
                }).catch(() => {

                });

                //console.log(index);
                //this.currentUrl = "https://review.chinabrands.cn/chinabrands_cn/seo/image/20190218/%E8%B0%B7%E6%AD%8C%20-%20%E5%9B%BE%E7%89%87%E6%90%9C%E7%B4%A2%E5%BC%95%E6%93%8E.jpg"
                // let div = document.getElementById('canvasDiv');
                // div.style.backgroundImage="url("+this.currentUrl+")";
            },
            canvasUp(event) {
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
                        console.log(canvasY, canvasY);
                        that.context.beginPath();
                        that.context.rect(info.x, info.y, info.w, info.h);
                        // 判断是否点击了某个矩形
                        if (!hasFound && that.context.isPointInPath(canvasX, canvasY)) {
                            hasFound = true;
                            that.selectedItem = index;
                            that.selectedPos.x = canvasX;
                            that.selectedPos.y = canvasY;
                            that.context.strokeStyle = '#ff4444';
                        } else {
                            that.context.strokeStyle = '#000';
                        }
                        that.context.stroke();
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


                    }
                    // 拖拽动作
                    else if (this.isDrag) {
                        let selectItem = this.drawInfo[this.selectedItem];
                        selectItem.x = canvasX - this.dragPos.x;
                        selectItem.y = canvasY - this.dragPos.y;
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
                                lastInfo.name = '区域' + (this.drawInfo.length).toString();
                                console.log(lastInfo);
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
                        that.context.strokeStyle = '#ff4444';
                    } else {
                        that.context.strokeStyle = '#000';
                    }
                    that.context.stroke();
                });
                this.beginRec.imageData = this.context.getImageData(0, 0, this.width, this.height);


                this.context.strokeStyle = this.lineColor;
                if (this.canDraw) {
                    this.canvasMoveUse = false;
                    this.isDrag = false;
                    this.isClick = false;
                    this.isScale = false;
                }
            },
            canvasDown(event) {
                if (event.buttons != 1)
                    return;
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
                            type: this.lineType
                        });
                    }
                }
            },
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
                        this.context.strokeStyle = '#ff4444';
                        this.context.stroke();
                    }
                    // 如果是拖动命令
                    else if (this.isDrag) {
                        this.context.putImageData(this.beginRec.imageData, 0, 0);
                        this.context.beginPath();
                        this.context.rect(canvasX - this.dragPos.x, canvasY - this.dragPos.y, this.dragPos.w, this.dragPos.h);
                        this.context.strokeStyle = '#ff4444';
                        this.context.stroke();
                    } else {
                        if (this.lineType === 'rec') {
                            this.context.putImageData(this.beginRec.imageData, 0, 0);
                            this.context.beginPath();

                            this.context.rect(this.beginRec.x, this.beginRec.y, canvasX - this.beginRec.x, canvasY - this.beginRec.y);
                            let info = this.drawInfo[this.drawInfo.length - 1];
                            info.w = canvasX - this.beginRec.x;
                            info.h = canvasY - this.beginRec.y;
                            this.context.strokeStyle = '#ff4444';
                        }
                        this.context.stroke();
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
            rePaint() {
                this.context.clearRect(0, 0, this.width, this.height);
                let that = this;
                this.drawInfo.forEach(function(info, index) {
                    that.context.beginPath();
                    that.context.rect(info.x, info.y, info.w, info.h);

                    //console.log(that.selectedItem)
                    // 判断是否点击了某个矩形
                    if (index === that.selectedItem) {
                        that.context.strokeStyle = '#ff4444';
                    } else {
                        that.context.strokeStyle = '#000';
                    }
                    that.context.stroke();
                });
                this.beginRec.imageData = this.context.getImageData(0, 0, this.width, this.height);
            },
            selectItem(index) {
                this.selectedItem = index;
                this.rePaint();
            },
            updateInput() {
                this.$forceUpdate();
            },
            deleteInfo(index) {
                this.$confirm('是否确定删除第' + (index + 1) + '项？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(index);
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

    .images {
        width: 200px;
        height: 835px;
        overflow-y: auto;
        overflow-x: hidden;

    }


</style>