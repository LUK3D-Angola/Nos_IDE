/* eslint-disable */
//Codigo {NOS} de teste que e usado para testar o transpilador
window.code = "\n\nimporta [nome, teste, basico]:modulos;\nimporta sistema;\n\ninteiro n = 10;\nlista l = [\"Teste1\",\"Teste2\",\"Teste3\"];\n\nlista l = l,[\"Teste1\",\"Teste2\",\"Teste3\"];\n\ninteiro a,b = 0,10;\n\nn = leia(\"Informe o valor: \");\n\nn = paraInt(n);\n\npara(i em intervalo(120,158)){\n    mostre( tamanho(paraTexto(i)) );\n}\n";

window.NOS = {
    Transpile: function (code) {
        var _this = this;
        //Removendo todas as linhas em branco (sem comandos) do código informado pelo user.
        //var ncode = code.split("\n"); 
        code = JSON.stringify(code).split("\\n").join('\n').split('\\"').join('"').split('\\r').join(' ');
        //Removendo todas as linhas em branco (sem comandos) do código informado pelo user.
        var ncode = code.replace(/^\s*\n/gm, '').replace(/^\s*/gm, "").replace(/^\t*/gm, "").split("\n");
        console.log("codigo=", ncode);
        var pyCode_final = "";
        //Esta variavel define se o transpilador esta lendo uma função ou está lendo comandos no escopo global.
        var insideFunction = false;
        //Percorrendo cada linha de comando ser processado
        var userFunctions = [];
        var tabsTime = 0;
        ncode.forEach(function (element) {
            //Dividindo o comando em duas parte, onde a primeira deve corresponder à instrução e a segunda parte corresponder ao valor.
            var v = element.trimStart().split(" ");
            var dType = _this.typeOf(v[0].trim());
            // variavel para armazenar a funcao da classe invocada
            var classFunction = "";
            // console.log(v)
            /*
            *Caso o comando for um tipo de dado, então trata-se de declaração de uma variavel
            Então neste bloco inicializamos uma variavel em python e removemos o delimitador ";"
            */
            if (tabsTime > 0 && element.match(/}$/g)) {
                insideFunction = false;
                tabsTime -= 1;
            }
            if (dType && element != "") {
                if (element.match(/{$/g)) {
                    pyCode_final += _this.indent(tabsTime) + ("def " + element.substring(6, element.lastIndexOf(")") + 1).trim() + ":");
                    userFunctions.push(element.substring(6, element.indexOf("(")).trim());
                    userFunctions.push(element.substring(6, element.indexOf("(")).trim());
                    // console.log(userFunctions)
                }
                else {
                    var splitedLine = element.split("=");
                    console.log(splitedLine);
                    if (splitedLine.length > 1) {
                        pyCode_final += _this.indent(tabsTime) + (v[1].replace(";", "") + "=" + splitedLine[1]);
                    }
                    else {
                        pyCode_final += _this.indent(tabsTime) + (v[1].replace(";", "") + "=" + dType["default"]);
                    }
                }
            }
            else {
                var cmd = element.trim().match(/^([^(]+)/gm).toString();
                if (Array.isArray(cmd)) {
                    if (cmd[0].includes("=")) {
                        cmd = cmd[0].trim().split("=")[1].trim();
                    }
                    else {
                        cmd = cmd[0].trim();
                    }
                    if (cmd.split(".").length > 1) {
                        classFunction = cmd.split(".")[1];
                        cmd = cmd.split(".")[0];
                    }
                    var cmTmp = cmd.split("}").join().split("{").join().trim()[0];
                    cmTmp = cmd.trim().split("{")[0].split(" ").join("");
                    if (cmTmp == "senao") {
                        cmd = cmTmp;
                    }
                    var command;
                    var cmtClass = element.split("\t").join("").trim().match(/(^[descreva])\w+/g);
                    if (cmtClass) {
                        //TODO Adicionar suporte a criacao de classes
                        command = _this.translate("descreva");
                    }
                    else {
                        command = _this.translate(cmd);
                    }
                    if (command) {
                        var inside = element.trim();
                        inside = inside.match(/(?<=\()[^]+(?=\))/gm).toString();
                        if (inside) {
                            inside = inside[0];
                            var commands = inside.match(/([^\()]+)/g);
                            commands.forEach(function (el) {
                                var word = el.match(/[a-zA-Z0-9_]+$/gm);
                                if (word) {
                                    var ncode = NOS.translate(word[0].trim());
                                    if (ncode) {
                                        element = element.replace(word[0], ncode.pyCode);
                                    }
                                }
                            });
                        }
                        if (command.type == "function") {
                            if (!command.input) {
                                //var result = command.pyCode + element.match(/\(([\s\S]*?)\)/gm);
                                //Este regex deve ser revisto porque permite expressções do tipo: para(x em nomes)(outro para){}
                                var result1 = command.pyCode + element.match(/\(([^)].*)\)/gm);
                                pyCode_final += _this.indent(tabsTime) + (result1);
                            }
                            else {
                                var result2 = v[0].trim().split("(")[0] + "=" + command.pyCode + element.match(/\(([\s\S]*?)\)/gm);
                                pyCode_final += _this.indent(tabsTime) + (result2.split("\\t").join(""));
                            }
                        }
                        if (command.type == "command") {
                            var unformatedCommand = "";
                            if (command.mainScope) {
                                unformatedCommand = command.pyCode + " " + element.split(" ")[1].replace("{", "") + ":";
                            }
                            else {
                                unformatedCommand += _this.indent(tabsTime) + command.pyCode + element.split(cmd)[1].split(";").join("").split("{").join(":");
                            }
                            if (command.noParentheses && !command.noCurlyBrackets) {
                                unformatedCommand = NOS.UTILITY.replaceAt(unformatedCommand, unformatedCommand.indexOf("("), " ");
                                unformatedCommand = NOS.UTILITY.replaceAt(unformatedCommand, unformatedCommand.lastIndexOf(")"), " ");
                                var el = unformatedCommand.split(" ");
                                console.log(el);
                                el.forEach(function (elIn) {
                                    var elTraduzido = NOS.translate(elIn.trim());
                                    if (elTraduzido) {
                                        unformatedCommand = unformatedCommand.replace(elIn, elTraduzido.pyCode);
                                    }
                                });
                            }
                            pyCode_final += unformatedCommand.split("\\t").join("");
                        }
                        if (command.type == "endcommand") {
                            pyCode_final += _this.indent(tabsTime) + command.pyCode + ":";
                        }
                    }
                    else {
                        var customFunc = element.split("(")[0];
                        //console.log(userFunctions.indexOf(customFunc))
                        //console.log(userFunctions[0], customFunc)
                        if (userFunctions.indexOf(customFunc) == -1) {
                            //console.error(this.DEBUGGER.undefinedFunction(customFunc));
                            var commandParts = element.trim().split("=");
                            if (commandParts.length > 1) {
                                pyCode_final += _this.indent(tabsTime) + element.split(";").join("");
                            }
                            else {
                                var cmd = element.trimStart().split("(")[0].trim();
                                if (_this.translate(cmd)) {
                                    pyCode_final += _this.indent(tabsTime) + cmd + element.split(cmd)[1].split(";").join("");
                                }
                            }
                        }
                        else {
                            pyCode_final += _this.indent(tabsTime) + element.split(";").join("");
                        }
                        command = element.trim().match(/^importa/g);
                        if (command) {
                            var cm = NOS.translate(command[0].trim());
                            if (cm) {
                                if (cm.type == "importer") {
                                    var cmInside = element.match(/\[(.*)\]/g);
                                    if (cmInside) {
                                        pyCode_final += "from " + element.split(":")[1].split("/").join(".").replace(";", "") + " import " + cmInside[0].replace("[", "").replace("]", "");
                                    }
                                }
                            }
                            console.log("Importando", cm);
                        }
                    }
                }
                else {
                    //if(cmd[0].includes(""))
                    console.log("else", element);
                    //this.Transpile(element.split(" ").join("").split("=")[1]);
                }
            }
            pyCode_final += "\n";
            if (element.match(/{$/g)) {
                tabsTime += 1;
            }
        });
        return pyCode_final;
    },
    /** Função que determina o tipo de dado da variavel passada como parâmetro
     * @param  {any} value
     * @returns {object}
     */
    typeOf: function (value) {
        return this.DATATYPES[value];
    },
    /** Função que traduz os comandos NOS em seus equivalentes em Python
     * @param  {string} word é a palavra que será traduzida
     * @returns {object}
     */
    translate: function (word) {
        return this.RESERVED[word];
    },
    indent: function (times) {
        var tabs = "";
        for (var i = 0; i < times; i++) {
            tabs += "\t";
        }
        return tabs;
    },
    RESERVED: {
        mostre: { type: "function", pyCode: "print", input: false },
        intervalo: { type: "function", pyCode: "range", input: false },
        leia: { type: "function", pyCode: "input", input: true },
        paraInteiro: { type: "function", pyCode: "int", input: true },
        paraTexto: { type: "function", pyCode: "str", input: true },
        elevado: { type: "function", pyCode: "pow", input: true },
        importa: { type: "importer", pyCode: "import", input: true },
        descreva: { type: "command", noParentheses: true, mainScope: true, noCurlyBrackets: true, pyCode: "class", input: false },
        para: { type: "command", noParentheses: true, pyCode: "for", input: true },
        retorna: { type: "command", pyCode: "return", input: true },
        em: { type: "command", pyCode: "in", input: true },
        se: { type: "command", pyCode: "if", input: true },
        senao: { type: "endcommand", pyCode: "else", input: true },
        enquanto: { type: "command", pyCode: "while", input: true },
        tamanho: { type: "command", pyCode: "len", input: true },
        Terminal: {
            type: "class",
            limpaTela: function (tabTimes) {
                return "print(\"\\033[H\\033[J\")";
            }
        }
    },
    DATATYPES: {
        decimal: { type: "Decimal", "default": 0.0 },
        inteiro: { type: "Integer", "default": 0 },
        boleano: { type: "Boolean", "default": "True" },
        texto: { type: "String", "default": "\"\"" },
        caractere: { type: "String", "default": "\"\"" },
        dinamico: { type: "Any", "default": "\"\"" },
        objecto: { type: "Object", "default": "{}" },
        lista: { type: "List", "default": "[]" },
        funcao: { type: "Function", "default": null }
    },
    DEBUGGER: {
        undefinedFunction: function (functionName) {
            return "Nenhuma fun\u00E7\u00E3o " + functionName + " foi definida neste documento";
        }
    },
    UTILITY: {
        replaceAt: function (str, index, replacement) {
            return str.substr(0, index) + replacement + str.substr(index + replacement.length);
        }
    }
};
