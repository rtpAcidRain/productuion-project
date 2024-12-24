import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { Text, TextTheme } from '@/shared/ui/Text/Text';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginLoading } from '../../model/selectors/getLoginLoading/getLoginLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { loginByUsername } from '../../model/services/LoginBtUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

export interface LoginFormProps {
    className?: string,
    onSuccess: () => void
}

const initialReducers: ReducerList = {
    loginForm: loginReducer,
};

const LoginForm = memo((props: LoginFormProps) => {
    const { className, onSuccess } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginLoading);
    const error = useSelector(getLoginError);

    const onChangeUsername = useCallback((val: string) => {
        dispatch(loginActions.setUsername(val));
    }, [dispatch]);

    const onChangePassword = useCallback((val: string) => {
        dispatch(loginActions.setPassword(val));
    }, [dispatch]);

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
        }
    }, [onSuccess, dispatch, username, password]);

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
            <div className={classNames(cls.loginForm, {}, [className])}>
                <Text title={t('Форма авторизации')} />
                {error && <Text text={t('Вы ввели неверный логин или пародб')} theme={TextTheme.ERROR} />}
                <Input
                    placeholder={t('Введите username')}
                    type="text"
                    className={cls.input}
                    autoFocus
                    onChange={onChangeUsername}
                    value={username}
                />
                <Input
                    placeholder={t('Введите пароль')}
                    type="text"
                    className={cls.input}
                    onChange={onChangePassword}
                    value={password}
                />
                <Button
                    theme={ButtonTheme.OUTLINE}
                    className={cls.loginBtn}
                    onClick={onLoginClick}
                    disabled={isLoading}
                >
                    {t('Войти')}
                </Button>
            </div>
        </DynamicModuleLoader>

    );
});

export default LoginForm;
