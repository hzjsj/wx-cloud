const util = require('../../utils/util.js');
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    task: {},
    fileList: []
  },
  status: function () {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定完成了吗',
      success (res) {
        if (res.confirm) {
          db.collection('task').doc(that.data.task._id).update({
            // data 传入需要局部更新的数据
            data: {
              status: 1
            },
            success: function (res) {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
      }
    })
  },
  delete: function () {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定删除吗?',
      success (res) {
        if (res.confirm) {
          if(that.data.fileList.length>0){
            wx.cloud.callFunction({
              // 云函数名称
              name: 'deleteFile',
              // 传给云函数的参数
              data: {
                fileList: that.data.fileList
              },
            }).then(res => {
              })
              .catch(console.error)
            }
              db.collection('task').doc(that.data.task._id).remove()
              .then(res =>{
                wx.navigateBack({
                  delta: 1
                })
              })
              .catch(console.error)
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('task').doc(options.id).get()
      .then(res => {
        let task = res.data;
      
        let images = [];
        let photos = task.photos;
        for (var i = 0; i < photos.length; i++) {
          images[i] = photos[i]['fileID']
        }

        this.setData({
          task: task,
          fileList: images
        })
      })
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.fileList,
      current: e.currentTarget.dataset.url
    });
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