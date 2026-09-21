import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../AppNavigator';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { Game } from '../../domain/entity';
import { createGame } from '../../domain/service';
import { DrawBoard, NumbersButtons } from '../components';
import { Board } from '../../domain/valueobject';

type Props = NativeStackScreenProps<RootStackParamList, 'Game'>;

export const GameScreen = ({ route }: Props) => {
  const { difficulty } = route.params;

  const [game, setGame] = useState<Game | null>(null);
  const [selectedCell, setSelectedCell] = useState<number[] | null>(null);
  const [originalBoard, setOriginalBoard] = useState<Board>();

  useEffect(() => {
    const g = createGame(difficulty);
    setGame(g);
    setOriginalBoard(g.board.map(row => [...row]));
  }, [difficulty]);

  const selectCell = useCallback((cell: number[]) => {
    setSelectedCell(cell);
  }, []);

  const pressNumber = useCallback(
    (number: number) => {
      if (!game || !selectedCell) return;
      const row = selectedCell![0];
      const col = selectedCell![1];

      const board = game.board.map(r => [...r]);
      board[row][col] = number;
      setGame({ ...game, board });
    },
    [selectedCell, game],
  );

  return (
    <View style={styles.container}>
      {!game && <Text>Creating {difficulty} game...</Text>}
      {game && originalBoard && (
        <View style={styles.game}>
          <DrawBoard
            board={game.board}
            originalBoard={originalBoard}
            onPress={selectCell}
          />
          <NumbersButtons onPress={pressNumber} />
        </View>
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
  game: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
