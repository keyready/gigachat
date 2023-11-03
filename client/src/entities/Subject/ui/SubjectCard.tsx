import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import classes from './SubjectCard.module.scss';

interface SubjectCardProps {
    className?: string;
}

export const SubjectCard = memo((props: SubjectCardProps) => {
    const { className } = props;

    return <div className={classNames(classes.SubjectCard, {}, [className])}>ghbdtn vbh</div>;
});
