let sintaxe = function(monaco){

    var suggestions = [
    {
        label: 'Leia',
        kind: monaco.languages.CompletionItemKind.Snippet,
       /*  kind: monaco.languages.CompletionItemKind.Text, */
        insertText: 'leia(${1:value}).',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Pede ao utilizador que digite um valor e retorna o mesmo.',

    }, 
    {
        label: 'Mostre',
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: 'mostre(${1:value}).',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Exibe o valor atribuida na tela',

    }, 
    {
        label: 'Use',
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: 'use:${1:library}.',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Importa as funções internas de uma biblioteca.',

    }, 
    {
        label: 'se / Senao',
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: [
            'se (${1:condition}) {',
            '\t$0',
            '} senao {',
            '\t',
            '}'
        ].join('\n'),
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Se-Senao Statement'
    }
    ,{
        label: 'funcao',
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: [
            'funcao ${1:nomeFuncao} (${2:parametro1},${3:parametro2}) {',
            '\t$0',
            
            '}',
           
        ].join('\n'),
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Create a new function'
    },
    {
        label: 'Var',
        kind: monaco.languages.CompletionItemKind.Snippet,
       /*  kind: monaco.languages.CompletionItemKind.Text, */
        insertText: 'var ${1:name}.',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Declara um avarável genérica.',

    }, 
    {
        label: 'numero',
        kind: monaco.languages.CompletionItemKind.Snippet,
       /*  kind: monaco.languages.CompletionItemKind.Text, */
        insertText: 'numero ${1:nome}.',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Declara um avarável do tipo Inteiro.',

    }, 
    {
        label: 'Inteiro',
        kind: monaco.languages.CompletionItemKind.Snippet,
       /*  kind: monaco.languages.CompletionItemKind.Text, */
        insertText: 'inteiro ${1:nome}.',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Declara um avarável Numérica (Inteiros e Reais).',

    }, 
    {
        label: 'Caractere',
        kind: monaco.languages.CompletionItemKind.Snippet,
       /*  kind: monaco.languages.CompletionItemKind.Text, */
        insertText: 'caractere ${1:nome}.',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Declara um avarável do tipo Texto (String).',

    }, 
    {
        label: 'Boleano',
        kind: monaco.languages.CompletionItemKind.Snippet,
       /*  kind: monaco.languages.CompletionItemKind.Text, */
        insertText: 'boleano ${1:nome}.',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Declara um avarável do tipo Lógico (Boolean).',

    }, 
    {
        label: 'Verdade',
        kind: monaco.languages.CompletionItemKind.Snippet,
       /*  kind: monaco.languages.CompletionItemKind.Text, */
        insertText: 'verdade',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Valor lógico aplicado a uma variável do tipo boleano',

    }, 
    {
        label: 'Falso',
        kind: monaco.languages.CompletionItemKind.Snippet,
       /*  kind: monaco.languages.CompletionItemKind.Text, */
        insertText: 'falso',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Valor lógico aplicado a uma variável do tipo boleano',

    }, 
    {
        label: 'Nulo',
        kind: monaco.languages.CompletionItemKind.Snippet,
       /*  kind: monaco.languages.CompletionItemKind.Text, */
        insertText: 'nulo',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Atribui o valor nulo a uma variável.',

    }, 
    
    ];
    return { suggestions: suggestions };

}

module.exports = sintaxe;