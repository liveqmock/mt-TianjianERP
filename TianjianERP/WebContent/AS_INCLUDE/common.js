
var BlockDiv = function() {
	this.show = function(text) {
		var blockDiv = document.getElementById("divBlock");

		if (blockDiv) {
			blockDiv.style.display = "";
		} else {
			var div = document.createElement("div");
			document.body.appendChild(div);
			div.id = "divBlock";
			div.style.cssText = "position:absolute;width:100%;height:100%; top:0px; left:0px; z-index:1; padding:0px; margin:0px; background:#000000;filter:alpha(opacity=30); text-align:center; ";
		}
		
		if(text != "") {
			div.innerHTML = "<span style='margin-top:200px;'><img src='" + MATECH_SYSTEM_WEB_ROOT + "/img/loading.gif'>&nbsp;<font color='#ffffff'><strong>" + text + "</strong><font></span>";
		} else {
			div.innerHTML = "";
		}
	};

	this.hidden = function() { 
		var blockDiv = document.getElementById("divBlock");
		if (blockDiv) {
			try {
				blockDiv.style.display = "none";
				document.body.removeChild(blockDiv);
			}catch(e){}
		}
	};
	
};

// strUrl:Ҫ���ʵ���ҳ�ľ���·����������http://127.0.0.1:5199�����Լ�Ҫ��/��ͷ������
function myOpenUrl(strUrl){

	try{
	
		// ��õ�ǰ���ڵĵ�ַ�Ͷ˿���
		// alert("http:\/\/"+window.location.host +strUrl);
		var t,t1;
		
		// �ҵ�����������
		t = window.opener;
		
		if(!t)// ����ǿ��ҳ�������ĸ�����
			t = window.parent;
		if (t){
			// alert('���¿�����');
			t1 = t.window.opener;
			
			if(!t1)// ����ǿ��ҳ�������ĸ�����
				t1 = t.window.parent;	
			while (t1){
				t = t1;
				t1 = t.window.opener;
				// alert(t1)
				if(!t1){// ����ǿ��ҳ�������ĸ�����
					t1 = t.window.parent;
					if(t1.bottomFrame){
						break;
					}
				}	
			}
		}else{
			// alert('û�б��¿�����');
			t = window;	
		}
		
		// ���������������ҵ���������Ǹ�WINDOW
		t1 = t.parent;
		while (t1 && t1 != t){
			t = t1;
			t1 = t.window.parent;
		}
		
		// �ҵ������Ǹ�URL
		if (t){
			t.bottomFrame.myOpenUrl("http:\/\/"+window.location.host + strUrl);
			// t.open(strUrl);
		}
	}catch(e){
		window.open(strUrl);
	}	
	// oframe.OpenURLEx('http://127.0.0.1:5199/AuditSystem/taskCommon.do?method=fileOpen&UNID=239950844228867565&isBack=no&random=0.26142378553784257');
	// parent.bottomFrame.statu.value="exitSystem";
}

function myOpenUrlByWindowOpen(url, target, param) {

	var targetTemp = "_blank";
	var paramTemp = "channelmode=1, resizable=yes,toolbar=no,menubar=no,titlebar=no,scrollbars=yes";

	if (target != "") {
		targetTemp = target;
	}

	if (param != "") {
		paramTemp = param;
	}
	window.open(url, targetTemp, paramTemp);
}

function showWaiting(hight,wight,msg){
  var ShowDialog=1;
	if(msg==null||msg=="") {
		msg = "�����У����Եȡ���";
		ShowDialog=0;
	}
  var obj=document.getElementById("waiting");
  if(!obj){
    var oBody = document.body;
  	oBody.insertAdjacentHTML("beforeEnd", "<div id='waiting' onselectstart='return false' ></div>");
    obj=document.getElementById("waiting");
  }

  if(hight==null||hight==""){
    hight="100%";
  }
  if(wight==null||wight==""){
    wight="100%";
  }
  
   var strTalk="";
  if (ShowDialog==0){
  	strTalk="<div id=bxDlg_bg1 oncontextmenu='return false' onselectstart='return false' style=\"position:absolute; width:100%;height:100%; top:expression(this.offsetParent.scrollTop); z-index:9999; padding:10px; background:#ffffff;filter:alpha(opacity=50); text-align:center;\"> </div>"
  			+ "<div style=\"position:absolute;width:230px;height:60px; z-index:2;left:expression((document.body.clientWidth-200)/2);top:expression(this.offsetParent.scrollTop + 130); border:1px solid #666666; padding:20px 40px 20px 40px; background:#E4E4E4; \"> "
    		// + " <img src='/AuditSystem/images/indicator.gif' />"
    		+ "<img src=\"" + MATECH_SYSTEM_WEB_ROOT + "/images/loading.gif\">"
    		+ msg + "</div>";
  }else{
	  strTalk="<span id=bxDlg_bg align=center oncontextmenu='return false'"
	    +" onselectstart='return false' style='width:"+wight+";height:"+hight+";position:absolute;left:0;top:0'>"
	    +"<div id=bxDlg_bg1 style=height:100%;background:white;filter:alpha(opacity=50)> </div></span>"
	    +"<span  style='background:#E4E4E4;POSITION:absolute;padding:20px 40px 20px 40px;left:150.5;top:164.5;"
	    +" width:400px; height:200px;  border:1px solid #666666;'>"
	    + msg + "</span>";
  }
  obj.innerHTML=strTalk;
  obj.style.display = "" ;
}

function stopWaiting(){
	var obj =  document.getElementById("waiting") ;
	if(obj) {
	    obj.innerHTML="";
	    obj.style.display = "none" ;
    }
}
// -----------------------------------
// �ѱ��ڵ�inputƴ��url�ַ�������
// -----------------------------------
function formToRequestString(form_obj) {
	var query_string='';
	var and='';
	// alert(form_obj.length);
	for (var i=0;i<form_obj.length ;i++ ) {
		e=form_obj[i];
		if ((e.tagName=='INPUT' || e.tagName=='SELECT' || e.tagName=='TEXTAREA') && e.name!='') {
			if (e.type=='select-one') {
				element_value=e.options[e.selectedIndex].value;
			} else if (e.type=='checkbox' || e.type=='radio') {
				if (e.checked==false) {
					// break;
					continue;
				}
				element_value=e.value;
			} else {
				element_value=e.value;
			}
			query_string+=and+e.name+'='+element_value.replace(/\&/g,"%26");
			and="&";
		}

	}
	return query_string;
}

// �첽
function ajaxLoadPage(url,request,container) {
	var loading_msg='���ڼ�������,���Ժ�...';
	var loader;

	try {
		loader = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
		try {
			loader = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (e2) {
			loader = false;
		}
	}

	loader.open("POST",url,true);
	loader.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	loader.onreadystatechange = function(){
		if (loader.readyState==1) {
			container.innerHTML=loading_msg;
			try {
				showWaiting("100%","100%");
			} catch(e) {

			}
		}

		if (loader.readyState==4) {
			container.innerHTML=loader.responseText;
			try {
				stopWaiting();
			} catch(e) {

			}
		}
	};

	loader.send(request);
}

//ͬ��
function ajaxLoadPageSynch(url,request) {

	var loader;

	try {
		loader = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
		try {
			loader = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (e2) {
			loader = false;
		}
	}

	loader.open("POST",url,false);
	loader.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	loader.send(request);

	return unescape(loader.responseText);
}


// ҳ����ʾ����
var timer;   
function initMessage(key,time) {
	// ����һ����ʾ��Ϣ�ĵȴ���
	var msgBar = document.createElement("DIV") ;
	msgBar.className = "" ;
	msgBar.id = "msgBarDiv" ;
	msgBar.innerHTML = "<div class=\"msg_background_div\" id=\"bgDiv\"></div><div class=\"msg_info_div\" id=\"msg_info_div\"><div class=\"msg_center_div\" id=\"msg_center_div\"><strong>��ʾ��</strong><p>��ȴ�...</p></div></div>" ;
	document.body.appendChild(msgBar) ;
	timer = window.setTimeout("startMessageListener('"+key+"','"+time+"')",time); 
}   

var oXmlhttp;   
function startMessageListener(key,time){
	
	if(!oXmlhttp) { 
	    try{   
	        oXmlhttp = new ActiveXObject('Msxm12.XMLHTTP');   
	    }catch(e){   
	        try{   
	            oXmlhttp = new ActiveXObject('Microsoft.XMLHTTP');   
	        }catch(e){   
	            try{   
	                oXmlhttp = new XMLHttpRequest();   
	            }catch(e){}   
	        }   
	    } 
	}
	
    oXmlhttp.open("post",MATECH_SYSTEM_WEB_ROOT + "frontProcess.do?method=getMessage&key="+key+"&random="+Math.random(),true);   
     oXmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 
     oXmlhttp.onreadystatechange = function(){
        if(oXmlhttp.readyState == 4){   
            if(oXmlhttp.status == 200){
            var msgCenter = document.getElementById("msg_center_div") ;
            var temp = oXmlhttp.responseText.indexOf("end");
            if (  temp > -1 ){
       			var msgBarDiv = document.getElementById("msgBarDiv");
       			if(msgBarDiv) {
       				msgBarDiv.style.display = "none" ;
       			}    			   
            	window.clearTimeout(timer);   
            }else{
            	 msgCenter.innerHTML = ""; 
           		 msgCenter.innerHTML = "<strong>��ʾ��</strong><p>"+oXmlhttp.responseText+"</p>";
            	timer = window.setTimeout("startMessageListener('"+key+"')",time);   
            }   
            }   
        }   
    }
    oXmlhttp.send(null);   
}

// ���ύpost������һ���µı�ǩҳ
function tabSubmit(form,url,tabTitle) {
	var randStr = Math.random();
      		
	var newTab = mainTab.add({    
		title:tabTitle,    
		closable:true,  // ͨ��html����Ŀ��ҳ
		html:'<iframe name="newTab_' + randStr + '" scrolling="auto" frameborder="0" width="100%" height="100%" src=""></iframe>'   
	}); 
	
	mainTab.setActiveTab(newTab);
	
	form.action = url;
	form.target = "newTab_" + randStr;
	form.submit();
}


// �ύ��ǰ��ͨ�ü��
function formSubmitCheck(formid){
	var vd = new Ext.matech.form.Validation({formId:formid,tipType:"advice"});
	return vd.validate() ; 
}

// ��TAB�������ҳ��
function openTab(id,title,url,parent) {
	var n = parent.mainTab.getComponent(id);    
	if (!n) { // �ж��Ƿ��Ѿ��򿪸����
		n = parent.mainTab.add({    
			 id:id,    
			 title:title,  
			 closable:true,  // ͨ��html����Ŀ��ҳ
			 html:'<iframe name="projectFrame" id="projectFrame" scrolling="yes" frameborder="0" width="100%" height="100%" src="' + url + '"></iframe>'   
		});    
	} 	
	
	parent.mainTab.setActiveTab(n);
}

// ���Ŀ¼���Ϸ���
function checkFileName(strFile){
	var reg= new RegExp("/^[^/\\:\*\?,\",<>\|]+$/ig"); 

	if(!reg.test(strFile)){
		return " ";
	}else{
		return strFile;
	}
}

// �ر���ǰ̨����
function notifyManuClose(contextPath,taskId,curProjectId){
	try {
		var oBao = new ActiveXObject("Microsoft.XMLHTTP");
		oBao.open("POST",contextPath+"/taskCommon.do?method=fileClose&taskId="+taskId+"&projectId="+curProjectId, true);
		oBao.send();

	} catch(e) {
		//
	}
}

// �رձ�ǩҳ�ķ���
var closeTab = function(tab) {
	if(tab && tab.id == "mainFrameTab") {
		tab.remove(tab.getActiveTab()); 
	}else {
		window.close();
	}
}

function openFullWindow(url,target,oldUrl, localUrl) {
	var x = window.open(url,target,'top=0,left=0,width=' + (window.screen.availWidth-8) + ',height=' + (window.screen.availHeight-50) + ',resizable=no,menubar=no,toolbar=no,scrollbars=yes,status=no,location=no');
	try {
		if(!x) {
			alert('�Բ���,ϵͳ�ĵ������ڸ������������ֹ��\n�롾�رյ�������ֹ���򡿻򡾵����������Ϸ���ɫ��ʾ��,ѡ�������������Դ�վ��ĵ�������'); 
			if(oldUrl || oldUrl != '') {
				window.location = oldUrl;
			}
			
		} else {
			window.location = localUrl;
		}
	} catch(e) {
		// alert(e);
	}
}

// ��������Ƿ�Ψһ
function checkQueryResultName(menuId, queryResultName) {
	var url = MATECH_SYSTEM_WEB_ROOT + "/common.do?method=checkQueryResultName";
	var requestString = "menuId=" + menuId
					  + "&queryResultName=" + queryResultName;
					 
	var result = ajaxLoadPageSynch(url, requestString);
	// alert(requestString + "," + result);
	
	if(result == "false") {
		alert("�������Ѿ����ڣ�����������!!");
		return false;
	} else {
		return true;
	}
}

var queryResultSaveWin = null;
// �����ѯ���
function saveQueryResult(menuId, gridId, formId) {
	var html = "<div style=\"padding:5px;\">"
			 + "��ѯ������ƣ�<span class=\"mustSpan\">[*]</span>"
			 + " <input type=\"text\" name=\"queryResultName\" id=\"queryResultName\" class=\"required\" />"
			 + "</div> ";
	
	if(queryResultSaveWin == null) { 
	    queryResultSaveWin = new Ext.Window({
			title: '�����ѯ���',
			width: 300,
			height:100, 
			html:html,
	        closeAction:'hide',
	        modal:true,
	        layout:'fit',
		    buttons:[{
	            text:'ȷ��',
	            icon:MATECH_SYSTEM_WEB_ROOT + '/img/confirm.gif',
	          	handler:function() {
	          		var queryResultName = document.getElementById("queryResultName").value;
	          		
	          		// ��������Ƿ�Ψһ
	          		if(!checkQueryResultName(menuId, queryResultName)) {
	          			return;
	          		}
	          	
	          		if(queryResultName == "") {
	          			alert("�������ѯ���������");
	          			return;
	          		} else {
	          			
	          			
	          			var url = MATECH_SYSTEM_WEB_ROOT + "/common.do?method=saveQueryResult";
						var requestString = "menuId=" + menuId
										  + "&gridId=" + gridId
										  + "&formId=" + formId
										  + "&queryResultName=" + queryResultName;
										 
						var result = ajaxLoadPageSynch(url, requestString);
						
						if(result == "ok") {
							// alert("�����ѯ����ɹ�!!");
						} 
						
						queryResultSaveWin.hide();
	          		}
	          	}
	        },{
	            text:'ȡ��',
	            icon:MATECH_SYSTEM_WEB_ROOT + '/img/close.gif',
	            handler:function(){
	            	queryResultSaveWin.hide();
	            }
	        }]
	    });
	}
	queryResultSaveWin.show();
	
}

// ��ȡ��ѯ���
function getQueryResult(paramString) {
	var params = paramString.split(",");
	for(var i=0; i < params.length; i++) {
		var keyValue = params[i].split("=");
		
		if(keyValue[1]) {
			document.getElementById(keyValue[0]).value = keyValue[1];
		}
	}
}

// -----------------------------------
// ���ñ�ǩ����������ı��򡢸�ѡ�򡢵�ѡ���
// -----------------------------------
function reset(objId) {
	var obj = document.getElementById(objId);
	
	for (i = 0; i < obj.length; i++ ) {
		e = obj[i];
		if ((e.tagName=='INPUT' || e.tagName=='SELECT' || e.tagName=='TEXTAREA') && e.name!='') {
		
			if (e.type=='text') {
				e.value = "";
			}else if (e.type=='select-one') {
				e.value = "";
			} else if (e.type=='checkbox' || e.type=='radio') {
				e.checked = false;
			} else {
				try{
					Ext.getCmp(e.id).clear();
				} catch(e) {
					e.value = "";
				}
			}
		}
	}
}

// ��ʼ��ͼ��
function createChart(url, chartType , chartId, height, width) {
	var chartDiv = document.getElementById("chartDiv_" + chartId);
	var chartXML = document.getElementById("chartXML_" + chartId);
	var chartURL = document.getElementById("chartURL_" + chartId);
	var chartTypeObj = document.getElementById("chartType_" + chartId);

	if(!chartDiv) {
		document.write("<div id=\"chartDiv_" + chartId + "\" align=\"center\"></div>");
		chartDiv = document.getElementById("chartDiv_" + chartId);
	}
	
	if(!chartXML) {
		document.write("<input type=\"hidden\" id=\"chartXML_" + chartId + "\" value=\"\"> ");
		chartXML = document.getElementById("chartXML_" + chartId);
	}
	
	if(!chartURL) {
		document.write("<input type=\"hidden\" id=\"chartURL_" + chartId + "\" value=\"\"> ");
		chartURL = document.getElementById("chartURL_" + chartId);
	}
	
	if(!chartTypeObj) {
		document.write("<input type=\"hidden\" id=\"chartType_" + chartId + "\" value=\"\"> ");
		chartTypeObj = document.getElementById("chartType_" + chartId);
	}
	
	var request = "&chartType=" + chartType;
	strXML = ajaxLoadPageSynch(url, request);
	
	chartURL.value = url;
	chartXML.value = strXML;
   	chartTypeObj.value = chartType;
    
    changeChart(chartType, chartId, height, width);

} 

// �ı�ͼ������
function changeChart(chartType, chartId, height, width) {
	var chartXML = document.getElementById("chartXML_" + chartId).value;
	var height = height || (document.body.clientHeight-54)/2;
	var width = width || document.body.clientWidth;
	var chart = new FusionCharts(MATECH_SYSTEM_WEB_ROOT + "/charts/" + chartType + ".swf", chartId, width, height);
    chart.addParam("wmode","Opaque");
    chart.setDataXML(chartXML);
    chart.render("chartDiv_" + chartId);
}

// ����ͼ������
function updateChart(url, param, chartId){
	var chartType = document.getElementById("chartType_" + chartId);
	var request = "&chartType=" + chartType + param;
	strXML = ajaxLoadPageSynch(url, request);
	document.getElementById("chartXML_" + chartId).value = strXML;

	updateChartXML(chartId, strXML); 
}

function getUUID() {
	var url = MATECH_SYSTEM_WEB_ROOT + "/common.do?method=getUUID";
	var result = ajaxLoadPageSynch(url, null);
	
	if(result == "") {
		result = Math.random();
	}
	
	return result;
}

var attachUploadWin = null;
var attachUploadForm = null;

// �ϴ�����
function attachUpload(inputId,mode,imgId) {
	var inputObj = document.getElementById(inputId);
	
	var indexTable = inputObj.indexTable;
	var indexId = inputObj.value;
	mode=mode||"";
	
	if(!checkMaxAttach(inputId)) {
		return;
	}
	
	if(attachUploadForm == null) {
		attachUploadForm = new Ext.FormPanel({
			url: "",
			border:false,
	        fileUpload: true,
	        autoHeight: true,
	        autoWidth: true,
	        frame: true,
			bodyStyle: 'padding: 5px;',
	        labelWidth: 1,
	        defaults: {
	            anchor: '95%',
	            allowBlank: false,
	            msgTarget: 'side'
	        },
	        items: [{
	            xtype: 'fileuploadfield',
	            id: 'form-file',
	            emptyText: '��ѡ����Ҫ�ϴ����ļ�',
	            name: 'attachPath',
	            buttonText: '',
	            buttonCfg: {
	            	text:'ѡ���ļ�'
	            }
	        }]
	    });
	} else {
		attachUploadForm.getForm().reset();
	}
	
	//ÿ�����ñ�url��ַ
	attachUploadForm.form.url = MATECH_SYSTEM_WEB_ROOT + '/common.do?method=attachUpload&indexTable=' + indexTable + "&indexId=" + indexId+"&mode="+mode;
	//��Ϊÿ�δ����´���
    attachUploadWin = new Ext.Window({
		title: '�ļ��ϴ�',
		width: 500,
		height:116,
        modal:true,
        resizable:false,
		layout:'fit',
		closeAction:'hide',
		items: attachUploadForm,
		buttons: [{
            text: 'ȷ��',
            icon:MATECH_SYSTEM_WEB_ROOT + '/img/confirm.gif',
            handler: function(){
                if(attachUploadForm.getForm().isValid()){
                	// ��ʾ������
                	Ext.MessageBox.show({ 
					    title: '�ϴ��ļ�', 
					    width:240, 
					    progress:true, 
					    closable:false
					}); 
				
					// �ύ��
	                attachUploadForm.getForm().submit();
	                
	                var i = 0;
				    var timer = setInterval(function(){
						// ��������
						Ext.Ajax.request({
							url: MATECH_SYSTEM_WEB_ROOT + '/common.do?method=attachUploadProcess&rand=' + Math.random(),
							method: 'post',
							// ����ajax�ķ�������
							success: function(response, options){
								status = response.responseText + " " + i++;
								var obj = Ext.util.JSON.decode(response.responseText);
								if(obj.success!=false){
									if(obj.finished){
										clearInterval(timer);	
										// status = response.responseText;
										Ext.MessageBox.updateProgress(1, 'finished', 'finished');
										Ext.MessageBox.hide();
										attachUploadWin.hide();
										if(imgId){
										attachImageInit(inputId,imgId);	
										}else{
										attachInit(inputId);
										}
									} else {
										Ext.MessageBox.updateProgress(obj.percentage, obj.msg);	
									}
								}
							},
							failure: function(){
								clearInterval(timer);
								Ext.Msg.alert('����', '�ϴ��ļ�����');
							} 
						});
				    }, 500);
                }
            }
        },{
            text: '����',
            icon:MATECH_SYSTEM_WEB_ROOT + '/img/refresh.gif',
            handler: function(){
                attachUploadForm.getForm().reset();
            }
       	},{
       		text: 'ȡ��',
       		icon:MATECH_SYSTEM_WEB_ROOT + '/img/close.gif',
       		handler: function(){
       			attachUploadWin.hide();
       		}
       	}]
    });
	attachUploadWin.show();
}

// ��ʽ������
function formatDecimal(x,maxLength) {
   var f_x = parseFloat(x);
   if (isNaN(f_x)) {
      return x;
   }
   var f_x = Math.round(x*100)/100;
   var s_x = f_x.toString();
   var pos_decimal = s_x.indexOf('.');
   if (pos_decimal < 0) {
      pos_decimal = s_x.length;
      s_x += '.';
   }
   while (s_x.length <= pos_decimal + maxLength) {
      s_x += '0';
   }
   return s_x;
}

// ��ȡ�ַ���󳤶�
function maxString(str) {
	if(str.length > 25) {
		str = str.substring(0,22) + "...";
	} 
	
	return str;
}

// �����󸽼���
function checkMaxAttach(inputId) {
	var inputObj = document.getElementById(inputId);
	var maxAttach = inputObj.maxAttach || 0;
	
	if(maxAttach != 0 && getAttachCount(inputId) >= maxAttach) {
		alert("�Բ���ֻ�����ϴ�" + maxAttach + "���ļ�,����ɾ�������ϴ�!");
		return false;
	} else {
		return true;
	}
}

// ��ȡ��������
function getAttachCount(inputId) {
	var inputObj = document.getElementById(inputId);
	var prefix = inputObj.id;
	var attachUlId = "attachUl_" + prefix; 
	
	return document.getElementById(attachUlId).children.length;
}

function attachImageInit(inputId,imgId) {
	var inputObj = document.getElementById(inputId);
	//alert(imgId);
	// ��ť����,Ĭ��Ϊ��Ӹ���
	var buttonText = inputObj.buttonText || "���ͼƬ";
	
	var showButton = true;
	var remove = true;
	
	if(inputObj.readOnly) {
		showButton = false;
		remove = false;
	}
	if(inputObj["attachFile"]=="true"){
		showButton = true;
		remove = true;
	}
	
	
	//���ٵ������ƣ�ͨ��ֻ��������
	//
	// �Ƿ���ʾ�ϴ���ť,Ĭ��Ϊtrue
	//var showButton = inputObj.showButton == false ? false : true;
	// �Ƿ�����ɾ��,Ĭ��Ϊtrue
	//var remove = inputObj.remove == false ? false : true;
	
	var indexTable = inputObj.indexTable||inputObj.indextable;
	
	if(inputObj.value == "") {
		inputObj.value = getUUID();
	}
	
	var indexId = inputObj.value;
	var prefix = inputObj.id;
	
	var url = MATECH_SYSTEM_WEB_ROOT + "/common.do?method=getAttachList";
	var request = "indexTable=" + indexTable + "&indexId=" + indexId;
	
	var result = ajaxLoadPageSynch(url, request);
	//alert(result);
	var attachList = Ext.util.JSON.decode(result);
	
	var html = "";
	if(attachList.length>0){
		var src=MATECH_SYSTEM_WEB_ROOT + "/common.do?method=attachDownload&attachId=" + attachList[0].attachId;
		//alert(src);
		document.getElementById(imgId).src=src;
	}
	/*
	for(var i=0; i < attachList.length; i++) {
		var attach = attachList[i];
		html += "<li>"
			  + "<span>"
			  + "<a href=\"" + MATECH_SYSTEM_WEB_ROOT + "/common.do?method=attachDownload&attachId=" + attach.attachId + "\" title=\"���أ�" + attach.attachName + "\">" + maxString(attach.attachName) + "</a>"
			  + "&nbsp;<font style=\"color:#CCCCCC;\">" + formatDecimal((attach.fileSize/1024),2) + " KB</font>"
			  + "</span>"
			  + "&nbsp;<a href=\"" + MATECH_SYSTEM_WEB_ROOT + "/common.do?method=attachDownload&attachId=" + attach.attachId + "\" title=\"���أ�" + attach.attachName + "\"><img src=\"" + MATECH_SYSTEM_WEB_ROOT + "/img/download.gif\"></a>";
		
		if(remove) {
			html += "&nbsp;<a href=\"#\" onclick=\"attachRemove('" + attach.attachId + "','" + inputId + "');\" title=\"ɾ��\"><img src=\"" + MATECH_SYSTEM_WEB_ROOT + "/img/delete.gif\"></a>";
		}
		
		html += "</li>";
	}*/
	//alert(11);
	var attachUlId = "attachUl_" + prefix; 
	var attachButtonId = "attachButton_" + prefix;
	var attachDivId = "attachDiv_" + prefix;
	
	var ul = document.getElementById(attachUlId);
	if(ul == null || !ul) {
		
		var divObj = document.createElement("<div id=\"" + attachDivId + "\"></div>");
					
		divObj = inputObj.parentElement.insertBefore(divObj);
		
		var buttonDiv = document.createElement("<div id=\"" + attachButtonId +"\"></div>");
		ul = document.createElement("<ul id=\"" + attachUlId + "\"></ul>");
		
		divObj.appendChild(buttonDiv);
		divObj.appendChild(ul);
	}

	ul.innerHTML = html;
	
	// �Ƿ���ʾ��ť
	if(showButton) {
		var attachButton = document.getElementById(attachButtonId);
		attachButton.innerHTML = "<input type=\"button\" class=\"flyBT\" value=\"" + buttonText + "\" onclick=\"attachUpload('" + inputId + "','single','"+imgId+"')\" ><br/><br/>";
	}
}


if ((typeof Range !== "undefined") && !Range.prototype.createContextualFragment)
{
     Range.prototype.createContextualFragment = function(html)
     {
         var frag = document.createDocumentFragment(),  
         div = document.createElement("div");
         frag.appendChild(div);
         div.outerHTML = html;
         return frag;
     };
}

function mycreateElement(html,objtype,id){
	try{  
		return document.createElement(html);
	}catch(e){
		//ie9���ϰ汾
		var new_name_item = document.createElement(objtype);  
        new_name_item.id = id;  
		return new_name_item;
	}
	
	
}


function attachInit(inputId) {
	var inputObj = document.getElementById(inputId);
	
	// ��ť����,Ĭ��Ϊ��Ӹ���
	var buttonText = inputObj.buttonText || "��Ӹ���";
	
	var showButton = true;
	var remove = true;
	
	if(inputObj.readOnly) {
		showButton = false;
		remove = false;
	}
	if(inputObj["attachFile"]=="true"){
		showButton = true;
		remove = true;
	}
	
	
	//���ٵ������ƣ�ͨ��ֻ��������
	//
	// �Ƿ���ʾ�ϴ���ť,Ĭ��Ϊtrue
	//var showButton = inputObj.showButton == false ? false : true;
	// �Ƿ�����ɾ��,Ĭ��Ϊtrue
	//var remove = inputObj.remove == false ? false : true;
	
	var indexTable = inputObj.indexTable||inputObj.indextable;
	
	if(inputObj.value == "") {
		inputObj.value = getUUID();
	}
	
	var indexId = inputObj.value;
	var prefix = inputObj.id;
	
	var url = MATECH_SYSTEM_WEB_ROOT + "/common.do?method=getAttachList";
	var request = "indexTable=" + indexTable + "&indexId=" + indexId;
	
	var result = ajaxLoadPageSynch(url, request);
	var attachList = Ext.util.JSON.decode(result);
	
	var html = "";
	for(var i=0; i < attachList.length; i++) {
		var attach = attachList[i];
		html += "<li>"
			  + "<span>"
			  + "<a class='aAtt' href=\"" + MATECH_SYSTEM_WEB_ROOT + "/common.do?method=attachDownload&attachId=" + attach.attachId + "\" title=\"���أ�" + attach.attachName + "\">" + maxString(attach.attachName) + "</a>"
			  + "&nbsp;<font style=\"color:#CCCCCC;\">" + formatDecimal((attach.fileSize/1024),2) + " KB</font>"
			  + "</span>"
			  + "&nbsp;<a href=\"" + MATECH_SYSTEM_WEB_ROOT + "/common.do?method=attachDownload&attachId=" + attach.attachId + "\" title=\"���أ�" + attach.attachName + "\"><img src=\"" + MATECH_SYSTEM_WEB_ROOT + "/img/download.gif\"></a>";
		
		if(remove) {
			html += "&nbsp;<a href=\"#\" onclick=\"attachRemove('" + attach.attachId + "','" + inputId + "');\" title=\"ɾ��\"><img src=\"" + MATECH_SYSTEM_WEB_ROOT + "/img/delete.gif\"></a>";
		}
		
		html += "</li>";
	}
	//alert(11);
	var attachUlId = "attachUl_" + prefix; 
	var attachButtonId = "attachButton_" + prefix;
	var attachDivId = "attachDiv_" + prefix;
	
	var ul = document.getElementById(attachUlId);
	if(ul == null || !ul) {
		
		var divObj = mycreateElement("<div id=\"" + attachDivId + "\"></div>","div",attachDivId);
					
		divObj = inputObj.parentElement.insertBefore(divObj);
		
		var buttonDiv = mycreateElement("<div id=\"" + attachButtonId +"\"></div>","div",attachButtonId);
		ul = mycreateElement("<ul id=\"" + attachUlId + "\"></ul>","ul",attachUlId);
		
		divObj.appendChild(buttonDiv);
		divObj.appendChild(ul);
	}

	ul.innerHTML = html;
	
	// �Ƿ���ʾ��ť
	if(showButton) {
		var attachButton = document.getElementById(attachButtonId);
		//alert(inputObj.readOnly);
		if(inputObj.readOnly==true){
			attachButton.innerHTML = "<input type=\"button\"  class=\"flyBT\" value=\"" + buttonText + "\" onclick=\"attachUpload('" + inputId + "')\" disabled=\"disabled\" /><br/><br/>";
		}else{
			attachButton.innerHTML = "<input type=\"button\" class=\"flyBT\" value=\"" + buttonText + "\" onclick=\"attachUpload('" + inputId + "')\"  /><br/><br/>";
		}
	}
}

// ɾ������
function attachRemove(attachId, inputId) {
	var url = MATECH_SYSTEM_WEB_ROOT + "/common.do?method=attachRemove";
	var request = "attachId=" + attachId;
	var result = ajaxLoadPageSynch(url, request);
	
	if(result == "success") {
		attachInit(inputId);
	}
}

// ��鿪ʼ��ݺͽ������ startYear endYear

function chkYear(){
	var startYear = document.getElementById("startYear").value;
	var endYear = document.getElementById("endYear").value;

	if(startYear != "" && endYear ==""){
		alert("��ͬʱѡ�������ݣ�");
		document.getElementById("endYear").foucs();
		return false;
	}
	if(startYear == "" && endYear !=""){
		alert("��ͬʱѡ��ʼ��ݣ�");
		document.getElementById("startYear").foucs();
		return false;
	}
	if(startYear != "" && endYear !=""){
		if(endYear <= startYear){
			alert("������ݱ�����ڿ�ʼ��ݣ�");
			return false;
		}
	}
	return true;
}


// ����ajax ����
function createRequest() {
	var request;
	  try {
	    request = new XMLHttpRequest();
	  } catch (trymicrosoft) {
	    try {
	      request = new ActiveXObject("Msxml2.XMLHTTP");
	    } catch (othermicrosoft) {
	      try {
	        request = new ActiveXObject("Microsoft.XMLHTTP");
	      } catch (failed) {
	        request = false;
	      }
	    }
	  }
	  if (!request)
	    alert("Error initializing XMLHttpRequest!");
	  
	  return request;
}



//����gird���޷���Ӧ�����resize
//��Խ�grid��ŵ�TabPanel�е����
//_fromObj:grid������������������������������䶯���Զ������߶��볤��
//_toObj:Ϊ��Ҫ����_fromObj�����ֹ�������gird��ID�ַ������磺gridId_myDealList,gridId_myApplyList
//_adjSize[���ȣ��߶�]:��Ҫ��ȥ�ĳ�����߶ȣ�΢��ʹ��
//������ڣ�2012-3-16
function resizeGridPanel(_fromObj,_toObj,_adjSize){
	var _resizeInterval;//��ʱ��
	//����������䶯
	Ext.EventManager.onWindowResize (function(){
		_resizeInterval=setInterval(GridPanelResize,500);
	});
	//����ҳ��gridpanel���ȺͿ��
	function GridPanelResize(){
		var realWidth=Ext.getCmp(_fromObj).getWidth();
		var realHeight=Ext.getCmp(_fromObj).getHeight();
		var gridPanels=_toObj.split(",");
		for(var i=0;i<gridPanels.length;i++){			
			Ext.getCmp(gridPanels[i]).setWidth(realWidth-_adjSize[i][0]);
			Ext.getCmp(gridPanels[i]).setHeight(realHeight-_adjSize[i][1]);
		}
		clearInterval(_resizeInterval);
	}	
}
//��Ե���grid�ŵ�ҳ������
function resizeSingleGridPanel(_toObj,_adjWidth,_adjHeigh){
	var _resizeInterval;//��ʱ��
	//����������䶯
	Ext.EventManager.onWindowResize (function(){
		_resizeInterval=setInterval(GridPanelResize,500);
	});
	//����ҳ��gridpanel���ȺͿ��
	function GridPanelResize(){
		var realWidth=Ext.getBody().getWidth()-_adjWidth;
		var realHeight=Ext.getBody().getHeight()-_adjHeigh;
		
		Ext.getCmp(_toObj).setWidth(realWidth);
		Ext.getCmp(_toObj).setHeight(realHeight);
		
		clearInterval(_resizeInterval);
	}	
}
//����grid���ˢ�°�ť
function hideMyExtGridComponent(itemContainer,itemIndex){
	var _hideExtComponentInterval;
	_hideExtComponentInterval=setInterval(hideComponent,500);
	function hideComponent(){
		if(Ext.getCmp(itemContainer)){
			Ext.getCmp(itemContainer).get(itemIndex-1).setVisible(false);
			Ext.getCmp(itemContainer).get(itemIndex).setVisible(false);
			clearInterval(_hideExtComponentInterval);	
		}
	}
}
//Ȩ���жϺ���
function optPriviligeJudge(curPrivilige,sysPrivilige){
	if(sysPrivilige.indexOf(curPrivilige)>=0){
		return true;
	}else{
		Ext.MessageBox.alert("��ʾ��Ϣ","û�в���Ȩ�ޣ�");
		return false;
	}
}
//��ֹinput��ť��disabled��readOnlyʱ��backspace����ǰһ��ҳ��
Ext.EventManager.on(Ext.getBody(),"keydown",function(e, t) {   
    if (e.getKey() == e.BACKSPACE &&(t.disabled || t.readOnly)) {   
        e.stopEvent();   
    }
});


//�ж�JS�����Ƿ����
function funExists(funName){ 
	try{  
		if(typeof eval(funName)=="undefined"){
			return false;
		} 
		if(typeof eval(funName)=="function"){
			return true;
		}
	} catch(e){
		return false;
	}
}

//js Сд�����ת��Ϊ��д�����
function RMBToCapital(num) { //ת������Ҵ�д�����ʽ
    var str1 = '��Ҽ��������½��ƾ�'; //0-9����Ӧ�ĺ���
    var str2 = '��Ǫ��ʰ��Ǫ��ʰ��Ǫ��ʰԪ�Ƿ�'; //����λ����Ӧ�ĺ���
    var str3; //��ԭnumֵ��ȡ����ֵ
    var str4; //���ֵ��ַ�����ʽ
    var str5 = ''; //����Ҵ�д�����ʽ
    var i; //ѭ������
    var j; //num��ֵ����100���ַ�������
    var ch1; //���ֵĺ������
    var ch2; //����λ�ĺ��ֶ���
    var nzero = 0; //����������������ֵ�Ǽ���
    num = Math.abs(num).toFixed(2); //��numȡ����ֵ����������ȡ2λС��
    str4 = (num * 100).toFixed(0).toString(); //��num��100��ת�����ַ�����ʽ
    j = str4.length; //�ҳ����λ
    if (j > 15) {
        return '���';
    }
    str2 = str2.substr(15 - j); //ȡ����Ӧλ����str2��ֵ���磺200.55,jΪ5����str2=��ʰԪ�Ƿ�
    //ѭ��ȡ��ÿһλ��Ҫת����ֵ
    for (i = 0; i < j; i++) {
        str3 = str4.substr(i, 1); //ȡ����ת����ĳһλ��ֵ
        if (i != (j - 3) && i != (j - 7) && i != (j - 11) && i != (j - 15)) { //����ȡλ����ΪԪ�����ڡ������ϵ�����ʱ
            if (str3 == '0') {
                ch1 = '';
                ch2 = '';
                nzero = nzero + 1;
            }
            else {
                if (str3 != '0' && nzero != 0) {
                    ch1 = '��' + str1.substr(str3 * 1, 1);
                    ch2 = str2.substr(i, 1);
                    nzero = 0;
                }
                else {
                    ch1 = str1.substr(str3 * 1, 1);
                    ch2 = str2.substr(i, 1);
                    nzero = 0;
                }
            }
        }
        else { //��λ�����ڣ��ڣ���Ԫλ�ȹؼ�λ
            if (str3 != '0' && nzero != 0) {
                ch1 = "��" + str1.substr(str3 * 1, 1);
                ch2 = str2.substr(i, 1);
                nzero = 0;
            }
            else {
                if (str3 != '0' && nzero == 0) {
                    ch1 = str1.substr(str3 * 1, 1);
                    ch2 = str2.substr(i, 1);
                    nzero = 0;
                }
                else {
                    if (str3 == '0' && nzero >= 3) {
                        ch1 = '';
                        ch2 = '';
                        nzero = nzero + 1;
                    }
                    else {
                        if (j >= 11) {
                            ch1 = '';
                            nzero = nzero + 1;
                        }
                        else {
                            ch1 = '';
                            ch2 = str2.substr(i, 1);
                            nzero = nzero + 1;
                        }
                    }
                }
            }
        }
        if (i == (j - 11) || i == (j - 3)) { //�����λ����λ��Ԫλ�������д��
            ch2 = str2.substr(i, 1);
        }
        str5 = str5 + ch1 + ch2;

        if (i == j - 1 && str3 == '0') { //���һλ���֣�Ϊ0ʱ������"��"
            str5 = str5 + '��';
        }
    }
    if (num == 0) {
        str5 = '��Ԫ��';
    }
    return str5;
}

//��2012�ĳɷ���Ҽ����תΪƱ�ݴ�ӡʹ��
function DateToCapital(rq){
   if (rq){
   		rq=replaceAll(rq,'0','��');
   		rq=replaceAll(rq,'1','Ҽ');
		rq=replaceAll(rq,'2','��');
   		rq=replaceAll(rq,'3','��');
   		rq=replaceAll(rq,'4','��');
   		rq=replaceAll(rq,'5','��');
   		rq=replaceAll(rq,'6','½');
   		rq=replaceAll(rq,'7','��');
   		rq=replaceAll(rq,'8','��');
   		rq=replaceAll(rq,'9','��');
   		return rq;
   }else{
   		return '';
   } 
}


function setObjDisabled(name){
	var oElem=document.getElementById(name);
		var sTag=oElem.tagName.toUpperCase();
		switch(sTag)
		{
		case	"BUTTON":
			oElem.disabled=true;
			break;
		case	"SELECT":
		case	"TEXTAREA":
			oElem.readOnly=true;
			break;
		case	"INPUT":
			{
			var sType=oElem.type.toUpperCase();

			if(sType=="TEXT")oElem.readOnly=true;
			if(sType=="BUTTON"||sType=="IMAGE")oElem.disabled=true;
			if(sType=="CHECKBOX")oElem.disabled=true;
			if(sType=="RADIO")oElem.disabled=true;
			}
			break;
		default:
			oElem.disabled=true;
			break;
		}
	//set style
	oElem.style.backgroundColor="#eeeeee";
}

function setObjEnabled(name){
	var oElem=document.getElementById(name);
		var sTag=oElem.tagName.toUpperCase();
		switch(sTag)
		{
		case	"BUTTON":
			oElem.disabled=false;
			break;
		case	"SELECT":
		case	"TEXTAREA":
			oElem.readOnly=false;
			break;
		case	"INPUT":
			{
			var sType=oElem.type.toUpperCase();

			if(sType=="TEXT")oElem.readOnly=false;
			if(sType=="BUTTON"||sType=="IMAGE")oElem.disabled=false;
			if(sType=="CHECKBOX")oElem.disabled=false;
			if(sType=="RADIO")oElem.disabled=false;
			}
			break;
		default:
			oElem.disabled=false;
			break;
		}
	//set style
	oElem.style.backgroundColor="#FFFFFF";
}

//�滻�����ַ�
function replaceAll(str,oldStr,newStr) {
	return str.replace(new RegExp(oldStr,"gm"),newStr); 
}

function show_selectUser(objName,hideUserId,mode){
	var objParameter = new Object();
	objParameter.userName = objName;
	objParameter.userId = hideUserId;
	objParameter.partentWindowObj = window;
    mode=mode||"";
	window.showModalDialog(MATECH_SYSTEM_WEB_ROOT+"user/selectUser.jsp?mode="+mode,objParameter,"dialogHeight:420px;dialogWidth:500px;resizable:false;dialogHide:no;status:no;location=no;");
}

function show_selectJob(idFieldName,idFieldId,type){
	var objParameter = new Object();
	objParameter.idFieldName = idFieldName;
	objParameter.idFieldId = idFieldId;
	objParameter.partentWindowObj = window;
    type=type||"";
    
	window.showModalDialog(MATECH_SYSTEM_WEB_ROOT+"hr/selectJob.jsp?type="+type,objParameter,"dialogHeight:600px;dialogWidth:750px;resizable:false;dialogHide:no;status:no;location=no;");
}

function createNewWord(tempUrl,newUrl){
	var openDocObj = new ActiveXObject("SharePoint.OpenDocuments.2"); 
	openDocObj.CreateNewDocument(tempUrl, newUrl);
}

function editWord(url){
	var openDocObj = new ActiveXObject("SharePoint.OpenDocuments.2"); 
    openDocObj.EditDocument(url);
}

function viewWord(url){
	var openDocObj = new ActiveXObject("SharePoint.OpenDocuments.2"); 
	openDocObj.ViewDocument(url);
}

Array.prototype.contains = function (element) { 
	for (var i = 0; i < this.length; i++) { 
		if (this[i] == element) { 
			return true; 
		} 
	} 
	return false; 
}

function getParamObject() 
{ 
	var args = new Object( ); //����һ���ն��� 
	var query = window.location.search.substring(1); // ȡ��ѯ�ַ�������� http://www.snowpeak.org/testjs.htm?a1=v1&a2=&a3=v3#anchor �нس� a1=v1&a2=&a3=v3�� 
	var pairs = query.split("&"); // �� & ���ֿ������� 
	for(var i = 0; i < pairs.length; i++) { 
		var pos = pairs[i].indexOf('='); // ���� "name=value" �� 
		if (pos == -1) continue; // �����ɶԣ�������ѭ��������һ�� 
		var argname = pairs[i].substring(0,pos); // ȡ������ 
		var value = pairs[i].substring(pos+1); // ȡ����ֵ 
		value = decodeURIComponent(value); // ����Ҫ������� 
		args[argname] = value; // ��ɶ����һ������ 
    } 
return args; // ���ش˶��� 
} 

function doUpdateSubsetID(){
	   var row=mt_form_getRowValues()[0];
	   var uuid=row.uuid;
	   var id=row.id;
	   var formid=getParamObject()["uuid"];
	   var url="employment.do";
	   
	   Ext.MessageBox.prompt("�޸��Ӽ����","�������µ��Ӽ���ţ�����Ϊ����",function(e,text){
	       if(e!="ok")return;
	       var param={method:"doUpdateSubsetID",formid:formid,uuid:uuid,newID:text};
	       $.post(url,param,function(str){
	         alert(str);
	         window.location.reload();
	      });
	   });
	}


//���֤��֤
function validateIdCard(obj)
{
 var aCity={11:"����",12:"���",13:"�ӱ�",14:"ɽ��",15:"���ɹ�",21:"����",22:"����",23:"������",31:"�Ϻ�",32:"����",33:"�㽭",34:"����",35:"����",36:"����",37:"ɽ��",41:"����",42:"����",43:"����",44:"�㶫",45:"����",46:"����",50:"����",51:"�Ĵ�",52:"����",53:"����",54:"����",61:"����",62:"����",63:"�ຣ",64:"����",65:"�½�",71:"̨��",81:"���",82:"����",91:"����"};
  var iSum = 0;
 //var info = "";
 var strIDno = obj;
 var idCardLength = strIDno.length;
 if(!/^\d{17}(\d|x)$/i.test(strIDno)&&!/^\d{15}$/i.test(strIDno))
        return 1; //�Ƿ����֤��

 if(aCity[parseInt(strIDno.substr(0,2))]==null)
 return 2;// �Ƿ�����

  // 15λ���֤ת��Ϊ18λ
 if (idCardLength==15)
 {
    sBirthday = "19" + strIDno.substr(6,2) + "-" + Number(strIDno.substr(8,2)) + "-" + Number(strIDno.substr(10,2));
  var d = new Date(sBirthday.replace(/-/g,"/"))
  var dd = d.getFullYear().toString() + "-" + (d.getMonth()+1) + "-" + d.getDate();
  if(sBirthday != dd)
                return 3; //�Ƿ�����
              strIDno=strIDno.substring(0,6)+"19"+strIDno.substring(6,15);
              strIDno=strIDno+GetVerifyBit(strIDno);
 }

       // �ж��Ƿ����2078�꣬С��1900��
       var year =strIDno.substring(6,10);
       if (year<1900 || year>2078 )
           return 3;//�Ƿ�����

    //18λ���֤����

   //�ں����������x�൱������10,����ת����a
    strIDno = strIDno.replace(/x$/i,"a");

  sBirthday=strIDno.substr(6,4)+"-"+Number(strIDno.substr(10,2))+"-"+Number(strIDno.substr(12,2));
  var d = new Date(sBirthday.replace(/-/g,"/"))
  if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))
                return 3; //�Ƿ�����
    // ���֤����淶��֤
  for(var i = 17;i>=0;i --)
   iSum += (Math.pow(2,i) % 11) * parseInt(strIDno.charAt(17 - i),11);
  if(iSum%11!=1)
                return 1;// �Ƿ����֤��

   // �ж��Ƿ��������֤
    var words = new Array();
    words = new Array("11111119111111111","12121219121212121");

    for(var k=0;k<words.length;k++){
        if (strIDno.indexOf(words[k])!=-1){
            return 1;
        }
    }

 return 0;
}


function viewCadet(){
	   var row=mt_form_getRowValues()[0];
	   var uuid=row.uuid;
	   var url="cadet.do?method=view&mode=view&uuid="+uuid;
	   window.showModalDialog(url,{},"dialogWidth:800px;dialogHeight:500px;status=no;location=no;resizable=yes");

	
}


function mt_open(url,title,width,height){
	window.open(url);
	//window.open(url,title,'height='+height+', width='+width+', toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
	
}
