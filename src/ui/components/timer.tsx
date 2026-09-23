import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

const getElapsedSeconds = (since: Date) =>
  Math.floor((Date.now() - since.getTime()) / 1000);

export const Timer = ({ since }: { since: Date }) => {
  const [time, setTime] = useState(() => getElapsedSeconds(since));

  useEffect(() => {
    setTime(getElapsedSeconds(since));

    const updateTime = setInterval(() => {
      setTime(getElapsedSeconds(since));
    }, 1000);

    return () => {
      clearInterval(updateTime);
    };
  }, [since]);

  const withZero = (value: number) => (value < 10 ? `0${value}` : value);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = seconds % 60;

    const hoursText = hours > 0 ? `${withZero(hours)}:` : '';
    const minutesText = minutes > 0 ? `${withZero(minutes)}:` : '';
    const secondsText = `${withZero(secondsLeft)}`;
    return `${hoursText}${minutesText}${secondsText}`;
  };

  return <Text style={styles.time}>{formatTime(time)}</Text>;
};

const styles = StyleSheet.create({
  time: {
    color: '#100d2d',
    fontSize: 22,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
    letterSpacing: 1,
  },
});
