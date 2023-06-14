# Wap Store FrontEnd Challenge 📲

## Grocery List App 🥦 🥩 🍅

- In this app, users can manage a list of items, making it a convenient tool for organizing their shopping experience at supermarkets or grocery stores.

### Running locally 🚀🚀🚀

1. git clone `git@github.com:marcossnikel/react-native-grocery-list.git`

2. Install the necessary dependencies
   - `npm install`
3. To run the project, you can use either of the following commands:
   - `npm run ios`
   - `npm run android`

- Expo run was not enabled because some of the libraries go beyond Expo Go. One possible solution would be to generate a build via EAS with a certificate. However, for such action, you need a paid Apple Developer account or be associated with an official team.

## Technologies used 📲

1. [Expo Google Fonts](https://github.com/expo/google-fonts)
2. [React Native Community CheckBox](https://github.com/react-native-checkbox/react-native-checkbox)
3. [Shopify Flash List](https://github.com/Shopify/flash-list)
4. [React Native MMKV](https://github.com/mrousavy/react-native-mmkv)
5. [uuid](https://www.npmjs.com/package/uuid)
6. [Expo Vector Icons](https://docs.expo.dev/guides/icons/)
7. [Haptics](https://docs.expo.dev/versions/latest/sdk/haptics/)

- For styling, the default `Stylesheet.create` from React Native was used.

#### The app is an application where the user can manage a shopping list to organize their purchases. The user can perform various actions, such as:

1. Add a new item to the list 🏪
2. Complete an item on the list and receive visual and tactile feedback ✅
3. Delete an item from the list 🗑️
4. Update the name of an item on the list. 🆙

#### The app also includes features such as:

1. Deletion confirmation to prevent unintended deletions 👍🏻
2. Data persistence even when the app is closed. 🧵
3. Haptic feedback when removing or completing an item on the list 💥
4. If the list is empty, a text indicating it. 🤖

# App UI

### Splash Screen 🎨

   <img src="/assets/splash-screen.png" width="200px" height="400px" alt="splash screenimage example"/>

### Initial Screen 💥

   <img src="/assets/initial-screen.png" width="200px" height="400px" alt="initial screen image example"/>

### List with items 👾

   <img src="/assets/items-filled.png" width="200px" height="400px" alt="list filled image example"/>

### Editing an item 🎢

   <img src="/assets/editing-item.png" width="200px" height="400px" alt="editing image example"/>

## About Choosed Stack

### Why FlashList instead of the default FlatList in React Native?

- The main factor in choosing FlashList was its performance benefits for the application, as it avoids unnecessary re-rendering present in FlatList.

### uuid

- Used to generate unique IDs for each item in the list, making it easier to perform update and delete operations.

### Local Storage with React Native MMKVs

- One of the optional features was to **persist the list items so that the user can close the app without losing data**. I thought of a cool way to do this by using MMKV, which is an alternative to AsyncStorage and is 30x faster than async storage.

- Its implementation is straightforward, and the documentation is easy to understand. In the **utils** folder, in the **storage.ts** file, I quickly configure my storage, and from there, all the methods are available.

- I created a useEffect that listens for changes in my data array containing the list items. Every time the data is changed, I call the **set** method to update my storage with the new data.

- As a result, the data persists even when the app is closed.

### User Delete Confirmation

- For this functionality, I used the **Alert** component available in React Native. When the user clicks on the delete icon, an alert opens to confirm the action, and the deletion is only performed if the user confirms within the alert.

### Haptic Feedback

- One of the suggested features was audio confirmation when an item is completed or removed. While this is a great idea, I wanted to approach it differently because many users today don't have their phone's audio turned on and only use vibration mode.
  Also, considering users with hearing impairments, I implemented haptic feedback instead of sound, similar to what happens when liking a post on Twitter. For this, I used the Haptics library, which is well-established and highly regarded by the React Native community.
