// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      { imgUrl: "/imgs/1.jpg" },
      { imgUrl: "/imgs/2.jpg" },
      { imgUrl: "/imgs/3.jpg" },
      { imgUrl: "/imgs/4.jpg" },
      { imgUrl: "/imgs/5.jpg" }
     ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    menuList:[
      { menuName: '豆腐脑', menuImg: '/imgs/doufunao.jpg', price: 6 },
      { menuName: '麻辣鸡脚', menuImg: '/imgs/jijiao.jpg', price: 26 },
      { menuName: '凉皮', menuImg: '/imgs/liangpi.jpg', price: 10 },
      { menuName: '莲子羹', menuImg: '/imgs/lianzigen.jpg', price: 12 },
      { menuName: '稀饭', menuImg: '/imgs/xifan.jpg', price: 8 },
      { menuName: '凉粉', menuImg: '/imgs/liangfen.jpg', price: 9 }
    ],
    total:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,"监听页面加载")
    wx.showNavigationBarLoading()
    
    // wx.hideTabBar({
    //   animation: true
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("监听页面初次渲染完成")
    wx.hideNavigationBarLoading()
    
    // wx.showTabBar({
    //   animation: true
    // })
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //wx.stopPullDownRefresh()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (val) {
    return{
      path:"/pages/home/home",
      title: "首页",
    }
  },
  onTabItemTap(item) {
    
  }
})