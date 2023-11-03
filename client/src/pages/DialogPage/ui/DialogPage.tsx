import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo } from 'react';
import classes from './DialogPage.module.scss';

interface DialogPageProps {
    className?: string;
}

const DialogPage = memo((props: DialogPageProps) => {
    const { className } = props;

    return (
        <Page className={classNames(classes.DialogPage, {}, [className])}>
            <h1>Страница общения с курсантами</h1>
        </Page>
    );
});

export default DialogPage;
