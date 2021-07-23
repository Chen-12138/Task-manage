import React from "react"
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from 'screens/project-list';
import { Button, Dropdown, Menu } from "antd";
// 以svg方式渲染
// import { ReactComponent as SoftwareLogo } from 'xxx'
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { Navigate, Route, RouteProps, Routes } from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom';
import { ProjectScreen } from "screens/project";
import { resetRoute } from "utils";

export const AuthenticatedApp = () => {

    return (
        <Container>
            {/* {value.notExist} */}
            <PageHeader/>
            <Main>
                {/* <ProjectListScreen /> */}
                <Router>
                    <Routes>
                        <Route path='/projects' element={<ProjectListScreen />}/>
                        <Route path='/projects/:projectId/*' element={<ProjectScreen />}/>
                        <Navigate to="/projects"/>
                    </Routes>
                </Router>
            </Main>
        </Container>
    )
}

const PageHeader = () => {
    const { logout, user } = useAuth();
    return (
        <Header between={true}>
            {/* 这里放一个src */}
            {/* <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'}/> */}
            <HeaderLeft gap={true}>
                <Button type='link' onClick={resetRoute}>
                    <h2>Logo</h2>
                </Button>
                <h2>项目</h2>
                <h2>用户</h2>
            </HeaderLeft>
            <HeaderRight>
                <Dropdown overlay={<Menu>
                    <Menu.Item key='logout'>
                        <Button type="link" onClick={logout}>登出</Button>
                    </Menu.Item>
                </Menu>}>
                    <Button type="link" onClick={e => e.preventDefault()}>
                        Hi,{user?.name}
                    </Button>
                </Dropdown>
            </HeaderRight>
        </Header>
    )
}

const Container = styled.div`
/* display: grid; */
/* grid-template-rows: 6rem 1fr 6rem; */
height: 100vh;
`

// grid-area 用来给grid子元素起名字 
const Header = styled(Row)`
padding: 3.2rem;
box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
z-index: 1;
`

const HeaderLeft = styled(Row)`
display: flex;
align-items: center;
`

const HeaderRight = styled.div`
`

const Main = styled.main`grid-area: main`
