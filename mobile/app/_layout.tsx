import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
      <Stack.Screen
        name="workout/[id]"
        options={{
          title: "Detalhes do Treino",
          headerStyle: { backgroundColor: "#25292e" },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="workout/create"
        options={{
          title: "Criar Treino",
          headerStyle: { backgroundColor: "#25292e" },
          headerTintColor: "#fff",
        }}
      />
    </Stack>
  );
}
