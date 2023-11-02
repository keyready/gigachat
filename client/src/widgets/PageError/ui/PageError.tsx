import { useTranslation } from 'react-i18next';
import { Button } from 'shared/UI/Button';
import { VStack } from 'shared/UI/Stack';
import { Page } from 'widgets/Page/Page';
import classes from './PageError.module.scss';

export const PageError = () => {
    const { t } = useTranslation();

    const reloadPage = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };

    return (
        <Page className={classes.PageError}>
            <VStack maxH align="center" justify="center">
                <h1 className={classes.error500}>500</h1>
                <h1 className={classes.error500Title}>{t('Внутренная ошибка')}</h1>
                <p>{t('Здесь нет Вашей вины')}</p>
                <Button onClick={reloadPage}>{t('Попробуйте перезагрузить страничку')}</Button>
            </VStack>
        </Page>
    );
};
