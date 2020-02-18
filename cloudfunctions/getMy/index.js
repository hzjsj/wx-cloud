// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let tasks = 0;
  db.collection('task').where({
    _openid: wxContext.OPENID
  }).count().then( res => {
    tasks = res.total
  });
  let diary = db.collection('diary').where({
    _openid: wxContext.OPENID
  }).count();
   return await {
    diary:diary
   }
}