import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import styles from '../utils/styles';

const AnimatedButton = ({ onPress, animateClassButton, children }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const animation = useRef(null);

  useEffect(() => {
    if (animateClassButton) {
      // Start the animation loop if animateClassButton is true
      animation.current = Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      );
      animation.current.start();
    } else if (animation.current) {
      // Stop the animation and reset when animateClassButton is false
      animation.current.stop();
      scaleAnim.setValue(1); // Reset to initial size
    }
  }, [animateClassButton]);

  const animatedStyle = {
    transform: [{ scale: scaleAnim }],
  };

  return (
    <TouchableOpacity style={[styles.playerInfoCustomButton, animatedStyle]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default AnimatedButton;