(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-82caa066"],{3375:function(e,o,t){"use strict";var l=t("458e"),i=t.n(l);i.a},"458e":function(e,o,t){},a80e:function(e,o,t){"use strict";t.r(o);var l=function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{"element-loading-text":"请稍后","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)"}},[t("el-form",{ref:"form",staticClass:"container",attrs:{model:e.form,rules:e.rules,"label-width":"80px","label-position":"left"}},[t("el-form-item",{attrs:{label:"选择书籍",prop:"book"}},[t("el-select",{attrs:{placeholder:"请选择书籍"},model:{value:e.form.book,callback:function(o){e.$set(e.form,"book",o)},expression:"form.book"}},e._l(e.options,(function(e){return t("el-option",{attrs:{label:e.label,value:e.value}})})),1)],1),t("el-form-item",{attrs:{label:"选择图片",prop:"file"}},[t("el-upload",{attrs:{action:"/api1/resource/getPhoto","on-success":e.handleSuccess,"on-error":e.handleError,"file-list":e.fileList,"list-type":"card",limit:1,accept:".png,.jpeg,.jpg"}},[t("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")]),t("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("只能上传一张jpg/png/jpeg文件，且不超过500kb")])],1)],1),t("el-form-item",{attrs:{label:"提交"}},[t("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("提交")]),t("el-button",{attrs:{type:"primary"},on:{click:e.look}},[e._v("查看识别效果")])],1)],1),t("div",{staticStyle:{"text-align":"center"},style:{display:e.displayResult}},[t("div",[t("span",[e._v("手指位置: ")]),t("span",[e._v(e._s(e.result["finger"]))])]),t("div",[t("span",[e._v("页数: ")]),t("span",[e._v(e._s(e.result["page"]))])])]),t("el-dialog",{attrs:{title:"识别结果",visible:e.dialogVisible,width:"30%"},on:{"update:visible":function(o){e.dialogVisible=o}}},[t("el-image",{attrs:{src:e.imgURL}}),t("span",{attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(o){e.dialogVisible=!1}}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:function(o){e.dialogVisible=!1}}},[e._v("确 定")])],1)],1)],1)},i=[],a={name:"Test",data:function(){return{options:[{value:"book1",label:"book1"},{value:"book2",label:"book2"}],form:{book:"",filename:""},rules:{book:[{required:!0,message:"请输入书籍名",trigger:"blur"}],file:[]},fileList:[],book:"",result:"",imgURL:"",dialogVisible:!1,loading:!1,displayResult:"none"}},methods:{handleSuccess:function(e,o,t){this.form.filename=e,console.log("fileList:",t),console.log("file:",o)},handleError:function(e,o,t){console.log("response:",e)},look:function(){""===this.imgURL?this.$message.info("请先上传图片"):this.dialogVisible=!0},submit:function(){var e=this,o=this;this.$refs["form"].validate((function(t){if(!t)return console.log("error submit!!"),!1;console.log(o.form.filename),console.log(o.form.book),""!==o.form.filename?(o.loading=!0,o.axios.post("/api1/resource/testPhoto",{filename:o.form.filename,book:o.form.book}).then((function(e){o.result=e.data,o.imgURL="http://fingertouchback.szulikebo.top:5000/"+e.data["img"],o.loading=!1,o.displayResult="",console.log(o.imgURL)})).catch((function(e){o.result=e.data,o.loading=!1,o.displayResult=""}))):e.$message.error("请选择识别的图片")}))}}},s=a,n=(t("3375"),t("2877")),r=Object(n["a"])(s,l,i,!1,null,"971cd520",null);o["default"]=r.exports}}]);