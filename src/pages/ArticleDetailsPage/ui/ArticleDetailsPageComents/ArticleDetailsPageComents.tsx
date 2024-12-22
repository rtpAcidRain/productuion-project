import { useTranslation } from 'react-i18next';
import { Suspense, memo, useCallback } from 'react';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { VStack } from 'shared/ui/Stack';
import { AddNewComment } from 'features/AddNewComment';
import { CommentList } from 'entities/Comment';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useInitialEffects } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentByArticleId/fetchCommentByArticleId';

interface ArticleDetailsPageComentsProps {
    className?: string,
    id: string
}

export const ArticleDetailsPageComents = memo(
    (props: ArticleDetailsPageComentsProps) => {
        const { className, id } = props;
        const { t } = useTranslation();
        const dispatch = useAppDispatch();
        const comments = useSelector(getArticleComments.selectAll);
        const commentsIsloading = useSelector(getArticleCommentsIsLoading);

        const onSendComment = useCallback((text: string) => {
            dispatch(addCommentForArticle(text));
        }, [dispatch]);

        useInitialEffects(() => {
            dispatch(fetchCommentsByArticleId(id));
        });

        return (
            <VStack gap="16" align="start">
                <Text size={TextSize.L} title={t('Комментарии')} />
                <VStack gap="16">
                    <Suspense fallback={`${t('Loading...')}`}>
                        <AddNewComment onSendComment={onSendComment} />
                    </Suspense>
                    <CommentList
                        isLoading={commentsIsloading}
                        comments={comments}
                    />
                </VStack>
            </VStack>
        );
    },
);
