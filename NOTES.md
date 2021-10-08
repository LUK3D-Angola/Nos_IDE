# Sitema de menu Modular

Desenvolvi uma pequena interface que faz o tratamento dos menus e as suas funções. basicamente, todo o menu do aplicativo será gerado atraves de um array de objetos JSON onde teremos o icon, o titulo e a função que esse botao vai executar.

## Dev Tips

Os desenvolvedores podem usar os recursos:

- **Alertas (vue-toasted)**
  - Ver: [Personalizando as configurações](https://shakee93.github.io/vue-toasted/).

## NOTA

Para carregar os plugins customizados do Nos utilizei o npm install vue-plugin-load-script

- Ver: [Personalizando as configurações](https://www.npmjs.com/package/vue-plugin-load-script).

## JSON PADRAO PARA A SINTAXE E CONVERSAO DE NOS PARA JSON/PYTHON

```json
var n1, n2, r.

show:n1+n2.
n1=2.
n2=4.
r = sqr:n1+n2.

[
  {
    "label":"r",
    "type":"var",
    "value":[{
      "label":"sqr",
      "type":"internalFunction",
      "value":[
        {
          "label":
        }
      ]
    }]
  },
  {
    "label":"show",
    "type":"internalFunction",
    "value":[{"n1+n2"}]
  },
]
```
