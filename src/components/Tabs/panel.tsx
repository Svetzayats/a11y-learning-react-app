import { useAccessibleTabsContext } from './context';
import './tabs.css';

import React, { ReactElement, cloneElement } from 'react';

type IProps = {
    children: ReactElement;
    tabId: string;
    panelId: string;
    className?: string;
}

export default function TabPanel({
    children,
    tabId,
    panelId,
    className = '',
}: IProps) {
    const { activeTabId } = useAccessibleTabsContext() || {};

    const isHidden = activeTabId !== tabId;
    return (
        <div
            id={panelId}
            role='tabpanel'
            tabIndex={0}
            aria-labelledby={tabId}
            hidden={isHidden}
            className={`a11y-tabpanel ${className} ${isHidden ? 'hidden' : ''}`}
        >
            {children}
        </div>
    );
}
