const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '2020',
    tasks: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getTasks: function (callback) {
    if (!callback) {
      callback = res => { }
    }
    const db = wx.cloud.database()
    db.collection('task').where({
      remind_time: new RegExp(util.getDate(new Date()))
    }).get().then(res => {
      this.setData({
        tasks: res.data
      }, res => {
        callback();
      })
    })

  },
  task: function (e) {
    wx.navigateTo({
      url: '../task/task?id=' + e.currentTarget.dataset.id,
    })
  },
  addtask: function () {
    wx.navigateTo({
      url: '../addtask/addtask'
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
    this.getTasks()
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
    this.getTasks(res => {
      wx.stopPullDownRefresh();
    })
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