export type { User } from './model/types/User';
export type { UserSchema } from './model/types/UserSchema';
export { UserActions, UserReducer } from './model/slice/UserSlice';

export { getUserData, getUserIsLoading, getUserError } from './model/selectors/userSelectors';
