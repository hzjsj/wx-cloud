const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photo: '',
    ColorList: [{
      title: '嫣红',
      name: 'red',
      color: '#e54d42'
    },
    {
      title: '桔橙',
      name: 'orange',
      color: '#f37b1d'
    },
    {
      title: '明黄',
      name: 'yellow',
      color: '#fbbd08'
    },
    {
      title: '橄榄',
      name: 'olive',
      color: '#8dc63f'
    },
    {
      title: '森绿',
      name: 'green',
      color: '#39b54a'
    },
    {
      title: '天青',
      name: 'cyan',
      color: '#1cbbb4'
    },
    {
      title: '海蓝',
      name: 'blue',
      color: '#0081ff'
    },
    {
      title: '姹紫',
      name: 'purple',
      color: '#6739b6'
    },
    {
      title: '木槿',
      name: 'mauve',
      color: '#9c26b0'
    },
    {
      title: '桃粉',
      name: 'pink',
      color: '#e03997'
    },
    {
      title: '棕褐',
      name: 'brown',
      color: '#a5673f'
    },
    {
      title: '玄灰',
      name: 'grey',
      color: '#8799a3'
    },
    {
      title: '草灰',
      name: 'gray',
      color: '#aaaaaa'
    },
    {
      title: '墨黑',
      name: 'black',
      color: '#333333'
    },
    {
      title: '雅白',
      name: 'white',
      color: '#ffffff'
    }],
    color: 'blue'
  },
  formSubmit: function (e) {
    if (!e.detail.value.diary) {
      return wx.showToast({
        title: '内容不能为空',
        icon: 'none'
      });
    }
    wx.showLoading({ title: '加载中' })
    if (this.data.photo) {
      wx.cloud.uploadFile({
        cloudPath: 'diary/' + `${Date.now()}-${Math.floor(Math.random(0, 1) * 10000000)}.png`,
        filePath: this.data.photo,
      }).then(res => {
        this.setData({
          photo:res.fileID
        })
        this.addDiary(e)
      }).catch(error => {

      })
    }else{
      this.addDiary(e)
    }
  },
  addDiary:function(e){
    db.collection('diary').add({
      data: {
        diary: e.detail.value.diary,
        color: this.data.color,
        photo: this.data.photo,
        create_time: new Date()
      }
    }).then(res => {
      wx.navigateBack({
        delta: 1
      })
    }).catch(console.error)
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  SetColor(e) {
    this.setData({
      color: e.currentTarget.dataset.color,
      modalName: null
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePaths = res.tempFilePaths
        this.setData({
          photo: tempFilePaths[0]
        })
      }
    })
  },
  ViewImage() {
    wx.previewImage({
      urls: [this.data.photo],
      current: this.data.photo
    });
  },
  DelImg() {
    wx.showModal({
      title: '提示',
      content: '确定要删除这张照片？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.setData({
            photo: ''
          })
        }
      }
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