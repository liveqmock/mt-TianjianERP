
/*
 * ���ɵ���ͳһʹ�õ�java script������
 * �иĶ���Ҫ����copy����ǰҳ�档�������ñ�ҳ�档
 * 
 *                       06.10.06    k
*/

function takeDoubt(s)
{

	var obj=document.getElementById("doubtTD"+s);
	var sign=obj.innerHTML;
      
	if(sign.indexOf("��")>=0){
		
		var strResult = window.showModalDialog('/AuditSystem/voucherquery/DoubtfuPoint.jsp?autoid='+s+"&random=" + Math.random(),null,'dialogWidth:500px;dialogHeight:400px;center:yes;help:no;resizable:no;status:no')+"";
        
        if(strResult.indexOf("ok")>=0)	{
			//obj.innerHTML="";
			refreshState2(obj,"<font color=\"red\">��</font>");
		}
	}else if(sign.indexOf("��")>=0){
		var oBao = new ActiveXObject("Microsoft.XMLHTTP");
		oBao.open("POST","/AuditSystem/voucherquery/DoubtfuPointBack.jsp?autoid="+s+"&random=" + Math.random(),false);
		oBao.send();
		var noDel = unescape(oBao.responseText);
		if(noDel.indexOf("ok")>=0){
             refreshState2(obj,"��");
		}
	}
}


function takeOutEntry(s)
{	
        var obj=document.getElementById("outA"+s);
        var sign=obj.innerHTML;

        if(sign.indexOf("��")>=0){
        
          var strResult = "";
          try{
          	strResult=window.showModalDialog('/AuditSystem/voucherquery/takeoutPoint.jsp?autoid='+s+"&random=" + Math.random(),window,'dialogWidth:500px;dialogHeight:400px;center:yes;help:no;resizable:no;status:no');
          }catch(e){
          	
          	try{ 
				var oBao = new ActiveXObject("MTOffice.WebOffice");
		
				var myhost="http:\/\/"+window.location.host;
		
				strResult = oBao.ShowjsDialog(myhost+'/AuditSystem/voucherquery/takeoutPoint.jsp?autoid='+s+"&random=" + Math.random(),'dialogWidth:500px;dialogHeight:400px;center:yes;help:no;resizable:no;status:no')+"";
		
				oBao =null;
				
			 }catch(e){alert('�����ˣ�'+e);}
          }
          if(strResult && strResult.indexOf("ok")>=0){
            //obj.innerHTML="<font color=\"red\">��</font>";
            refreshState2(obj,"<font color=\"red\">��</font>");
          }

        }else if(sign.indexOf("��")>=0){
          var oBao = new ActiveXObject("Microsoft.XMLHTTP");
          oBao.open("POST","/AuditSystem/voucherquery/takeoutPointBack.jsp?autoid="+s+"&random=" + Math.random(),false);
          oBao.send();
          var noDel = unescape(oBao.responseText);
           if(noDel.indexOf("ok")>=0){
           	
             refreshState2(obj,"��");
           }
        }
}

function takeOutEntryExt(obj,s,tableId)
{		
      	var sign = obj.innerHTML ;
      	
      	 if(sign.indexOf("��")>=0){
		      var strResult = "";
		      try{
		      	strResult=window.showModalDialog('/AuditSystem/voucherquery/takeoutPoint.jsp?tableId='+tableId+'&flag=ext&autoid='+s+"&random=" + Math.random(),window,'dialogWidth:500px;dialogHeight:400px;center:yes;help:no;resizable:no;status:no');
		      }catch(e){
		      	try{ 
					var oBao = new ActiveXObject("MTOffice.WebOffice");
					var myhost="http:\/\/"+window.location.host;
					strResult = oBao.ShowjsDialog(myhost+'/AuditSystem/voucherquery/takeoutPoint.jsp?tableId='+tableId+'&flag=ext&autoid='+s+"&random=" + Math.random(),window,'dialogWidth:500px;dialogHeight:400px;center:yes;help:no;resizable:no;status:no')+"";
					oBao =null;
				 }catch(e){alert('�����ˣ�'+e);}
		      }
		      
		      if(strResult && strResult.indexOf("ok")>=0){
		      	refreshStateExt(tableId,"<font color=\"red\">��</font>",s);
		      }
      	 }else if(sign.indexOf("��")>=0){
          var oBao = new ActiveXObject("Microsoft.XMLHTTP");
          oBao.open("POST","/AuditSystem/voucherquery/takeoutPointBack.jsp?flag=ext&autoid="+s+"&random=" + Math.random(),false);
          oBao.send();
          var noDel = unescape(oBao.responseText);
           if(noDel.indexOf("ok")>=0){
           	 refreshStateExt(tableId,"��");
           }
        }
    }

    function refreshStateExt(tableId,state,autoId) {
	  	var grid = Ext.getCmp("gridId_"+tableId);
	  	var store = grid.getStore();
	  	var select = grid.getSelectionModel();
	  	var active = select.selection.get(select._activeItem);
        var row = active.row, col = active.col;
        var record = store.getAt(row);
        var voucherid = document.createElement(record.data['trValue']).voucherid;
        
        var count = store.getCount();
        for(var i=0;i<count;i++) {
        	var rs = store.getAt(i);
        	var vId = document.createElement(rs.data['trValue']).voucherid;
        	if(vId == voucherid) {
        		var o=select.grid.view.getCell(i,col);
        		o.innerHTML = "<DIV class=\"x-grid3-cell-inner x-grid3-col-p1 \" unselectable=\"on\">"
        					+ "<a onclick='takeOutEntryExt(this,\"" + autoId + "\",\""+tableId+"\");' href='#'>"
        					+ state
        					+ "</a></div>" ;
        	}
        }
	  	
    }

function takeOutEntry1(s,d){
  
	if(d==""){
		takeOutEntry(s);
	}else{
	
		 var obj=document.getElementById("outA"+s);
         var sign=obj.innerHTML;

        if(sign.indexOf("��")>=0){

 			var url = "/AuditSystem/voucherquery/takeoutPointSave.jsp?autoid="+s+"&subjectid="+d+"&random=" + Math.random();
			strResult = ajaxLoadPageSynch(url,"a=1");

          if(strResult.indexOf("ok")>=0){
            //obj.innerHTML="<font color=\"red\">��</font>";
            refreshState2(obj,"<font color=\"red\">��</font>");
          }

        }else if(sign.indexOf("��")>=0){
          var oBao = new ActiveXObject("Microsoft.XMLHTTP");
          oBao.open("POST","/AuditSystem/voucherquery/takeoutPointBack.jsp?autoid="+s+"&random=" + Math.random(),false);
          oBao.send();
          var noDel = unescape(oBao.responseText);
           if(noDel.indexOf("ok")>=0){
             //obj.innerHTML="��";
             refreshState2(obj,"��");
           }
        }
	}
}

function taskTax(s)
{

        var obj=document.getElementById("TaskTaxTD"+s);
    
        var sign=obj.innerHTML;
		
        if(sign.indexOf("˰")>=0){
          var strResult = window.showModalDialog('/AuditSystem/voucherquery/tasktaxPoint.jsp?autoid='+s+"&random=" + Math.random(),null,'dialogWidth:500px;dialogHeight:400px;center:yes;help:no;resizable:no;status:no')+"";
          if(strResult.indexOf("ok")>=0){
            var str ="<a id=\"outT"+ s + "\" href='javascript:taskTax(" + s + ");'><font color=\"red\">��</font></a>&nbsp;|&nbsp;<a id=\"outT"+ s + "\" href='javascript:taskEdit(" + s + ");'><font color=\"red\">��</font></a>";  
         
            refreshState1(obj,str);
          }

        }else if(sign.indexOf("��")>=0){
          var oBao = new ActiveXObject("Microsoft.XMLHTTP");
          oBao.open("POST","/AuditSystem/voucherquery/taketaxPointBack.jsp?autoid="+s+"&random=" + Math.random(),false);
          oBao.send();
          var noDel = unescape(oBao.responseText);
          if(noDel.indexOf("ok")>=0){   
             var str ="<a id=\"outT"+ s + "\" href='javascript:taskTax(" + s + ");'>˰</a>";
             refreshState1(obj,str);
          }
        
        }  
}

function taskEdit(s)
{

      window.showModalDialog('/AuditSystem/voucherquery/tasktaxPoint.jsp?autoid='+s+"&random=" + Math.random()+'&opt=1',null,'dialogWidth:500px;dialogHeight:400px;center:yes;help:no;resizable:no;status:no')+"";

}


function eliminate(s)
{

	var obj=document.getElementById("EliminateTD"+s);
	var sign=obj.innerHTML;
      
	if(sign.indexOf("��")>=0){
		
		var strResult = window.showModalDialog('/AuditSystem/voucherquery/EliminatePoint.jsp?autoid='+s+"&random=" + Math.random(),null,'dialogWidth:500px;dialogHeight:400px;center:yes;help:no;resizable:no;status:no')+"";
        
        if(strResult.indexOf("ok")>=0)	{
			//obj.innerHTML="";
			refreshState2(obj,"<font color=\"red\">��</font>");
		}
	}else if(sign.indexOf("��")>=0){
		var oBao = new ActiveXObject("Microsoft.XMLHTTP");
		oBao.open("POST","/AuditSystem/voucherquery/EliminatePointBack.jsp?autoid="+s+"&random=" + Math.random(),false);
		oBao.send();
		var noDel = unescape(oBao.responseText);
		if(noDel.indexOf("ok")>=0){
             refreshState2(obj,"��");
		}
	}
}


function goRectify(s){
  window.open("/AuditSystem/Voucher/AddandEdit.jsp?Autoid="+s);
}

function goAnalyze(s1,s2,s3){
  window.open("/AuditSystem/CheckoutInfo/CorrespondVoucherCheck.jsp?strDate="+s1+"&strSub="+s2+"&strDir="+s3+"&random=" + Math.random());
}


//���ɺ󣬵��õ�ˢ�·���
//��ָ��ƾ֤��״̬�ı�
function refreshState1(oTD,refreshValue){

	while(oTD.tagName!="TD"){
		oTD=oTD.parentElement;
	}

    //oTD���ڵ�table
	var oTable=oTD;
	while(oTable.tagName!="TABLE"){
		oTable=oTable.parentElement;
	}
	

	var oTableHead=oTable.rows(0);
	
	//oTD���ڵ���
	var oTDRow=oTD;
	while(oTDRow.tagName!="TR"){
		oTDRow=oTDRow.parentElement;
	}
	
	//oTD�� �е�����
	//˭�и��õİ취�����֪һ�¡�cellIndex���������⡣ 
	var oTDidx=-1;
	for(var i=0;i<oTDRow.cells.length;i++){

		if(oTDRow.cells(i).innerHTML==oTD.innerHTML){
			oTDidx=i;
			break;
		}
	}
	if(oTDidx==-1){
		//�޷���λ�����е��к�
		return;
	}
	
	if (oTDRow.voucherid){
	
		
		oTDRow.cells(oTDidx).firstChild.innerHTML=refreshValue;
		

	}else{
		//û�ж���TR���ԣ���ͨ��CELL��Ԫ��ȷ��ƾ֤�����У�
	
		//====ƾ֤���ڵ�����
		var idx=-1;
		//���ƾ֤���ڵ�����
		var cell;
		for(var i=0;i<oTableHead.cells.length;i++){
			cell=oTableHead.cells(i);
			if(cell.innerHTML.indexOf("ƾ֤����")>=0){
				idx=i;
				break;
			}
		}
	
		if(idx==-1){
			return;
		}
		//====��ʼˢ��
	
	
		//alert(oTD.innerHTML);
		//alert(oTD.parentElement.cells(oTDidx).innerHTML+":::"+oTDidx);
	    //��һ���Ǳ�ͷ�����һ����ҳβ
	    for(var i=1;i<oTable.rows.length-1;i++){
			var oRow=oTable.rows(i);
	
			//�ж�ƾ֤���ڣ�ƾ֤�֣�ƾ֤����Ƿ���ͬ��
			if(oTDRow.cells(idx).innerHTML==oRow.cells(idx).innerHTML
			  	&&oTDRow.cells(idx+1).innerHTML==oRow.cells(idx+1).innerHTML
			  	&&oTDRow.cells(idx+2).innerHTML==oRow.cells(idx+2).innerHTML){
			  	//�������ȣ���ˢ��
			  	oRow.cells(oTDidx).firstChild.innerHTML=refreshValue;
			}
		}
	}
}


//���ɺ󣬵��õ�ˢ�·���
//��ָ��ƾ֤��״̬�ı�
function refreshState2(oTD,refreshValue){
	
	while(oTD.tagName!="TD"){
		oTD=oTD.parentElement;
	}

    //oTD���ڵ�table
	var oTable=oTD;
	while(oTable.tagName!="TABLE"){
		oTable=oTable.parentElement;
	}

	var oTableHead=oTable.rows(0);
	
	//oTD���ڵ���
	var oTDRow=oTD;
	while(oTDRow.tagName!="TR"){
		oTDRow=oTDRow.parentElement;
	}
	
	//oTD�� �е�����
	//˭�и��õİ취�����֪һ�¡�cellIndex���������⡣ 
	var oTDidx=-1;
	for(var i=0;i<oTDRow.cells.length;i++){

		if(oTDRow.cells(i).innerHTML==oTD.innerHTML){
			oTDidx=i;
			break;
		}
	}
	if(oTDidx==-1){
		//�޷���λ�����е��к�
		return;
	}
	
	if (oTDRow.voucherid){
		//
		//��һ���Ǳ�ͷ�����һ����ҳβ
	    for(var i=1;i<oTable.rows.length-1;i++){
			var oRow=oTable.rows(i);
			//�ж�ƾ֤���ڣ�ƾ֤�֣�ƾ֤����Ƿ���ͬ��
				if(oTDRow.voucherid==oRow.voucherid){
			  		//�������ȣ���ˢ��
			  		oRow.cells(oTDidx).firstChild.innerHTML=refreshValue;
				}
		}
	}else{
		//û�ж���TR���ԣ���ͨ��CELL��Ԫ��ȷ��ƾ֤�����У�
	
		//====ƾ֤���ڵ�����
		var idx=-1;
		//���ƾ֤���ڵ�����
		var cell;
		for(var i=0;i<oTableHead.cells.length;i++){
			cell=oTableHead.cells(i);
			if(cell.innerHTML.indexOf("ƾ֤����")>=0){
				idx=i;
				break;
			}
		}
	
		if(idx==-1){
			return;
		}
		//====��ʼˢ��
	
	
		//alert(oTD.innerHTML);
		//alert(oTD.parentElement.cells(oTDidx).innerHTML+":::"+oTDidx);
	    //��һ���Ǳ�ͷ�����һ����ҳβ
	    for(var i=1;i<oTable.rows.length-1;i++){
			var oRow=oTable.rows(i);
	
			//�ж�ƾ֤���ڣ�ƾ֤�֣�ƾ֤����Ƿ���ͬ��
			if(oTDRow.cells(idx).innerHTML==oRow.cells(idx).innerHTML
			  	&&oTDRow.cells(idx+1).innerHTML==oRow.cells(idx+1).innerHTML
			  	&&oTDRow.cells(idx+2).innerHTML==oRow.cells(idx+2).innerHTML){
			  	//�������ȣ���ˢ��
			  	oRow.cells(oTDidx).firstChild.innerHTML=refreshValue;
			}
		}
	}
}

/* �Ժ������Ҫ�õ��Ĵ��� */
//	var obj=document.getElementById("outA"+s);
//	//alert(obj.innerText);
//	var oBao = new ActiveXObject("Microsoft.XMLHTTP");
//	oBao.open("POST","voucherquery/takeOutEntry.jsp?AutoID="+s,false);
//	oBao.send();
//	var strResult = unescape(oBao.responseText);



//	if(strResult.indexOf("ok")>=0)
//	{
//		obj.innerHTML="<font color=\"red\">��</font>";
//                window.showModalDialog('voucherquery/takeoutPoint.jsp?autoid='+s,'dialogWidth:400px;dialogHeight:300px;dialogLeft:200px;dialogTop:150px;center:yes;help:no;resizable:no;status:no');
//	}
//        if(strResult.indexOf("back")>=0)
//	{
//		obj.innerHTML="��";
//	}
