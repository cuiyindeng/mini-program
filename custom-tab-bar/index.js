// components/custom-tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    active: 'home',
    list: [{
      // "pagePath": "/pages/home/home",
      "text": "首页",
      "iconPath": "/images/tabs/home.png",
      "selectedIconPath": "/images/tabs/home-active.png",
      "name": "home",
      "icon": "home-o"
    }, {
      // "pagePath": "/pages/message/message",
      "text": "记录",
      "iconPath": "/images/tabs/message.png",
      "selectedIconPath": "/images/tabs/message-active.png",
      "name": "message",
      "icon": "chat-o"
    }, {
      // "pagePath": "/pages/contact/contact",
      "text": "关于",
      "iconPath": "/images/tabs/contact.png",
      "selectedIconPath": "/images/tabs/contact-active.png",
      "name": "contact",
      "icon": "user-o"
    }]
  },


  /**
   * 组件的方法列表
   */
  methods: {
    onChange({ detail }) {
      wx.switchTab({
        url: `/pages/${ detail }/${ detail }`,
      })
    }
  }  
})