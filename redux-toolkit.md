# 关于该项目中使用redux-toolkit的笔记

# 创建一个store文件夹，index.ts文件
# 创建一个rootReducer对象，用于汇总所有的reducer
# 用configureStore创建一个store，参数传入reducer: rootReducer
# type AppDispatch = typeof store.dispatch
# type RootState = ReturnType<typeof store.getState>

# 创建slice
# 定义State接口，创建initialState
# 用createSlice创建Slice，传入参数name，initialState，reducers
# 在reducers里面定义方法，这里的其实就action，接受两个参数state，playload
# 创建完后导出Slice.actions
# 如果要导出状态，可以这样写
# export const selectProjectModalOpen = (state: RootState) => state.projectList.projectModalOpen;

# 处理异步的action，要用到thunk
# (参数) => (dispatch) => {异步逻辑}

# 在其他组件使用状态需要用useSelector(selectUser)
# 在slice中需要写selectUser = (state: RootState) => state.auth.user