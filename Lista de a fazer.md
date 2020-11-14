### Debug da linguagem
### Sintaxe, Semantica, Lexico


Sintaxe = Codigo
Semantica = Significado
Lexico = Como se fala


criar a Sintaxe
Ler os nos.
traduzir para .noss e salvar numa pasta temporaria


### Palavras reservadas:
    Estrutura:

        Tipos de Dados:
        Identificadores:
        Operadores:
        Funcoes
        Estrutura de Controle
            Regras:
                Declaracao de variaveis
                Classificacao quanto ao tipo



### Sintaxe
    use nos.math

    var nome;

    inicio{
        mostre:"Insira Um nome".
        ler:nome.
        mostre:nome.
    }

    [
        {label:"nos.math", type:"use", value:"nos.math"},

        {label:"name", type:"var", value:""},

        {label:"inicio", type:"function", value:[

            {label:"mostre", type:"internalFunction",value:[
                {label:"",value:"Insira um nome"},
            ]},

            {label:"ler", type:"internalFunction",value:[
                {label:"nome", value:"ler"}
            ]},

            {label:"mostre", type:"internalFunction",value:[{label:"nome", value:"nome"}]"},

            ]
        }
    ]




