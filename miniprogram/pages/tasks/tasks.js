const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tasks: [],
    title:'',
    skip: 0
  },
  search:function(e){
    this.setData({
      title:e.detail.value,
      skip:0
    })
    this.getTask()
  },
  getTask: function (callback) {
    if (!callback) {
      callback = res => { }
    }
    wx.showLoading({
      title: '数据加载中',
    })
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getTasks',
      // 传给云函数的参数
      data: {
        title:this.data.title,
        skip: this.data.skip
      }
    }).then(res => {

      let skip = this.data.skip;
      let tasks = this.data.tasks;
      let data = res.result.data;

      for (let i = 0; i < data.length; i++) {
        data[i].task_time = util.getDate(new Date(data[i].task_time))
      }

      this.setData({
        tasks: skip == 0 ? data : tasks.concat(data)
      }, res => {
        wx.hideLoading()
        callback();
      }
      )
      this.setData({
        skip:skip+20
      })

    }).catch(console.error)
  },
  addtask: function () {
    wx.navigateTo({
      url: '../addtask/addtask'
    })
  },
  task:function(e){
    wx.navigateTo({
      url: '../task/task?id='+e.currentTarget.dataset.id,
    })
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
    this.setData({
      skip:0
    })
    this.getTask()
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
    this.setData({
      skip:0
    })
    this.getTask(res => {
      wx.stopPullDownRefresh();
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getTask()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})