<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" errorPage="/hasNoRight.jsp"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp"%>	
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>公告管理</title>
<script type="text/javascript">


function ext_init(){ 
	var tbar = new Ext.Toolbar({
		renderTo: 'divBtn',
		items:[{
	           text:'查看',
	           cls:'x-btn-text-icon',
	           icon:'${pageContext.request.contextPath}/img/query.png',
	           handler:function(){
	        	   goLook();
			   }
	     },'-',{
			text:'查询',
	   		icon:'${pageContext.request.contextPath}/img/query.gif',
	   		 handler:queryWinFun
		},'-',{
			text:'刷新',
	   		icon:'${pageContext.request.contextPath}/img/refresh.gif',
	   		 handler:function(){
	   			empty();
	   			goSearch_MyLookProclamationList();
	   		 }
		}
        ]
     });  
	

	//window 面板 进行查询
	var queryWin = null;
	function queryWinFun(id){
		resizable:false;
		var searchDiv = document.getElementById("divCheck_select") ;
		searchDiv.style.display = "block" ;
		if(!queryWin) { 
		    queryWin = new Ext.Window({
				title: '公告查询',
				resizable:false,   //禁止用户 四角 拖动
				contentEl:'divCheck_select',
		     	//renderTo : searchWin,
		     	width: 300,
		     	height:230,
	        	closeAction:'hide',
	       	    listeners : {
		         	'hide':{
		         		fn: function () {
		         			new BlockDiv().hidden();
							queryWin.hide();
						}
					}
		        },
	        	layout:'fit',
		    	buttons:[{
	            	text:'搜索',
	          		handler:function(){
	          			goSearch_MyLookProclamationList();
						queryWin.hide();
	            	}
	        	},{
	            	text:'清空',
	            	handler:function(){
	            		empty();
	            	}
	        	},{
	            	text:'取消',
	            	handler:function(){
	               		queryWin.hide();
	            	}
	        	}]
		    });
	    }
	    new BlockDiv().show();
	    queryWin.show();
	}
}
window.attachEvent('onload',ext_init);

</script>

</head>

<body leftmargin="0" topmargin="0">
<div id="divBtn"></div> 

<div style="height:expression(document.body.clientHeight-28);" >
	<mt:DataGridPrintByBean name="MyLookProclamationList" />
</div>

<div id="divCheck_select" style="display: none;">
	<table border="0" align="center" width="100%" style="line-height: 25px;">
		<tr>
			<td colspan="2" height="10"></td>
		</tr>
		<tr>
			<td width="30%" align="right">标题：</td>
			<td><input type="text" id="title" name="title"></td>
		</tr>
		<tr>
			<td width="30%" align="right">发布日期：</td>
			<td><input type="text" id="publishDate" name="publishDate"></td>
		</tr>
		<tr>
			<td align="right">内容：</td>
			<td>
				<textarea rows="5" cols="25" id="content" name="content"></textarea>
			 </td>
		</tr>
	</table>
</div>
<Script>

new Ext.form.DateField({			
	applyTo : 'publishDate',
	width: 133,
	format: 'Y-m-d'	
});

function goAdd()
{
	window.location="${pageContext.request.contextPath}/proclamation.do?method=addSkip";
}
function goDelete()
{	
	
	var uuid = document.getElementById("chooseValue_proclamationList").value;
	
	if(uuid=="")
	{
		alert("请选择要删除的公告！");
		return ;
	}
	else
	{
		if(confirm("确定删除此公告吗？","yes")){
			 var url="${pageContext.request.contextPath}/proclamation.do?method=getStatus";
			 var requestString = "&uuid="+uuid;
			 var request= ajaxLoadPageSynch(url,requestString);
			 if(request !="未发起"){
				 alert("您的公告状态是"+request+"，不能删除，只有状态为未发起的才能进行删除!");
				 return ;
			 }
			window.location="proclamation.do?method=delete&&uuid="+uuid;
		}
	}
}

function goFlow(){
	var uuid = document.getElementById("chooseValue_proclamationList").value;
	
	if(uuid=="")
	{
		alert("请选择要发起的公告！");
		return ;
	}
	else
	{
		if(confirm("确定要发起此公告吗？","yes")){
			 var url="${pageContext.request.contextPath}/proclamation.do?method=getStatus";
			 var requestString = "&uuid="+uuid;
			 var request= ajaxLoadPageSynch(url,requestString);
			 if(request !="未发起"){
				 alert("您的公告状态是"+request+"，不能在次发起!");
				 return ;
			 }
			window.location="proclamation.do?method=startFlow&uuid="+uuid;
		}
	}
}

function goUpdate(){
	 	var uuids =  document.getElementById("chooseValue_proclamationList").value;	
	 
	 	if(uuids=="" || uuids==null){
			alert("请选择要修改的对象！");
			return;
	   	}else{
	   		 var url="${pageContext.request.contextPath}/proclamation.do?method=getStatus";
			 var requestString = "&uuid="+uuids;
			 var request= ajaxLoadPageSynch(url,requestString);
			 if(request !="未发起"){
				 alert("您的公告状态是"+request+"，不能进行修改操作");
				 return ;
			 }
	   		
			 window.location = "${pageContext.request.contextPath}/proclamation.do?method=updateSkip&uuid="+uuids;
				 
		}
}

//作废
function goCancel(){
	
	var uuid = document.getElementById("chooseValue_proclamationList").value;
	
	if(uuid=="")
	{
		alert("请选择要作废的公告！");
		return ;
	}
	else
	{
		if(confirm("确定要作废此公告吗？","yes")){
			 var url="${pageContext.request.contextPath}/proclamation.do?method=getStatus";
			 var requestString = "&uuid="+uuid;
			 var request= ajaxLoadPageSynch(url,requestString);
			 if(request =="未发起" || request =="已审批"){
				 alert("您的公告状态是"+request+"，不能进行作废操作");
				 return ;
			 }
			 url="${pageContext.request.contextPath}/proclamation.do?method=updateStatus";
			 requestString = "&uuid="+uuid;
			 request = ajaxLoadPageSynch(url,requestString);
			 if(request =="true"){
				 alert("作废成功!");
				 goSearch_proclamationList();
				 return ;
			 }
		}
	}
	
}

function goLook(){
 	var uuids =  document.getElementById("chooseValue_MyLookProclamationList").value;	
 
 	if(uuids=="" || uuids==null){
		alert("请选择要查看的对象！");
		return;
   	}else{
		 window.location = "${pageContext.request.contextPath}/proclamationSy.do?method=look&uuid="+uuids;
			 
	}
}
function empty(){
	document.getElementById("title").value="";
	document.getElementById("publishDate").value="";
	document.getElementById("content").value="";
}
</Script>