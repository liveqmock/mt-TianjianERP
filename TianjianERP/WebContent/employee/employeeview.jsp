<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" errorPage="/hasNoRight.jsp"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
<%@ taglib uri="http://ckeditor.com" prefix="ckeditor" %>
<script type="text/javascript" src="${pageContext.request.contextPath}/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/ckfinder/ckfinder.js"></script>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title></title>

<style type="text/css">

  .formTable input{
    width: 90%;
  }

</style>

<script src="<%=request.getContextPath()%>/AS_INCLUDE/images/editor.js" charset=GBK></script>
<script src="<%=request.getContextPath()%>/AS_INCLUDE/images/DhtmlEdit.js" charset=GBK></script>

<style>
	#t {
		{border-collapse:collapse;border:none;};
	}
	
	#t td{
		{border:solid #6595d6 1px;};
	}
	
	
</style>
<script Language=JavaScript>

	function ext_init(){
	
		mt_form_initDateSelect();
		mt_form_initAttachFile();
		
	//    var tbar = new Ext.Toolbar({
	//   		renderTo: "divBtn",
	//   		defaults: {autoHeight: true,autoWidth:true},
    ///        items:[{
	//            text:'申请',
	 //           cls:'x-btn-text-icon',
	  //          icon:'${pageContext.request.contextPath}/img/start.png',
	  //          handler:function(){
		//			return save();
		//		}
       //		},'->']
      //  });
        
    }
	
	
    window.attachEvent('onload',ext_init);
</script>


</head>
<body leftmargin="0" topmargin="0" style=" overflow: scroll;" >

<input type="hidden" id="uuid" name="uuid" value="">

<div style="height: 400px;">
<form  name="thisform" action="${pageContext.request.contextPath}/employee.do?method=add" method="post">
<table border="1" class="formTable" >
	<thead>
		<tr>
			<th colspan="8" rowspan="2">
				<p class="p0" style="text-align: center; margin-top: 0pt; margin-bottom: 0pt">
					<span style="font-size: 26px">天健会计师事务所</span><br />
					&nbsp;</p>
				<!--EndFragment--></th>
			<td colspan="2" rowspan="4">
				</td>
			
		</tr>
		<tr>
			
			
		</tr>
	</thead>
	<tbody>
		<tr>
			<th colspan="6" style="text-align: center">
				员工登记表</th>
		</tr>
		<tr>
			<th >
				姓名</th>
			<td style="width: 120px">
          
				<input id="name" name="name" type="text" value="${employeeVO.name }"  readonly="readonly"/></td>
			<th >
				性别</th>
			<td style="width: 120px">
			<select id="sex" name="sex" value="${employeeVO.sex }" readonly="readonly">
				<option value="男">男</option>
				<option value="女">女</option>
			</select>
				
			<th>
				民族</th>
			<td style="width: 120px">
				<input id="nation" name="nation" type="text" value="${employeeVO.nation }" readonly="readonly"/></td>
			
		</tr>
		<tr>
			<th>
				婚姻状况（已婚/未婚）</th>
			<td>
			<select id="marriage" name="marriage" value="${employeeVO.marriage }" readonly="readonly">
				<option value="未婚">未婚</option>
				<option value="已婚">已婚</option>
			</select>
				</td>
			<th>
				身份证号</th>
			<td >
				<input id="idcard" name="idcard" type="text" value="${employeeVO.idcard }" readonly="readonly"/></td>
				<th>
				出生日期</th>
			<td>
				<input id="brithday" name="brithday"  ext_id=brithday ext_name=brithday 
				 type="text"    value="${employeeVO.brithday }" readonly="readonly"/></td>
		</tr>
		<tr>
			<th>
				出生地</th>
			<td>
				<input id="brith_address" name="brith_address"  type="text" value="${employeeVO.brith_address }" readonly="readonly"/></td>
			<th>
				籍贯</th>
			<td>
				<input id="natives" name="natives"  type="text"  value="${employeeVO.natives }" readonly="readonly"/></td>
			<th>
				父母居住地</th>
			<td >
				<input id="parents_address" name="parents_address" type="text"  value="${employeeVO.parents_address }" readonly="readonly"/></td>
		</tr>
		<tr>
			<th>
				参加工作时间</th>
			<td>
				<input id="wrok_time" name="wrok_time"  ext_id=wrok_time ext_name=wrok_time      type="text" value="${employeeVO.wrok_time }" readonly="readonly"/></td>
			<th>
				进所工作日期</th>
			<td>
				<input id="assume_office_time" name="assume_office_time" ext_id=assume_office_time name =assume_office_time  readonly="readonly"  type="text"  value="${employeeVO.assume_office_time }"/></td>
			<th >
				首次签约日期</th>
			<td colspan="3">
				<input id="contract_date" name="contract_date" ext_id=contract_date ext_name =contract_date  readonly="readonly"  type="text" value="${employeeVO.contract_date }"/></td>
		    
		</tr>
		<tr>
			<th>
				学历</th>
			<td>
				<input id="grad_formal" name="grad_formal"  type="text" value="${employeeVO.grad_formal }" readonly="readonly"/></td>
			<th>
				学位</th>
			<td>
				<input id="grad_degrees" name="grad_degrees"  type="text" value="${employeeVO.grad_degrees }" readonly="readonly"/></td>
			<th>
				是否双学位</th>
			<td>
				<select id="t_grad_degrees" name="t_grad_degrees" value="${employeeVO.t_grad_degrees }" readonly="readonly">
					<option value="是">是</option>
					<option value="否">否</option>
				</select>
				</td>
			<th>
				第二学位</th>
			<td style="width: 120px">
			
				<input id="two_grad_degrees" name="two_grad_degrees" type="text" value="${employeeVO.two_grad_degrees }" readonly="readonly"/></td>
		</tr>
		<tr>
			<th>
				英语等级</th>
			<td>
				<input id="cet_grade" name="cet_grade" type="text"  value="${employeeVO.cet_grade }" readonly="readonly"/></td>
			<th>
				第二外语及等级</th>
			<td>
				<input id="two_foreign_language" name="two_foreign_language" type="text" value="${employeeVO.two_foreign_language }" readonly="readonly"/></td>
			<th>
				技术职称</th>
			<td>
				<input id="academic_title" name="academic_title" type="text" value="${employeeVO.academic_title }" readonly="readonly"/></td>
			<th>
				取得职称时间</th>
			<td>
				<input id="academic_title_time" name="academic_title_time" ext_id=academic_title_time ext_name =academic_title_time readonly="readonly"   type="text" value="${employeeVO.academic_title_time }"/></td>
		</tr>
		<tr>
			<th>
				党/团员</th>
			<td>
				<select id="politics" name="politics" value="${employeeVO.politics }" readonly="readonly">
				
					<option value="党员">党员</option>
					<option value="团员">团员</option>
				</select>
				
			<th>
				入党/团时间</th>
			<td>
				<input id="politics_time" name="politics_time" ext_id=politics_time ext_name =politics_time    type="text" value="${employeeVO.politics_time }" readonly="readonly"/></td>
			<th>
				户口所属地</th>
			<td>
				<input id="h_k_address" name="h_k_address" type="text" value="${employeeVO.h_k_address }" readonly="readonly"/></td>
			<th>
				户口是否迁移本所</th>
			<td>
				<select id="h_k_move" name="h_k_move" value="${employeeVO.h_k_move }" readonly="readonly" >
					<option value="是">是</option>
					<option value="否">否</option>
				</select>
		</td>
		</tr>
		<tr>
			<th>
				现在地址</th>
			<td colspan="3">
				<input id="now_address" name="now_address" type="text" value="${employeeVO.now_address }" readonly="readonly" /></td>
			<th>
				手机</th>
			<td>
				<input id="conn_mobile" name="conn_mobile" type="text" value="${employeeVO.conn_mobile }" readonly="readonly"/></td>
			<th>
				应急联系人电话</th>
			<td>
				<input id="conn_phone" name="conn_phone" type="text" value="${employeeVO.conn_phone }" readonly="readonly"/></td>
		</tr>
		<tr>
			<th rowspan="6">
				参加执业资格考试及<br />
				取得执业资格情况<br />
				&nbsp;</th>
			<th colspan="2" style="text-align: left">
				参加执业资格考试科目</th>
			<th style="text-align: left">
				考试时间</th>
			<th colspan="2" style="text-align: left">
				取得执业资格名称</th>
			<th colspan="2" style="text-align: left">
				注册时间</th>
		</tr>
		<tr>
			<td colspan="2">
				<input id="exam_course1" name="exam_course1" type="text" value="${employeeVO.exam_course1 }" readonly="readonly"/></td>
			<td>
				<input id="exam_time1" name="exam_time1" ext_id=exam_time1 ext_name=exam_time1  readonly="readonly"  type="text" value="${employeeVO.exam_time1 }"/></td>
			<td colspan="2">
				<input id="acquire_academic_title1" name="acquire_academic_title1" type="text" readonly="readonly"  value="${employeeVO.acquire_academic_title1 }"/></td>
			<td colspan="2">
				<input id="register_time1" name="register_time1"  ext_id=register_time1 ext_name=register_time1 readonly="readonly" type="text" value="${employeeVO.register_time1 }"/></td>
		</tr>
		<tr>
			<td colspan="2">
				<input id="exam_course2" name="exam_course2" type="text" value="${employeeVO.exam_course2 }" readonly="readonly"/></td>
			<td>
				<input id="exam_time2" name="exam_time2" ext_id=exam_time2 ext_name=exam_time2  readonly="readonly"  type="text" value="${employeeVO.exam_time2 }"/></td>
			<td colspan="2">
				<input id="acquire_academic_title2" name="acquire_academic_title2" type="text" readonly="readonly" value="${employeeVO.acquire_academic_title2 }"/></td>
			<td colspan="2">
				<input id="register_time2" name="register_time2" ext_id=register_time2 ext_name=register_time2 readonly="readonly" type="text" value="${employeeVO.register_time2 }"/></td>
		</tr>
		<tr>
			<td colspan="2">
				<input id="exam_course3" name="exam_course3" type="text" value="${employeeVO.exam_course3 }"/></td>
			<td>
				<input id="exam_time3" name="exam_time3" ext_id=exam_time3 ext_name=exam_time3  readonly="readonly"  type="text" value="${employeeVO.exam_time3 }"/></td>
			<td colspan="2">
				<input id="acquire_academic_title3" name="acquire_academic_title3" type="text" readonly="readonly" value="${employeeVO.acquire_academic_title3 }"/></td>
			<td colspan="2">
				<input id="register_time3" name="register_time3" ext_id=register_time3 ext_name=register_time3 readonly="readonly" type="text" value="${employeeVO.register_time3 }"/></td>
		</tr>
		<tr>
			<td colspan="2">
				<input id="exam_course4" name="exam_course4" type="text" value="${employeeVO.exam_course4 }" readonly="readonly"/></td>
			<td>
				<input id="exam_time4" name="exam_time4" ext_id=exam_time4 ext_name=exam_time4  readonly="readonly"  type="text" value="${employeeVO.exam_time4 }"/></td>
			<td colspan="2">
				<input id="acquire_academic_title4" name="acquire_academic_title4" type="text" readonly="readonly" value="${employeeVO.acquire_academic_title4 }"/></td>
			<td colspan="2">
				<input id="register_time4" name="register_time4" ext_id=register_time4 ext_name=register_time4 readonly="readonly" type="text" value="${employeeVO.register_time4 }"/></td>
		</tr>
		<tr>
			<td colspan="2">
				<input id="exam_course5" name="exam_course5" type="text" value="${employeeVO.exam_course5 }" readonly="readonly"/></td>
			<td>
				<input id="exam_time5" name="exam_time5" ext_id=exam_time5 ext_name=exam_time5 readonly="readonly"   type="text" value="${employeeVO.exam_time5 }"/></td>
			<td colspan="2">
				<input id="acquire_academic_title5" name="acquire_academic_title5" type="text" readonly="readonly" value="${employeeVO.acquire_academic_title5 }"/></td>
			<td colspan="2">
				<input id="register_time5" name="register_time5" ext_id=register_time5 ext_name=register_time5 readonly="readonly" type="text" value="${employeeVO.register_time5 }"/></td>
		</tr>
		<tr>
			<th rowspan="5">
				学习经历（从初中入学起）<br />
				&nbsp;</th>
			<th style="text-align: left">
				开始时间</th>
			<th style="text-align: left">
				结束时间</th>
			<th colspan="3" style="text-align: left">
				毕业学校</th>
			<th colspan="2" style="text-align: left">
				专业</th>
		</tr>
		<tr>
			<td>
				<input id="study_start_time1" name="study_start_time1" ext_id=study_start_time1 ext_name=study_start_time1  readonly="readonly"  type="text"  value="${employeeVO.study_start_time1 }"/></td>
			<td>
				<input id="study_end_time1" name="study_end_time1" ext_id=study_end_time1 ext_name=study_end_time1 readonly="readonly"   type="text"  value="${employeeVO.study_end_time1 }"/></td>
			<td colspan="3">
				<input id="grad_school1" name="grad_school1" type="text"  value="${employeeVO.grad_school1 }" readonly="readonly"/></td>
			<td colspan="2">
				<input id="grad_major1" name="grad_major1" type="text"  value="${employeeVO.grad_major1 }" readonly="readonly"/></td>
		</tr>
		<tr>
			<td>
				<input id="study_start_time2" name="study_start_time2"  ext_id=study_start_time2 ext_name=study_start_time2  readonly="readonly"  type="text"  value="${employeeVO.study_start_time2 }"/></td>
			<td>
				<input id="study_end_time2" name="study_end_time2" ext_id=study_end_time2 ext_name=study_end_time2 readonly="readonly"   type="text"  value="${employeeVO.study_end_time2 }"/></td>
			<td colspan="3">
				<input id="grad_school1" name="grad_school1" type="text"  value="${employeeVO.grad_school1 }" readonly="readonly"/></td>
			<td colspan="2">
				<input id="grad_major2" name="grad_major2" type="text"  value="${employeeVO.grad_major2 }" readonly="readonly"/></td>
		</tr>
		<tr>
			<td>
				<input id="study_start_time3" name="study_start_time3"  ext_id=study_start_time3 ext_name=study_start_time3 readonly="readonly"   type="text"  value="${employeeVO.study_start_time3 }"/></td>
			<td>
				<input id="study_end_time3" name="study_end_time3" ext_id=study_end_time3 ext_name=study_end_time3 readonly="readonly"   type="text"  value="${employeeVO.study_end_time3 }"/></td>
			<td colspan="3">
				<input id="grad_school3" name="grad_school3" type="text"  value="${employeeVO.grad_school3 }" readonly="readonly"/></td>
			<td colspan="2">
				<input id="grad_major3" name="grad_major3" type="text"  value="${employeeVO.grad_major3 }" readonly="readonly"/></td>
		</tr>
		<tr>
			<td>
				<input id="study_start_time4" name="study_start_time4"  ext_id=study_start_time4 ext_name=study_start_time4  readonly="readonly"  type="text"  value="${employeeVO.study_start_time4 }"/></td>
			<td>
				<input id="study_end_time4" name="study_end_time4" ext_id=study_end_time4 ext_name=study_end_time4  readonly="readonly"  type="text"  value="${employeeVO.study_end_time4 }"/></td>
			<td colspan="3">
				<input id="grad_school4" name="grad_school4" type="text"  value="${employeeVO.grad_school4 }" readonly="readonly"/></td>
			<td colspan="2">
				<input id="grad_major4" name="grad_major4" type="text"  value="${employeeVO.grad_major4 }" readonly="readonly"/></td>
		</tr>
		<tr>
			<th rowspan="5">
				工作经历(本单位跟<br />
				填在最后，终止日期不填)<br />
			</th>
			<th style="text-align: left">
				开始时间</th>
			<th style="text-align: left">
				结束时间</th>
			<th colspan="3" style="text-align: left">
				所在单位及部门</th>
			<th colspan="2" style="text-align: left">
				职&nbsp;务</th>
		</tr>
		<tr>
			<td>
				<input id="work_strart_time1" name="work_strart_time1" ext_id=work_strart_time1 ext_name=work_strart_time1 readonly="readonly"   type="text" value="${employeeVO.work_strart_time1 }"/></td>
			<td>
				<input id="work_end_time1" name="work_end_time1" ext_id=work_end_time1 ext_name=work_end_time1 readonly="readonly"   type="text" value="${employeeVO.work_end_time1 }"/></td>
			<td colspan="3">
				<input id="work_unit1" name="work_unit1" type="text" value="${employeeVO.work_unit1 }" readonly="readonly"/></td>
			<td colspan="2">
				<input id="work_job1" name="work_job1" type="text" value="${employeeVO.work_job1 }" readonly="readonly"/></td>
		</tr>
		<tr>
			<td>
				<input id="work_strart_time2" name="work_strart_time2" ext_id=work_strart_time2 ext_name=work_strart_time2   readonly="readonly" type="text" value="${employeeVO.work_strart_time2 }"/></td>
			<td>
				<input id="work_end_time2" name="work_end_time2" ext_id=work_end_time2 ext_name=work_end_time2  readonly="readonly"  type="text" value="${employeeVO.work_end_time2 }"/></td>
			<td colspan="3">
				<input id="work_unit2" name="work_unit2" type="text" value="${employeeVO.work_unit2 }" readonly="readonly"/></td>
			<td colspan="2">
				<input id="work_job2" name="work_job2" type="text" value="${employeeVO.work_job2 }" readonly="readonly"/></td>
		</tr>
		<tr>
			<td>
				<input id="work_strart_time3" name="work_strart_time3" ext_id=work_strart_time3 ext_name=work_strart_time3 readonly="readonly"   type="text" value="${employeeVO.work_strart_time3 }"/></td>
			<td>
				<input id="work_end_time3" name="work_end_time3" ext_id=work_end_time3 ext_name=work_end_time3  readonly="readonly"  type="text" value="${employeeVO.work_end_time3 }"/></td>
			<td colspan="3">
				<input id="work_unit3" name="work_unit3" type="text" value="${employeeVO.work_unit3 }" readonly="readonly"/></td>
			<td colspan="2">
				<input id="work_job3" name="work_job3" type="text" value="${employeeVO.work_job3 }" readonly="readonly"/></td>
		</tr>
		<tr>
			<td>
				<input id="work_strart_time4" name="work_strart_time4" ext_id=work_strart_time4 ext_name=work_strart_time4 readonly="readonly"   type="text" value="${employeeVO.work_strart_time4 }"/></td>
			<td>
				<input id="work_end_time4" name="work_end_time4" ext_id=work_end_time4 ext_name=work_end_time4 readonly="readonly"   type="text" value="${employeeVO.work_end_time4 }"/></td>
			<td colspan="3">
				<input id="work_unit4" name="work_unit4" type="text" value="${employeeVO.work_unit4 }" readonly="readonly"/></td>
			<td colspan="2">
				<input id="work_job4" name="work_job4" type="text" value="${employeeVO.work_job4 }" readonly="readonly"/></td>
		</tr>
		<tr>
			<th rowspan="4">
				家庭成员<br />
				&nbsp;</th>
			<th style="text-align: left">
				姓名</th>
			<th style="text-align: left">
				与本人关系</th>
			<th colspan="3" style="text-align: left">
				现工作单位、部门</th>
			<th style="text-align: left">
				现任职务</th>
			<th style="text-align: left">
				联系电话</th>
		</tr>
		<tr>
			<td>
				<input id="family_name1" name="family_name1" readonly="readonly" type="text" value="${employeeVO.family_name1 }"/></td>
			<td>
				<input id="relation1" name="relation1" readonly="readonly" type="text" value="${employeeVO.relation1 }"/></td>
			<td colspan="3">
				<input id="f_work_until1" name="f_work_until1" readonly="readonly" type="text" value="${employeeVO.f_work_until1 }"/></td>
			<td>
				<input id="f_work_job1" name="f_work_job1" readonly="readonly" type="text" value="${employeeVO.f_work_job1 }"/></td>
			<td>
				<input id="f_phone1" name="f_phone1" type="text" readonly="readonly" value="${employeeVO.f_phone1 }"/></td>
		</tr>
		<tr>
			<td>
				<input id="family_name2" name="family_name2" readonly="readonly" type="text" value="${employeeVO.family_name2 }"/></td>
			<td>
				<input id="relation2" name="relation2" readonly="readonly" type="text" value="${employeeVO.relation2 }"/></td>
			<td colspan="3">
				<input id="f_work_until2" name="f_work_until2"  readonly="readonly" type="text" value="${employeeVO.f_work_until2 }"/></td>
			<td>
				<input id="f_work_job2" name="f_work_job2" readonly="readonly" type="text" value="${employeeVO.f_work_job2 }"/></td>
			<td>
				<input id="f_phone2" name="f_phone2" readonly="readonly" type="text" value="${employeeVO.f_phone2 }"/></td>
		</tr>
		<tr>
			<td>
				<input id="family_name3" name="family_name3" readonly="readonly" type="text" value="${employeeVO.family_name3 }"/></td>
			<td>
				<input id="relation3" name="relation3" readonly="readonly" type="text" value="${employeeVO.relation3 }"/></td>
			<td colspan="3">
				<input id="f_work_until3" name="f_work_until3" readonly="readonly" type="text" value="${employeeVO.f_work_until3 }"/></td>
			<td>
				<input id="f_work_job3" name="f_work_job3" readonly="readonly"  type="text" value="${employeeVO.f_work_job3 }"/></td>
			<td>
				<input id="f_phone3" name="f_phone3" readonly="readonly" type="text" value="${employeeVO.f_phone3 }"/></td>
		</tr>
		<tr>
			<th rowspan="3">
				主要社会关系<br />
				&nbsp;</th>
			<th style="text-align: left">
				姓名</th>
			<th style="text-align: left">
				与本人关系</th>
			<th colspan="3" style="text-align: left">
				现工作单位、部门</th>
			<th style="text-align: left">
				现任职务</th>
			<th style="text-align: left">
				联系电话</th>
		</tr>
		<tr>
			<td>
				<input id="society_name1" name="society_name1" readonly="readonly" type="text" value="${employeeVO.society_name1 }"/></td>
			<td>
				<input id="relation4" name="relation4" type="text"  readonly="readonly" value="${employeeVO.relation4 }"/></td>
			<td colspan="3">
				<input id="f_work_until4" name="f_work_until4" readonly="readonly" type="text" value="${employeeVO.f_work_until4 }"/></td>
			<td>
				<input id="f_work_job4" name="f_work_job4" readonly="readonly" type="text" value="${employeeVO.f_work_job4 }"/></td>
			<td>
				<input id="f_phone4" name="f_phone4" readonly="readonly" type="text" value="${employeeVO.f_phone4 }" /></td>
		</tr>
		<tr>
			<td>
				<input id="society_name2" name="society_name2" readonly="readonly" type="text" value="${employeeVO.society_name2 }"/></td>
			<td>
				<input id="relation5" name="relation5" readonly="readonly" type="text" value="${employeeVO.relation5 }"/></td>
			<td colspan="3">
				<input id="f_work_until5" name="f_work_until5" readonly="readonly" type="text" value="${employeeVO.f_work_until5 }"/></td>
			<td>
				<input id="f_work_job5" name="f_work_job5" type="text"  readonly="readonly" value="${employeeVO.f_work_job5 }"/></td>
			<td>
				<input id="f_phone5" name="f_phone5" type="text" readonly="readonly" value="${employeeVO.f_phone5 }"/></td>
		</tr>
		<tr>
			<th>
				备注</th>
			<td colspan="7">
				<textarea id="remarks" name="remarks" readonly="readonly" value="${employeeVO.remarks }"></textarea></td>
		</tr>
		<tr>
			<th colspan="6">
				天健会计师事务所制（2011年12月版）&nbsp;</th>
			<th>
				填表日期：</th>
			<td>
				<input id="write_date" name="write_date" ext_id=write_date ext_name=write_date readonly="readonly"   type="text" value="${employeeVO.write_date }"/></td>
		</tr>
		
	</tbody>
</table>
</div>

</form>
</body>

<script type="text/javascript">
   function save(){
	   
	   document.forms["thisform"].submit();
   }

   
  

</script>

</html>
