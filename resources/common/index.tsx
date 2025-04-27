import { IEditorTab, IFolderTreeNodeProps } from '@dtinsight/molecule/esm/model';
import MilkdownEditor from "../components/Editor";
export function transformToEditorTab(item: IFolderTreeNodeProps): IEditorTab {
    if (item.data?.language == 'markdown') {
        const tabData: IEditorTab = {
            id: item.id,
            name: item.name,
            closable: true,
            renderPane: () => {
                return (<div style={{overflow:"scroll", height:"100%"}}><MilkdownEditor key={item.id} content={item.data.value} /></div>);
            },
        };
        return tabData;
    }
    const tabData: IEditorTab = {
        ...item,
        id: item.id?.toString(),
        data: {
            path: item.location,
            ...(item.data || {}),
        },
        breadcrumb: item.location
            ? item.location
                .split('/')
                .map((local: string) => ({ id: local, name: local }))
            : []
    };
    return tabData;
}
