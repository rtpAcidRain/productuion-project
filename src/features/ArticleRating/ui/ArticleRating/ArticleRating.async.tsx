import { Suspense, lazy } from 'react';
import { ArticleRatingProps } from './ArticleRating';
import { Sceleton } from '@/shared/ui/Sceleton/Sceleton';

const ArticleRatingLazy = lazy(() => import('./ArticleRating'));

export const ArticleRatingAsync = (props: ArticleRatingProps) => (
    <Suspense fallback={<Sceleton width="100%" height="114px" />}>
        <ArticleRatingLazy {...props} />
    </Suspense>
);
