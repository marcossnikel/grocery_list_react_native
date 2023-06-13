import "react-native-get-random-values";

import { Roboto_400Regular, useFonts } from "@expo-google-fonts/roboto";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { Main } from "./src/components/main";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Main />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
