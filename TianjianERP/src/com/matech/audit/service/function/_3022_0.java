package com.matech.audit.service.function;

import java.sql.Connection;
import java.sql.Statement;
import java.sql.ResultSet;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * <p>Title: 取余额明细记录的函数，供批量刷新调用，相当于原来的1007和1029</p>
 * <p>Description:
 * 1、分析余额表以及辅助核算余额表，有后者就优先刷后者，否则刷前者；
 * 2、刷新出的列内容包括：
 *    科目或核算编号（subjectid），科目或核算名称（subjectname），期初数（initbalance），
 *    借方发生（debitocc），贷方发生（creditocc），余额（balance），审定数（sdbalance），
 *    年末调整（sov1），年末重分类（sov2），年末总调整数（sov3），年初总调整数（initsov）
 *    年末调整借（debitsov1），年末调整贷（creditsov1），
 *    年末重分类借（debitsov2），年末重分类贷（creditsov2），
 *    年末总调整借（debitsov3），年末总调整贷（creditsov3）
 * 3、支持自定义科目；
 * 4、参数录入说明：
 *    I、区间支持2个参数（起始月startmonth、结束月endmonth），若没有提供，就从项目的审计区间取；
 *    II、对应科目参数：subjectname,如果科目参数为空，则从底稿的对应科目取名称；
 *    III、科目余额方向参数：ptype,如果没有设置则取标准科目（或自增科目）的科目方向；
 *    IV、辅助核算范围参数：allassitem，如果没有设置，则只扫描【客户、供应商、往来】，设置了，就扫描全部辅助核算；
 * </p>
 *
 * <p>Copyright: Copyright (c) 2007 matech LTD.</p>
 *
 * <p>Company: matech </p>
 *
 * @author 铭太E审通团队,ESPIERALY THANKS WINNERQ AND PENGYONG
 * @version 1.0
 */

public class _3022_0 extends AbstractAreaFunction {

    public ResultSet process(HttpSession session, HttpServletRequest request,
                             HttpServletResponse response, Connection conn,
                             Map args) throws Exception {

        String accpackageid = (String) args.get("curAccPackageID");
        String projectid = (String) args.get("curProjectid");

        String resultSql = "";

        Statement st = null;
        ResultSet rs = null;
        try {
            String subjectname = (String) args.get("subjectname");
            if (subjectname==null || subjectname.equals("")){
                String manuid=(String)args.get("manuid");
                if (manuid==null || manuid.equals("")){
                    subjectname=getTaskSubjectNameByTaskCode(conn,projectid,(String)request.getParameter("curTaskCode"));
                }else{
                    //如果科目名称为空，则通过前台提交的刷新底稿编号去取得对应任务得科目名称；
                    subjectname = getTaskSubjectNameByManuID(conn, manuid);
                }
//                args.put("subjectname",subjectname);
            }
            
            String sName = changeSubjectName(conn,projectid,subjectname);
            if(!"".equals(sName)){
            	subjectname = sName; 
            }            
            args.put("subjectname",subjectname);

            String strStartYearMonth="",strEndYearMonth="";
            String startmonth = (String) args.get("startmonth");
            String endmonth = (String) args.get("endmonth");
            String strYears ="",strLastYear="";
            if (startmonth==null || startmonth.equals("")
                || endmonth==null || endmonth.equals("")){
                //如果前台没有提供这个参数，就从项目取；
                int[] result=getProjectAuditAreaByProjectid(conn,projectid);
                strStartYearMonth=String.valueOf(result[0]*12+result[1]);
                strEndYearMonth=String.valueOf(result[2]*12+result[3]);

                if (result[0]==result[2]){
                    strYears = " = " + result[0];
                }else{
                    for (int i = result[0]; i <= result[2]; i++) {
                        strYears += "," + String.valueOf(i);
                    }
                    if (strYears.length() > 0) {
                        //去掉最开始得,
                        strYears = " in (" + strYears.substring(1) + ")";
                    }
                }
            }else{
                strStartYearMonth=String.valueOf(Integer.parseInt(accpackageid.substring(6))*12+Integer.parseInt(startmonth));
                strEndYearMonth=String.valueOf(Integer.parseInt(accpackageid.substring(6))*12+Integer.parseInt(endmonth));
                strYears=" = " +accpackageid.substring(6);
            }
            
            strLastYear = " = " +accpackageid.substring(6);
            
            args.put("StartYearMonth",strStartYearMonth);
            args.put("EndYearMonth",strEndYearMonth);
            args.put("Years",strYears);
            args.put("LastYear",strLastYear);

            //查找该科目在客户中的科目id,请注意即使有一对多的科目，这里也只是取其中的一条；
            String[] result=this.getClientIDAndDirectionByStandName(conn, accpackageid, projectid,
                    subjectname);
            String subjectid = result[0];

            //如果没有提供方向这个参数，则取科目余额方向
            String ptype = (String) args.get("ptype");
            if (ptype==null||ptype.equals("")){
                args.put("ptype",result[1]);
            }

            //判断该科目是否叶子并且有自增科目。
            st = conn.createStatement();
            resultSql = ""
                  + " select 1 from  \n"
                  + " c_account a \n"
                  + " inner join \n"
                  + " z_usesubject b \n"
                  + " on a.subjectid=b.tipsubjectid \n"
                  + " where a.accpackageid='" + accpackageid + "' \n"
                  + "   and a.subjectfullname2='" + subjectname + "' \n"
                  + "   and a.submonth=1 \n"
                  + "   and a.isleaf1=1 \n"
                  + "   and b.accpackageid='" + accpackageid + "' \n"
                  + "   and b.projectid='" + projectid + "' \n";
            rs = st.executeQuery(resultSql);

            if (rs.next()) {
                resultSql = getSql("0", subjectid);
            } else {
                resultSql = getSql("1", subjectid);
            }

            String sqlassitem = "select distinct asstotalname from c_assitem where accpackageid='" + accpackageid + "' and Level0=1 " +
    		" and ( asstotalname like '%客户%' or asstotalname like '%供应商%' or asstotalname like '%关联%' or asstotalname like '%往来%' ) ";
    
		    rs = st.executeQuery(sqlassitem);
		    String sqlstring = "";
		    while(rs.next()){
		    	sqlstring += " asstotalname1 like '"+rs.getString(1)+"/%' or" ;
		    }
		    if(!"".equals(sqlstring)){
		    	sqlstring = " and ( " + sqlstring.substring(0,sqlstring.length()-2)+ ") ";
		    }else{
		    	sqlstring = " and 1=2 ";
		    }
            //设置辅助核算扫描范围的参数
            String allassitem=request.getParameter("allassitem");
            if (allassitem==null || allassitem.equals("")){
                //只扫描往来、客户、供应商
//                args.put("allassitem","       and  \n       ( \n           asstotalname1 like '%客户%' \n           or asstotalname1 like '%供应商%' \n           or asstotalname1 like '%往来%' \n       ) \n");
            	args.put("allassitem",sqlstring);
            }else{
                //扫描全部辅助核算
                args.put("allassitem"," ");
            }
            
            sqlassitem = "select group_concat(distinct \"'\",subjectid,\"'\") from c_account where  subyearmonth*12+submonth="+strEndYearMonth+"  and (subjectfullname2 like '"+subjectname+"/%' or subjectfullname2 = '"+subjectname+"')  ";
            rs = st.executeQuery(sqlassitem);
            if(rs.next()){
           	 String s = rs.getString(1);
           	 if(s== null || "".equals(s)) {
           		 args.put("Subjects","''");
           	 }else{
           		 args.put("Subjects",rs.getString(1));
           	 }
            }else{
           	 args.put("Subjects","''");
            }
            rs.close();

            //最终查询结果
            resultSql = this.setSqlArguments(resultSql, args);
            System.out.println("resultSql="+resultSql);
            rs = st.executeQuery(resultSql);

            return rs;
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception(e.getMessage());
        }
    }

    /**
     *
     * @param rectifySign String
     *     这个rectifySign不是余额方向，而是为了避免把多极科目调整重复汇总的标志，有下级就为0，否则为1
     * @param subjectid String
     * @return String
     */
    public String getSql(String rectifySign,String subjectid){
                return ""
                +" select   \n"
                +"   IF(b2.assitemid is null,a2.bo,b2.bo) as bo,  \n"
                +"   IF(b2.assitemid is null,1,2) as orderid       \n"
                +" FROM  \n"
                +" (   /* a2是余额表的数据 */  \n"
                +"     select   \n"
                +"            a.*,b.accid, \n"
                +"             ifnull(e.bo,0) as bo  \n"
                +"              \n"
                +"     from   \n"
                +"     (  \n"
                +"       select   \n"
                +"              subjectid,accname,subjectfullname2,sum(if (subyearmonth*12+submonth=${EndYearMonth},balance * (${ptype}),0)) as balance,  \n"
                +"              sum(if (subyearmonth*12+submonth=${StartYearMonth},(debitremain+creditremain) * (${ptype}),0)) /**/ as initbalance,  \n"
                +"              sum(debitocc) as debitocc,sum(creditocc) as creditocc,"+rectifySign+" as rectifySign \n"
                +"       from c_account \n"
                +"       where subyearmonth*12+submonth>=${StartYearMonth} and subyearmonth*12+submonth<=${EndYearMonth} \n"
                +"       and isleaf1=1 \n"
                +"       and (subjectfullname2 like '${subjectname}/%' or subjectfullname2 = '${subjectname}')   \n"
                +"       group by subjectid "
                +"        \n"
                +"       union \n"
                +"        \n"
                +"       select \n"
                +"            subjectid, \n"
                +"            subjectname as accname, \n"
                +"            subjectfullname as subjectfullname2, \n"
                +"            0 as balance, \n"
                +"            0 as initbalance,  \n"
                +"            0 as  debitocc, \n"
                +"            0 as  creditocc, \n"
                +"            1 as rectifySign \n"
                +"      from z_usesubject \n"
                +"      where projectid=${curProjectid}  \n"
                +"      and tipsubjectid='"+subjectid+"' \n"
                +"      and isleaf=1 \n"
                +"     ) a  \n"
                +"       \n"
                +"       \n"
                +"     left join  \n"
                +"     ( /*判断取辅助核算还是科目，就看这个表了。条件是1月份的余额是否相等*/  \n"
                +"      \n"
                +"       select  \n"
                +"             distinct accid  \n"
                +"       from c_assitementryacc  \n"
                +"       where subyearmonth ${LastYear}  \n"
                +"       and submonth=1 \n"
                +"       and isleaf1=1  ${allassitem} \n"
                +"     ) b  \n"
                +"     on a.subjectid=b.accid  \n"
                +"  \n"
                +"     /* 账龄 */  \n"
                +"     left join  \n"
                +"     (  \n"

                +"		select distinct a.subjectid, \n"
                +"		case when IFNULL(a.balance-a.occ,-1)=-1 then 0 when a.balance-a.occ <=0 THEN 0 else  \n"
                +"		CASE when IFNULL(a.balance-a.occ-b.occ,-1)=-1 then 1 when a.balance-a.occ-b.occ<=0 then 1 else  \n"
                +"		CASE when IFNULL(a.balance-a.occ-b.occ-c.occ,-1)=-1 then 2 when a.balance-a.occ-b.occ-c.occ<=0 then 2 else  \n"
                +"		CASE when IFNULL(a.balance-a.occ-b.occ-c.occ-d.occ<=0,-1)=-1 then 3 when a.balance-a.occ-b.occ-c.occ-d.occ<=0 then 3 else  \n"
                +"		CASE when IFNULL(a.balance-a.occ-b.occ-c.occ-d.occ-e.occ,-1)=-1 then 4 when a.balance-a.occ-b.occ-c.occ-d.occ-e.occ<=0 then 4 else 5  \n"
                +"		end end END end end bo  \n"
                +"		from (select subjectid,accname,subjectfullname1,sum(if (subyearmonth*12+submonth=${EndYearMonth},balance * direction,0)) balance,sum(if(direction=1,debitocc,creditocc)) occ from c_account where subyearmonth*12+submonth>${EndYearMonth}-(1)*12 and subyearmonth*12+submonth<=${EndYearMonth} and CONCAT(balance) >'' and (subjectfullname2 like '${subjectname}/%' or subjectfullname2 = '${subjectname}') and isleaf1=1 group by subjectid) a \n"
                +"		left join ( select subjectid,accname,subjectfullname1,sum(if(direction=1,debitocc,creditocc)) occ from c_account where subyearmonth*12+submonth>${EndYearMonth}-(2)*12 and subyearmonth*12+submonth<=${EndYearMonth}-(1)*12 and CONCAT(balance) >'' and (subjectfullname2 like '${subjectname}/%' or subjectfullname2 = '${subjectname}') and isleaf1=1 group by subjectid) b on a.subjectfullname1 = b.subjectfullname1\n"
                +" 		left join ( select subjectid,accname,subjectfullname1,sum(if(direction=1,debitocc,creditocc)) occ from c_account where subyearmonth*12+submonth>${EndYearMonth}-(3)*12 and subyearmonth*12+submonth<=${EndYearMonth}-(2)*12 and CONCAT(balance) >'' and (subjectfullname2 like '${subjectname}/%' or subjectfullname2 = '${subjectname}') and isleaf1=1 group by subjectid) c on a.subjectfullname1 = c.subjectfullname1\n"
                +"		left join ( select subjectid,accname,subjectfullname1,sum(if(direction=1,debitocc,creditocc)) occ from c_account where subyearmonth*12+submonth>${EndYearMonth}-(4)*12 and subyearmonth*12+submonth<=${EndYearMonth}-(3)*12 and CONCAT(balance) >'' and (subjectfullname2 like '${subjectname}/%' or subjectfullname2 = '${subjectname}') and isleaf1=1 group by subjectid) d on a.subjectfullname1 = d.subjectfullname1\n"
                +"		left join ( select subjectid,accname,subjectfullname1,sum(if(direction=1,debitocc,creditocc)) occ from c_account where subyearmonth*12+submonth>${EndYearMonth}-(5)*12 and subyearmonth*12+submonth<=${EndYearMonth}-(4)*12 and CONCAT(balance) >'' and (subjectfullname2 like '${subjectname}/%' or subjectfullname2 = '${subjectname}') and isleaf1=1 group by subjectid) e on a.subjectfullname1 = e.subjectfullname1\n"

                +"     ) e   \n"
                +"     on a.subjectid =e.subjectid  \n"
                +"       \n"
                +"       \n"
                +" ) a2  \n"
                +" left join  \n"
                +" (  \n"
                +"     /* b2 是辅助核算 */  \n"
                +"     SELECT   \n"
                +"            a.*,  \n"
                +"            ifnull(c.bo,0) as bo   \n"

                +"     FROM  \n"
                +"     (  \n"
                +"         select   \n"
                +"                accid,assitemid,assitemname,  \n"
                +"                sum(if (subyearmonth*12+submonth=${EndYearMonth},balance  * (${ptype}),0)) as balance,  \n"
                +"                sum(if (subyearmonth*12+submonth=${StartYearMonth},(debitremain+creditremain) * (${ptype}),0)) /**/ as initbalance,  \n"
                +"                sum(debitocc) as debitocc, sum(creditocc ) as creditocc  \n"
                +"         from c_assitementryacc  \n"
                +"         where subyearmonth*12+submonth>=${StartYearMonth} and subyearmonth*12+submonth<=${EndYearMonth}  \n"
                +"         and isleaf1=1  ${allassitem}\n"
                +"         group by accid,assitemid \n"
                +"          \n"
                +"     ) a   \n"
                +"     /* 账龄 */  \n"
                +"     left join   \n"
                +"     (     \n"

                +"		select distinct a.accid,a.assitemid,  \n"
                +"		case when IFNULL(a.balance-a.occ,-1)=-1 then 0 when a.balance-a.occ <=0 THEN 0 else  \n"
                +"		CASE when IFNULL(a.balance-a.occ-b.occ,-1)=-1 then 1 when a.balance-a.occ-b.occ<=0 then 1 else  \n"
                +"		CASE when IFNULL(a.balance-a.occ-b.occ-c.occ,-1)=-1 then 2 when a.balance-a.occ-b.occ-c.occ<=0 then 2 else  \n"
                +"		CASE when IFNULL(a.balance-a.occ-b.occ-c.occ-d.occ,-1)=-1 then 3 when a.balance-a.occ-b.occ-c.occ-d.occ<=0 then 3 else   \n"
                +"		CASE when IFNULL(a.balance-a.occ-b.occ-c.occ-d.occ-e.occ,-1)=-1 then 4 when a.balance-a.occ-b.occ-c.occ-d.occ-e.occ<=0 then 4 else 5  \n"
                +"		end end end end end bo  \n"
                +"		from (select accid,assitemid,sum(if (subyearmonth*12+submonth=${EndYearMonth},balance * direction,0)) balance,sum(if(direction=1,debitocc,creditocc)) occ from c_assitementryacc  where subyearmonth*12+submonth>${EndYearMonth}-(1)*12 and subyearmonth*12+submonth<=${EndYearMonth} and CONCAT(balance) > '' and accid in (${Subjects}) and isleaf1=1 group by accid,assitemid) a \n"
                +"		left join (select accid,assitemid,sum(if(direction=1,debitocc,creditocc)) occ from c_assitementryacc  where subyearmonth*12+submonth>${EndYearMonth}-(2)*12 and subyearmonth*12+submonth<=${EndYearMonth}-(1)*12 and CONCAT(balance) > '' and accid in (${Subjects}) and isleaf1=1 group by accid,assitemid) b on a.accid=b.accid and a.assitemid=b.assitemid  \n"
                +"		left join (select accid,assitemid,sum(if(direction=1,debitocc,creditocc)) occ from c_assitementryacc  where subyearmonth*12+submonth>${EndYearMonth}-(3)*12 and subyearmonth*12+submonth<=${EndYearMonth}-(2)*12 and CONCAT(balance) > '' and accid in (${Subjects}) and isleaf1=1 group by accid,assitemid) c on a.accid=b.accid and a.assitemid=c.assitemid  \n"
                +"		left join (select accid,assitemid,sum(if(direction=1,debitocc,creditocc)) occ from c_assitementryacc  where subyearmonth*12+submonth>${EndYearMonth}-(4)*12 and subyearmonth*12+submonth<=${EndYearMonth}-(3)*12 and CONCAT(balance) > '' and accid in (${Subjects}) and isleaf1=1 group by accid,assitemid) d on a.accid=b.accid and a.assitemid=d.assitemid  \n"
                +"		left join (select accid,assitemid,sum(if(direction=1,debitocc,creditocc)) occ from c_assitementryacc  where subyearmonth*12+submonth>${EndYearMonth}-(5)*12 and subyearmonth*12+submonth<=${EndYearMonth}-(4)*12 and CONCAT(balance) > '' and accid in (${Subjects}) and isleaf1=1 group by accid,assitemid) e on a.accid=b.accid and a.assitemid=e.assitemid  \n"

                +"  \n"
                +"     ) c   \n"
                +"     on a.accid =c.accid and a.assitemid=c.assitemid  \n"
                +" ) b2  \n"
                +" on a2.accid=b2.accid  \n"
                +" order by orderid,a2.subjectid,b2.assitemid \n"
                +"";
        }

}

/*
  完整得SQL：
 select
        IF(b2.assitemid is null,a2.subjectid,b2.assitemid) as subjectid,
        IF(b2.assitemid is null,a2.accname,concat(a2.accname,'/',b2.assitemname)) as subjectname,

        IF(b2.assitemid is null,a2.initbalance + a2.initsov,b2.initbalance + b2.initsov) as initbalance,
        IF(b2.assitemid is null,a2.balance,b2.balance) as balance,
        IF(b2.assitemid is null,a2.balance+a2.sov3,b2.balance+b2.sov3) as sdbalance,

        IF(b2.assitemid is null,a2.debitocc,b2.debitocc) as debitocc,
        IF(b2.assitemid is null,a2.creditocc,b2.creditocc) as creditocc,

        IF(b2.assitemid is null,a2.sov1,b2.sov1) * a2.rectifySign as sov1,
        IF(b2.assitemid is null,a2.sov2,b2.sov2) * a2.rectifySign as sov2,
        IF(b2.assitemid is null,a2.sov3,b2.sov3) * a2.rectifySign as sov3,
        IF(b2.assitemid is null,a2.debitsov1,b2.debitsov1) * a2.rectifySign as debitsov1,
        IF(b2.assitemid is null,a2.creditsov1,b2.creditsov1) * a2.rectifySign as creditsov1,
        IF(b2.assitemid is null,a2.debitsov2,b2.debitsov2) * a2.rectifySign as debitsov2,
        IF(b2.assitemid is null,a2.creditsov2,b2.creditsov2) * a2.rectifySign as creditsov2,
        IF(b2.assitemid is null,a2.debitsov3,b2.debitsov3) * a2.rectifySign as debitsov3,
        IF(b2.assitemid is null,a2.creditsov3,b2.creditsov3) * a2.rectifySign as creditsov3,


        IF(b2.assitemid is null,1,2) as orderid


 FROM
 (
     select
            a.*,b.accid,

            ifnull(e.sov1,0) as sov1,
            ifnull(e.sov2,0) as sov2,
            ifnull(e.debitsov1,0) as debitsov1,
            ifnull(e.creditsov1,0) as creditsov1,
            ifnull(e.debitsov2,0) as debitsov2,
            ifnull(e.creditsov2,0) as creditsov2,

            ifnull(e.sov1+e.sov2,0) as sov3,
            ifnull(e.debitsov1+e.debitsov2,0) as debitsov3,
            ifnull(e.creditsov1+e.creditsov2,0) as creditsov3,

            ifnull(e.initsov,0) as initsov

     from
     (
        select
              subjectid,accname,subjectfullname2,sum(if (subyearmonth*12+submonth=2007*12+12,balance * (1),0)) as balance,
                sum(if (subyearmonth*12+submonth=2007*12+1,(debitremain+creditremain) * (1),0)) as initbalance,

                sum(debitocc) as debitocc,sum(creditocc) as creditocc,1 as rectifySign
       from c_account
       where isleaf1=1
       and subyearmonth*12+submonth>=2007*12+1 and subyearmonth*12+submonth<=2007*12+12
       and (subjectfullname2 like '应收账款/%' or subjectfullname2 = '应收账款')
        group by subjectid

       union

       select
            subjectid,
            subjectname as accname,
            subjectfullname as subjectfullname2,
            0 as balance,
            0 as initbalance,
            0 as  debitocc,
            0 as  creditocc,
            1 as rectifySign
      from z_usesubject
      where projectid=2007632
      and tipsubjectid='1122'
      and isleaf=1
     ) a

     left join
     (

       select
             distinct accid
       from c_assitementryacc
       where subyearmonth in (2007)
       and submonth=1
       and isleaf1=1
       and
       (
           asstotalname1 like '%客户%'
           or asstotalname1 like '%供应商%'
           or asstotalname1 like '%往来%'
       )
     ) b
     on a.subjectid=b.accid


     left join
     (
         select
                subjectid,(debittotalocc1 - credittotalocc1)  * (1) as sov1,
                (debittotalocc2 - credittotalocc2)  * (1) as sov2,
                debittotalocc1  * (1)  as debitsov1,
                credittotalocc1  * (1)  as creditsov1,
                debittotalocc2  * (1)  as debitsov2,
                credittotalocc2   * (1) as creditsov2,
                (debittotalocc4 - credittotalocc4 + debittotalocc5 - credittotalocc5 + debittotalocc6 - credittotalocc6) * (1) as initsov
         from z_accountrectify
         where projectid = 2007632
         and isleaf=1      ) e
     on a.subjectid =e.subjectid


 ) a2
 left join
 (

     SELECT
            a.*,

            ifnull(c.sov1,0) as sov1,
            ifnull(c.sov2,0) as sov2,
            ifnull(c.debitsov1,0) as debitsov1,
            ifnull(c.creditsov1,0) as creditsov1,
            ifnull(c.debitsov2,0) as debitsov2,
            ifnull(c.creditsov2,0) as creditsov2,

            ifnull(c.sov1+c.sov2,0) as sov3,
            ifnull(c.debitsov1+c.debitsov2,0) as debitsov3,
            ifnull(c.creditsov1+c.creditsov2,0) as creditsov3,

            ifnull(c.initsov,0) as initsov
     FROM
     (
         select
                accid,assitemid,assitemname,
                sum(if (subyearmonth*12+submonth=2007*12+12,balance * (1),0)) as balance,
                sum(if (subyearmonth*12+submonth=2007*12+1,(debitremain+creditremain) * (1),0)) as initbalance,
                sum(debitocc) as debitocc, sum(creditocc ) as creditocc
         from c_assitementryacc
         where isleaf1=1
         and subyearmonth*12+submonth>=2007*12+1 and subyearmonth*12+submonth<=2007*12+12
         and
         (
           asstotalname1 like '%客户%'
           or asstotalname1 like '%供应商%'
           or asstotalname1 like '%往来%'
         )
        group by accid,assitemid

     ) a

     left join
     (
         select subjectid,assitemid,(debittotalocc1 - credittotalocc1)  * (1) as sov1,(debittotalocc2 - credittotalocc2)  * (1) as sov2,
         debittotalocc1 * (1)  as debitsov1,
         credittotalocc1  * (1)  as creditsov1,
         debittotalocc2   * (1) as debitsov2,
         credittotalocc2   * (1) as creditsov2,
         (debittotalocc4 - credittotalocc4 + debittotalocc5 - credittotalocc5 + debittotalocc6 - credittotalocc6) * (1) as initsov
         from z_assitemaccrectify
         where projectid =  2007632

     ) c
     on a.accid =c.subjectid and a.assitemid=c.assitemid
 ) b2
 on a2.accid=b2.accid
 order by orderid,a2.subjectid,b2.assitemid
*/
