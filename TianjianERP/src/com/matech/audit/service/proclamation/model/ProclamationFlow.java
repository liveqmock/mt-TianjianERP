package com.matech.audit.service.proclamation.model;

public class ProclamationFlow {

	private String processInstanceId ;//(50) ,    #流程实例ID
	private String proclamationId ;//(100) ,                     #公告ID  外键
	private String applyuser ;//(50) ,                    #用户ID
	private String applyDate    ;//(50) ,                 #生成 时间
	private String state  ;//(100) ,                       #状态
	private String property    ;//(50)                     #权限
	
	public String getProcessInstanceId() {
		return processInstanceId;
	}
	public void setProcessInstanceId(String processInstanceId) {
		this.processInstanceId = processInstanceId;
	}
	 
	public String getProclamationId() {
		return proclamationId;
	}
	public void setProclamationId(String proclamationId) {
		this.proclamationId = proclamationId;
	}
	public String getApplyuser() {
		return applyuser;
	}
	public void setApplyuser(String applyuser) {
		this.applyuser = applyuser;
	}
	public String getApplyDate() {
		return applyDate;
	}
	public void setApplyDate(String applyDate) {
		this.applyDate = applyDate;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getProperty() {
		return property;
	}
	public void setProperty(String property) {
		this.property = property;
	}
}
