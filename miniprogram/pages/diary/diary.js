const util = require('../../utils/util.js');
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diary:[],
    skip: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      skip:0
    })
    this.getTask()
  },
  delete:function(e){
    let that =this;
    let data = e.currentTarget.dataset;
    wx.showModal({
      title: '提示',
      content: '确定删除吗?',
      success (res) {
        if (res.confirm) {
          if(data.photo){
            wx.cloud.callFunction({
              // 云函数名称
              name: 'deleteFile',
              // 传给云函数的参数
              data: {
                fileList: [data.photo]
              },
            }).then(res => {
              })
              .catch(console.error)
            }
            db.collection('diary').doc(data.id).remove()
            .then(res =>{
              that.setData({
                skip:0
              })
              that.getTask()
            })
            .catch(console.error)
        }
      }
    })
  },
  viewImage:function(e){
    wx.previewImage({
      current: e.currentTarget.dataset.photo, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.photo] // 需要预览的图片http链接列表
    })
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
      name: 'getDiary',
      // 传给云函数的参数
      data: {
        p: this.data.skip
      }
    }).then(res => {

      let skip = this.data.skip;
      let diary = this.data.diary;
      let data = res.result.data;

      for (let i = 0; i < data.length; i++) {
        data[i].date = util.getDay(new Date(data[i].create_time))
        data[i].time = util.getTime(new Date(data[i].create_time))
      }

      this.setData({
        diary: skip == 0 ? data : diary.concat(data)
      }, res => {
        wx.hideLoading()
        callback();
      }
      )
      this.setData({
        skip:skip+5
      })

    }).catch(console.error)
  },
  adddiary: function () {
    wx.navigateTo({
      url: '../adddiary/adddiary'
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