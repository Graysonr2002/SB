import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "@/hooks/use-auth-store";
import Colors from "@/constants/colors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc, trpcClient } from "@/lib/trpc";

export const unstable_settings = {
  initialRouteName: "terms",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Create a client
const queryClient = new QueryClient();

export default function RootLayout() {
  useEffect(() => {
    // Hide splash screen immediately since we're not loading custom fonts
    SplashScreen.hideAsync();
  }, []);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <RootLayoutNav />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

function RootLayoutNav() {
  const { hasAcceptedTerms } = useAuthStore();

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.card,
          },
          headerTintColor: Colors.secondary,
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: Colors.background,
          },
        }}
      >
        {!hasAcceptedTerms ? (
          <>
            <Stack.Screen name="terms" options={{ headerShown: false }} />
          </>
        ) : (
          <>
            <Stack.Screen name="welcome" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen 
              name="league/[id]" 
              options={{ 
                title: "League",
                headerBackTitle: "Home",
              }} 
            />
            <Stack.Screen 
              name="bet-analysis/[id]" 
              options={{ 
                title: "Bet Analysis",
                headerBackTitle: "Back",
              }} 
            />
            <Stack.Screen 
              name="how-it-works" 
              options={{ 
                title: "How Success Bookie Works",
                presentation: "modal",
              }} 
            />
            <Stack.Screen 
              name="settings" 
              options={{ 
                title: "Settings",
              }} 
            />
            <Stack.Screen 
              name="payments" 
              options={{ 
                title: "Payment Methods",
              }} 
            />
          </>
        )}
      </Stack>
    </>
  );
}