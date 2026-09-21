import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../AppNavigator';
import { StyleSheet, Text, View } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { Game } from '../../domain/entity';
import { createGame } from '../../domain/service';
import { DrawBoard, NumbersButtons } from '../components';

type Props = NativeStackScreenProps<RootStackParamList, 'Game'>;

export const GameScreen = ({ route }: Props) => {
  const { difficulty } = route.params;

  const [game, setGame] = useState<Game | null>(null);
  const [selectedCell, setSelectedCell] = useState<number[]>();

  useEffect(() => {
    setGame(createGame(difficulty));
  }, [difficulty]);

  const selectCell = useCallback((number: number) => {
    setSelectedCell([number]);
  }, []);

  const pressNumber = useCallback(
    (number: number) => {
      const row = selectedCell![0];
      const col = selectedCell![1];

      if (!game || !row || !col) {
        return;
      }

      game.board[row][col] = number;
    },
    [selectedCell, game],
  );

  return (
    <View style={styles.container}>
      {!game && <Text>Creating {difficulty} game...</Text>}
      {game && (
        <>
          <DrawBoard board={game.board} onPress={selectCell} />
          <NumbersButtons onPress={pressNumber} />
        </>
      )}
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
