import { useEffect, useRef, useState } from 'react';
import { Crepe } from '@milkdown/crepe';

import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame.css";

const MilkdownEditor = ({ content }: { content: string }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    // @ts-ignore
    const [editor, setEditor] = useState<Crepe | null>(null);

    useEffect(() => {
        if (editorRef.current) {
            const newEditor = new Crepe({
                root: editorRef.current,
                defaultValue: content,
                // features: {
                //     [Crepe.Feature.CodeMirror]: false,
                //     [Crepe.Feature.BlockEdit]: false,
                // },
            });

            newEditor.create().then(() => {
                setEditor(newEditor);
            });

            return () => {
                newEditor.destroy();
            };
        } else {
            console.log('editorRef is not present')
            return () => { };
        }
    }, [content]);

    return <div ref={editorRef} />;
};

export default MilkdownEditor;
