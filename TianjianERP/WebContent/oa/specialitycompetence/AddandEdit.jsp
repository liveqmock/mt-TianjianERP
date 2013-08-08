<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" errorPage="/hasNoRight.jsp"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/calendar_include.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<title>专业资格登记</title>
<style>

.before{
	border: 0px;
	background-color: #ffffff !important;
}

.data_tb {
	background-color: #ffffff;
	text-align:center;
	margin:0 0px;
	width:80%;
	border:#8db2e3 1px solid; 
	border-collapse: collapse; 
}
.data_tb_alignright {	
	background: #e4f4fe; 
	white-space:nowrap;
	padding:5px;
	border-top: #8db2e3 1px solid;
	border-left: #8db2e3 1px solid;
	border-right: #8db2e3 1px solid;
	border-bottom: #8db2e3 1px solid; 
	height:30px;
	background-color: #d3e1f1;
	font-size: 13px;
	font-family:"宋体";
}
.data_tb_content {
	padding-left: 2px; 
	border-top: #8db2e3 1px solid; 
	border-left: #8db2e3 1px solid;
	border-right: #8db2e3 1px solid;
	border-bottom: #8db2e3 1px solid;  
	word-break: break-all; 
	text-align: left; 
	word-wrap: break-word
}

</style>
<script type="text/javascript">


Ext.onReady(function (){
	new Ext.Toolbar({
			renderTo: "divBtn",
			height:30,
			defaults: {autoHeight: true,autoWidth:true},
	       items:[{ 
	           id:'saveBtn',
	           text:'保存',
	           icon:'${pageContext.request.contextPath}/img/save.gif' ,
	           handler:function(){
	        	   if (!formSubmitCheck('thisForm')){
	        	   		return;
	        	   }else{
				   		mySubmit();
				   }
			   }
	     	 },'-',{ 
	        text:'返回',
	        icon:'${pageContext.request.contextPath}/img/back.gif', 
	        handler:function(){
				f_back();
			}
	  	},'->']
	});
	 
	new Ext.form.DateField({
		applyTo : 'certificatetime',
		width: 133,
		format: 'Y-m-d'
	});
	
	new Ext.form.DateField({
		applyTo : 'availabilitytime',
		width: 133,
		format: 'Y-m-d'
	});
});
</script>

</head>
<body leftmargin="0" topmargin="0">
<div id="divBtn" ></div>
<input type="hidden" id="autoid" name="autoid" value="${autoid }" />
<form name="thisForm" method="post"	action="" enctype="multipart/form-data" id="thisForm">

<jodd:form bean="sct" scope="request">
<span class="formTitle" >专业资格登记<br/><br/> </span><br>

	<table  cellpadding="8" cellspacing="0" align="center" class="data_tb" >
		<c:if test="${all=='all' || param.all=='all'}">
			<tr>
				<td class="data_tb_alignright"  width="20%" align="right">持证人<span class="mustSpan">[*]</span>:</td>
				<td class="data_tb_content"><input name="userid" type="text" class='required' id="userid" maxlength="40" onkeydown="onKeyDownEvent();" onkeyup="onKeyUpEvent();" onclick="onPopDivClick(this);" valuemustexist="true" autoid="7"></td>
			</tr>
		</c:if>
		<tr>
			<td class="data_tb_alignright"  width="20%" align="right">证书名称<span class="mustSpan">[*]</span>：</td>
			<td class="data_tb_content"><input id="certificate" type="text" class="required" maxlength="18" name="certificate" title="请输入，不能为空！" size=50/></td>
		</tr>
		<tr>
			<td class="data_tb_alignright"  width="20%" align="right">证书编号<span class="mustSpan">[*]</span>：</td>
			<td class="data_tb_content"><input type="text" id="certificateid" class="required" name="certificateid" title="请输入，不能为空！" /></td>
		</tr>

		<tr>
			<td class="data_tb_alignright"  width="20%" align="right">发证机关<span class="mustSpan">[*]</span>：</td>
			<td class="data_tb_content"><input type="text" id="certificatedepartment" class="required" maxlength="20" name="certificatedepartment" title="请输入，不能为空！" size=50/></td>
		</tr>
		<tr>
			<td class="data_tb_alignright"  width="20%" align="right">是否代管：</td>
			<td class="data_tb_content"><select name="ifera">
				<option value="是" selected>是</option>
				<option value="否">否</option>
				</select>
			</td>

		</tr>
		<tr>
			<td class="data_tb_alignright"  width="20%" align="right">取得证书时间：</td>
			<td class="data_tb_content"><input name="certificatetime" type="text" id="certificatetime" class="validate-date-cn" title="请输入日期！" ></td>
		</tr>
		<tr>
			<td class="data_tb_alignright"  width="20%" align="right">有效期：</td>
			<td class="data_tb_content"><input name="availabilitytime" type="text" id="availabilitytime" class="validate-date-cn" title="请输入日期！" ></td>
		</tr>
		<tr>
			<td class="data_tb_alignright"  width="20%" align="right">备注：</td>
			<td class="data_tb_content"><textarea rows="5" cols="50" id="remark" name="remark"></textarea></td>
		</tr>
		<tr>
			<td class="data_tb_alignright"  width="20%" align="right">附件：</td>
			<td class="data_tb_content">
			<input name="fileRondomNames" type="hidden" id="fileRondomNames" >
		  	<script>
				attachInit('oa/specialityFoder','${sct.fileRondomNames}');					
			</script>
			</td>
		</tr>		
		
	</table>
					

</jodd:form>


<input name="AS_dog" type="hidden" id="AS_dog" value=""></form>


<form action="" method="POST" id="myForm" name="myForm">
	
	<input type="hidden" id="fileName_CH" name="fileName_CH">
	
</form>


<script type="text/javascript">
new Validation('thisForm');


function deleteLine()
{	
	var t=false;
	
	
	for (var i=uploadTbody.children.length-1; i>=0 ; i-- ) {
	var tbodyObj = uploadTbody.children[i].firstChild.firstChild ;
	if (tbodyObj.checked){
		
		if(tbodyObj.isExist) {
			
			if(confirm("您的操作可能会导致文件丢失,您确定删除吗?"))  {
			
				var oBao = new ActiveXObject("Microsoft.XMLHTTP");
				var url="${pageContext.request.contextPath}/specialitycompetence.do?method=deleteUpload&autoId=${autoid}&fileName="+tbodyObj.fileName;
				oBao.open("POST", url, false);		
				oBao.send();
				if(oBao.responseText == "notFound"){
					alert("找不到文件，请联系管理员!");
					return false;
				}else if(oBao.responseText == "fail") {
					alert("附件删除失败!");
					return false;
				}else if(oBao.responseText == "suc"){
					alert("附件删除成功!");
					uploadTbody.deleteRow(i);
				}
				
				}
				t=true;
			}
		else {
			uploadTbody.deleteRow(i);
			t=true;
			}
		}
	}
	if(!t)
	{
		alert("请选定其中一列！！");
	}
	
}

function addLine()
{

	var objTr=attachstable.insertRow(-1);

	var objTd=objTr.insertCell(-1);
	objTd.innerHTML="<input type=checkbox id=checkLine name=\"checkbox\">";

	objTd=objTr.insertCell(-1);
	objTd.innerHTML="<input type=\"file\" name=\"uploadFile\" style=\"width:100%\">";
	
	
}

function goDownload(fileName) {

	document.getElementById("fileName_CH").value = fileName ;	
	myForm.action = "${pageContext.request.contextPath}/specialitycompetence.do?method=download&autoid=${autoid}";

	myForm.submit(); 
	
}


function mySubmit() {
	if(document.getElementById("certificatetime").value>document.getElementById("availabilitytime").value) {
		alert("取得证书时间不能大于证书有效时间");
		return false;
	}
	
	if(document.getElementById("autoid").value!="") {
	
		thisForm.action="${pageContext.request.contextPath}/specialitycompetence.do?method=update&autoid="+document.getElementById("autoid").value+"&all=${all}";
	} else {
	
		thisForm.action="${pageContext.request.contextPath}/specialitycompetence.do?method=add&all=${param.all}";
	}
	document.thisForm.submit();
}

// 返回
function f_back(){
	history.back()
}
</script>

</body>
</html>
