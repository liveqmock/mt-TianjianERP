/*
����1����#��ʾ���ֻ��ַ����ɼ���һ��С���㣬����С����ͻ����,��ʽ�������ʽ
����2��ÿ���ʽ֮������ӷ�
*/
String.prototype.HBformatNumber=function(FormatParttern,ConnectOption)
{
if(!/#/.test(FormatParttern))//�жϸ�ʽ�ǲ��ǿ��Խ��и�ʽ��
{
return "��ʽ����";
}
var FormatPartternArray=FormatParttern.split("\.");//�ֿ�С�����ֺ��������ֵĸ�ʽ
return splitNUM(this)
function splitNUM(num)//�˺������зֿ�����
{
try{
	var tt=(parseFloat(num).toFixed(2)).toString();
	//alert(tt);
	//alert(typeof(tt));
	NumArray=tt.split("\.")
}catch(e){
	NumArray=num.split("\.")
}
if(NumArray.length==1)
{
return formatNUM(NumArray[0],FormatPartternArray[0],true)
}
else
{
if(FormatPartternArray.length==1)
{
return formatNUM(NumArray[0],FormatPartternArray[0],true)+"."+NumArray[1]
}
else
{
return formatNUM(NumArray[0],FormatPartternArray[0],true)+"."+formatNUM(NumArray[1],FormatPartternArray[1],false)
}
}
}


/*
��ʽ���ַ�������
����1������ʽ�����ַ���
����2����ʽ����ʽ
����3���Ƿ�Ϊ������ʽ����trueΪ������ʽ����falseΪС�����ַ���ҲΪtrue
*/
function formatNUM(num,Formatparttern,ifInterger)
{
var IntergerPushArray=new Array();//����һ������ջ���������
var IntergerFormatPartternNum=Formatparttern.match(/\#/g).length//�õ�һ���ʽ����ʽ�а������ٸ�����/
var IntegerParttern=(ifInterger)?(new RegExp(Formatparttern.replace(/[^#]/g,"").replace(/#/g,".")+"$")):new RegExp("^"+Formatparttern.replace(/[^#]/g,"").replace(/#/g,"."))//��������Ϊ�˰�ÿ������ȡ����
//Ϊ�������-,127,123.00��������Ը������д���ȥ�����ţ��������ټ��ϸ��ţ���ʾΪ-127,123.00
var type="0";
if(num.indexOf("-")>-1) {
	num=num.substring(1,num.length);
	type="1";
}
while(IntegerParttern.test(num))
{
IntergerPushArray.push(num.match(IntegerParttern))//��ÿһ��ŵ�������
num=num.replace(IntegerParttern,"");//ȥ�����飬ȥ����һ��
}
if(num!="")
{
var RemainNum=num.length//ʣ�²���һ�����ֵ�ʱ���жϻ��м�������
var deleteNum=IntergerFormatPartternNum-RemainNum//һ����Ҫȥ�������ָ���
for(var i=0;i<IntergerFormatPartternNum;i++)//�����һ�鲻����λ����0���
{
num=(ifInterger)?("0"+num):(num+"0")
}
num=(ifInterger)?num.substr((num.length-parseInt(IntergerFormatPartternNum))):num.substr(0,IntergerFormatPartternNum)//�õ����һ����ʽ����ĺ���
IntergerPushArray.push(num);//�����һ���ջ
}
for(var i=0;i<IntergerPushArray.length;i++)
{
var j=-1;
var str=IntergerPushArray[i].toString();
IntergerPushArray[i]=Formatparttern.replace(/(#)/g,function($1){j++;return str.substr(j,1)})//�滻
}
if(ifInterger)//������������������򣬲���ͨ�������ַ�����ÿ�����ݣ�ȥ�������0�����򷵻ظ�ʽ�����С������
{
if(type=="1") {//Ϊ����ʱ����֮ǰȥ���˸��ż���ȥ
	return "-"+(IntergerPushArray.reverse().join(ConnectOption).substr(parseInt(deleteNum)));
} else {
	return (IntergerPushArray.reverse().join(ConnectOption).substr(parseInt(deleteNum)));
}
}
else
{
return(IntergerPushArray.join(ConnectOption))
}
}
}