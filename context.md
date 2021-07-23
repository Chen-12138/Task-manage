# context上下文对象笔记

# 首先此处的auth-provider相当于第三方的登录支持，暴露登录接口

<!-- 解释auth-context里面各个函数的意思 -->
# bootstrap函数，作用是初始化user，先获取token，然后判断是否有token，如果有的话，就发请求获取user信息，然后返回，如果没有的话就返回null

# 1、用React.createContext<泛型对象 | undefined>(undefined)
# 2、然后创建一个高阶组件，这个组件其实就是将子组件包裹在AuthContext.Provider里面，便于往下传值。
