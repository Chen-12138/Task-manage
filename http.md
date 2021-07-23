# 封装一个发送网络请求的函数

# 此函数需要传入请求地址，也可以传入配置，token，header，data等

# 接口要继承RequestInit，这样的话再定义token和data就行

# 传参数的时候可以使用解构赋值

# 1、定义一个config，用来指定默认配置，还有合并传入的配置
# {method: 'GET', headers: {Authorization: token ? 'Bearer ${token}' : '', 'Content-Type': data ? 'application/json' : '' },...customConfig}

# 2、然后就根据config中来执行和发送请求，比如要进行拼串出完整的url，如果为get的话用qs.stringify解析出search然后拼好，如果为post的话，就要放进body里，记住要JSON.stringify

# 3、这里是return window.fetch(`url`, config).then(async response => {做判断})

# 4、判断status是否为401，如果是就先退出，然后刷新页面，并抛出错误
# 如果没有错为ok的话，就返回data，不然的话就抛出错误

# 以上步骤只是定义了一个发送请求的方法

# 这里最后其实还定义了一个customHook useHttp

# 该hook首先用useAuth获取到了user信息，然后返回了需要传入两个参数的函数