<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" errorPage="/hasNoRight.jsp"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>部门列表</title>
<script type="text/javascript">

var tree;
var root;
function tree(divName){
	var Tree = Ext.tree;
	
	document.getElementById(divName).innerHTML = "";

	var data=new Ext.tree.TreeLoader({
		url:'${pageContext.request.contextPath}/user.do?method=departmentTreeByUseridAndMenuid&menuid=10000448'
	});
	
	 var treeToolBar = new Ext.Toolbar({
			items:[
				{ 
					text:'刷新',
					icon:'${pageContext.request.contextPath}/img/setting.gif' ,
					handler:function(){
						var node = tree.getSelectionModel().getSelectedNode();
						if(node) {
							var parentId = node.id;
							typeWinFun(parentId);
						} else {
							alert("请先选择一个上级分类");
						}	
					}
				}
			]
		});
	
	tree = new Tree.TreePanel({
	    animate:true, 
	    autoScroll:true,
	    containerScroll: true,
	    loader:data,
	    border: true,
	    autoWidth:true,
        height: document.body.clientHeight-25,
	    rootVisible:false,
	    dropConfig: {appendOnly:true}
	    ,toolbar:[treeToolBar]
	}); 
	
	data.on('beforeload',function(treeLoader,node){
		this.baseParams.departid = node.attributes.departid,
		this.baseParams.areaid = node.attributes.areaid,
		this.baseParams.departname = node.attributes.departname,
		this.baseParams.isSubject = node.attributes.isSubject,
		this.baseParams.emtype = node.attributes.emtype
	},data);

	tree.on('click',function(node,event){
		//alert(node.attributes.departid+"|"+node.attributes.areaid+"|"+node.attributes.isSubject);
		var divIframe = document.getElementById("divIframe"); 
		var fform=document.forms["fform"];
		if(node.attributes.isSubject == "3"){
            fform.action="${pageContext.request.contextPath}/user.do?method=userManagerList2&departmentidNList="+node.attributes.departid+"&areaid="+node.attributes.areaid;
            fform.departmentid.value=node.attributes.departid;
            var pn=node;
            
            while(!pn.attributes.emtype&&pn.parentNode){
            	pn=pn.parentNode;
            }
            
            fform.emtype.value=pn.attributes.emtype;
            fform.submit();
            stopWaiting();
		}
	});
	
	root=new Ext.tree.AsyncTreeNode({
	   id:'0',
	   text:'显示全部'
	});
	tree.setRootNode(root);

	tree.render('tree'); 
	tree.expandAll();
	root.expand(); 
	//tree.expandChildNodes(true);
}

Ext.onReady(function(){

    // NOTE: This is an example showing simple state management. During development,
    // it is generally best to disable state management as dynamically-generated ids
    // can change across page loads, leading to unpredictable results.  The developer
    // should ensure that stable state ids are set for stateful components in real apps.
    Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
    
    var viewport = new Ext.Viewport({
        layout: 'border',
        items: [
        // create instance immediately
         {
            region: 'west',
           
            split: true,
            width: 250,
            
            collapseMode:'mini',
           
            contentEl:"west"
        },
        // in this instance the TabPanel is not wrapped by another panel
        // since no title is needed, this Panel is added directly
        // as a Container
        new Ext.Panel({
            region: 'center', // a center region is ALWAYS required for border layout
            deferredRender: false,
            activeTab: 0,     // first tab initially active
            contentEl:"centerDiv"
        })]
    });
    // get a reference to the HTML element with id "hideit" and add a click listener to it 
    
    new Ext.Toolbar({
    	renderTo:"tbDiv",
    	items:[
    	  {
    		  text:"刷新",
    		  icon:'${pageContext.request.contextPath}/img/add.gif',
    		  handler:function () {
    			 root.reload();		
    				}
    	  }
    	]
    });
    
    
    tree("tree");
});
</script>
</head>
<body>
<form name="fform" target="divIframe" method="post">
   <input type="hidden" name="departmentid" />
   <input type="hidden" name="emtype" />  
   <input type="hidden" name="qryWhere_em" /> 
   <input type="hidden" name="qryJoin_em" /> 
</form>
<!-- use class="x-hide-display" to prevent a brief flicker of the content -->
<div id="west" class="x-hide-display" >
    
      <div id="tbDiv"></div>
      <div style="height:expression(document.body.clientHeight+3);overflow:auto;" >
         <div id="tree"></div>
      </div>
    
</div>
<div id="centerDiv" class="x-hide-display">
			<div style="height:expression(document.body.clientHeight+3);" >
				<iframe id="divIframe" name="divIframe" scrolling="auto" frameborder="0" width="100%" height="100%"  ></iframe>
			</div>
 </div>

<div id="props-panel" class="x-hide-display" style="width:200px;height:200px;overflow:hidden;">

</div>

</body>
</html>