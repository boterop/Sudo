import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Difficulty } from '../../domain/valueobject';

export const DifficultyButton = ({
  difficulty,
  onPress,
}: {
  difficulty: Difficulty;
  onPress: (difficulty: Difficulty) => void;
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => onPress(difficulty)}>
      <Text style={styles.Text}>{difficulty}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '60%',
    height: 60,
    backgroundColor: '#e7dcf8',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#100d2d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
