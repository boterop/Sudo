import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Difficulty } from './src/domain/valueobject';
import { GameScreen, HomeScreen } from './src/ui/scenes';

export type RootStackParamList = {
  Home: undefined;
  Game: {
    difficulty: Difficulty;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Game"
        component={GameScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
