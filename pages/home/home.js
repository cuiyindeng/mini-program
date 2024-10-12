// pages/home/home.js

import {
  Util
} from '../../utils/utils.js'
import {
  Token
} from '../../utils/token.js'
import {
  Http
} from '../../utils/http.js'

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp()
Page({
  data: {
    date: '',
    show: false,   
    typeList:[],   
    recordList: [], 
    currentDate: new Date().getTime(),
    showDayList:false,
    selectedType:'',
    selectedIcon:'',
    avatarUrl: defaultAvatarUrl, //用户展示头像
    _avatarUrl: '', //用户授权头像
    nickName: '微信用户', //用户展示昵称
    _nickName: '', //用户授权昵称
    isShowPop: false, //头像昵称选择弹出框
    qitaRecord:{},
  },
  onShow: function () {
    this.getTabBar().setData({
      active: 'home'
    })
  },
  onLoad: function () {
    let typeList=[{"_id":"6d127e375f292a48000024803d3ddaf5","icon":"like","name":"起床"},
      {"_id":"7fbac6cf5f292dcf00002f3d3129d0a3","icon":"star","name":"食物"},
      {"_id":"c8a291cf5f292a98000031234b01ab6b","icon":"fire","name":"跑步"},
      {"_id":"c8a291cf5f292a98000031430441ab6b","icon":"clock","name":"睡觉"}
    ];
    this.setData({
        typeList:typeList         
    });
  },
  async getDataList(date) {
    let recordList = await Http.request({
      url: "bill/data_list",
      method: "GET",
      data: {date: date}
    })
    if (recordList && recordList[0]) {
      this.setData({
        recordList
      })
    }
  },
  
  typeClick(ev){
    var name=ev.currentTarget.dataset.name;  
    var icon=ev.currentTarget.dataset.icon;  
    this.setData({
      qitaShow:true,  
      selectedType:name,  
      selectedIcon:icon
    })

  },
  overlayClose(){
    this.setData({
      qitaShow:false
    });
  },
  showDayList(ev){
    this.setData({
      showDayList:true
    });

  }, 
  dayListConfirm(event) {
    var selectTime=Util.dateFormat("YYYY-mm-dd HH:MM:SS", new Date(event.detail));
    let record=this.data.qitaRecord;
    record.recordTime=selectTime;
    this.setData({
      qitaRecord:record
    });
    this.setData({
      showDayList:false
    });
  },
  dayListCancel(){
    this.setData({
      showDayList:false
    });
  },
  remarkInput(e){
    let record={};
    record=this.data.qitaRecord;
    record.remark=e.detail;
    this.setData({
      qitaRecord:record
    });
  },
  async submitRecord(e){
    await Http.request({
      url: "bill/save",
      method: "POST",
      data: {name : this.data.selectedType, icon : this.data.selectedIcon, ...this.data.qitaRecord}
    });

    this.overlayClose();
    this.getDataList(Util.dateFormat("YYYY-mm-dd", new Date()));
  },
  
  // 弹窗出现
  showPopup() {
    this.setData({
      _avatarUrl: this.data.avatarUrl,
      _nickName: this.data.nickName !== '请点击授权' ? this.data.nickName : '',
      isShowPop: true
    });
  },
  // 弹窗隐藏
  closePopup() {
    this.setData({
      isShowPop: false
    });
  },
  // 更新头像
  onChooseAvatar(e) {
    const {avatarUrl} = e.detail
    this.setData({
      _avatarUrl: avatarUrl
    })
  },
  async submitGetUser() {
    let nickName = this.data._nickName.trim() || this.data.nickName
    let avatarUrl = this.data._avatarUrl
    let data = JSON.stringify({
      nickName,
      avatarUrl,
    })
    wx.setStorage({
      key: "jkwjdc_userInfo",
      data: data,
    })
    this.setData({
      nickName: nickName,
      avatarUrl: avatarUrl,
      isShowPop: false,
      isLogin:true
    })

    let token = new Token();
    await token.getToken();
    this.getDataList(Util.dateFormat("YYYY-mm-dd", new Date())) ;
  }
})