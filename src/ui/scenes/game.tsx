import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../AppNavigator';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
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

  const startNewGame = useCallback(() => {
    setTimeout(() => {
      const g = createGame(difficulty);
      setGame(g);
      setOriginalBoard(g.board.map(row => [...row]));
    }, 0);
  }, [difficulty]);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  const selectCell = useCallback((cell: number[]) => {
    setSelectedCell(cell);
  }, []);

  const validateGame = useCallback(
    (board: Board) => {
      if (!game) return;

      let isCorrect = true;
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
          if (board[i][j] !== game.solution[i][j]) {
            isCorrect = false;
            return;
          }
        }
      }

      if (isCorrect) {
        startNewGame();
        Alert.alert('Correct!', 'You won!');
      }
    },
    [game, startNewGame],
  );

  const pressNumber = useCallback(
    (number: number) => {
      if (!game || !selectedCell) return;
      const row = selectedCell![0];
      const col = selectedCell![1];

      const board = game.board.map(r => [...r]);
      board[row][col] = number;
      setGame({ ...game, board });

      validateGame(board);
    },
    [selectedCell, game, validateGame],
  );

  return (
    <View style={styles.container}>
      {!game && (
        <View>
          <ActivityIndicator size="large" />
          <Text>Creating {difficulty} game...</Text>
        </View>
      )}
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
