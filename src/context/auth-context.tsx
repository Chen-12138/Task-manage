import React, { ReactNode, useCallback, useState } from "react";
import * as auth from 'auth-provider';
import { User } from 'screens/project-list/search-panel';
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import * as authStore from 'store/auth.slice'
import { useDispatch, useSelector } from "react-redux";
import { bootstrap } from "store/auth.slice";

export interface AuthForm {
    username: string,
    password: string
}

export const bootstrapUser = async () => {
    let user = null;
    const token = auth.getToken();
    if(token) {
        const data = await http('me', {token});
        user = data.user;
    }
    return user;
}

const AuthContext = React.createContext<{
    user: User | null,
    register: (form: AuthForm) => Promise<void>,
    login: (form: AuthForm) => Promise<void>,
    logout: () => Promise<void>
} | undefined>(undefined);

AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({children}:{children:ReactNode}) => {
    // const [user, setUser] = useState<User | null>(null);
    const {data: user, error, isLoading, isIdle, isError, run, setData: setUser} = useAsync<User | null>();

    const login = (form:AuthForm) => auth.login(form).then(setUser);
    const register = (form:AuthForm) => auth.register(form).then(user => setUser(user));
    const logout = () => auth.logout().then(() => setUser(null));

    const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();

    useMount(() => {
        // bootstrapUser().then(setUser);
        // console.log(bootstrapUser());
        // run(bootstrapUser());
        run(dispatch(bootstrap()))
    })


    if(isIdle || isLoading) {
        return <FullPageLoading></FullPageLoading>
    }

    if(isError) {
        return <FullPageErrorFallback error={error}></FullPageErrorFallback>
    }    

    // return (<AuthContext.Provider children={children} value={{user, login, register, logout}}></AuthContext.Provider>)

    return <div>{children}</div>
}

/* export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth必须在AuthProvider中使用');
    }
    return context;
} */

export const useAuth = () => {
    const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
    const user = useSelector(authStore.selectUser)
    const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)), [dispatch]);
    const register = useCallback((form: AuthForm) => dispatch(authStore.register(form)), [dispatch]);
    const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
    return {
        user,
        login,
        register,
        logout
    }
}