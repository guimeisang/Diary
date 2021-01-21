## 定义
CSRF就是利用用户的登录态发起恶意请求
Cross Site Request Forgery

### 防范
1. 验证码
2. Referer Check
3. 请求地址添加token验证
4. SameSite Cookie