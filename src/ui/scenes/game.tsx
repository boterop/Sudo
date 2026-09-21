import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../AppNavigator';
import { StyleSheet, Text, View } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Game'>;

export const GameScreen = ({ route }: Props) => {
  const { difficulty } = route.params;
  return (
    <View style={styles.container}>
      <Text>{difficulty}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
