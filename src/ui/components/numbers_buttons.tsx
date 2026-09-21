import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const NumbersButtons = ({
  onPress,
}: {
  onPress: (number: number) => void;
}) => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const buildButtons = () => {
    const buttons = [];
    for (let number of numbers) {
      const button = (
        <TouchableOpacity style={styles.button} onPress={() => onPress(number)}>
          <Text style={styles.text}>{number}</Text>
        </TouchableOpacity>
      );

      buttons.push(button);
    }

    return buttons;
  };

  return <View style={styles.container}>{buildButtons()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 8,
  },
  button: {
    width: 36,
    backgroundColor: '#e7dcf8',
    aspectRatio: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',

    elevation: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
});
