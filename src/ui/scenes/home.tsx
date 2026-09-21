import { StyleSheet, View } from 'react-native';
import { DifficultyButton } from '../components';
import { Difficulty } from '../../domain/valueobject';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({ navigation }: Props) => {
  const onSelectDifficulty = (difficulty: Difficulty) => {
    navigation.navigate('Game', { difficulty });
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <DifficultyButton difficulty="easy" onPress={onSelectDifficulty} />
        <DifficultyButton difficulty="medium" onPress={onSelectDifficulty} />
        <DifficultyButton difficulty="hard" onPress={onSelectDifficulty} />
      </View>
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
  buttons: {
    width: '100%',
    height: '50%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
