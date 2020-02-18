const util = require('../../utils/util.js');
const remindTmplIds = 'YYVpUuYuHjoZ-cCL5-NzqlBKfKztazH_cor5mryX4AU';
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '12:01',
    date: '2018-12-25',
    imgList: [],
    remind: false
  },
  remind: function () {
    let that = this;
    if (!this.data.remind) {
      wx.requestSubscribeMessage({
        tmplIds: [remindTmplIds],
        success(res) {
          if (res.errMsg === 'requestSubscribeMessage:ok' && res[remindTmplIds] === 'accept') {
            that.setData({
              remind:true
            })
          }else{
            that.setData({
              remind:false
            })
          }
        }
      })
    }
  },
  // 提交表单
  formSubmit: function (e) {
    if (!e.detail.value.title) {
      return wx.showToast({
        title: '任务不能为空',
        icon: 'none'
      });
    }
    wx.showLoading({ title: '加载中' })
    if (this.data.imgList.length > 0) {
      // 并发上传图片
      const uploadTasks = this.data.imgList.map(item => this.uploadPhoto(item))
      Promise.all(uploadTasks).then(result => {

        const photos = result.map(photo => ({
          fileID: photo.fileID
        }))
        this.addTask(e, photos)
      }).catch(() => {
        wx.hideLoading()
        wx.showToast({ title: '上传图片错误', icon: 'error' })
      })
    } else {
      this.addTask(e, this.data.imgList)
    }
  },
  addTask: function (e, photos) {
    db.collection('task').add({
      data: {
        title: e.detail.value.title,
        desc: e.detail.value.desc,
        photos: photos,
        task_time: new Date(this.data.date + ' ' + this.data.time).getTime(),
        remind: this.data.remind,
        remind_time: this.data.date + ' ' + this.data.time,
        status: 0,
        create_time: Date.now()
      }
    }).then(res => {
      wx.hideLoading()
      wx.navigateBack({
        delta: 1
      })
    }).catch(console.error)
  },
  // 上传图片
  uploadPhoto(filePath) {
  // 调用wx.cloud.uploadFile上传文件
  return wx.cloud.uploadFile({
    cloudPath: 'task/' + `${Date.now()}-${Math.floor(Math.random(0, 1) * 10000000)}.png`,
    filePath
  })
},
  TimeChange(e) {
  this.setData({
    time: e.detail.value
  })
},
  DateChange(e) {
  this.setData({
    date: e.detail.value
  })
},
  ChooseImage() {
  wx.chooseImage({
    count: 9, //默认9
    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'],
    success: (res) => {
      if (this.data.imgList.length != 0) {
        this.setData({
          imgList: this.data.imgList.concat(res.tempFilePaths)
        })
      } else {
        this.setData({
          imgList: res.tempFilePaths
        })
      }
    }
  });
},
  ViewImage(e) {
  wx.previewImage({
    urls: this.data.imgList,
    current: e.currentTarget.dataset.url
  });
},
  DelImg(e) {
  wx.showModal({
    title: '提示',
    content: '确定要删除这张照片？',
    cancelText: '取消',
    confirmText: '确定',
    success: res => {
      if (res.confirm) {
        this.data.imgList.splice(e.currentTarget.dataset.index, 1);
        this.setData({
          imgList: this.data.imgList
        })
      }
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      date: util.getDate(new Date(Date.now())),
      time: util.getTime(new Date(Date.now()))
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