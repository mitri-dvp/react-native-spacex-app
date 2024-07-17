import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { useColorScheme } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const SPACEX_API_URL =
  process.env.SPACEX_API_URL || "https://spacex-production.up.railway.app/";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const apolloClient = new ApolloClient({
    uri: SPACEX_API_URL,
    cache: new InMemoryCache(),
  });

  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      router.replace("(screens)/home");
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack initialRouteName="(screens)/home">
          <Stack.Screen
            name="(screens)/home"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(modals)/details"
            options={{ headerShown: false, presentation: "modal" }}
          />
        </Stack>
      </ThemeProvider>
    </ApolloProvider>
  );
}
