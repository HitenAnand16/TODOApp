import React from "react";
import { View, Text, StyleSheet } from "react-native";

const quotes = [
  "The future depends on what you do today. - Mahatma Gandhi",
  "You don’t have to be great to start, but you have to start to be great. - Zig Ziglar",
  "Success is the sum of small efforts, repeated day in and day out. - Robert Collier",
  "Don’t watch the clock; do what it does. Keep going. - Sam Levenson",
  "A goal without a deadline is just a dream. - Robert H. Schuller",
];

const MotivationalQuote = () => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <View style={styles.quoteContainer}>
      <Text style={styles.quoteText}>{randomQuote}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  quoteContainer: {
    // padding: 20,
    // backgroundColor: "#F2F1EB",
    borderRadius: 10,
    margin: 20,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  quoteText: {
    fontSize: 18,
    color: "#F2F1EB",
    textAlign: "center",
  },
});

export default MotivationalQuote;
