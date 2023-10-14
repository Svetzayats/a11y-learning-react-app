
import { LinkedListFromData } from 'structures/LinkedList';
import { useAccessibleTabsContext } from './context';
import './tabs.css';

import React, { ReactElement, useEffect, useState } from 'react';

type ILabelProps =
    | {
        label: string;
        labelId?: never;
    }
    | {
        labelId: string;
        label?: never;
    }
    


type IProps = {
    children: ReactElement | ReactElement[];
    className?: string;
    activation?: 'automatic' | 'manual';
} & ILabelProps;

const SIDE_ARROW = ['ArrowRight', 'ArrowLeft'];
const VERTICAL_ARROW = ['ArrowUp', 'ArrowDown'];
const CHOICE_BUTTONS = [' ', 'Enter'];

/**
 * Responsible for storing tabs info and refs
 * and handling keyboard arrow events
 */
export default function TabList({
    children,
    label,
    labelId,
    className = '',
    activation = 'automatic',
}: IProps) {
    const { tabsId, mode, activeTabId, tabs, setActiveTabId } = useAccessibleTabsContext() || {};
    // TODO: improve type
    const [currentTab, setCurrentTab] = useState<any>();

    useEffect(() => {
        if (!currentTab) {
            const tabsContainer = document.getElementById(tabsId || '');
            if (tabsContainer) {
                const tabsArray = Array.from(tabsContainer.querySelectorAll('li'));
                const tabsIds = tabsArray.map(tab => tab.dataset.tabid);
                const startIndex = tabsIds.findIndex(id => id === activeTabId);
                const sortedTabsIds = [...tabsIds.slice(startIndex), ...tabsIds.slice(0, startIndex)];
                const list = new LinkedListFromData(sortedTabsIds as string[]);
                setCurrentTab(list.list?.head);
            }
        }
    }, []);

    function handleKeyDown(e: React.KeyboardEvent) {
        if ([...SIDE_ARROW, ...VERTICAL_ARROW].includes(e.key)) {
            return handleArrowKeyDown(e);
        };

        if (CHOICE_BUTTONS.includes(e.key)) {
            return handleChoiceKeyDown();
        }
    }

    function handleChoiceKeyDown() {
        if (activation === 'automatic') return;
        setActiveCurrentTab();
    }

    function handleArrowKeyDown(e: React.KeyboardEvent) {
        const isHorizontalArrayDown = ['ArrowRight', 'ArrowLeft'].includes(e.key);
        const isVerticalArrayDown = ['ArrowUp', 'ArrowDown'].includes(e.key);

        if (!isHorizontalArrayDown && !isVerticalArrayDown) return;

        if (isVerticalArrayDown && mode !== 'vertical') return;

        // TODO need to think about rtl for arabian etc - is there difference?
        // define active element
        let focused;
        if (['ArrowRight', 'ArrowDown'].includes(e.key)) {
            focused = currentTab.next;

        } else {
            focused = currentTab.prev;
        }

        setFocused(focused);
        if (activation === 'automatic') {
            setActiveCurrentTab(focused);
        }
    }

    // TODO: improve type
    function setFocused(tab: any) {
        setCurrentTab(tab);
        // @ts-ignore
        tabs?.[tab.id]?.focus();
    }

    // TODO: improve type
    function setActiveCurrentTab(tab?: any) {
        setActiveTabId?.(tab?.id || currentTab.id);
    }

    const labelAttribute = labelId ? {
        'aria-labelledby': labelId,
    } : {
        'aria-label': label,
    };
    const ariaLabels = {
        ...labelAttribute,
        'aria-orientation': mode,
    };

    return (
        <ul 
        role='tablist' 
        className={`a11y-tablist ${className}`} 
        onKeyDown={handleKeyDown}
        {...ariaLabels}>
            {children}
        </ul>
    );
}