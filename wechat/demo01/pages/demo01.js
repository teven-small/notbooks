// pages/demo01.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs:[
      { name: '孜然牛排', url:'../img/1.png'},
      { name: '孜然牛排', url: '../img/2.png' },
      { name: '孜然牛排', url: '../img/3.png' },
      { name: '孜然牛排', url: '../img/4.png' },
    ],
    news:[
      '牛肉','苹果','香蕉'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    col(){
      console.log("加载完成")
    },
    onGotUserInfo(res){
      console.log(res)
    },
    setLoading(res){
      console.log(res)
    },
    setPlain(res) {
      console.log(res)
    },
    setDisabled(res) {
      console.log(res)
    },
  }
})
