import { FC, lazy } from 'react';
import { AddNewCommentProps } from './AddNewComment';

export const AddNewCommentAsync = lazy<FC<AddNewCommentProps>>(() => import('./AddNewComment'));
