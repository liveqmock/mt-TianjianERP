function extDatagridSearch(tableId, limitValue)
{
	
  var sv='';
  for(var i=0;i<eval('sqlWhereVariables_'+tableId).length;i++){
   	var oTT=document.getElementById(eval('sqlWhereVariables_'+tableId)[i]);
  		if(!oTT)continue;
   		sv=sv+"<"+eval('sqlWhereVariables_'+tableId)[i]+">"+oTT.value+"</"+eval('sqlWhereVariables_'+tableId)[i]+">";
  }
  	eval("getData_"+tableId+"(sv,document.getElementById(\"page_xml_\"+tableId).value,0,limitValue)") ;
}

function extMoneyFormat(val) {

	if(val < 0){
		val = '<span style="color:red" onselectstart="return false">' + Ext.util.Format.number(val,'0,000.00') + "</span>";
	} else {
		val =  Ext.util.Format.number(val,'0,000.00');
	}
	
	return val;
}

function expExcel(tableId) {
	window.open(MATECH_SYSTEM_WEB_ROOT + '/common.do?method=expExcel&tableId='+tableId);
}


function getPrintData(tableId,action) {
	
	var printContainer = Ext.get("printContainer_"+tableId).dom ;
	Ext.Ajax.request({
		method:'POST',
		url:MATECH_SYSTEM_WEB_ROOT+'/extGridPrint?tableId='+tableId ,
		success:function (response,options) {
			printContainer.innerHTML = "";
			printContainer.innerHTML = response.responseText;
		},
		failure:function (response,options) {
			alert("��ӡ�������ô���");
		}
	});
}

function getPrintParam(tableId) {
	var queryString = "";
	queryString += "&printTitleRows=" + document.getElementById("printTitleRows_" + tableId).value;
	queryString += "&printSql=" + document.getElementById("printSql_" + tableId).value;
	queryString += "&printDisplayColName=" + document.getElementById("printDisplayColName_" + tableId).value;
	queryString += "&printAction=" + document.getElementById("printAction_" + tableId).value;
	queryString += "&printTitle=" + document.getElementById("printTitle_" + tableId).value;
	queryString += "&printCharColumn=" + document.getElementById("printCharColumn_" + tableId).value;
	queryString += "&printColumnWidth=" + document.getElementById("printColumnWidth_" + tableId).value;
	queryString += "&printVerTical=" + document.getElementById("printVerTical_" + tableId).value;
	queryString += "&printCustomerId=" + document.getElementById("printCustomerId_" + tableId).value;
	queryString += "&printColName=" + document.getElementById("printColName_" + tableId).value;
	queryString += "&printTableHead=" + document.getElementById("printTableHead_" + tableId).value;
	queryString += "&printAllCount=" + document.getElementById("printAllCount_" + tableId).value;
	queryString += "&printGroupName=" + document.getElementById("printGroupName_" + tableId).value;
	queryString += "&printPoms=" + document.getElementById("printPoms_" + tableId).value;
	
	return encodeURI(queryString);
}

//�е�ѡ
function setChooseValue(obj,tableId) {
	var chooseValue = document.getElementById("chooseValue_"+tableId) ;
	chooseValue.value = obj.value ;
}

//��ѡ
function getChooseValue(tableId) {
	var chooseValue = document.getElementsByName("choose_"+tableId) ;
	var str = "";
	for(var i=0;i<chooseValue.length;i++) {
		if(chooseValue[i].checked && chooseValue[i].value != "") {
			str += chooseValue[i].value + "," ;
		}	
	}
	
	if(str != "") {
		str = str.substr(0,str.length-1);
	}
	
	return str ;
}

function selectAllChooseValue(obj,tableId) {
	var chooseValue = document.getElementsByName("choose_"+tableId) ;
	for(var i=0;i<chooseValue.length;i++) {
		if(!chooseValue[i].disabled) {
			chooseValue[i].checked = obj.checked ;	
		}
	}
}

//����������
var calWin = null;
function createcalculater(tableId) {
 	
 	var divObj = document.getElementById("calculater");
 	if(!divObj) {
 		divObj = document.createElement("<DIV id=\"calculater\" style=\"position:absolute;width:expression(document.body.clientWidth);height:20;left:0;bottom:45;padding:10 0 10 0;\"></div>") ;
 		document.body.insertBefore(divObj,document.body.firstChild);
 		
		if(!calWin) {
		    calWin = new Ext.Window({
		     title: '������',
		     renderTo :'calculater',
		     width: document.body.clientWidth,
		     height:20,
		        closeAction:'hide',
		        listeners   : {
		        	'hide':{fn: function () {
						calWin.hide();	         	
		        	}}
		        },
		      layout:'fit',
			  html:'<input type="<input type="text" size="120" id="sText" onpropertychange="calculateValue()" value="" /> = <input type="text" size="30" id="sValue" value="" />'
			  		+'<button onclick="calculatorReset(\''+tableId+'\')" >����</button>'
		    });
	   }
	  
 	}
 	 calWin.show();
 }
 
String.prototype.replaceAll  = function(s1,s2){    
	return this.replace(new RegExp(s1,"gm"),s2);    
}


function calculateValue() {
	var sTextValue = sText.value;
	try {
		sTextValue =  eval(sTextValue.replaceAll(",",""));
		sValue.value = Ext.util.Format.number(sTextValue,'0,000.00') ;
	}catch(e){}
}

function calculatorReset(tableId) {
		sText.value='';
		sValue.value='';
		Ext.getCmp("gridId_"+tableId).getSelectionModel().clearSelections();
		
		Ext.getCmp("gridId_"+tableId).getSelectionModel().selectedArea='';
	}


//�Զ����ѯ
function customQryWinFun(tableId) {
	var customQryWin = this["customQryWin_"+tableId] ;
	document.getElementById("customQry_"+tableId).style.display = "";
	
	if(customQryWin == null) { 
		customQryWin = new Ext.Window({
			title: '�Զ����ѯ����',
			width: 600,
			height:300,
			contentEl:'customQry_'+tableId, 
	        closeAction:'hide',
	        autoScroll:true,
	        modal:true,
	        listeners:{
				'hide':{fn: function () {
					 document.getElementById("customQry_"+tableId).style.display = "none";
				}}
			},
	        layout:'fit',
		    buttons:[{
	            text:'ȷ��',
	          	handler:function() {
	          		var qryWhere = createQryWhere(tableId);
	          		if(qryWhere == false) return ;
	          		document.getElementById("qryWhere_"+tableId).value = qryWhere ;
	          		eval("goSearch_"+tableId+"();");
	          		customQryWin.hide();
	          	}
	        },{
	            text:'ȡ��',
	            handler:function(){
	            	customQryWin.hide();
	            }
	        }]
	    }); 
		this["customQryWin_"+tableId] = customQryWin ;
		addQuery(tableId,true);
	}
	customQryWin.show();
}

function addQuery(tableId,first) {
	var trObj ;
	var tdObj ;
	
	var grid = Ext.getCmp("gridId_"+tableId);
	var columns = grid.getColumnModel().columns;
	
	var tbody = document.getElementById("queryTBody_"+tableId);
	trObj = tbody.insertRow();
	trObj.id = "queryTr_" + tableId;
	
	//����
	tdObj = trObj.insertCell();
	tdObj.align = "center";
	
	var display = "" ;
	if(first) {
		display = "display:none;" ;
	}
	tdObj.innerHTML = "<div class=selectDiv style=\"width:80px;"+display+"\">"
					+ "<select class=mySelect style=\"width:80px;\" name='query_logic_"+tableId+"' id='query_logic_" + tableId + "'>"
					+ "		<option value='and'>����(and)</option>"
					+ "		<option value='or'>����(or)</option>"
					+ "</select>"
					+ "</div>" ;
	
	//����
	tdObj = trObj.insertCell();
	tdObj.align = "center";
	
	var columnHtml = "<div class=selectDiv style=\"width:120px;\">"
					+ "	<select class=mySelect style=\"width:120px;\" name='query_column_" + tableId + "' id='query_column_" + tableId + "'>" ;
					
	for(var i=0;i<columns.length;i++) {
		var id = columns[i].freequery || columns[i].id ;
		var header = columns[i].header ;
		var hidden = columns[i].hidden ;
		 
		if(header != "ѡ" && id != "numberer" && header != "trValue" && id != "chooseValue") {
			columnHtml += "<option value='" + id + "'> " + header + " </option>" ;
		}  
	}

	columnHtml += " </select>";
	columnHtml += " </div>";
	tdObj.innerHTML = columnHtml ;
	
	//�����
	tdObj = trObj.insertCell();
	tdObj.align = "center";
	
	tdObj.innerHTML = "<div class=selectDiv style=\"width:80px;\">"
	+ "	<select class=mySelect style=\"width:80px;\" name='query_operator_" + tableId + "' id='query_operator_" + tableId + "'>"
	+ "		<option value='='> ����(=) </option> "
	+ "		<option value='!='> ������(!=) </option> "
	+ "		<option value='>'> ����(&gt;) </option> "
	+ "		<option value='<'> С��(&lt;) </option> "
	+ "		<option value='>='> ���ڵ���(&gt;=) </option> "
	+ "		<option value='<='> С�ڵ���(&lt;=) </option> "
	+ "		<option value='like'> ���� </option> "
	+ "		<option value='not like'> ������ </option> "
	+ " </select>";
	+ " </div>";
	
	//����
	tdObj = trObj.insertCell();
	tdObj.align = "center";

	tdObj.innerHTML = "<input type=text id='query_condition_" + tableId + "' name='query_condition_" + tableId + "'  size='30'>";
	
	
	//����
	tdObj = trObj.insertCell();
	tdObj.align = "center";
	if(!first) {
		tdObj.innerHTML = "<a href='javascript:;' onclick='removeQuery(this);' ><img src=" + MATECH_SYSTEM_WEB_ROOT + "img/delete.gif></a>" ;
	}
	
}


function removeQuery(obj) {
	var tbody = obj.parentElement.parentElement.parentElement ;
	var trObj = obj.parentElement.parentElement ;
	if(trObj) {
		tbody.removeChild(trObj);
	}
}


function createQryWhere(tableId) {
	
	var query_logic = document.getElementsByName("query_logic_"+tableId) ;
	var query_column = document.getElementsByName("query_column_"+tableId) ;
	var query_operator = document.getElementsByName("query_operator_"+tableId) ;
	var query_condition = document.getElementsByName("query_condition_"+tableId) ;
	
	var qryWhere = "" ;
	for(var i=0;i<query_logic.length;i++) {
		var logic = query_logic[i].value ;
		var column = query_column[i].value ;
		var operator = query_operator[i].value ;
		var condition = query_condition[i].value ;
		
		if(column == "") {
			alert("��ѡ������,��������Ϊ��!") ;
			return false ;
		}
		
		if(operator.indexOf("like") > -1) {
			if(condition != "") {
				condition = "'%" + condition + "%'" ;
			}
		}else if(isNaN(condition) || condition == "") {
			condition = "'" + condition + "'" ;
		}
		
		qryWhere += " " + logic + " " + column + " " + operator + " " + condition ;
	}
	
	return qryWhere ; 
}