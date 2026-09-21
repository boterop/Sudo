import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Board, BOARD_SIZE, BOX_SIZE } from '../../domain/valueobject';
import { useState } from 'react';

export const DrawBoard = ({
  board,
  originalBoard,
  onPress,
}: {
  board: Board;
  originalBoard: Board;
  onPress: (number: number[]) => void;
}) => {
  const [selectedCell, setSelectedCell] = useState<number[] | null>(null);

  const calculateStyles = (row: number, col: number) => {
    const styleList = [styles.cell];

    if ((row + 1) % BOX_SIZE === 0 && row + 1 !== BOARD_SIZE) {
      styleList.push(styles.bottomCell);
    }
    if ((col + 1) % BOX_SIZE === 0 && col + 1 !== BOARD_SIZE) {
      styleList.push(styles.rightCell);
    }
    if (selectedCell) {
      if (selectedCell[0] === row && selectedCell[1] === col) {
        styleList.push(styles.selectedCell);
      }
    }
    if (originalBoard[row][col] !== 0) {
      styleList.push(styles.original);
    }

    return styleList;
  };

  const buildBoard = () => {
    const rows = [];
    for (let i = 0; i < board.length; i++) {
      const row = board[i];
      const columns = [];
      for (let j = 0; j < row.length; j++) {
        const col = row[j];
        const styleList = calculateStyles(i, j);
        const isOriginal = originalBoard[i][j] !== 0;
        const textStyles = [styles.text];
        if (isOriginal) {
          textStyles.push(styles.bold);
        }
        let cell;
        cell = (
          <TouchableOpacity
            key={`${i}-${j}`}
            activeOpacity={isOriginal ? 1 : 0}
            style={styleList}
            onPress={() => {
              if (isOriginal) return;
              setSelectedCell([i, j]);
              onPress([i, j]);
            }}
          >
            {col !== 0 && <Text style={textStyles}>{col}</Text>}
          </TouchableOpacity>
        );

        columns.push(cell);
      }
      rows.push(<View style={styles.row}>{columns}</View>);
    }

    return <View style={styles.container}>{rows}</View>;
  };

  return buildBoard();
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  cell: {
    width: 36,
    height: 36,
    backgroundColor: '#e7dcf8',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#100d2d',
    elevation: 5,
  },
  rightCell: {
    borderRightWidth: 2,
  },
  bottomCell: {
    borderBottomWidth: 2,
  },
  original: {},
  selectedCell: {
    backgroundColor: '#DEDCF7',
  },
  text: {
    fontSize: 18,
  },
  bold: {
    fontWeight: '600',
  },
});
