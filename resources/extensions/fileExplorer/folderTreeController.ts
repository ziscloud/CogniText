import molecule from '@dtinsight/molecule';
import {IFolderTreeNodeProps} from '@dtinsight/molecule/esm/model';
import {transformToEditorTab} from '../../common';
import {filesystem} from "@neutralinojs/lib";

// import { cloneDeep } from 'lodash';
// import API from '../../api';

export async function initFolderTree() {
    console.log('going to read folder content')
    let entries: any = await filesystem.readDirectory("/Users/shunyun/Documents/Notes");
    console.log(entries)
    if (entries) {
        molecule.folderTree.reset();
        molecule.folderTree.add({
            id: 0,
            name: "Molecule-Demo",
            fileType: "RootFolder",
            location: "Notes",
            isLeaf: false,
            data: "",
        })
        const start = "/Users/shunyun/Documents/".length;
        for (let i = 0; i < entries.length; i++) {
            const item = entries[i];
            if (item.entry.startsWith(".")) {
                continue;
            }
            if (item.entry.includes('.assets')) {
                continue;
            }
            if (item.entry === 'assets') {
                continue;
            }
            if (item.type === 'FILE') {
                molecule.folderTree.add({
                    id: i + 1,
                    fileType: 'File',
                    name: item.entry,
                    location: item.path.substring(start),
                    path: item.path,
                    isLeaf: true,
                    data: {language: 'markdown'}
                }, 0);
            }
            if (item.type === 'DIRECTORY') {
                molecule.folderTree.add({
                    id: i + 1,
                    fileType: 'Folder',
                    name: item.entry,
                    location: item.path.substring(start),
                    path: item.path,
                    isLeaf: false,
                }, 0);
            }
        }
    }
}

export function handleSelectFolderTree() {
    molecule.folderTree.onSelectFile(async (file: IFolderTreeNodeProps) => {
        const value = await filesystem.readFile(file.path);
        file.data.value = value;
        molecule.editor.open(transformToEditorTab(file));
    });
}
