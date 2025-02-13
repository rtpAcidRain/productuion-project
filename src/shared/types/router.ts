import { RouteProps } from 'react-router-dom';
// eslint-disable-next-line acid-plugin2/layers-import
import { UserRole } from '@/entities/User';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRole[]
}
