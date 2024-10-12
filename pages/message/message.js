// pages/message/message.js

import {
  Util
} from '../../utils/utils.js'
import {
  Token
} from '../../utils/token.js'
import {
  Http
} from '../../utils/http.js'

const app = getApp()

Page({
  data: {
    showDayList:false,
    currentDate: new Date().getTime(),
    defaultDate:Util.dateFormat("YYYY-mm-dd", new Date()),
    recordList:[],
    activeNames: ['0']
  },
  onShow: function () {
    this.getTabBar().setData({
      active: 'message'
    })
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  dayListConfirm(event) {
    var selectTime=Util.dateFormat("YYYY-mm-dd", new Date(event.detail));
    let childId=wx.getStorageSync('child_id');
    this.setData({
      showDayList:false,
      defaultDate:selectTime
    });
    
    this.getDataList(selectTime);
  },
  async getDataList(date) {
    let recordList = await Http.request({
      url: "bill/data_list",
      method: "GET",
      data: {date: date}
    })
    if (recordList && recordList[0]) {
      this.getShowRecords(recordList);
    }
  },
  
  getShowRecords(records){
    let timeList=[];
    let ls={};
    let recordGroups=[];
    let allList=[];
   for(let i in records){
     let item=records[i];
     let showTime=Util.dateFormat("YYYY-mm-dd", new Date(item.recordTime));
     let recordGroup={};
     if(timeList.indexOf(showTime)<0){
      timeList.push(showTime);   
      recordGroup={};
      recordGroups=[];
      ls={};
      ls.headTime=showTime;       
      recordGroup.name=item.name;
      recordGroup.showTime=Util.dateFormat("HH:MM", new Date(item.recordTime));
      recordGroup.text=item.remark;
      recordGroup.icon=item.icon;
      recordGroups.push(recordGroup);
      ls.recordGroups=recordGroups;
      allList.push(ls);
     }else{       
      ls.headTime=showTime;       
      recordGroup.name=item.name;
      recordGroup.showTime=Util.dateFormat("HH:MM", new Date(item.recordTime));
      recordGroup.text=item.remark;
      recordGroup.icon=item.icon;
      recordGroups.push(recordGroup);
      ls.recordGroups=recordGroups;
     }
    
    }

    for(let i in allList){
      let recordGroups=allList[i].recordGroups;
      
      let xizaoList=[];
      let chiyaoList=[];
      let fushiList=[];
      let niaobuList=[];
      let qitaList=[];
      let daySum={};

      for(let j in recordGroups){
          let item=recordGroups[j];
          
          if(item.name=='其它'){
            let qita={};
            qita.showTime=item.showTime;               
            qita.memoto=item.text;
            qita.icon=item.icon;
            qitaList.push(qita);
          }
          if(item.name=='换尿布'){
            let niaobu={};
            niaobu.showTime=item.showTime;               
            niaobu.memoto=item.text2;
            niaobu.icon=item.icon;;
            niaobuList.push(niaobu);
          }
          if(item.name=='吃药'){
            let chiyao={};
            chiyao.showTime=item.showTime;               
            chiyao.text1=item.text1;    
            chiyao.icon=item.icon;           
            chiyaoList.push(chiyao);
          }
          if(item.name=='辅食'){
            let fushi={};
            fushi.showTime=item.showTime;               
            fushi.text1=item.text1; 
            fushi.icon=item.icon;           
            fushiList.push(fushi);
          }
          
      }
      allList[i].chiyaoList=chiyaoList;
      daySum.chiyaoCount=chiyaoList.length;
    
      allList[i].niaobuList=niaobuList;
        daySum.niaobuCount=niaobuList.length;
    
      allList[i].xizaoList=xizaoList;
        daySum.xizaoCount=xizaoList.length;
    
      allList[i].qitaList=qitaList;
      daySum.qitaCount=qitaList.length;

      allList[i].daySum=daySum;
    }
    this.setData({
      recordList:allList
    });
  },
  dayListClick(){
    this.setData({
      showDayList:true
    });
  },
  dayListCancel(event) {
   this.setData({
     showDayList:false
   });
  },
})