var ROWS_LIMIT=30;//������������
var CURRENT_ROWS=1;//��ǰ����
var ACCOUNT_COUNT=0;//��׼��Ŀ������
var CURRENT_SELECT_OBJ=null;//��ǰ�ж���
var COLOR_MOUSEON="#FFFFFF";
var COLOR_MOUSEOFF="#B0C4DE";
var SHOW_IF_ONLY_ME=true;
var AUTO_WIDTH = 280;
var AUTO_HEIGHT = 250;
var tempHeight = 0;
var NOINPUT_COLOR = "#FFFFB3";	//noinput�ı������ɫ
var INPUT_COLOR = "#E8FFDF";	//�������ɫ

//USERDEF_REFRESHURL���ȫ�ֱ��������ڱ�JS���壬
//������ΪԤ�����û����õ�ҳ�����涨�壻
//USERDEF_REFRESHURL
//���û�ж��壬��ˢ�µ�ʱ������������᣺

var TEMP_SYSTEM_WEB_ROOT = "/AuditSystem/";

if(MATECH_SYSTEM_WEB_ROOT && MATECH_SYSTEM_WEB_ROOT!="") {
	TEMP_SYSTEM_WEB_ROOT = MATECH_SYSTEM_WEB_ROOT;
}

var DEFAULT_REFRESHURL= TEMP_SYSTEM_WEB_ROOT + "AS_SYSTEM/hint.do";
var NOSHOW_HINT;
var _myHistory;

//��ջ�Ͷ���
//==============================================================
function DefineObject(Variable,VariableType)
 {
  return "var " + Variable + " = new " + VariableType + "(\""+Variable+"\")\;";
 }
 function CallEvent(EventName)
 {
  return "try\{if\(this\." + EventName + "\)\{this\." + EventName + "\(this\)\;\}\}catch\(e\)\{er.AddError\(new ErrorItem\(Name,\"" + EventName + " ����ʧ��! \"+e\)\)\;\}";
 }
 //�ǳ�����󾯸�
 function MTError(PObject,PObjectName,PDescription)
 {
  //window.alert("\""+PObject+"\"����"+PObjectName+"��������ԭ��"+PDescription)
 }
 function OnSError(sMsg,sUrl,sLine)
 {
  try
  {
   //window.alert("MTError: " + sMsg + "\nLine: " + sLine + "\nURL: " + sUrl);
  }
  catch(e)
  {
   window.alert("Sorry!Msg:"+e);
  }
  return false;
 }
 window.onerror = OnSError;
 //�������ͽṹ��
 function ErrorItem(PObject,PDescription,PLine,PURL,PType)
 {
  try
  {
   this.EObject  = new String(PObject);  //�������
   this.EDescription = new String(PDescription); //��������
   this.ELine   = new Number(PLine);  //������
   this.EType   = new Boolean(PType);  //��������
   this.EURL   = new String(PURL);   //�����ַ
  }
  catch(e)
  {
   MTError(PObject,this.constructor,e);
  }
 }
 //����������
 function ErrorObject(PName)
 {
  try
  {
   //˽������
   var Name = String(PName);
   var EObject = new Array(); //�����б�
   var Length = new Number(0);//�б���
   //���з���
   this.AddError = AddError; //��Ӵ�����
   this.GetError = GetError; //������
   this.GetLength = GetLength;//ȡ�ô������
   this.ToXML  = ToXML; //����XML�ĵ�
   this.Clear = Clear;   //��������б�
   //�¼�
   this.OnError = null;//�����¼�
   //������ʵ��
   function AddError(PErrorItem)
   {
    try
    {
     try
     {
      if(PErrorItem.constructor == ErrorItem)
      {
       EObject[Length++] = PErrorItem;//¼�����Ԫ��
       try{if(this.OnError){this.OnError();}}catch(e){MTError(Name,"OnError",e);}
      }
     }
     catch(e)
     {
      MTError(Name,"PErrorItem",e);
     }
    }
    catch(e)
    {
     MTError(Name,"AddError",e);
    }
   }
   function GetError()
   {
    try
    {
     if(Length>0)
     {
      return EObject[Length-1]
     }
     else
     {
      return new ErrorItem();
     }
    }
    catch(e)
    {
     MTError(Name,"GetError",e);
    }
   }
   function GetLength()
   {
    try
    {
     return Length;
    }
    catch(e)
    {
     MTError(Name,"GetLength",e);
     return 0;
    }
   }
   function ToXML()
   {

   }
   function Clear()
   {
    try
    {
     Length = 0;
    }
    catch(e)
    {
     MTError(Name,"Clear",e);
    }
   }
  }
  catch(e)
  {
   MTError(Name,this.constructor,e);
  }

 }
 eval(DefineObject("er","ErrorObject"))
 er.OnError = MOnError;
 function MOnError()
 {
  window.alert(er.GetError().EObject+er.GetError().EDescription)
 }
 //�б����
 function List(PName)
 {
  try
  {
   //˽������
   var Name = PName
   var LObject = new Array();  //��ʼ���������
   var IsInit = new Boolean(); //�Ƿ��ʼ����
   var IsLoop = new Boolean(); //�Ƿ�ѭ��
   var Length = new Number(0); //�б���
   var Cursor = new Number(0); //��ǰָ��
   //���з���
   this.GetCursor = GetCursor;//ȡ�õ�ǰ�α�
   this.SetCursor = SetCursor;//���õ�ǰ�α�
   this.GetLength = GetLength;//ȡ�õ�ǰ�б���
   this.GetData = GetData; //ȡ�õ�ǰԪ��
   this.Next  = Next;  //�ƶ�����һ��Ԫ��
   this.Previous = Previous; //�ƶ���ǰһ��Ԫ��
   this.First  = First; //�ƶ�����һ��Ԫ��
   this.Last  = Last;  //�ƶ������һ��Ԫ��
   this.Move  = Move;  //�ƶ���ĳһλ�õ�Ԫ��
   this.Insert  = Insert; //����Ԫ��
   this.Update  = Update; //���µ�ǰԪ��
   this.Delete  = Delete; //ɾ����ǰԪ��
   this.Search  = Search; //������ǰԪ��λ��
   this.Clear  = Clear; //���
   //�¼�
   this.OnGetCursor = null ;//��ȡ�õ�ǰ�α�
   this.OnSetCursor = null ;//�����õ�ǰ�α�
   this.OnGetLength = null ;//��ȡ�õ�ǰ�б���
   this.OnGetData  = null ;//��ȡ�õ�ǰԪ��
   this.OnNext   = null ;//���ƶ�����һ��Ԫ��
   this.OnPrevious  = null ;//���ƶ���ǰһ��Ԫ��
   this.OnFirst  = null ;//���ƶ�����һ��Ԫ��
   this.OnMove   = null ;//���ƶ���ĳһλ�õ�Ԫ��
   this.OnLast   = null ;//���ƶ������һ��Ԫ��
   this.OnInsert  = null ;//������Ԫ��
   this.OnUpdate  = null ;//�����µ�ǰԪ��
   this.OnDelete  = null ;//��ɾ����ǰԪ��
   this.OnSearch  = null ;//��������ǰԪ��λ��
   this.OnClear  = null ;//�����

   //���з�����ʵ��
   function GetCursor()
   {
    try
    {
     if(this.GetLength()==0)
     {
      Cursor = 0;
     }
     eval(CallEvent("OnGetCursor"));
     return Cursor;
    }
    catch(e)
    {
     er.AddError(new ErrorItem(Name,"GetCursor����ʧ��"+e))
    }
   }
   function  SetCursor(PCursor)
   {
    try
    {
     var RCursor = new Number(PCursor);
     if(RCursor<0||isNaN(RCursor))
     {
      RCursor = 0;
     }
     if(RCursor>=Length)
     {
      RCursor = Length-1;
     }
     if(this.GetLength()==0)
     {
      RCursor = 0;
     }
     Cursor = RCursor;
     eval(CallEvent("OnSetCursor"));
     return Cursor;
    }
    catch(e)
    {
     er.AddError(new ErrorItem(Name,"SetCursor����ʧ��"+e))
    }
   }
   function  GetLength()
   {
    try
    {
     eval(CallEvent("OnGetLength"));
     return Length;
    }
    catch(e)
    {
     er.AddError(new ErrorItem(Name,"GetLength����ʧ��"+e))
    }
   }
   function  GetData(PCursor)
   {
    try
    {
     var TData = null;
     var TCursor = new Number(PCursor);
     if(this.GetLength()!=0)
     {
      if(!isNaN(TCursor))
      {
       if(TCursor>=0&&TCursor<this.GetLength())
       {
        TData = LObject[TCursor];
       }
      }
      else
      {
       TData = LObject[Cursor];
      }
     }
     eval(CallEvent("OnGetData"));
     return TData;
    }
    catch(e)
    {
     er.AddError(new ErrorItem(Name,"GetData����ʧ��"+e))
    }
   }
   function  Next()
   {
    try
    {
     this.SetCursor(this.GetCursor()+1);
     eval(CallEvent("OnNext"));
     return this.GetData(Cursor);
    }
    catch(e)
    {
     er.AddError(new ErrorItem(Name,"Next����ʧ��"+e))
    }
   }
   function  Previous()
   {
    try
    {
     this.SetCursor(this.GetCursor()-1);
     eval(CallEvent("OnPrevious"));
     return this.GetData(Cursor);
    }
    catch(e)
    {
     er.AddError(new ErrorItem(Name,"Previous����ʧ��"+e))
    }
   }
   function  First()
   {
    try
    {
     this.SetCursor(0);
     eval(CallEvent("OnFirst"));
     return this.GetData(Cursor);
    }
    catch(e)
    {
     er.AddError(new ErrorItem(Name,"First����ʧ��"+e))
    }
   }
   function  Last()
   {
    try
    {
     this.SetCursor(Length-1);
     eval(CallEvent("OnLast"));
     return this.GetData(Cursor);
    }
    catch(e)
    {
     er.AddError(new ErrorItem(Name,"Last����ʧ��"+e))
    }
   }
   function  Move(PCursor)
   {
    try
    {
     var TCursor = new Number(PCursor);
     if(!isNaN(TCursor))
     {
      this.SetCursor(TCursor);
     }
     eval(CallEvent("OnMover"));
     return this.GetData(Cursor);
    }
    catch(e)
    {
     er.AddError(new ErrorItem(Name,"Move����ʧ��"+e))
    }
   }
   function  Insert(PData,PCursor)
   {
    try
    {
     var TCursor = new Number(PCursor);
     var i = Number(0);
     if(!isNaN(TCursor))
     {
      if(TCursor<this.GetLength())
      {
       this.SetCursor(TCursor);
      }
      else
      {
       Cursor = this.GetLength();
      }
     }
     for(i=this.GetLength();i>this.GetCursor();i--)
     {
      LObject[i] = LObject[i-1];
     }
     LObject[this.GetCursor()] = PData;
     Length++;
     eval(CallEvent("OnInsert"));
     return this.GetCursor();
    }
    catch(e)
    {
     er.AddError(new ErrorItem(Name,"Insert����ʧ��"+e))
    }
   }
   function  Update(PData,PCursor)
   {
    try
    {
     var TCursor = new Number(PCursor);
     if(!isNaN(TCursor))
     {
      this.SetCursor(TCursor);
     }
     LObject[this.GetCursor()] = PData;
     eval(CallEvent("OnUpdate"));
     return this.GetCursor();
    }
    catch(e)
    {
     er.AddError(new ErrorItem(Name,"Update����ʧ��"+e))
    }
   }
   function  Delete(PCursor)
   {
    try
    {
     var TCursor = new Number(PCursor);
     var TData = null;
     var i = Number(0);
     if(!isNaN(TCursor))
     {
      this.SetCursor(TCursor);
     }
     if(this.GetLength()!=0)
     {
      TData = LObject[this.GetCursor()];
      for(i=this.GetCursor();i<this.GetLength();i++)
      {
       LObject[i] = LObject[i+1];
      }
      Length--;
     }
     eval(CallEvent("OnDelete"));
     return TData;
    }
    catch(e)
    {
     er.AddError(new ErrorItem(Name,"Delete����ʧ��"+e))
    }
   }
   function  Search(PData)
   {
    try
    {
     var i = Number(0);
     for(i=0;i<this.GetLength();i++)
     {
      if(LObject[i]==PData)
      {
       eval(CallEvent("OnSearch"));
       return i;
      }
      else
      {
       try
       {
        if(LObject[i].Even(PData))
        {
         eval(CallEvent("OnSearch"));
         return i;
        }
       }
       catch(e)
       {

       }
      }
     }
     eval(CallEvent("OnSearch"));
     return -1;
    }
    catch(e)
    {
     er.AddError(new ErrorItem(Name,"Search����ʧ��"+e))
    }
   }
   function Clear()
   {
    try
    {
     Length = 0;
     Cursor = 0;
     eval(CallEvent("OnClear"));
    }
    catch(e)
    {
     er.AddError(new ErrorItem(Name,"Clear����ʧ��"+e))
    }
   }
  }
  catch(e)
  {
   er.AddError(new ErrorItem(Name,"�����ʼ��ʧ�ܣ�"))
  }
 }
 //���д������
 function Queue(PName)
 {
  try
  {
   //˽������
   var Name = PName;
   eval(DefineObject("QLObject","List"));
   //���з���
   this.Pop = Pop;//������
   this.Push = Push;//������
   this.Clear = Clear;//���
   //�¼�
   this.OnPop = null;
   this.OnPush = null;
   this.OnClear = null;
   //������ʵ��
   function Pop()
   {
    try
    {
     var TData = null;
     QLObject.Last()
     TData = QLObject.Delete();
     eval(CallEvent("OnPop"));
     return TData;
    }
    catch(e)
    {
     er.AddError(new ErrorItem(Name,"Pop����ʧ��"+e))
    }
   }
   function Push(PData)
   {
    try
    {
     var TData = null;
     QLObject.First()
     TData = QLObject.Insert(PData);
     eval(CallEvent("OnPush"));
     return TData;
    }
    catch(e)
    {
     er.AddError(new ErrorItem(Name,"Push����ʧ��"+e))
    }
   }
   function Clear()
   {
    try
    {
     QLObject.Clear();
     eval(CallEvent("OnClear"));
    }
    catch(e)
    {
     er.AddError(new ErrorItem(Name,"Clear����ʧ��"+e))
    }
   }
  }
  catch(e)
  {
   er.AddError(new ErrorItem(Name,"�����ʼ��ʧ�ܣ�"))
  }
 }
 //ջ�������
 function Stack(PName)
 {
  try
  {
   //˽������
   var Name = PName;
   eval(DefineObject("SLObject","List"));
   //���з���
   this.Pop = Pop;//������
   this.Push = Push;//������
   this.Clear = Clear;//���
   //�¼�
   this.OnPop = null;
   this.OnPush = null;
   this.OnClear = null;
   //������ʵ��
   function Pop()
   {
    try
    {
     var TData = null;
     SLObject.Last()
     TData = SLObject.Delete();
     eval(CallEvent("OnPop"));
     return TData;
    }
    catch(e)
    {
     er.AddError(new ErrorItem(Name,"Pop����ʧ��"+e))
    }
   }
   function Push(PData)
   {
    try
    {
     var TData = null;
     TData = SLObject.Insert(PData,SLObject.GetLength());
     eval(CallEvent("OnPush"));
     return TData;
    }
    catch(e)
    {
     er.AddError(new ErrorItem(Name,"Push����ʧ��"+e))
    }
   }
   function Clear()
   {
    try
    {
     SLObject.Clear();
     eval(CallEvent("OnClear"));
    }
    catch(e)
    {
     er.AddError(new ErrorItem(Name,"Clear����ʧ��"+e))
    }
   }
  }
  catch(e)
  {
   er.AddError(new ErrorItem(Name,"�����ʼ��ʧ�ܣ�"))
  }
 }

//==========================��ջ�Ͷ��н���============================================


//==========================���ӵ�ר��Ϊ������˶����Ķ���============================
//ջ�������
 function MyHistory(iCount,strIds)
 {
  try
  {
   //˽������
   var pCount = iCount;
   var pIds= strIds.split("~");
   var pStack= new Array(iCount);

   for (var i=0;i<iCount ;i++ )
   {
		pStack[i]=new Stack();
   }

   //���з���
   this.Pop = Pop;//������
   this.Push = Push;//������
   this.Clear = Clear;//���

	//ͨ��ID����λ�ǵڼ�����ջ
   function locate(strId){
		for(var i=0;i<pCount;i++){
			if (pIds[i]==strId){
				return i;
			}
		}
		return -1;
   }

   //ָ���ö�ջ��������
   function Pop(strId)
   {
    try
    {
	 var i=locate(strId);
	 if (i>=0){
		var tData;
		tData=pStack[i].Pop();
		return tData;
	 }
    }
    catch(e)
    {
     er.AddError(new ErrorItem(Name,"Pop����ʧ��"+e))
    }
	return null;
   }

	//ָ���ö�ջѹ������
   function Push(strId,PData)
   {
    try
    {
	 var i=locate(strId);
	 if (i>=0){
		pStack[i].Push(PData);
	 }else{
		//�µĿؼ�����û�����ü���ʼ����,����ֱ�ӳ�ʼ��һ��
		pIds[pIds.length]=strId;
		pCount++;
		pStack[pStack.length]=new Stack();
		//��Ϊ�Ͼ仰������һ�����鵥Ԫ����������Ҫ-1��
		pStack[pStack.length-1].Push(PData);
	 }
    }
    catch(e)
    {
	alert(e);
     er.AddError(new ErrorItem(Name,"Pop����ʧ��"+e))
    }
   }

   function Clear(strId)
   {
	try
    {
	 var i=locate(strId);
	 if (i>=0){
		pStack[i].Clear();
	 }
    }
    catch(e)
    {
     er.AddError(new ErrorItem(Name,"Pop����ʧ��"+e))
    }
   }
  }
  catch(e)
  {
   er.AddError(new ErrorItem(Name,"�����ʼ��ʧ�ܣ�"))
  }
 }
//==========================���ӵ�ר��Ϊ������˶����Ķ���============================


//�ҵ���ǰ�������ڵ��ж���
function getTR() {
    var obj=event.srcElement;
    while (obj.tagName != "TR") {
        obj = obj.parentElement;
    }
    return obj;
}

function objMouseOver(obj) {
	obj.style.background=COLOR_MOUSEON;
}

function objMouseOut(obj) {
	obj.style.background=COLOR_MOUSEOFF;
}

function fMouseOver(){
    var el=getTR();
    el.style.background=COLOR_MOUSEON;
}

function fMouseOut(el){
    var el=getTR();
    el.style.background=COLOR_MOUSEOFF;
}

//�����б��
function HideSelect(){
  var AUTO_HINT_IFRAME = document.getElementById("AUTO_HINT_IFRAME") ;
  AUTO_HINT_LIST.style.visibility = "hidden";
  AUTO_HINT_IFRAME.style.display = "none"; 
    //ɾ��ԭ�����ص�����
  var rowsLength=accTABLE.rows.length;
  for (var i=1;i<=rowsLength;i++){
    accTABLE.deleteRow(0);
  }
 // TTags(); //PY�޸�
}


//�õ�ĳ���ؼ���ҳ���ϵ���������
function GetXY(aTag){
  var oTmp = aTag;
  var pt = new aPoint(0,0);
  do {
    pt.x += oTmp.offsetLeft -oTmp.scrollLeft;
  	pt.y += oTmp.offsetTop-oTmp.scrollTop;
  	oTmp = oTmp.offsetParent;
  } while(oTmp.tagName!="BODY");
  return pt;
}

//�����������
function aPoint(iX, iY){
	this.x = iX;
	this.y = iY;
}


//Ϊ��˩�ε�ǰ�����б�򣬽�ҳ��ԭ�е�select������
function ToggleTags(obj){
	/*
	with (document.all.tags("SELECT")){
	 	for (i=0; i<length; i++)
	 		if (TagInBound(item(i))){
	 			item(i).style.visibility = "hidden";
	 //			SeleTag[SeleTag.length] = item(i); //PY�޸�
	 		}
  	}*/
  	var AUTO_HINT_IFRAME = document.getElementById("AUTO_HINT_IFRAME") ;
  	//��iframeȥ��ס�Ǹ�select��div
  	AUTO_HINT_IFRAME.style.width = obj.offsetWidth;   
    AUTO_HINT_IFRAME.style.height = obj.offsetHeight -20;   
    AUTO_HINT_IFRAME.style.top = obj.style.top;   
    AUTO_HINT_IFRAME.style.left = obj.style.left;   
    AUTO_HINT_IFRAME.style.zIndex = obj.style.zIndex - 1;   
 //   AUTO_HINT_IFRAME.style.display = "block";   
}

//��ʾ�����б�� PY�޸�
function TTags(){
  with (document.all.tags("SELECT")){
 	for (i=0; i<length; i++)
 		if (TagInBound(item(i))){
 			item(i).style.visibility = "visible";
 //			SeleTag[SeleTag.length] = item(i);
 		}
  }
}

function TagInBound(aTag){
	return true;
  /*with (AUTO_HINT_LIST.style){
  	var l = parseInt(left);
  	var t = parseInt(top);
  	var r = l+parseInt(width);
  	var b = t+parseInt(height);
	var ptLT = GetXY(aTag);
	return !((ptLT.x>r)||(ptLT.x+aTag.offsetWidth<l)||(ptLT.y>b)||(ptLT.y+aTag.offsetHeight<t));
  }
  */
}

//�����б��
function onPopDivClick(SelectObj){

	CURRENT_SELECT_OBJ=SelectObj;

	if (!CURRENT_SELECT_OBJ) return;

	if (CURRENT_SELECT_OBJ.readOnly) return;

  	if (!CURRENT_SELECT_OBJ.autoid){
  		HideSelect();
  		setSelectionName("","��ǰ�����δ����autoid����");
  		HideSelect();
  		return;
  	}

	//������������б�ĸ�
	if(CURRENT_SELECT_OBJ.autoHeight) {
		tempHeight = CURRENT_SELECT_OBJ.autoHeight;
	} else {
		tempHeight = AUTO_HEIGHT;
	}

	//������������б�Ŀ�
	if(CURRENT_SELECT_OBJ.autoWidth) {
		AUTO_HINT_LIST.style.width = CURRENT_SELECT_OBJ.autoWidth;
		document.getElementById("AUTO_HINT_IFRAME").style.width = CURRENT_SELECT_OBJ.autoWidth;
	} else {
		AUTO_HINT_LIST.style.width = AUTO_WIDTH;
		document.getElementById("AUTO_HINT_IFRAME").style.width = AUTO_WIDTH;
	}

	//�����
	if(onKeyUpEvent()) {

		//����¼����������Լ�����
		event.cancelBubble=true;

		//var SelectObj=event.srcElement;
		var point = GetXY(SelectObj);
		//��¼��ǰѡ�еĶ���

		//�������굽
		with (AUTO_HINT_LIST.style) {
	  		left = point.x-0;
	  		top  = point.y+SelectObj.offsetHeight+2;
	  		width = AUTO_HINT_LIST.offsetWidth;
	  		height = AUTO_HINT_LIST.offsetHeight;
	  		
	  		ToggleTags(AUTO_HINT_LIST);	//���������б��
	  		visibility = 'visible';
	  	}
		AUTO_HINT_LIST.scrollTop=0;
	}


}

//���̰���
function onKeyDownEvent() {

	if (!CURRENT_SELECT_OBJ) return;

	/*
	//��ѡ���������룬ֻ��ѡ��
	try {
		if (CURRENT_SELECT_OBJ&&CURRENT_SELECT_OBJ.multiselect){
	    	event.returnValue = false;
	        return false;
    	}
	} catch(e) {
		//
	}
	*/


	//���Ƕ�ѡ�����
	var obj=event.srcElement;

    switch (event.keyCode) {
      case 13: // Enter
        HideSelect();
        break;
      case 8:  // Backspace
		if (obj.multilevel){
			if (obj.value==document.selection.createRange().text){
				//alert('�û���Ҫȫ��ɾ��');
				var objName=getName(CURRENT_SELECT_OBJ);
				//��¼�Ѿ�ѡ�е�ֵ���ѱ�����
				_myHistory.Clear(objName);
			}
		}else{
			if (obj.noinput=="true"  && obj.value !=document.selection.createRange().text){
				event.returnValue = false;
		        return false;
			}
		}
      case 9:  // Tab
      case 35: // End
      case 36: // Home
      case 37: // Left Arrow
      case 39: // Right Arrow
      case 46: // Del
		if (obj.multilevel){
			if (obj.value==document.selection.createRange().text){
				//alert('�û���Ҫȫ��ɾ��');
				var objName=getName(CURRENT_SELECT_OBJ);
				//��¼�Ѿ�ѡ�е�ֵ���ѱ�����
				_myHistory.Clear(objName);
			}
		}else{
			//����ȫѡɾ����ʽ
			if (obj.noinput=="true"  && obj.value !=document.selection.createRange().text){
				event.returnValue = false;
		        return false;
			}
		
		}

      return true;
    }

    if (obj.noinput=="true" ){
    	event.returnValue = false;
        return false;
    }else if (obj.valuemustbenumber=="true"){
    	// ֻ���� '0'��'9'�����������Ե�
		if (!(event.keyCode >= 48 && event.keyCode <= 57 ) && !( event.keyCode>=96 && event.keyCode<=105 )) {
			event.returnValue = false;
        	return false;
    	}
    } else {
		event.returnValue = true;
	}

}

//���̵���
function onKeyUpEvent(){
    if (event.keyCode==13 || event.keyCode==9) return;
    var pk1=event.srcElement.value;
    SHOW_IF_ONLY_ME=true;

	//event.srcElement.value = pk1.replace(/(\\|\$)*/g,'');
	//���ηǷ��ַ�
	pk1 = pk1.replace(/(\\|\$)*/g,'');

    return ajax_select_refresh(pk1);
}

//������ʾ�б��̨ˢ��
function ajax_select_refresh(pk1){

  try{

	if (!CURRENT_SELECT_OBJ) return;

  	if (!CURRENT_SELECT_OBJ.autoid){
		CURRENT_SELECT_OBJ=null;
  		HideSelect();
  		setSelectionName("","��ǰ�����δ����autoid����");
  		HideSelect();
  		return;
  	}

	/*
	if(accTBODY.innerHTML!="") {
		alert(accTBODY.innerHTML);
	}
	*/
  	//��ʼ����
	accTBODY.addBehavior("#default#download");
	var suburl;
	try{
		suburl=USERDEF_REFRESHURL;
	}catch(e){
		//���û�ж���USERDEF_REFRESHURL����ʹ��Ĭ�ϵģ�
		//alert('���û�ж���USERDEF_REFRESHURL����ʹ��Ĭ�ϵģ�');
		suburl=DEFAULT_REFRESHURL+"?autoid="+CURRENT_SELECT_OBJ.autoid;
		if (pk1!=""){
			suburl+="&pk1="+pk1;
		};
		if (CURRENT_SELECT_OBJ.refer){
			var qqq = document.getElementById(CURRENT_SELECT_OBJ.refer);

			//���qqq����ҳԪ��
			if(qqq) {
				if (qqq.tagName.toUpperCase()=="INPUT" && qqq.type.toUpperCase()=="FILE" ){
					//file���͵�
					if (qqq.value!=null && qqq.value!=""){
						//����ֻ֧��װ���ļ���
						var _filename =qqq.value.substring(qqq.value.lastIndexOf('\\')+1);
						_filename = _filename.substring(0,_filename.indexOf("_"));
						//alert(_filename);
						suburl += "&refer="+_filename;
					}
				}else{
					//��file���͵�INPUT��
					if (qqq.value!=null && qqq.value!=""){
						suburl += "&refer="+qqq.value;
					}
				}
			} else {
				suburl += "&refer=" + CURRENT_SELECT_OBJ.refer;
			}

		/*	else{
				if (qqq.title!=null && qqq.title!=""){
					suburl="������ɣ�"+qqq.title;
				}else{
					suburl="������ɣ�"+CURRENT_SELECT_OBJ.refer;
				}
			}
		*/
		}
		if (CURRENT_SELECT_OBJ.refer1){
			var qqq1=document.getElementById(CURRENT_SELECT_OBJ.refer1);

			//���qqq1����ҳԪ��
			if(qqq1) {
				if (qqq1.value!=null && qqq1.value!=""){
					suburl += "&refer1="+qqq1.value;
				}
			} else {
				suburl += "&refer1=" + CURRENT_SELECT_OBJ.refer1;
			}


		/*	else{
				if (qqq.title!=null && qqq.title!=""){
					suburl="������ɣ�"+qqq.title;
				}else{
					suburl="������ɣ�"+CURRENT_SELECT_OBJ.refer1;
				}
			}
		*/
		}
		if (CURRENT_SELECT_OBJ.refer2){
			var qqq2=document.getElementById(CURRENT_SELECT_OBJ.refer2);

			//���qqq2����ҳԪ��
			if(qqq2) {
				if (qqq2.value!=null && qqq2.value!=""){
					suburl += "&refer2="+qqq2.value;
				}
			} else {
				suburl += "&refer2=" + CURRENT_SELECT_OBJ.refer2;
			}

		}
		if(CURRENT_SELECT_OBJ.refer){
		//	var qqq=document.getElementById(CURRENT_SELECT_OBJ.refer);
			if(qqq) {
				if (qqq.value==null || qqq.value==""){
					if (qqq.title!=null && qqq.title!=""){
						suburl="������ɣ�"+qqq.title;
					}else{
						suburl="������ɣ�"+CURRENT_SELECT_OBJ.refer;
					}
				}
			}
		}
		if(CURRENT_SELECT_OBJ.refer1){
		//	var qqq=document.getElementById(CURRENT_SELECT_OBJ.refer1);
			if(qqq1) {
				if (qqq1.value==null || qqq1.value==""){
					if (qqq1.title!=null && qqq1.title!=""){
						suburl="������ɣ�"+qqq1.title;
					}else{
						suburl="������ɣ�"+CURRENT_SELECT_OBJ.refer1;
					}
				}
			}
		}
		if(CURRENT_SELECT_OBJ.refer2){
		//	var qqq2=document.getElementById(CURRENT_SELECT_OBJ.refer2);
			if(qqq2) {
				if (qqq2.value==null || qqq2.value==""){
					if (qqq2.title!=null && qqq2.title!=""){
						suburl="������ɣ�"+qqq2.title;
					}else{
						suburl="������ɣ�"+CURRENT_SELECT_OBJ.refer2;
					}
				}
			}
		}

	}
	if (suburl.indexOf("�������")>=0){
		//������ʾ�û���ѡ��������ѡ����Ŀ��Ȼ�󷵻�
		alert(suburl);

		try {
			var qqq=document.getElementById(CURRENT_SELECT_OBJ.refer);
			qqq.focus();
			onPopDivClick(qqq);
		} catch(e) {}

		return false;

	}else{
		createXmlHttp();
		xmlHttp.open("POST", suburl , true);
		xmlHttp.onreadystatechange = onDownload;
		xmlHttp.send(null);
		//accTBODY.startDownload(suburl,onDownloadSelectHintDone);

		return true;
	}

  }catch(ex){}
}

//-------------------------------------------
// �� Microsoft ������ϴ��� XMLHttpRequest ����
//-------------------------------------------
function createXmlHttp() {
	try {
		xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
		try {
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (e2) {
			xmlHttp = false;
		}
	}
}


function onDownload(){
	if(xmlHttp.readyState == 4) {
		if(xmlHttp.status == 200) {
			onDownloadSelectHintDone(unescape(xmlHttp.responseText));
		}
	}

}

//���ؿ�Ŀ���ִ�еĺ���
//s=OK|pk1|code`name|code`name
function onDownloadSelectHintDone(s){

  if (!CURRENT_SELECT_OBJ) return;

  var lineArray = s.split("|");
  if (lineArray[0] == "ERROR") {
    alert("����ʧ��:+"+lineArray[1]);
    return;
  }
  
  var theSelectCode="";
  var theDownSelectCode="";
  var objName=getName(CURRENT_SELECT_OBJ);

  //��¼֮ǰѡ���ֵ
  var preSelectCode=theSelectCode;
  //��ǰѡ���ֵ
  theSelectCode=lineArray[1];

  //ɾ��ԭ�����ص�����
  var rowsLength=accTABLE.rows.length;
  for (var i=1;i<=rowsLength;i++){
    accTABLE.deleteRow(0);
  }

  var allHTML="";

  //����ص��ϼ��Ĳ˵�
  if (CURRENT_SELECT_OBJ.multilevel){
		if ( theSelectCode!="" && theSelectCode!="null"){
			allHTML+="<TR height=\"18\" style=\"CURSOR: hand\" noWrap align=center onmouseover='fMouseOver()' onclick='checkedBackSpaceSelection()' onmouseout='fMouseOut()' bgColor="+COLOR_MOUSEOFF+" pk1='"+preSelectCode+"' pk1_name='"+preSelectCode+"'> <TD noWrap align=middle colSpan=3><FONT color=red><CODE>�ص���һѡ��</CODE></FONT></TD></TR> ";
		}
  }

  //����Ƕ༶����ôѡ�����һ��������£����ǲ�ȫһ����Ԫ���������ʾ

	//winner add on 20071103 for hint
	try{
		var autoselect_lastbutton_html = "";
		var _value = "��  ��";

		if (CURRENT_SELECT_OBJ.multiselect){
			_value = "ȷ����ѡ";
		}

		autoselect_lastbutton_html = "<span onclick='_doClose();' style='border: 1px solid #EEEEEE; width:100%; border-top: 0px;cursor:hand;text-align: center;padding:2px;' onMouseOver='objMouseOver(this);' onMouseOut='objMouseOut(this);' >" + _value +"</span>";

		document.getElementById("_autoselect_lastbutton_").innerHTML=autoselect_lastbutton_html;
	}catch(e){}

  var num=0;

  try {

 		var strnoWrap="";
		if (CURRENT_SELECT_OBJ.canWrap!="true") {
			strnoWrap=" noWrap ";
		}

		//����Ƕ�ѡ���͹����ѡ�ĸ�ѡ��
		if (CURRENT_SELECT_OBJ.multiselect) {
			var curTxtValue = CURRENT_SELECT_OBJ.value;
			curTxtValue = "," + curTxtValue + ",";

			allHTML += "<TR height=\"18\"  style=\"CURSOR: hand\" bgColor="+COLOR_MOUSEOFF+">"
					+ "<TD noWrap width=\"10%\">"
					+ "	<INPUT type=checkbox id=_sekectAllCheckBox onclick='_multiselectAll();' value=\"\" name=_sekectAllCheckBox></TD>"
					+ "<TD style=\"COLOR: red\" noWrap align=middle colSpan=2>"
					+ "<label for='_sekectAllCheckBox' onclick='_multiselectAll();' style='font-weight:normal;width:50%;height:22px; border-right:1px solid #eeeeee;cursor:hand;text-align: center;padding:2px;' onMouseOver='objMouseOver(this);' onMouseOut='objMouseOut(this);' >ȫ  ѡ</label>"
					+"<span onclick='_doClear();' style='width:50%;height:22px; cursor:hand;text-align: center;padding:2px;' onMouseOver='objMouseOver(this);' onMouseOut='objMouseOut(this);' >��  ��</span>"
					+ "</TD>"
					+ "</TR> ";




			for (var i=2; i<lineArray.length-1; i++) {
				num++;
				txtArray = lineArray[i].split("`");
				theDownSelectCode=txtArray[0];


				var strChecked="";
				if(( ','+curTxtValue+ ',').indexOf( ','+txtArray[0] + ',') >0 || curTxtValue==txtArray[0]) {
					strChecked=" checked=true ";
				}

				//
				allHTML+="<TR height=\"18\" title='��ѡ����ɺ���[ȷ��]��ť' style=\"CURSOR: hand\" bgColor="+COLOR_MOUSEOFF+" pk1='"+txtArray[0]+"' pk1_name='"+txtArray[1]+"'><TD noWrap width=\"10%\"><INPUT type=checkbox  "+strChecked+" value='"+txtArray[0]+","+txtArray[1]+"' name=ajaxpk1></TD> <TD noWrap width=\"30%\">��"+txtArray[0]+"��</TD> <TD "+strnoWrap+">"+txtArray[1]+"</TD></TR> ";

		  	}


		}else{
			allHTML+="<TR height=\"18\" style=\"CURSOR: hand\" bgColor="+COLOR_MOUSEOFF+" onmouseover=objMouseOver(this); onclick=_doClear(); onmouseout=objMouseOut(this);><TD style=\"COLOR: red\" noWrap align=center colSpan=3><SPAN >�� ��</SPAN></TD></TR> ";

			for (var i=2; i<lineArray.length-1; i++) {
				//ͳ���ܹ��ж�����
				num++; 


				txtArray = lineArray[i].split("`");
				theDownSelectCode=txtArray[0];

				allHTML+="<TR height=\"18\" style=\"CURSOR: hand\" onmouseover='fMouseOver()' onmouseout='fMouseOut()' onclick='checkedOneSelection()' bgColor="+COLOR_MOUSEOFF+" pk1='"+txtArray[0]+"' pk1_name='"+txtArray[1]+"'><TD noWrap width=\"30%\">��<CODE>"+txtArray[0]+"</CODE>��</TD><TD "+strnoWrap+"><CODE>"+txtArray[1]+"</CODE></TD></TR>";

			}
		}


		allHTML="<table border='0' cellspacing='1' cellpadding='0'  bgcolor='#EEEEEE' width='100%' id='accTABLE'><TBODY id=accTBODY>"+allHTML+"</TBODY></table>";
		spanaccTABLE.innerHTML=allHTML;


		var accTable = document.getElementById("accTable");

		//alert((accTable.rows.length+1)*(accTable.rows[1].height));
		var actualHeight = (accTable.rows.length+2)*(accTable.rows[1].height);

		if (CURRENT_SELECT_OBJ.multilevel){
			actualHeight = actualHeight + 6;
		} else if (CURRENT_SELECT_OBJ.multiselect) {
			actualHeight = actualHeight + 13;
		} else {
			actualHeight = actualHeight + 8;
		}


		//�����߶�
		if(tempHeight<actualHeight) {
			document.getElementById("AUTO_HINT_LIST").style.height = tempHeight;
			document.getElementById("AUTO_HINT_IFRAME").style.height = tempHeight -20;
		} else {
			document.getElementById("AUTO_HINT_LIST").style.height = actualHeight;
			document.getElementById("AUTO_HINT_IFRAME").style.height = actualHeight - 20;
		}
		
		//����λ��
		var bodyHeight = document.body.clientHeight ;
		var top = document.getElementById("AUTO_HINT_LIST").style.top ;
		var height = document.getElementById("AUTO_HINT_LIST").style.height ;
  		//alert("top:"+top+" heigth:"+height + " bodyHeight:"+bodyHeight);
  		if(parseInt(top)+parseInt(height) > bodyHeight) {
  			//���������ҳ��ĸ߶�,����������ʾ���ı�����Ϸ�
  			top = parseInt(top) - parseInt(height) - 8;
  			document.getElementById("AUTO_HINT_LIST").style.top = top ;
  			document.getElementById("AUTO_HINT_IFRAME").style.top = top ;
  		}
		
		document.getElementById("AUTO_HINT_IFRAME").style.display = "block";
		//�������������ʾ������
		if (!SHOW_IF_ONLY_ME ){
	 		//��������˶༶����Ҫ�����ѡ��������һ��Ҷ�ӽڵ���������
	 		if (CURRENT_SELECT_OBJ.multilevel){
				if ( theDownSelectCode==theSelectCode || num==0) HideSelect();
			}else{
				//���û�ж���༶�����������������Ϳ���������
		   		HideSelect();
			}
		}else if (num==0){
			if (!CURRENT_SELECT_OBJ.multilevel){
					//���Ƕ༶������£������أ�
			 		HideSelect();
		  	}
		}else{
			//һ��ʼʲô��û��ѡ��ʱ��
		   	AUTO_HINT_LIST.style.visibility = "visible";
		}
	} catch(e) {

	}

}

//��������¼�
function checkedBackSpaceSelection(){
  try{

  	if (!CURRENT_SELECT_OBJ) return;

	var oTR=getTR();
    var pk1=oTR.pk1;
    var pk1_name=oTR.pk1_name;

	var objName=getName(CURRENT_SELECT_OBJ);

	//��¼�Ѿ�ѡ�е�ֵ���ѱ�����
	pk1=_myHistory.Pop(objName);
	pk1=_myHistory.Pop(objName);
	if (pk1==null)
	{pk1="";
	}

    setSelectionValueAndName(pk1,pk1_name);

    SHOW_IF_ONLY_ME=false;
    ajax_select_refresh(pk1);
  }catch(ex){}
}

//ѡ���б���ֵ�������ı��򣬲��������б��
function checkedOneSelection(){
  try{

  if (!CURRENT_SELECT_OBJ) return;

	var oTR=getTR();
    var pk1=oTR.pk1;
    var pk1_name=oTR.pk1_name;
	setSelectionValueAndName(pk1,pk1_name);

		if (CURRENT_SELECT_OBJ.multilevel){
			var objName=getName(CURRENT_SELECT_OBJ);
			//��¼�Ѿ�ѡ�е�ֵ���ѱ�����
			_myHistory.Push(objName,pk1);
		}

      	SHOW_IF_ONLY_ME=false;
      	ajax_select_refresh(pk1);
  }catch(ex){}
}

function getAdviceName(obj){
	return 'advice-'+obj.name;
}

function getAdviceId(obj){
	return 'advice-'+obj.id;
}

function getAdviceObj(obj){
	var adviceobj;
	try{

		//���Ҷ�Ӧ��ֵ
		var adviceId = "" ;
		var objId = "" ;
		if(!obj.id) {
			adviceId = getAdviceName(obj) ;
			objId = obj.name
		}else {
			adviceId = getAdviceId(obj) ;
			objId = obj.id ;
		}
		adviceobj=document.getElementById(adviceId);
		
		if(obj.clone) {
			return obj ;
		}
		if (adviceobj==null){ 
			var useAdvice = obj.useAdvice ;  //�õڶ����ֶηŵ��������ȥ
			//û���ҵ��ʹ���1��
			if(useAdvice) {
				//û���ҵ��ʹ���1��
				if (adviceobj==null){
					adviceobj = document.createElement('span');
					adviceobj.id = getAdviceName(obj);
					obj.parentNode.insertBefore(adviceobj, obj.nextSibling);
				}
			}else {
					var adviceobj = obj.cloneNode();
					var objName =  getAdviceName(obj);
					adviceobj.id = adviceId ;
					adviceobj.removeAttribute("name");
					adviceobj.clone = true ;
					adviceobj.cloneObj = obj;
					adviceobj.cloneId = objId;
					
					obj.parentNode.insertBefore(adviceobj, obj.nextSibling);
					
					if(obj.hideresult || obj.multiselect) {
						adviceobj.style.display = "none" ;
					}else {
						obj.style.display = "none" ; 
					}
			}
		}
		
	}catch(e){
		alert("������"+e.description);
	}
	return adviceobj;
}

//��ѡ��Ĵ��������д��ҳ����
function setSelectionValueAndName(pk1,pk1_name){
	

    if (!CURRENT_SELECT_OBJ) return;

  	//���������hideresult�Ͳ���ʾNAME��ʾ
  	if (CURRENT_SELECT_OBJ.hideresult=="true" && CURRENT_SELECT_OBJ.useAdvice){
  		
  	}else
  		setSelectionName(pk1,pk1_name);

	//����ѡ��ֵ,���һ�����ͷ����˳�
	if (CURRENT_SELECT_OBJ.value!=pk1){
		
		if(CURRENT_SELECT_OBJ.clone) {
			var cloneObj = CURRENT_SELECT_OBJ.cloneObj;
			if(!cloneObj) {
				cloneObj = document.getElementById(CURRENT_SELECT_OBJ.cloneId) ;
			}
			cloneObj.value = pk1 ;
			CURRENT_SELECT_OBJ.value=pk1_name;
		}else {
			CURRENT_SELECT_OBJ.value=pk1;
		}
		//��������˹�����Ŀ�������ù�����Ŀ��VALUEΪ�գ�
		if (CURRENT_SELECT_OBJ.refreshtarget){
			try{
				var qqq=document.getElementById(CURRENT_SELECT_OBJ.refreshtarget);
				if (qqq){
					qqq.value="";
				}

				qqq=document.getElementById("advice-"+CURRENT_SELECT_OBJ.refreshtarget);
				
				if (qqq){
					if(qqq.clone) {
						qqq.value="";
					}else {
						qqq.innerHTML="";
					}
					
				}


			}catch(e){}
		}

		//��������˹�����Ŀ�������ù�����Ŀ��VALUEΪ�գ�
		if (CURRENT_SELECT_OBJ.refreshtarget1){
			document.getElementById(CURRENT_SELECT_OBJ.refreshtarget1).value="";
		}
		//��������˹�����Ŀ�������ù�����Ŀ��VALUEΪ�գ�
		if (CURRENT_SELECT_OBJ.refreshtarget2){
			document.getElementById(CURRENT_SELECT_OBJ.refreshtarget2).value="";
		}
		//����ѡ��������onchange�¼����Ա�����
		try {
			if(CURRENT_SELECT_OBJ.clone) {
				CURRENT_SELECT_OBJ.cloneObj.onchange();
			}else {
				CURRENT_SELECT_OBJ.onchange();
			}
		}catch(e){}

	}
	
	if(CURRENT_SELECT_OBJ.clone) {
		CURRENT_SELECT_OBJ.value=pk1_name;
		var cloneObj = CURRENT_SELECT_OBJ.cloneObj;
		if(!cloneObj) {
			cloneObj = document.getElementById(CURRENT_SELECT_OBJ.cloneId) ;
		}
		cloneObj.value = pk1;
	}
	
  
}

//������ʾֵ
function setSelectionName(pk1,pk1_name){
  try{
	if (!CURRENT_SELECT_OBJ) return;

	//�����ʾ��ʾ��Ϣ�Ķ���
	var adviceobj=getAdviceObj(CURRENT_SELECT_OBJ);
	
	//��ʾ��ʾ��Ϣ�������ʾ����ֵһ�����Ͳ���ʾ��
	
	if(CURRENT_SELECT_OBJ.useAdvice) {
		adviceobj.innerHTML=(pk1==pk1_name ?"" :pk1_name);
	}else {
		
		if(CURRENT_SELECT_OBJ.clone) {
			var cloneObj = document.getElementById(CURRENT_SELECT_OBJ.cloneId) ;
		//	alert(CURRENT_SELECT_OBJ.cloneId);
			cloneObj.value = pk1;
			CURRENT_SELECT_OBJ.value=pk1_name;
			
		}else {
			adviceobj.value = pk1_name ;
			//CURRENT_SELECT_OBJ.onchange();
		}
	}
	return;
  }catch(ex){}
}


with (document) {

	write("<Div id=AUTO_HINT_LIST onclick='event.cancelBubble=true'  style='POSITION:absolute; z-index:999999;visibility:hidden;OVERFLOW-Y:auto;OVERFLOW-X:auto;'>");
	write("		<table border='0' cellspacing='1' cellpadding='0'  bgcolor='#6595d6' width='100%'>");
	write("			<tr>");
	write("				<td  nowrap='nowrap'>");

	write("					<span  width='100%' id='spanaccTABLE'><table border='0' cellspacing='1' cellpadding='0'  bgcolor='#EEEEEE' width='100%' id='accTABLE'>");
	write("  					<tbody id='accTBODY'>");
	write("  					</tbody>");
	write("  					</tbody>");
	write("					</table></span>");

	write("<table border='0' cellspacing='0' cellpadding='0'  bgcolor='#B0C4DE' width='100%'>");
	write("  <tr height=18>");
	write("  	<td align='center' nowrap='nowrap' id='_autoselect_lastbutton_' style='color:red;'>");
	write("  		<div border: 1px solid #EEEEEE; border-top: 0px;cursor:hand;text-align: center;padding:2px; onMouseOver='objMouseOver(this);' onMouseOut='objMouseOut(this);'  onclick='_doClose();'>");
	write("��  ��");
	write("			</div></td></tr>");
	write("</table>");
	write("</td>");
	write("</tr>");
	write("</table>");
	write("</Div>");
	
	write("<iframe id=AUTO_HINT_IFRAME src=\"javascript:false;\"  scrolling=\"no\" frameborder=\"0\" style=\"position:absolute;top:0px;left:0px; display:none;\"></iframe>") ;

	//�޸��ö�ѡ��ʱ���������ط�Ҳ�������ѡ��
	write("<SCRIPT event=onclick() for=document>_doClose()</SCRIPT>");
}

function _doClose(){
	//����Ƕ�ѡ�������÷���ֵ
	if (CURRENT_SELECT_OBJ && CURRENT_SELECT_OBJ.multiselect && !CURRENT_SELECT_OBJ.readOnly){
		checkedOneSelection2();
	}
	//����
	HideSelect();

	//�ѵ�ǰѡ�жԻ�����Ϊ��
	CURRENT_SELECT_OBJ=null;

}

function getAdvice(id){
	try{
		return document.getElementById('advice-' + id);
	}catch(e){
		return null;
	}
}

//ȡ�ö�������֣�����ж���ID���ͷ���ID�����򷵻�NAME
function getName(obj){
	if (obj!=null)
	{
		if (obj.id)
		{
			return obj.id
		}else{
			if (obj.name)
			{
				return obj.name
			}else{
				return "δ����"
			}
		}
	}
}

//��ѡ��Ĵ��������д��ҳ����
function setSelectionValueAndName2(){
  try{
    var multi_Pk1=setSelectionName2();
    //����ѡ��ֵ,���һ�����ͷ����˳�
    if (CURRENT_SELECT_OBJ!=null){
		CURRENT_SELECT_OBJ.value=multi_Pk1;
		//��������˹�����Ŀ�������ù�����Ŀ��VALUEΪ�գ�
		if (CURRENT_SELECT_OBJ.refreshtarget){
		  var qqq=document.getElementById(CURRENT_SELECT_OBJ.refreshtarget);
		  qqq.value="";
		}

		//��������˹�����Ŀ�������ù�����Ŀ��VALUEΪ�գ�
		if (CURRENT_SELECT_OBJ.refreshtarget1){
			document.getElementById(CURRENT_SELECT_OBJ.refreshtarget1).value="";
		}
		//��������˹�����Ŀ�������ù�����Ŀ��VALUEΪ�գ�
		if (CURRENT_SELECT_OBJ.refreshtarget2){
			document.getElementById(CURRENT_SELECT_OBJ.refreshtarget2).value="";
		}

		//����ѡ��������onchange�¼����Ա�����
		CURRENT_SELECT_OBJ.onchange();
    }
  }catch(ex){}
}

//��ѡ��ȫѡ
function _multiselectAll() {

	var chkObj = document.getElementById("_sekectAllCheckBox");

	var ajaxpk=document.getElementsByName("ajaxpk1");
	for(var i=0; i < ajaxpk.length; i++) {
		ajaxpk[i].checked = chkObj.checked;
	}
}

//����ı���ֵ
function _doClear() {
	try {
		//����ı���ֵ
		CURRENT_SELECT_OBJ.value = "";
		
		var advicObj = getAdvice(CURRENT_SELECT_OBJ.name);

		//�����ʾֵ
		if(advicObj) {
			if(advicObj.useAdvice) {
				advicObj.innerHTML = "";
			}else {
				advicObj.value = "";
			}
		}
		
		if(CURRENT_SELECT_OBJ.clone) {
			//������ǿ�¡�����ģ������ǰ���ֵ
			var cloneObj = CURRENT_SELECT_OBJ.cloneObj ;
			if(!cloneObj) {
				cloneObj = document.getElementById(CURRENT_SELECT_OBJ.cloneId) ;
			}
			
			cloneObj.value = "" ;
		}

		//ˢ���б�
		ajax_select_refresh('');

		//��ն�ѡ
		var ajaxpk = document.getElementsByName("ajaxpk1");

		for(var i=0; i < ajaxpk.length; i++) {
			ajaxpk[i].checked = false;
		}

		var _sekectAllCheckBox = document.getElementById("_sekectAllCheckBox");

		if(_sekectAllCheckBox) {
			_sekectAllCheckBox.checked = false;
		}
	} catch(e) {
	}
}

//������ѡ�����ʾֵ
function setSelectionName2(){
  var multi_Pk1 = "";
  try{
    if (CURRENT_SELECT_OBJ) {

		var ajaxpk=document.getElementsByName("ajaxpk1");
		var pklen= ajaxpk.length;
		var ischoice;
		var pk1Values;
		var pk1Value="";
		var i;
		ischoice=false;
		for (i = 0;i< pklen;i++){
		  if (ajaxpk[i].checked==true) {
			pk1Values = ajaxpk[i].value.split(",");
			multi_Pk1 = multi_Pk1+pk1Values[0] + ',';
			pk1Value = pk1Value + pk1Values[1]+";";
		  }
		}
	}

	var t=multi_Pk1.length;
	//alert(multi_Pk1.substring(0,t-1));
	if (t>0 && multi_Pk1.substring(t-1,t)==",")
	{
		multi_Pk1=multi_Pk1.substring(0,t-1);
	}

	return multi_Pk1;
  }catch(ex){}
}

//ѡ���б���ֵ�������ı��򣬲��������б��
function checkedOneSelection2(){
  try{
    setSelectionValueAndName2();
    SHOW_IF_ONLY_ME=false;
    //refresh2(pk1);
  }catch(ex){}
}

//�����ѡ���б��ʱ���л�
function switchOneSelection(){
  try{
    var oTR=getTR();

	if (oTR && event.srcElement.tagName!="INPUT")
	{
		var inputCheckbox=oTR.cells[0].childNodes[0];
		if (inputCheckbox)
		{
			inputCheckbox.checked =!inputCheckbox.checked;
		}
	}
  }catch(ex){}
}

function dtRestoreHintLoader()
{	
	var oInputs = document.all.tags("INPUT");
	var autoMultiCount=0;
	var strInputNames="";
	for ( i = 0; i < oInputs.length; i++ ) {
		//if(oInputs(i).readOnly == true) {
		//	continue;
		//}

		if (oInputs(i).autoid && !oInputs(i).clone){
			try{
				//�ر��Զ����
				oInputs(i).autocomplete="off";
			}catch(e){}

			if (oInputs(i).multilevel)
			{
				//ͳ��ҳ��������ѡ��������ĸ���
				autoMultiCount++;

				if (autoMultiCount==1)
				{
					strInputNames=getName(oInputs(i))
				}else{
					strInputNames+="~"+getName(oInputs(i))
				}
			}

			/*
			��֪���в����ĺ���ӳ�䣬��ʱ�Ȳ��ṩ�Զ��ҽӹ��ܣ�
			oInputs(i).onkeydown=onKeyDownEvent;
			oInputs(i).onkeyup=onKeyUpEvent;
			oInputs(i).onclick=onPopDivClick(this);
			*/

			//����ı�����������,��ı��ı�����ɫ
			if (oInputs(i).readOnly==false){
				if(oInputs(i).noinput=="true") {
					oInputs(i).style.backgroundColor = NOINPUT_COLOR;
					//oInputs(i).style.borderColor = NOINPUT_COLOR;
				} else {
					oInputs(i).style.backgroundColor = INPUT_COLOR;
				}
			}
			
			if (oInputs(i).value != null && oInputs(i).value !=""
				&& (!oInputs(i).norestorehint || !oInputs(i).norestorehint=="true")) {
				//���û�н�ֹˢ�£��ҳ�ʼֵ�����ݣ��ͺ�̨ȡ����

				//var url="/AuditSystem/AS_SYSTEM/auto_hint_select.jsp?checkmode=1&autoid="+oInputs(i).autoid+"&pk1=" + oInputs(i).value;
				var url=DEFAULT_REFRESHURL + "?checkmode=1&autoid="+oInputs(i).autoid+"&pk1=" + oInputs(i).value;
					//���к�̨У��

				//ȡ����ֵ
				var referValue="";
				if(oInputs(i).refer){
					var oRefer=document.getElementById(oInputs(i).refer);
					if(oRefer && oRefer.value!=null&&oRefer.value!=""){
						referValue=referValue+"&refer="+oRefer.value;
					} else {
						referValue = referValue + "&refer=" + oInputs(i).refer;
					}
				}
				
				if(oInputs(i).refer1){
					var oRefer=document.getElementById(oInputs(i).refer1);
					if(oRefer && oRefer.value!=null&&oRefer.value!=""){
						referValue=referValue+"&refer1="+oRefer.value;
					} else {
						referValue = referValue + "&refer1=" + oInputs(i).refer1;
					}
				}
				if(oInputs(i).refer2){
					var oRefer=document.getElementById(oInputs(i).refer2);
					if(oRefer && oRefer.value!=null&&oRefer.value!=""){
						referValue=referValue+"&refer2="+oRefer.value;
					}else {
						referValue = referValue + "&refer2=" + oInputs(i).refer2;
					}
				}
				url=url+referValue;

				var oBao = new ActiveXObject("Microsoft.XMLHTTP");
					//oBao.asynchronous=false;
	  			oBao.open("POST",url,false);
	  			oBao.send();
	  			var strResult = unescape(oBao.responseText);
	  			if(strResult.indexOf('OK')>=0){
	  				//ȡ����ֵ����
					//alert(strResult);
					var lineArray = strResult.split("|");
					var txtArray = lineArray[2].split("`");
	    				//alert(txtArray[1]);
					/*
					 * 	var adviceobj= oInputs(i) ; 
	    				adviceobj.cloneObj = oInputs(i) ;
	    				adviceobj.id = getAdviceName(oInputs(i))
	    				oInputs(i).parentNode.insertBefore(adviceobj,oInputs(i).nextSibling);	
					 * */
					//	var adviceobj = getAdviceObj(oInputs(i));
					
	    			var adviceobj=getAdviceObj(oInputs(i));
					//��ʾ��ʾ��Ϣ�������ʾ����ֵһ�����Ͳ���ʾ��
	    			if(oInputs(i).useAdvice) {
	    				adviceobj.innerHTML=(txtArray[0]==txtArray[1] ? "" :txtArray[1]);
	    			}else {
	    				adviceobj.value= (txtArray[0]==txtArray[1] ? oInputs(i).value : txtArray[1]);
	    			}
					
				}
			}
		}
	}

	if (autoMultiCount>0)
	{
		//��ʼ�����˵���ʷ����
		 _myHistory=new MyHistory(autoMultiCount,strInputNames);
	}
}

function _doReset(id) {
		var textObj = document.getElementById(id);
		textObj.value = "";
		
		var advicObj = getAdvice(textObj.name);

		//�����ʾֵ
		if(advicObj) {
			if(advicObj.useAdvice) {
				advicObj.innerHTML = "";
			}else {
				advicObj.value = "";
			}
		}
		
		if(textObj.clone) {
			//������ǿ�¡�����ģ������ǰ���ֵ
			var cloneObj = textObj.cloneObj ;
			if(!cloneObj) {
				cloneObj = document.getElementById(textObj.cloneId) ;
			}
			
			cloneObj.value = "" ;
		}
}

window.attachEvent('onload',dtRestoreHintLoader);

/*
//��һ�β����Զ����Ӻ�����ʷ��Ԫ�Ĺ���
//ֻ��ʼ��һ����ʷ��Ԫ
var tt=new MyHistory(1,"input1");
tt.Push("input1",1000);
tt.Push("input1",2000);

alert(tt.Pop("input1"));
alert(tt.Pop("input1"));

//ֱ��ʹ�õڶ�����Ӧ�ÿ������̳�ʼ��һ��
tt.Push("input2",1);
tt.Push("input2",2);
tt.Push("input2",3);

alert(tt.Pop("input2"));
alert(tt.Pop("input2"));
*/