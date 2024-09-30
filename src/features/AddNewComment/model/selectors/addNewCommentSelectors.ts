import { StateSchema } from 'app/providers/StoreProvider';

export const getAddNewCommentText = (state: StateSchema) => state.AddNewComment?.text;
export const getAddNewCommentError = (state: StateSchema) => state.AddNewComment?.error;
