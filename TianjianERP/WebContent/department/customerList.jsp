<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" errorPage="/hasNoRight.jsp"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>部门客户列表</title>
<script type="text/javascript">

Ext.onReady(function(){
	 new Ext.Toolbar({
		renderTo:'divBtn',
           items:[{
	            text:'查询',
	            icon:'${pageContext.request.contextPath}/img/query.gif',
	            handler:function(){
	            	queryWinFun();
				}
      		},'-',{
	            text:'返回',
	            icon:'${pageContext.request.contextPath}/img/back.gif',
	            handler:function () {
	            	window.history.back();
	            }
	        }]
     });  
	 

});

var queryWin = null;
function queryWinFun() {
	document.getElementById("search").style.display = "";
	if(queryWin == null) { 
	    queryWin = new Ext.Window({
			title: '部门客户查询',
			width: 400,
			height:250,
			contentEl:'search', 
			modal:true,
	        closeAction:'hide',
	        listeners:{
				'hide':{fn: function () {
					 document.getElementById("search").style.display = "none";
				}}
			},
	        layout:'fit',
	        contentEl:'search',
		    buttons:[{
	            text:'确定',
	          	handler:function() {
	          		goSearch_staticCustomerList();
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
	 queryWin.show();
}
</script>
</head>
<body>
<div id="divBtn" ></div>
<div style="height: expression(document.body.clientHeight-27);">
	<mt:DataGridPrintByBean name="staticCustomerList"/>
</div>

<div id="search" style="display: none;">
<br/>
<div style="margin:0 20 0 20">请在下面输入查询条件：</div>
<div style="border-bottom:1px solid #AAAAAA; height: 1px;margin:0 20 4 20" ></div>
	<table border="0" cellpadding="0" cellspacing="5" width="100%" bgcolor="">
		
        
         <tr>
			<td align="right">客户名：</td>
			<td align=left>
				<input type="text"
						id="customerName"
						name="customerName">
			</td>
		 </tr>
		 
		 <tr>
			<td align="right">客户性质：</td>
			<td align=left>
				<input type="text"
						id="property"
						name="property">
			</td>
		 </tr>
		 
	</table>
</div>
</body>

<script type="text/javascript">

	function grid_dblclick(obj){
		window.location="customer.do?method=del&&act=update&&chooseValue="+obj.departid;
	}
</script>

</html>
