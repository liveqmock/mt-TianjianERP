<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp"%>
<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style>
	 
	.tTable td,th {
		height:30px;
	}


</style>
<script type="text/javascript">
var tbar_project;
var tab;

function setStep(tab) {	
	var btnNext = Ext.getCmp("move-next");
	var btnBack = Ext.getCmp("move-prev");	
	    
    if (tab == 0) {
        btnBack.disable();
    } else {
        btnBack.enable();
    }

    if (tab == 1) {
        btnNext.disable();
    } else {
        btnNext.enable();
    }
}


function extInit(){
	
	function navHandler(dir) {
		var i = 0;
		var cur = 0;
		var curTab = tab.getActiveTab();
	
		tab.items.each(function(item) {   
			if(item == curTab) {
				cur = i;
			} 
			
			i++;
		});  
		
		cur += dir;

	    setStep(cur);	
	    tab.setActiveTab(cur);
	}

	tab = new Ext.TabPanel({
        id: "tab",
        renderTo: "divTab",
        activeTab: 0, //选中第一个 tab
        autoScroll:true,
        frame: true,
        height: document.body.clientHeight-Ext.get('divTab').getTop()-50, 
        defaults: {autoHeight: true,autoWidth:true},
        items:[{
        			contentEl: "tab1", 
        			title: "会议信息", 
        			listeners: {
        				activate: function(){
        					setStep(0);
        				}
        			}
        		},{
        			contentEl: "tab2", 
        			title: "更换参与人",
        			listeners: {
						activate: function(){
        					setStep(1);
        				}
        			}
        		}
        ],
        bbar:[ '->',{
				id:'move-prev',
				text:'上一步',
				disabled: true,
				handler: function(){
					navHandler(-1);
				}  
			},'-',{
				id:'move-next',
				text:'下一步',
				handler: function(){
					navHandler(1);
				}
			},'-',{
				id:'finish',
				text:'完成',
				handler: save
			}
          ]
	});
	
	
	tbar_project = new Ext.Toolbar({
		renderTo: "divBtn",
		items:[
			{ 
				text:'返回',
				cls:'x-btn-text-icon',
				icon:'${pageContext.request.contextPath}/img/back.gif',
				handler:function(){
					window.history.back();
				}
			},'-',
			{ 
				text:'同意',
				cls:'x-btn-text-icon',
				icon:'${pageContext.request.contextPath}/img/save.gif',
				handler:function(){
				
					f_agree();
				}
			},'-',
			{ 
				text:'不同意',
				cls:'x-btn-text-icon',
				icon:'${pageContext.request.contextPath}/img/delete.gif',
				handler:function(){
					f_display("d");
				}
			},'-',
			{ 
				text:'更换',
				cls:'x-btn-text-icon',
				icon:'${pageContext.request.contextPath}/img/edit.gif',
				handler:function(){
					f_display("c");
				}
			}
   		]
    });
      	
 	new Ext.Viewport({
		defaults:{border:false},
		items:[
			tbar_project
		]
	})
	
	var Tree = Ext.tree;
	
	var data = new Tree.TreeLoader({
		 dataUrl:'${pageContext.request.contextPath}/interiorEmail.do?method=getRoleList',
		 baseParams:{joinUser:'${joinUser}',joinUserDepartmentId:'${joinUserDepartmentId}'}
	});
	
	var tree = new Tree.TreePanel({
        el:'departmentTreeDiv',
        id:'departmentTree',
        autoScroll:true,
        animate:true,
        height:320, 
        rootVisible:false,
        containerScroll: true, 
        loader: data
    });
    
    data.on('beforeload',function(treeLoader,node){
		this.baseParams.type = node.attributes.type,
		this.baseParams.departmentId = node.attributes.departmentId
	},data);
		
	tree.on('checkchange', function(node, checked) {   
		node.attributes.checked = checked; 
		node.expand(true,false,function(){   
		node.eachChild(function(child) {  
			child.ui.toggleCheck(checked);   
			child.attributes.checked = checked;   
			child.fireEvent('checkchange', child, checked);   
		});   
		});
		// 处理选中的 人员
		if(checked){
			if(joinUser.value.indexOf(node.attributes.id.substring(5,node.attributes.id.length))<0 && node.attributes.id.indexOf("department_")<0){
				joinUser.value = joinUser.value + node.attributes.id.substring(5,node.attributes.id.length)+",";
			}
			
		}else{
			joinUser.value = joinUser.value.replace(node.attributes.id.substring(5,node.attributes.id.length)+",","");
		}
		
		node.eachChild(function(child) {  
			child.ui.toggleCheck(checked);   
			child.attributes.checked = checked;   
			child.fireEvent('checkchange', child, checked);   
		});   
		
	}, tree);  
	
    var root = new Tree.AsyncTreeNode({
        text: '机构人员列表',
        draggable:false,
        id:'root'
    });
    tree.setRootNode(root);

    tree.render();
	
}


</script>
</head>
<body>
<div id="panel"></div>
<div id="divBtn" ></div>
<form name="thisForm" method="post" action="" id="thisForm" class="autoHeightForm">
<br/>
<table class="tTable" id="tab_reason" style="display: none">
	<tr>
		<td width="15%" style="text-align: right;">原因：</td>
		<td width="65%" style="text-align: left;"><textarea rows="5" cols="90%" id="reason" name="reason" >${reason }</textarea></td>
		<td width="20%" style="text-align: center"><input type="button" value="确定" onclick="f_sure()">&nbsp;&nbsp;&nbsp;<input type="button" value="取消" onclick="f_clear()"></td>
	</tr>
</table>

<br/>	
<div id="divTab" style="overflow:auto">
	<!-- 会议信息 -->
	<div id="tab1" class="tabDiv">
		<table cellpadding="5" align="left" border="0" cellspacing="10">
			<tr>
				<th width="150" style="text-align: right">会议主题<span class="mustSpan">[*]</span>：</th>
				<td align="left">
					<input type="text" 
						   name="title" 
						   id="title"
						   title="必填"
						   maxlength="80"  
						   size="50"
						   value="${mo.title}" class="required" />
				</td>
				<th width="150" style="text-align: right">会议名称<span class="mustSpan">[*]</span>：</th>
				<td align="left">
					<input type="text"
						   name="name"
						   id="name"
						   maxlength="80"
						   value="${mo.name}"
						   title="必填"
						   class="required"
						   size="50" /> 
				</td>
			</tr>
			
			<tr>
				<th width="150" style="text-align: right">会议室<span class="mustSpan">[*]</span>：</th>
				<td>
					<input type="text" 
						   id="meetingRoomId"
						   name="meetingRoomId" 
						   maxlength="50" 
						   size="50"
						   autoWidth="210"
	      				   onkeydown="onKeyDownEvent();" 
	      				   onkeyup="onKeyUpEvent();" 
	      				   onclick="onPopDivClick(this);" 
	      				   autoid=751
	      				   multiselect="true" 
						   value="${mo.meetingRoomId}" class="required" />
				</td>
				<th width="150" style="text-align: right">申请部门<span class="mustSpan">[*]</span>：</th>
				<td align="left">
					<input type="text" 
						   name="departmentId" 
						   id="departmentId"
						   title="申请部门"
						   maxlength="80"  
						   size="50"
						   onKeyDown="onKeyDownEvent();" onKeyUp="onKeyUpEvent();" noinput="true" onClick="onPopDivClick(this);" valuemustexist=true autoid=123 autoHeight=150
						   value="${mo.departmentId}" class="required" />
				</td>
			</tr>
			
			<tr>
				<th width="150" style="text-align: right">会议开始时间<span class="mustSpan">[*]</span>：</th>
				<td >
					<input type="text" id="startTime" name="startTime" value="${mo.startTime }">
				</td>
				<th width="150" style="text-align: right">会议结束时间<span class="mustSpan">[*]</span>：</th>
				<td >
					<input type="text" id="endTime" name="endTime" value="${mo.endTime }">
				</td>
				
			</tr>
			
			<tr>
				<th width="150" style="text-align: right">接待要求：</th>
				<td colspan="3">
					<input type="text" 
						   id="requirements"
						   name="requirements" 
						   maxlength="50" 
						   size="50"
						   autoWidth="210"
	      				   onkeydown="onKeyDownEvent();" 
	      				   onkeyup="onKeyUpEvent();" 
	      				   onclick="onPopDivClick(this);" 
	      				   autoid=10022
	      				   multiselect="true" 
	      				   refer="requirementsType"
						   value="${mo.requirements}" />
				</td>
			</tr>
			
			<tr>
				<th width="150" style="text-align: right">设备要求：</th>
				<td colspan="3">
					<input type="text" 
						   id="equipment"
						   name="equipment" 
						   maxlength="50" 
						   size="50"
						   autoWidth="210"
	      				   onkeydown="onKeyDownEvent();" 
	      				   onkeyup="onKeyUpEvent();" 
	      				   onclick="onPopDivClick(this);" 
	      				   autoid=10022
	      				   multiselect="true" 
	      				   refer="deviceDescribe"
						   value="${mo.equipment}" />
				</td>
			</tr>
			
			<tr>
				<th width="150" style="text-align: right">附件：</th>
				<td colspan="3">
					<input type="hidden" 
						   id="attachFileId"
						   name="attachFileId" 
						   maxlength="50" 
						   size="50"   
						   value="${mo.attachFileId}" />
					<script type="text/javascript">
						attachInit('meetingOrder','${mo.attachFileId}','showButton:false,remove:false');					
					</script>
				</td>
			</tr>
			
			<tr>
				<th width="150" style="text-align: right">事由：</th>
				<td colspan="3">
					<input type="text"
						   id="event"
						   name="event"
						   value="${mo.event}"
						   maxlength="500"
						   size="117" />
				</td>
			</tr>
			
			<tr>
				<th width="150" style="text-align: right">会议描述：</th>
				<td colspan="3">
					<textarea name="describes" id="describes" style="width: 90%;height: 100px;">${mo.describes }</textarea>
				</td>
			</tr>
			
		</table>
	</div>
	
	<!-- 成员 -->
	<div id="tab2" class="x-hide-display tabDiv">
		<table width="98%" height="320" cellspacing="10">
			<tr>
				<!-- 项目分工左边的部门人员树 -->
				<td id="departmentTreeDiv" style="overflow-y:auto;" width="30%" valign="top">
				</td>
			</tr>		
		</table>	
	</div>
	
	
</div>

<input type="hidden" id="param" name="param" value="" >
<input type="hidden" id="uuid" name="uuid" value="${mo.uuid}" >
<input type="hidden" id="opt" name="opt" value="" >
<input type="hidden" id="joinUser" name="joinUser" value="${joinUser}">
<input type="hidden" id="joinUserDepartmentId" name="joinUserDepartmentId" value="${joinUserDepartmentId}" >

</form>
</body>

<script type="text/javascript">

var joinUser = document.getElementById("joinUser");


//ext初始化
Ext.onReady(extInit);
Ext.onReady(view);

function view(){
	var form_obj = document.all; 
	//form的值
	for (i=0;i<form_obj.length ;i++ ) {
		e=form_obj[i];
		if (e.tagName=='INPUT' || e.tagName=='TEXTAREA') {
			if(e.id!="reason"){
				e.readOnly = true ;
			}
		}
	}
		
}

// 显示隐藏
function f_display(p){
	document.getElementById("param").value = p;
	if(document.getElementById("tab_reason").style.display=="none"){
		document.getElementById("tab_reason").style.display="";
	}else{
		document.getElementById("tab_reason").style.display="none";
	}
}

// 清空
function f_clear(){
	document.getElementById("reason").value = "";
	document.getElementById("tab_reason").style.display="none";
}


// 同意
function f_agree(){
	
	document.getElementById("opt").value = "agree";
	var form = document.getElementById("thisForm");
	form.action = "${pageContext.request.contextPath}/meetingOrder.do?method=saveOpt";
	
	showWaiting();
	
	form.submit();
}


// 不同意或者更换
function f_sure(){
	
	var reason = document.getElementById("reason").value + "";
	var param = document.getElementById("param").value + "";
	if(param=="d"){
		if(reason==""){
			alert("请填写不同意原因！");
			return;
		}else{
			document.getElementById("opt").value = "disagree";
		}
	}else{
		var joinUser = document.getElementById("joinUser").value + "";
		if(joinUser==""){
			alert("请选择更换参与人！");
			return;
		}else{
			if(reason==""){
				alert("请填写更换意原因！");
				return;
			}else{
				document.getElementById("opt").value = "change";
			}
		}		
	}

	var form = document.getElementById("thisForm");
	form.action = "${pageContext.request.contextPath}/meetingOrder.do?method=saveOpt";
	
	showWaiting();

	form.submit();
}

	 
</script>
</html>