import { classNames } from 'shared/lib/classNames/classNames';
import { Tab as HTab } from '@headlessui/react';
import { Fragment, memo, ReactNode } from 'react';
import { HStack, VStack } from 'shared/UI/Stack';
import { Text } from 'shared/UI/Text';
import classes from './Tabs.module.scss';

interface TabsProps {
    className?: string;
    titles: string[];
    content: ReactNode[];
}

export const Tabs = memo((props: TabsProps) => {
    const { className, titles, content } = props;

    return (
        <HTab.Group as={VStack} className={className}>
            <HTab.List as={HStack} gap="4" className={classes.wrapper}>
                {titles.map((title) => (
                    <HTab as={Fragment} key={title}>
                        {({ selected }) => (
                            <div
                                className={classNames(classes.tab, {
                                    [classes.selected]: selected,
                                })}
                            >
                                {title}
                            </div>
                        )}
                    </HTab>
                ))}
            </HTab.List>
            <HTab.Panels className={classes.panel}>
                {content.map((content, index) => (
                    <HTab.Panel key={index} className={classes.panel}>
                        {content}
                    </HTab.Panel>
                ))}
            </HTab.Panels>
        </HTab.Group>
    );
});
