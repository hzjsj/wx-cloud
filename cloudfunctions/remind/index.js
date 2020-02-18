// 云函数入口文件
const cloud = require('wx-server-sdk');
const remindTmplIds = 'YYVpUuYuHjoZ-cCL5-NzqlBKfKztazH_cor5mryX4AU';
cloud.init()
const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
// @todo 实现定时发送订阅消息逻辑
try {
  // 从云开数据库中查询等待发送的消息列表
  const tasks = await db
    .collection('task')
    .where({
      remind: true,
      // 课程开始时间前半小时之内
      task_time: _.lte(new Date().getTime() + 12 * 60 * 60 * 1000),
    })
    .get();

  // 循环消息列表
  const sendPromises = tasks.data.map(async message => {
    try {
      // 发送订阅消息
      await cloud.openapi.subscribeMessage.send({
        touser: message._openid,
        page: 'pages/my/my',
        data: {
          thing1: {
            value: message.title
          },
          thing2: {
            value: message.remind_time
          },
          thing3: {
            value: message.desc
          }
        },
        templateId: remindTmplIds,
      });
      // 发送成功后将消息的状态改为已发送
      return db
        .collection('task')
        .doc(message._id)
        .update({
          data: {
            remind: false,
          },
        });
    } catch (e) {
      return e;
    }
  });

  return Promise.all(sendPromises);
} catch (err) {
  console.log(err);
  return err;
}
}