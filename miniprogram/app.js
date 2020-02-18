//app.js
App({
  onLaunch: function () {
    // 初始化云函数
    wx.cloud.init({
      traceUser: true
    })

  //初始化数据库
  const db = wx.cloud.database()
    wx.cloud.callFunction({
      name: 'checkUser'
    }).then(res => {
      if (!res.result.data.length) {
        db.collection('user').add({
          data: {
            create_time: new Date()
          }
        }).then(res => {
        }).catch(console.error)
      }
    })
      .catch(console.error)
  },
  globalData: {
    userInfo: null
  }
})