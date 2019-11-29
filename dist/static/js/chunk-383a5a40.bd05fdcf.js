(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-383a5a40"],{cb4a:function(e,t,o){"use strict";var a=o("f7b4"),r=o.n(a);r.a},db68:function(e,t,o){"use strict";o.r(t);var a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("div",[o("el-breadcrumb",{attrs:{separator:"/"}},[o("el-breadcrumb-item",[o("i",{staticClass:"el-icon-notebook-1"}),e._v(" 书籍\n            ")]),o("el-breadcrumb-item",[e._v("\n                书籍管理\n            ")])],1)],1),o("div",{staticClass:"container"},[o("el-table",{attrs:{data:e.tempTable,border:"","header-cell-style":{"text-align":"center"},"cell-style":{"text-align":"center"}}},[o("el-table-column",{attrs:{prop:"name",width:"180",label:"书籍名"}}),o("el-table-column",{attrs:{prop:"author",label:"作者"}}),o("el-table-column",{attrs:{prop:"isbn",label:"isbn"}}),o("el-table-column",{attrs:{prop:"publishing",label:"出版社"}}),o("el-table-column",{attrs:{prop:"pages",label:"页数"}}),o("el-table-column",{attrs:{prop:"describe",label:"简介"}}),o("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{attrs:{type:"text",icon:"el-icon-edit"},on:{click:function(o){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑\n                    ")]),o("el-button",{attrs:{type:"text",icon:"el-icon-edit"},on:{click:function(o){return e.handleUpload(t.$index,t.row)}}},[e._v("上传\n                    ")]),o("el-button",{attrs:{type:"text",icon:"el-icon-sort"},on:{click:function(o){return e.handleOrder(t.$index,t.row)}}},[e._v("书籍调序\n                    ")]),o("el-button",{staticClass:"red",attrs:{type:"text",icon:"el-icon-delete"},on:{click:function(o){return e.handleDelete(t.$index,t.row)}}},[e._v("删除\n                    ")])]}}])})],1),o("div",{attrs:{id:"pagination"}},[o("el-pagination",{attrs:{"current-page":e.currentTablePage,total:e.totalSize,layout:"total , ->, prev, pager, next, jumper"},on:{"current-change":e.handleCurrentChange}})],1)],1),o("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"30%"},on:{"update:visible":function(t){e.editVisible=t}}},[o("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"80px","label-position":"left"}},[o("el-form-item",{attrs:{label:"书籍名",prop:"name"}},[o("el-input",{attrs:{"prefix-icon":""},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),o("el-form-item",{attrs:{label:"作者",prop:"author"}},[o("el-input",{model:{value:e.form.author,callback:function(t){e.$set(e.form,"author",t)},expression:"form.author"}})],1),o("el-form-item",{attrs:{label:"isbn",prop:"isbn",disabled:""}},[o("el-input",{model:{value:e.form.isbn,callback:function(t){e.$set(e.form,"isbn",t)},expression:"form.isbn"}})],1),o("el-form-item",{attrs:{label:"页数",prop:"pages"}},[o("el-input",{model:{value:e.form.pages,callback:function(t){e.$set(e.form,"pages",e._n(t))},expression:"form.pages"}})],1),o("el-form-item",{attrs:{label:"出版社",prop:"publishing"}},[o("el-input",{model:{value:e.form.publishing,callback:function(t){e.$set(e.form,"publishing",t)},expression:"form.publishing"}})],1),o("el-form-item",{attrs:{label:"书籍简介"}},[o("el-input",{attrs:{type:"textarea"},model:{value:e.form.describe,callback:function(t){e.$set(e.form,"describe",t)},expression:"form.describe"}})],1)],1),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:e.cancelEdit}},[e._v("取 消")]),o("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.saveEdit("form")}}},[e._v("确 定")])],1)],1),o("el-dialog",{attrs:{title:"上传文件",visible:e.uploadVisible,width:"50%"}},[o("el-upload",{attrs:{action:"/api2/book/uploadPhoto","list-type":"picture-card",multiple:"",accept:".png,.jpeg,.jpg",data:e.currentBook,"file-list":e.fileList}},[o("el-button",{attrs:{slot:"trigger",size:"small",type:"primary"},slot:"trigger"},[e._v("选取文件")])],1),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(t){e.uploadVisible=!1}}},[e._v("取 消")]),o("el-button",{attrs:{type:"primary"},on:{click:e.submitUpload}},[e._v("确 定")])],1)],1),o("el-dialog",{staticStyle:{height:"98%"},attrs:{width:"32%",title:"拖动修改照片顺序",visible:e.orderVisible},on:{open:e.orderOpen,close:function(t){e.orderVisible=!1}}},[e.tableShow?o("el-table",{ref:"orderTable",staticStyle:{height:"600px",overflow:"hidden","overflow-y":"auto"},attrs:{data:e.imgList,"header-cell-style":{"text-align":"center"},"cell-style":{"text-align":"center"}}},[o("el-table-column",{attrs:{type:"index",label:"序号",border:"",align:"center",width:"100px"}}),o("el-table-column",{attrs:{prop:"src",label:"图片"},scopedSlots:e._u([{key:"default",fn:function(e){return[o("el-popover",{attrs:{placement:"right",title:"",trigger:"hover"}},[o("img",{staticStyle:{height:"500px",width:"500px"},attrs:{src:e.row.src}}),o("img",{staticStyle:{"max-height":"50px","max-width":"130px"},attrs:{slot:"reference",src:e.row.src,alt:""},slot:"reference"})])]}}],null,!1,2023095333)}),o("el-table-column",{scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{attrs:{type:"danger",icon:"el-icon-delete",circle:""},on:{click:function(o){return e.deletePhoto(t.$index,t.row.uuid)}}})]}}],null,!1,405206931)})],1):e._e(),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(t){e.orderVisible=!1}}},[e._v("取 消")]),o("el-button",{attrs:{type:"primary"},on:{click:e.submitOrder}},[e._v("确 定")])],1)],1)],1)},r=[],i=(o("ac6a"),o("7f7f"),o("aa47")),l={name:"bookUpload",data:function(){return{tableData:[],idx:"",editVisible:!1,uploadVisible:!1,orderVisible:!1,form:{name:"",author:"",isbn:"",pages:"",describe:"",publishing:""},fileList:[],rules:{name:[{required:!0,message:"请输入书籍名",trigger:"blur"}],author:[{required:!0,message:"请输入作者",trigger:"blur"}],isbn:[{required:!0,message:"请输入isbn号",trigger:"blur"}],pages:[{required:!0,message:"请输入页数",trigger:"blur"},{type:"number",message:"页数需为数字值"}],publishing:[{required:!0,message:"请输入出版社",trigger:"blur"}]},currentBook:{},imgList:[],currentImage:"",tableShow:!0,currentTablePage:1,tempTable:[],totalSize:0}},mounted:function(){var e=this;this.axios.get("/book/bookList").then((function(t){if(0==t.data["code"])return localStorage.removeItem("username"),e.$message.error(t.data["result"]),void e.$router.push("/login");e.tableData=t.data["bookList"];for(var o=0;o<10;o++)e.tableData[o]&&e.tempTable.push(e.tableData[o]);e.totalSize=e.tableData.length})).catch((function(t){e.$message.error("未能获取到书籍列表")}))},methods:{handleEdit:function(e,t){this.idx=e,this.form=JSON.parse(JSON.stringify(t)),this.editVisible=!0},handleDelete:function(e,t){var o=this;this.idx=e;var a=this;this.$confirm("是否确定删除"+t.name+", 删除该书籍携带的资源也会一并删除","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){a.axios.delete("/book/book",{data:{isbn:t.isbn}}).then((function(e){-1==e.data["code"]?a.$message.error("未找到书籍，请刷新页面重试"):0==e.data["code"]?(localStorage.removeItem("username"),a.$message.error(e.data["result"]),a.$router.push("/login")):(a.$message.success("成功删除"),a.tableData.splice(a.idx,1))})).catch((function(){a.$message.error("删除出错，请稍后重试")})),console.log(e)})).catch((function(){o.$message.info("已取消删除")}))},saveEdit:function(e){var t=this,o=this;this.$refs[e].validate((function(e){e?t.axios.post("/book/updateBook",t.form).then((function(e){-1==e.data["code"]?o.$message.error(e.data["result"]):0==e.data["code"]?(localStorage.removeItem("username"),o.$message.error(e.data["result"]),o.$router.push("/login")):(o.$message.success("修改成功"),o.editVisible=!1,o.$set(o.tableData,o.idx,o.form))})).catch((function(e){o.$message.error("修改失败,请重试")})):t.$message.error("修改有误")}))},cancelEdit:function(){this.editVisible=!1},handleUpload:function(e,t){this.currentBook.isbn=t.isbn,this.uploadVisible=!0},submitUpload:function(){this.uploadVisible=!1,this.fileList=[],this.$message.success("上传成功")},handleOrder:function(e,t){this.currentBook.isbn=t.isbn,this.orderVisible=!0},orderOpen:function(){var e=this,t={isbn:this.currentBook.isbn};this.axios.get("/book/getPhoto",{params:t}).then((function(t){if(0==t.data["code"])return localStorage.removeItem("username"),e.$message.error(t.data["result"]),void e.$router.push("/login");e.imgList=t.data,e.imgList.forEach((function(e){e.src="api2/"+e.src}));var o=document.querySelector(".el-dialog__body .el-table__body tbody");i["default"].create(o,{onEnd:function(t){var o=e.imgList.splice(t.oldIndex,1)[0];e.imgList.splice(t.newIndex,0,o)}})})).catch((function(e){}))},submitOrder:function(){var e=this;this.axios.post("/book/uploadOrder",this.imgList).then((function(t){if(-1==t.data["code"])e.$message.error(t.data["result"]);else if(0==t.data["code"])localStorage.removeItem("username"),e.$message.error(t.data["result"]),e.$router.push("/login");else{var o={isbn:e.currentBook.isbn};e.axios.get("/book/getPhoto",{params:o}).then((function(t){if(0==t.data["code"])return localStorage.removeItem("username"),e.$message.error(t.data["result"]),void e.$router.push("/login");e.imgList=t.data,e.imgList.forEach((function(e){e.src="api2/"+e.src})),console.log(e.imgList),e.tableShow=!1,e.$nextTick((function(){e.tableShow=!0})),e.$message.success(t.data["result"])})).catch((function(t){e.$message.error("出错了")}))}})).catch((function(){e.$message.error("出错了，请稍后重试")})),this.orderVisible=!1},deletePhoto:function(e,t){var o=this;this.$confirm("是否确定删除此图片","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){o.axios.delete("/book/photo",{data:{uuid:t}}).then((function(t){-1==t.data["code"]?o.$message.error(t.data["result"]):0==t.data["code"]?(localStorage.removeItem("username"),o.$message.error(t.data["result"]),o.$router.push("/login")):(console.log(e),o.imgList.splice(e,1),o.$message.success(t.data["result"]))})).catch((function(e){}))})).catch((function(){o.$message.info("取消删除")}))},handleCurrentChange:function(e){this.currentTablePage=e;var t=10*(e-1),o=10*e;for(console.log(t,"=>",o),this.tempTable=[];t<o;t++)this.tableData[t]&&this.tempTable.push(this.tableData[t])}}},s=l,n=(o("cb4a"),o("2877")),c=Object(n["a"])(s,a,r,!1,null,"761e7136",null);t["default"]=c.exports},f7b4:function(e,t,o){}}]);