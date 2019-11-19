// pages/card/card.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardList: [
      { name: '凤娇鸡爪', img: '/imgs/jijiao.jpg', price: 24, num: 1, subsubtotal: 0 },
      { name: '豆腐脑', img: '/imgs/doufunao.jpg', price: 6, num: 1, subsubtotal: 0 },
    ],
    total:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '购物车',
    })
    var cardList =  this.data.cardList
    
    for (var i = 0, len = cardList.length;i<len;i++){
      cardList[i].subtotal = cardList[i].num * cardList[i].price
      
    }
    this.setData({
      cardList: cardList
    })
    this.computeTotal()
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

  },
  reduce(e){
    var i = e.currentTarget.dataset.index,
        cardList = this.data.cardList,
        num = cardList[i].num - 1,
        subtotal = num * cardList[i].price
    if (num<1){
      num = 1
      wx.showToast({
        title: '数量不能小于 1 ',
        icon: 'none'
      })
    }else{
      cardList[i].num = num
      cardList[i].subtotal = subtotal
      this.setData({
        cardList: cardList
      })
      this.computeTotal()
    }
  },
  add(e) {
    var cardList = this.data.cardList
    var i = e.currentTarget.dataset.index
    var num = cardList[i].num + 1
    var subtotal = num * cardList[i].price
    cardList[i].num = num
    cardList[i].subtotal = num * cardList[i].price
    this.setData({
      cardList: cardList
    })
    this.computeTotal()
  },
  bindBlur(e){
    console.log(e)
    var cardList = this.data.cardList
    var val = parseInt(e.detail.value)
    var i = e.currentTarget.dataset.index
    var subtotal = val * cardList[i].price
   
    cardList[i].num = parseInt(val)
    cardList[i].subtotal = subtotal
    if(val==''){
      cardList[i].num = 1
      cardList[i].subtotal = 1 * cardList[i].price
    }
    this.setData({
      cardList: cardList
    })
    this.computeTotal()
  },
  computeTotal(){
    var cardList = this.data.cardList,
        total = 0
        
    for(var i = 0, len = cardList.length; i < len; i++) {
      total += cardList[i].subtotal
       this.setData({
         total: total
       })
    }
  },
  jumpOrder(){
    wx.switchTab({
      url: '/pages/order/order',
      success: function(res) {
        wx.showLoading({
          title: '加载中...'
        }),
        setTimeout(()=>{
          wx.hideLoading()
        },1000)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})