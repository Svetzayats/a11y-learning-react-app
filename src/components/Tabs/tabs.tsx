import { AccessibleTabsProvider } from './context';
import './tabs.css';

import React, { ReactElement, useEffect, useRef } from 'react';


type IProps = {
    id: string;
    children: ReactElement[];
    defaultActiveTabId: string;
    /**
     * By default it's horizontal
     * In vertical mode handling of up / bottom arrows is added
     */
    mode?: 'horizontal' | 'vertical';
    className?: string;

};

export default function Tabs({
    id,
    children,
    mode = 'horizontal',
    defaultActiveTabId,
    className = '',
}: IProps) {

    return (
        <AccessibleTabsProvider tabsId={id} defaultActiveTabId={defaultActiveTabId} mode={ mode }>
            <div id={id} className={`a11y-tabs ${className}`}>
                {children}
            </div>
        </AccessibleTabsProvider>
    );
}