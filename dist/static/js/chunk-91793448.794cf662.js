(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-91793448"],{"2ed4":function(e,r,t){"use strict";var s=t("69d0"),a=t.n(s);a.a},"69d0":function(e,r,t){},f36b:function(e,r,t){"use strict";t.r(r);var s=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",[t("div",[t("el-breadcrumb",{attrs:{separator:"/"}},[t("el-breadcrumb-item",[t("i",{staticClass:"el-icon-notebook-1"}),e._v(" 书籍\n            ")]),t("el-breadcrumb-item",[e._v("\n                添加书籍\n            ")])],1)],1),t("div",{staticClass:"container"},[t("div",{staticClass:"form-box"},[t("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"80px","label-position":"left"}},[t("el-form-item",{attrs:{label:"书籍名",prop:"name"}},[t("el-input",{attrs:{"prefix-icon":""},model:{value:e.form.name,callback:function(r){e.$set(e.form,"name",r)},expression:"form.name"}})],1),t("el-form-item",{attrs:{label:"作者",prop:"author"}},[t("el-input",{model:{value:e.form.author,callback:function(r){e.$set(e.form,"author",r)},expression:"form.author"}})],1),t("el-form-item",{attrs:{label:"isbn",prop:"isbn"}},[t("el-input",{model:{value:e.form.isbn,callback:function(r){e.$set(e.form,"isbn",r)},expression:"form.isbn"}})],1),t("el-form-item",{attrs:{label:"页数",prop:"pages"}},[t("el-input",{model:{value:e.form.pages,callback:function(r){e.$set(e.form,"pages",e._n(r))},expression:"form.pages"}})],1),t("el-form-item",{attrs:{label:"出版社",prop:"publishing"}},[t("el-input",{model:{value:e.form.publishing,callback:function(r){e.$set(e.form,"publishing",r)},expression:"form.publishing"}})],1),t("el-form-item",{attrs:{label:"书籍简介"}},[t("el-input",{attrs:{type:"textarea"},model:{value:e.form.describe,callback:function(r){e.$set(e.form,"describe",r)},expression:"form.describe"}})],1),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:function(r){return e.submit("form")}}},[e._v("提交")]),t("el-button",{attrs:{type:"info"}},[e._v("取消")])],1)],1)],1)])])},a=[],o={name:"BookManage",data:function(){return{form:{name:"",describe:"",isbn:"",author:"",publishing:"",pages:""},rules:{name:[{required:!0,message:"请输入书籍名",trigger:"blur"}],author:[{required:!0,message:"请输入作者",trigger:"blur"}],isbn:[{required:!0,message:"请输入isbn号",trigger:"blur"}],pages:[{required:!0,message:"请输入页数",trigger:"blur"},{type:"number",message:"页数需为数字值"}],publishing:[{required:!0,message:"请输入出版社",trigger:"blur"}]}}},methods:{submit:function(e){var r=this;this.$refs[e].validate((function(e){if(!e)return r.$message.error("提交失败，请稍后重试"),!1;r.axios.post("/book/book",r.form).then((function(e){-1==e.data["code"]?r.$message.error("书籍isbn不能重复"):0==e.data["code"]?(localStorage.removeItem("username"),r.$message.error(e.data["result"]),r.$router.push("/login")):(r.$message.success("添加成功"),r.form={name:"",describe:"",isbn:"",author:"",publishing:"",pages:""})})).catch((function(e){r.$message.error("出错了，请稍后重试")}))}))}}},i=o,n=(t("2ed4"),t("2877")),l=Object(n["a"])(i,s,a,!1,null,"7606abde",null);r["default"]=l.exports}}]);