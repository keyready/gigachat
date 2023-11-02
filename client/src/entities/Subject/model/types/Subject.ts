export interface Subject {
    title: string;
    abbr: string;
    kaf: number;
}

export interface SubjectSchema {
    data?: Subject;
    error?: string;
    isLoading?: boolean;
}
