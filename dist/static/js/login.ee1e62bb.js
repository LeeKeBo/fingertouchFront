(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login"],{"0290":function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"login-wrap"},[s("div",{staticClass:"ms-login"},[s("div",{staticClass:"ms-title"},[e._v("指点播读后台管理系统")]),s("el-form",{ref:"login",staticClass:"ms-content",attrs:{model:e.param,rules:e.rules,"label-width":"0px"}},[s("el-form-item",{attrs:{prop:"username"}},[s("el-input",{model:{value:e.param.username,callback:function(t){e.$set(e.param,"username",t)},expression:"param.username"}},[s("el-button",{attrs:{slot:"prepend",icon:"el-icon-lx-people"},slot:"prepend"})],1)],1),s("el-form-item",{attrs:{prop:"password"}},[s("el-input",{attrs:{type:"password"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.submitForm()}},model:{value:e.param.password,callback:function(t){e.$set(e.param,"password",t)},expression:"param.password"}},[s("el-button",{attrs:{slot:"prepend",icon:"el-icon-lx-lock"},slot:"prepend"})],1)],1),s("div",{staticClass:"login-btn"},[s("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm()}}},[e._v("登录")])],1),s("p",{staticClass:"login-tips"},[e._v("Tips : 用户名和密码随便填。")])],1)],1)])},a=[],n=(s("a18c"),{data:function(){return{param:{username:"测试用户",password:"test123TEST"},rules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]}}},methods:{submitForm:function(){var e=this,t=this;this.$refs.login.validate((function(s){if(!s)return e.$message.error("请输入账号和密码"),console.log("error submit!!"),!1;t.axios.post("/auth/login",t.param).then((function(e){1==e.data["code"]?(t.$message.success("登录成功"),localStorage.setItem("username",t.param.username),localStorage.setItem("type",e.data["type"]),t.$router.push("/home")):t.$message.error(e.data["result"])})).catch((function(e){t.$message.error(e.data["result"])}))}))}}}),o=n,i=(s("b65d"),s("2877")),l=Object(i["a"])(o,r,a,!1,null,"36e49628",null);t["default"]=l.exports},b65d:function(e,t,s){"use strict";var r=s("e04b"),a=s.n(r);a.a},e04b:function(e,t,s){}}]);