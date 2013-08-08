<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8" errorPage="/hasNoRight.jsp"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>合同实际结算登记</title>

<script type="text/javascript">  

function ext_init(){
	var tbar_practicalbalance = new Ext.Toolbar({
		renderTo: 'gridDiv_practicalbalance',
		items:[{
			text:'新增', 
			cls:'x-btn-text-icon',
	   		icon:'${pageContext.request.contextPath}/img/add.gif',
			handler:function () {
				goAdd();
			}
		},'-',{
            text:'修改',
            cls:'x-btn-text-icon',
            icon:'/AuditSystem/img/edit.gif',
           	handler:function(){
				goEdit();
			}
        },'-',{
            text:'删除',
            cls:'x-btn-text-icon',
            icon:'${pageContext.request.contextPath}/img/delete.gif',
            handler:function () {
            	goDelete();
            }
        },'-',{
			text:'查询', 
			id:'btn-query',
			cls:'x-btn-text-icon',
	   		icon:'${pageContext.request.contextPath}/img/query.gif',
			handler:function () {
            	queryWinFun();
            }
		},'-',{
			text:'打印',
			cls:'x-btn-text-icon',
			icon:'${pageContext.request.contextPath}/img/print.gif',
			handler:function () {
				print_practicalbalance();
			}
		},'-',{
			text:'关闭',
			cls:'x-btn-text-icon',
            icon:'${pageContext.request.contextPath}/img/close.gif',
			handler:function () {
				closeTab(parent.tab);
				//parent.tab.remove(parent.tab.getActiveTab()); 
			}
		}]
	});
	
	
} 

var queryWin = null;
function queryWinFun(id){
	var searchDiv = document.getElementById("search") ;
	searchDiv.style.display = "" ; 	
	if(!queryWin) { 
	    queryWin = new Ext.Window({
			title: '查询',
			contentEl:'search',
		    renderTo :'searchWin',
	     	width: 350,
	     	height:150,
        	closeAction:'hide',
       	    listeners : {
	         	'hide':{
	         		fn: function () {
	         			new BlockDiv().hidden();
	         			searchDiv.style.display = "none" ;
						queryWin.hide();
					}
				}
	        },
        	layout:'fit',
	    	//html:searchDiv.innerHTML,
	    	buttons:[{
            	text:'确定',
          		handler:function(){
          			thisForm.submit();
    	           	queryWin.hide();
               		
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

window.attachEvent('onload',ext_init);

</script>



</head>

<body >



<form name="thisForm" method="post" action="/AuditSystem/practicalbalance.do">

<div style="height:expression(document.body.clientHeight-23);" >
<mt:DataGridPrintByBean name="practicalbalance" /></form>
</div>

<div id="searchWin" style="position:absolute;left:expression((document.body.clientWidth)/2);top:expression((document.body.clientHeight)/2); z-index: 2"></div>

<div id="search" style="display:none">
<br/>
<div style="margin:0 20 0 20">请在下面输入查询条件：</div>

<table border="0" cellpadding="0" cellspacing="0" width="100%"  bgcolor="" >
	<tr align="center">
		
		<td align="right">合同编号：</td>
		<td align=left>
			<input name="cid" type="text" class='required'
				id="cid" maxlength="40" onkeydown="onKeyDownEvent();"
				onkeyup="onKeyUpEvent();" onclick="onPopDivClick(this);"
				valuemustexist="true" autoid="2014" >
		</td>
	</tr>
</table>
</div>
</body>
</html>
<Script>

function goAdd()
{
//	window.location="/AuditSystem/oa/postchange/AddandEdit.jsp?all=${all}";
	window.location="practicalbalance.do?method=edit";
}
function goDelete()
{	
	if(document.getElementById("chooseValue_practicalbalance").value=="")
	{
		alert("请选择要删除的合同实际结算登记记录！");
	}
	else
	{
		//alert(document.thisForm.chooseValue.value);
		if(confirm("确定删除此合同实际结算登记记录？")){
			window.location="practicalbalance.do?method=del&&autoid="+document.getElementById("chooseValue_practicalbalance").value;
		}
	}
}
function goEdit()
{
	if(document.getElementById("chooseValue_practicalbalance").value=="")
	{
		alert("请选择要修改的合同实际结算登记记录！");
	}
	else
	{
		//alert(document.thisForm.chooseValue.value);
		window.location="/AuditSystem/practicalbalance.do?method=edit1&autoid="+document.getElementById("chooseValue_practicalbalance").value;
	}
}
</Script>