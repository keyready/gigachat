export { SubjectCard } from './ui/SubjectCard';

export type { Subject, SubjectSchema } from './model/types/Subject';
export {
    getSubjectData,
    getSubjectError,
    getSubjectIsLoading,
} from './model/selectors/subjectSelectors';
export { SubjectActions, SubjectReducer } from './model/slice/SubjectSlice';
