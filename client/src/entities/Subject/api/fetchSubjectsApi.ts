import { rtkApi } from 'shared/api/rtkApi';
import { Subject } from 'entities/Subject';

const fetchSubjectApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getSubjects: build.query<Subject[], number>({
            query: (group) => ({
                url: '/api/subjects',
                params: {
                    group,
                },
            }),
        }),
    }),
});

export const useSubjects = fetchSubjectApi.useGetSubjectsQuery;
