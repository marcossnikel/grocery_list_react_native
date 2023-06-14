# WEB-STORE FRONT-END CHALLENGE 📲

## Grocery List App 🥦 🥩 🍅

- Como rodar o projeto em sua máquina 🚀🚀🚀

1. git clone no projeto
2. instalar as dependencias necessárias
   - npm install
3. para rodar o projeto, pode utilizar
   - npm run ios
   - npm run android

#### O app consiste em uma aplicação onde o usúario consegue controlar uma lista de compras para organizar suas compras, o usúario pode realizar diversas ações como por exemplo :

1. Adicionar um item novo a lista 🏪
2. Completar o item da lista e com isso recebe um feedback visual ✅
3. Deletar um item da lista 🗑️
4. Atualizar o nome de um item da lista. 🆙

#### O App também possui funcionalidades como :

1. Confirmação de deleção para evitar possíveis deleções indesejadas 👍🏻
2. Dados persistem mesmo com o fechamento do app. 🧵
3. Retorno tátil ao remover ou completar um item da lista 💥
4. Caso a lista esteja vazia, um texto indicando 🤖

## Tecnologias utilizadas 📲

1. Expo Google Fonts
2. React Native Community CheckBox
3. Shopify Flash List
4. React Native MMKV
5. uuid
6. Expo Vector Icons
7. Haptics

- Para estilização, foi-se utilizado o `Stylesheet.create` default do react native

### Porque o FlashList e não o FlatList default do React Native ?

- Além do fato de ser mais facil a vizualização do código e entender o que está acontecendo, o principal fator no momento da escolha do FlashList foi a perfromance que ele tras para a aplicação, pois ele evita re-enderizações desnecessárias presentes no FlatList

- (Confira mais sobre a FlashList)[https://github.com/Shopify/flash-list]

### Storage Local Com React Native MMKV

- Uma das funcionalidades opcionais era **Persistir os itens da lista para que o usuário possa fechar o app sem perder os dados**, e eu pensei em uma maneira bem legal de fazer isso, que foi utilizando o
  MMKV, que é uma alternativa ao AsyncStorage e possui uma facil implementação e além disso é 30x mais rápido que o async storage.

- A implementação dele é bem facil e a documentação é bem simples de entender, na pasta **utils** no arquivo **storage.ts** eu configuro meu storage bem rapidamente
  e a partir dai todos os métodos ficam disponíveis

- Criei um useEffect que mapeia toda vez que o meu array de data contendo os items da lista é alterado, sempre que data é alterado eu chamo o método **set** para realizar a alteração no meu storage com o novo data.

- Com isso, os dados persistem mesmo com o fechamento do App.

- (Confira mais sobre o React Native MMKV)[https://github.com/mrousavy/react-native-mmkv]

### Retorno tátil com Haptics

- Uma das sugestões de funcionalidades foi a confirmação de aúdio quando um item é concluido ou removido, e por mais que seja uma idea muito legal, quis abordar uma maneira diferente, muitos usúarios hoje em dia não possuem o audio do celular ligado, ficam apenas no modo vibração...
  Ou mesmo pensando em talvez usúarios com alguma deficiençia auditiva, o que eu eu acabei implementando no app foi um retorno tátil ao invéz do som, como o que ocorre ao, por exemplo , ao curtir uma publicação no Twitter, para isso, utilizei a biblioteca do Haptics que ja é bem consolidade e tem uma boa reputação com a comunidade do React Native

- (Confira mais sobre o Haptics)[https://docs.expo.dev/versions/latest/sdk/haptics/]
