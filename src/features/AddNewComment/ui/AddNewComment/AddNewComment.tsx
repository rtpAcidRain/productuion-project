import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Input } from '@/shared/ui/Input';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { HStack } from '@/shared/ui/Stack';
import { addNewCommentActions, addNewCommentReducer } from '../../model/slices/addNewCommentSlice';
import { getAddNewCommentText, getAddNewCommentError } from '../../model/selectors/addNewCommentSelectors';
import cls from './AddNewComment.module.scss';

export interface AddNewCommentProps {
    className?: string,
    onSendComment: (text: string) => void
}

const reducers: ReducerList = {
    AddNewComment: addNewCommentReducer,
};

const AddNewComment = memo(
    (props: AddNewCommentProps) => {
        const { className, onSendComment } = props;
        const { t } = useTranslation();
        const text = useSelector(getAddNewCommentText);
        const error = useSelector(getAddNewCommentError);
        const dispatch = useAppDispatch();

        const onCommentTextChange = useCallback((value: string) => {
            dispatch(addNewCommentActions.setText(value));
        }, [dispatch]);

        const onSendHandler = useCallback(() => {
            if (text) {
                onSendComment(text);
                onCommentTextChange('');
            }
        }, [onSendComment, onCommentTextChange, text]);

        return (
            <DynamicModuleLoader reducers={reducers}>
                <HStack justify="between" className={classNames(cls.AddNewComment, {}, [className])}>
                    <Input
                        className={cls.input}
                        placeholder={t('vvedite-tekst-kommentariya')}
                        value={text}
                        onChange={onCommentTextChange}
                    />
                    <Button theme={ButtonTheme.OUTLINE} onClick={onSendHandler}>{t('otpravit')}</Button>
                </HStack>
            </DynamicModuleLoader>
        );
    },
);

export default AddNewComment;
