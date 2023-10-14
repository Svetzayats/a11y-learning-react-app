import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Nullish } from 'types/common';


type ITabRefs = {
  [tabId: string]: React.MutableRefObject<any>;
};

type IAccessibleTabsContext = {
  activeTabId: string;
  setActiveTabId: (id: string) => void;
  tabsId: string;
  mode: 'horizontal' | 'vertical';
  tabs: ITabRefs;
}

type IProviderProps = {
  children: React.ReactNode;
  tabsId: string;
  defaultActiveTabId: string;
  mode: 'horizontal' | 'vertical';
};

const AccessibleTabsContext = createContext<Nullish<IAccessibleTabsContext>>(null);

function AccessibleTabsProvider({
  children,
  tabsId,
  mode,
  defaultActiveTabId,
}: IProviderProps) {
  const [activeTabId, setActiveTabId] = useState<string>(defaultActiveTabId);
  const [id, setId] = useState<string>(tabsId);
  const tabRefs = useRef({});

  const value = {
    activeTabId,
    setActiveTabId,
    mode,
    tabsId: id,
    tabs: tabRefs.current,
  };

  return (
    <AccessibleTabsContext.Provider value={value}>
      {children}
    </AccessibleTabsContext.Provider>
  );


}

function useAccessibleTabsContext() {
  const context = useContext(AccessibleTabsContext);
  if (context === undefined) {
    console.error('AccessibleTabsContext context must be used within a AccessibleTabsProvider');
    return {} as IAccessibleTabsContext;
  }
  return context;
}

export { AccessibleTabsProvider, useAccessibleTabsContext };