# useAsync自定义hook主要是用来处理异步操作

# 此函数应该传入一个泛型，因为函数里的数据格式应根据传入的改变
# 主要是data的数据格式是不确定的

# State 包含 error，data，stat  Config指定是否抛出异常

# 然后也是定义一个config来将默认和传入的合并

# 然后用useState获取state和setState然后再定义一个成功和失败的处理函数

# 然后定义一个run函数用于触发异步请求，该函数传入一个Promise
# 可先做一个判断判断是否正确传入Promise
# 然后将状态的stat设置成loading
# 如果成功的话就调用成功的回调，并返回data
# 如果失败的话就调用失败的回调，此时根据传入的config中的throwOnError来判断是否抛出异常，还是直接返回异常

# 最后返回所有信息