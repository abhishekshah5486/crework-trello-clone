import React from 'react';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillTextEditor = () => {
    const [value, setValue] = useState('');
    return (
        <ReactQuill 
        theme="snow" 
        value={value} 
        onChange={setValue} 
        placeholder='Task description...'
        />
    )
}

export default QuillTextEditor;
