import { createContext } from 'react';


export const BreadcrumbsContext = createContext('Home')
export const ToolbarContext = createContext({
    page: null,
    selectedId: null
})