# 封装一个错误边界组件（类式）

# 其实也是一个组件

# static getDerivedStateFromError(error: Error) {}
# 当子组件抛出异常，这里会接收到并且调用

# 这个组件可以包在最外面，这样就可以处理全部的错误
# 传入一个渲染函数（返回一个组件，此处的写在lib中）

