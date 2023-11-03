import { Button } from 'shared/UI/Button';
import { VStack } from 'shared/UI/Stack';
import { Page } from 'widgets/Page/Page';
import classes from './PageError.module.scss';

export const PageError = () => {
    const reloadPage = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };

    return (
        <Page className={classes.PageError}>
            <VStack maxH align="center" justify="center">
                <h1 className={classes.error500}>500</h1>
                <h1 className={classes.error500Title}>Внутренняя ошибка</h1>
                <p>Здесь нет Вашей вины</p>
                <Button onClick={reloadPage}>Попробуйте перезагрузить страничку</Button>
            </VStack>
        </Page>
    );
};
