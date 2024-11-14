import React, { useEffect, useState } from 'react';
import MonacoEditor, { Editor } from '@monaco-editor/react';
interface Pros{
  code:string,
  setCode:React.Dispatch<React.SetStateAction<string>>
}
const MoveEditor = ({ code, setCode }:Pros) => {
  // Hàm để tùy chỉnh ngôn ngữ Move
  const setupMoveLanguage = (monaco) => {
    monaco.languages.register({ id: 'move' }); // Đăng ký ngôn ngữ Move

    // Định nghĩa các từ khóa, toán tử và cú pháp cho Move
    monaco.languages.setMonarchTokensProvider('move', {
      keywords: [
        'module', 'script', 'struct', 'public', 'fun', 'move', 'let', 'const',
        'if', 'else', 'while', 'return', 'abort', 'true', 'false',
      ],
      operators: [
        '=', '>', '<', '==', '!=', '<=', '>=', '+', '-', '*', '/', '%', '!',
        '&&', '||', '++', '--', '**', '&', '|', '^', '<<', '>>', '>>>', '===',
      ],
      symbols:  /[=><!~?:&|+\-*\/\^%]+/,

      tokenizer: {
        root: [
          // Nhận diện cú pháp Move
          [/[a-z_$][\w$]*/, { cases: { '@keywords': 'keyword', '@default': 'identifier' }}],
          { include: '@whitespace' },
          [/[{}()\[\]]/, '@brackets'],
          [/[<>](?!@symbols)/, '@brackets'],
          [/@symbols/, { cases: { '@operators': 'operator', '@default': '' }}],
          [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
          [/\d+/, 'number'],
          [/"([^"\\]|\\.)*$/, 'string.invalid' ],
          [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],
        ],
        whitespace: [
          [/[ \t\r\n]+/, ''],
          [/\/\*/, 'comment', '@comment' ],
          [/\/\/.*$/, 'comment'],
        ],
        comment: [
          [/[^\/*]+/, 'comment' ],
          [/\*\//, 'comment', '@pop' ],
          [/[\/*]/, 'comment' ],
        ],
        string: [
          [/[^\\"]+/, 'string'],
          [/\\./, 'string.escape'],
          [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
        ]
      },
    });

    // Cung cấp tự động hoàn thành đơn giản cho Move
    monaco.languages.registerCompletionItemProvider('move', {
      provideCompletionItems: () => ({
        suggestions: [
          {
            label: 'module',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'module',
          },
          {
            label: 'script',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'script',
          },
          {
            label: 'struct',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'struct',
          },
          {
            label: 'fun',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'fun',
          },
          // Thêm các gợi ý khác cho từ khóa của Move
        ],
      }),
    });
  };

  return (
    <MonacoEditor
      height="500px"
      language="move" // Cài đặt ngôn ngữ là Move
      value={code}
      onChange={(value) => setCode(value as string)}
      beforeMount={setupMoveLanguage} // Gọi hàm thiết lập ngôn ngữ Move trước khi editor khởi tạo
      options={{
        fontSize: 14,
        automaticLayout: true,
      }}
    />
   
  );
};

export default MoveEditor;
