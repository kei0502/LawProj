# IST 法务项目

## 债务人页面说明（user前缀的页面）

先进入债务人首页 userIndex.html
有登录和未登录状态区分,默认未登录状态,可以点击登录/注册,点击弹出框的确认按钮后进入该页登录状态的页面
登录后可以点击添加债券申请表/查看债券申请表

1. 如果点击添加债券申请表,跳转到userChooseCompanyCreate.html选择公司
     选择任意公司后跳转到userFormCreate.html添加债权申请表

   - 可以点击新建代理人/移除代理人


- 有无判决、裁定或仲裁裁决选择为"有"时,申报债权金额栏下会显示诉讼/保全/执行费和附件上传


- 点击利息会跳出弹出框选择利息计算方式后显示利息,也可以自行输入利息,确定后利息自动显示

1. 如果点击查看债权申请表,跳转到userChooseCompany.html选择公司
     选择好公司后跳到userChooseForm.html选择具体的申请表
     可以点击创建/编辑/投票/投票结果,或选择任意一家公司查看债权申请表

## 管理人页面说明（Admin后缀的页面）

   通过用户登录界面登录管理人系统,默认跳转到companyManagementAdmin.html

1. 破产公司管理（companyManagementAdmin.html）,提供添加公司和在整个流程中的操作
2. 债权申请管理（chooseCompanyAdmin.html）,选择债务公司后提供对各个债权人的申请的操作

## 破产公司页面和会计师页面说明（chooseApply______.html和verify______.html）

提供债权申请审核功能,通过用户登录界面登录破产公司和会计师系统,默认跳转到chooseApply_______.html,在该页面选择未审核的债权申请进行审核

