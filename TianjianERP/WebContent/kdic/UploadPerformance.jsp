<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"  errorPage="/hasNoRight.jsp"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>导入企业绩效评价标准值表</title>

<style>
.mySpan {
	color:#FF6600; 
	font-family:"宋体";
	font: normal;
	font-size: 9pt;
	padding: 0px;
	margin: 0px;
}

a:hover{
	text-decoration: underline;
}


input {
	border: 1px solid #AEC9D3;
}

legend {
	color: #006699;
}
 
body {
	background-image:url("${pageContext.request.contextPath}/images/new_bg.gif");
	overflow:hidden ;
	
}
</style>


<script>

function ext_init(){

	var tbar_customer = new Ext.Toolbar({
		renderTo: "divBtn",
		defaults: {autoHeight: true,autoWidth:true},
 		items:[{
			text:'确定',
            cls:'x-btn-text-icon',
            icon:'${pageContext.request.contextPath}/img/save.gif',
            handler:function () {
				checkit();
			}
      	},'-',{
            text:'返回',
            cls:'x-btn-text-icon',
            icon:'${pageContext.request.contextPath}/img/back.gif',
            handler:function(){
				window.history.back();
			}
      	},'-',new Ext.Toolbar.Fill()]
	});
        
}


//响应提交前的检查
function checkit(){
	    var f1=thisForm.image.value;
	    if (f1==""){
	    	//上传文件不得为空
	    	alert("上传文件不得为空");
	    	return false;
	    }
	    if(f1.toLowerCase().indexOf(".xls")>-1){
	    }else{
	    	alert("提供的文件必须是excel文档!");
	    	return false;
	    }
	    
	    document.thisForm.action="${pageContext.request.contextPath}/kdic.do?method=SaveUpload";
	    document.thisForm.submit() ;
	}
</script>

</head>
<body leftmargin="0" topmargin="0">
<div id="divBtn"></div>

<form name="thisForm" method="post" action="" id="thisForm" enctype="multipart/form-data" class="autoHeightForm">

<span class="formTitle" >
	EXCEL&nbsp;&nbsp;导&nbsp;&nbsp;入&nbsp;&nbsp;企&nbsp;&nbsp;业&nbsp;&nbsp;绩&nbsp;&nbsp;效&nbsp;&nbsp;标&nbsp;&nbsp;准&nbsp;&nbsp;值<br/><br/> 
</span>


<fieldset  style="width:100%">
<legend>EXCEL导入</legend>

<table width="80%" height="144" border="0" cellpadding="0" cellspacing="0">
<tr>
<td height="24">&nbsp;</td>
<td >
<br>
	<ul>
	<li><b>EXCEL文件内容格式说明</b></li>
	<li>&nbsp;</li>
	<li>1.EXCEL表中应该有一个叫做&nbsp;<font color=blue><b>企业绩效</b></font>&nbsp;的表页。</li>
	<li>&nbsp;</li>
	<li>2.该表页必须包含：<font color=blue><b>顺序号,年份,行业,规模,项目,优秀值,良好值,平均值,较低值,较差值</b></font>
		&nbsp;这么几列,具体每一列如果没有值的话可以不填。
	</li>
	<li>&nbsp;</li>
	<li>3.如果表页里面：<font color=blue><b>优秀值,良好值,平均值,较低值,较差值</b>  </font>
		&nbsp;这几列的值同时都是空的话,该条记录就不会导入到系统。
	</li>
	<li>&nbsp;</li>
	<li>4.该表页里面所属年份的记录会覆盖掉系统已有该年份的数据。 
	</li>
	<br><br><b><a href='#' onclick="javascript:downLoad();"><font color='#FF0000'>点击下载示例模版</font></a></b>
	</ul>			
</td>
</tr>
<tr><td width="160" height="14">&nbsp;</td><td height=10>&nbsp;</td></tr>
<tr><td width="160" height="24">&nbsp;</td><td>用户数据EXCEL格式文件路径:</td></tr>

  <tr>
<td width="160" height="24">&nbsp;</td>
    <td >
    	<input type="file" name="image" id="image" value=""  size="90" title="请输入，不得为空">
      &nbsp;
	</td>
  </tr>
</table>
</fieldset>

</form>
</body>
</html>
<script type="text/javascript">
    new Validation('thisForm');
    
    function getlocationhost(){
    
		return "http:\/\/"+window.location.host;
	}
  
    var AuditReport =  new ActiveXObject("MTOffice.WebOffice");
    function downLoad() {
    	var url = getlocationhost()+'${pageContext.request.contextPath}/kdic/kdic_performance.zip';
		AuditReport.IEDownLoad3(url, 'kdic_performance.zip',0);

}
</script>

<script Language=JavaScript>ext_init();</script>