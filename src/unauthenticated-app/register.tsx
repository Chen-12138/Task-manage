import { useAuth } from 'context/auth-context';
import React from 'react';
import { Form, Button, Input } from 'antd';
import { LongButton } from 'unauthenticated-app';
import { register } from 'auth-provider';
import { useAsync } from 'utils/use-async';

export const RegisterScreen = ({onError}:{onError: (error: Error) => void}) => {

    const {login, user} = useAuth();
    const {run, isLoading} = useAsync(undefined, {throwOnError: true});

    const handleSubmit = async ({cpassword, ...values}: {username: string, password: string, cpassword: string}) => {
        if(cpassword !== values.password) {
            onError(new Error('请确认两次输入的密码相同'))
            return
        }
        try{
            await run(register(values))
            // await register(values);
        } catch(e) {
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
        <Form.Item name="cpassword" rules={[{ required: true, message: 'Please confirm your password!' }]}>
            <Input type="password" id={'cpassword'} />
        </Form.Item>
        <Form.Item>
            <LongButton loading={isLoading} htmlType="submit" type="primary">注册</LongButton>
        </Form.Item>
    </Form>
}