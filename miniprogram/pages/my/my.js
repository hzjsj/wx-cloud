Page({

  /**
   * 页面的初始数据
   */
  data: {
    diary:0,
    task:0,
    tasks:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.cloud.callFunction({
    //   name: 'getMy'
    // })
    // .then(res => {
    //   console.log(res) // 3
    // })
    // .catch(console.error)
  },
  showQrcode() {
    wx.previewImage({
      urls: ['cloud://svip9.7376-svip9-1258873690/images/mm_reward_qrcode_1581775318193.png'],
      current: 'cloud://svip9.7376-svip9-1258873690/images/mm_reward_qrcode_1581775318193.png' // 当前显示图片的http链接      
    })
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
    const db = wx.cloud.database()
    db.collection('task').where({
      status: 1 
    }).count().then(res => {
      this.setData({
        task:res.total
      })
    })
    db.collection('task').count().then(res => {
      this.setData({
        tasks:res.total
      })
    })
    db.collection('diary').count().then(res => {
      this.setData({
        diary:res.total
      })
    })
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