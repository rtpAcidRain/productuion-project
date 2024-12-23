import { Profile } from '@/entities/Profile/model/types/profile';
import { ValidateProfileError } from '../consts/ValidateProfileError';

export interface ProfileSchema {
    data?: Profile;
    form?: Profile;
    isLoading: boolean;
    error?: string;
    readonly: boolean;
    validateError?: ValidateProfileError[];
}
