import React from "react"
import { SearchPanel } from "./search-panel"
import { List, Project } from "./list"
import { useState, useEffect } from "react";
import qs from 'qs';
import { cleanObject, useDebounce, useMount } from "utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useAsync } from "utils/use-async";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useDocumentTitle } from "utils";
import { useUrlQueryParam } from "utils/url";
import { useProjectsSearchParams } from "./util";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {

    // const [users, setUsers] = useState([]);

    /* const [, setParam] = useState({
        name: '',
        personId: ''
    }) */
 
    // const [param,setParam] = useUrlQueryParam(['name', 'personId']);
    // const projectsParam ={...param, personId: Number(param.personId) || undefined}
    const [param, setParam] = useProjectsSearchParams()
    const debouncedParam = useDebounce(param, 200);
    // const client = useHttp();
    const {isLoading, error, data: list, retry} = useProjects(debouncedParam);
    const {data:users} = useUsers();
/*     useMount(() => {
        client('users').then(setUsers);
    }) */

    useDocumentTitle("项目列表", false);

    return <Container>
        <h1>项目列表</h1>
        <SearchPanel users={users || []} param={param} setParam={setParam} />
        {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
        <List refresh={retry} loading={isLoading} users={users || []} /* list={list} */ dataSource={list || []} />
    </Container>
}

const Container = styled.div`
padding: 3.2rem;
`
