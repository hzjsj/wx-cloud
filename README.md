# 云日程
用来记录自己想要做的事情，通过微信订阅消息提醒自己，也可以记录自己想说的话。

这个项目开源，可以用来学习小程序云开发



# 部署流程

1、注册小程序账号，在订阅消息中添加日程提醒模板

2、在微信开发者工具，开通云开发

3、下载源码，在微信开发者工具中导入项目

4、在数据库中新建3个集合，集合名为user、task、diary

5、上传部署 cloudfunctions 文件夹下的云函数，右击、上传并部署：云端安装依赖

6、可以启动调试看看效果