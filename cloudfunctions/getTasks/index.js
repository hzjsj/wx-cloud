// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return await db.collection('task').where({
    _openid: wxContext.OPENID,
    title: new RegExp(event.title)
  }).orderBy('create_time', 'desc').skip(event.skip).limit(20).get()
}