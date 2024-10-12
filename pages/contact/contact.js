// pages/contact/contact.js
const app = getApp()

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
 
Page({
  data: {
    avatarUrl: defaultAvatarUrl, //用户展示头像
    _avatarUrl: '', //用户授权头像
    nickName: '微信用户', //用户展示昵称
    _nickName: '', //用户授权昵称
    isShowPop: false, //头像昵称选择弹出框
  },
  onLoad() {
    // wx.getStorage({
    //   key: 'jkwjdc_userInfo',
    //   success: (res) => {
    //     let data = JSON.parse(res.data)
    //     this.setData({
    //       avatarUrl: data.avatarUrl,
    //       nickName: data.nickName,
    //     })
    //   },
    // })
  },
  onShow: function () {
    this.getTabBar().setData({
      active: 'contact'
    })
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
  submitGetUser() {
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
    })
  }
})