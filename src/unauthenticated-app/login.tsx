import { useAuth } from 'context/auth-context';
import React from 'react';
import { Form, Button, Input } from 'antd';
import { LongButton } from 'unauthenticated-app';
import { useAsync } from 'utils/use-async';

export const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {

    const { login, user } = useAuth();
    const {run, isLoading} = useAsync(undefined, {throwOnError: true});

    /* const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
        const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
        login({username, password});
    } */

    const handleSubmit = async (values: { username: string, password: string }) => {
        try {
            // 异步
            // await login(values);
            await run(login(values));
        } catch (e) {
            onError(e);
        }
    }

    return <Form onFinish={handleSubmit}>
        {
            user ? <div>登录成功，用户名：{user?.name}</div> : null
        }
        <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input type="text" id={'username'} />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input type="password" id={'password'} />
        </Form.Item>
        <Form.Item>
            <LongButton loading={isLoading} htmlType="submit" type="primary">登录</LongButton>
        </Form.Item>
    </Form>
}