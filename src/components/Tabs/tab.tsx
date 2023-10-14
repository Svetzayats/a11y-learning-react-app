import { useAccessibleTabsContext } from './context';
import './tabs.css';

import React, { ReactElement, cloneElement, useEffect, useRef } from 'react';

type IProps = {
    children: ReactElement;
    tabId: string;
    panelId: string;
    className?: string;
}

export default function Tab({
    children,
    tabId,
    panelId,
    className = '',
}: IProps) {
    const { activeTabId, setActiveTabId, tabs } = useAccessibleTabsContext() || {};
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current && tabs) {
            tabs[tabId] = ref.current;
        }
    }, []);

    const isActive = activeTabId === tabId;

    const elementWithAttributes = cloneElement(children, {
        id: tabId,
        tabIndex: -1,
    });

    return (
        <li
            className={`a11y-tab ${className}`}
            role='tab'
            data-tabid={tabId}
            aria-selected={ isActive }
            aria-controls={ panelId }
            onClick={() => setActiveTabId?.(tabId)}
            tabIndex={ isActive ? 0 : -1}
            ref={ ref }
        >
            {elementWithAttributes}
        </li>
    );
}