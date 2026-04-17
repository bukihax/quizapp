import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

function isCorrect(question, userAnswer) {
  if (question.type === 'multiple-answer') {
    const correct = [...question.correct].sort().join(',');
    const given = Array.isArray(userAnswer)
      ? [...userAnswer].sort().join(',')
      : String(userAnswer);
    return correct === given;
  }
  return userAnswer === question.correct;
}

export default function Summary({ route }) {
  const { data, userAnswers } = route.params;

  let totalScore = 0;
  data.forEach((q, i) => {
    if (isCorrect(q, userAnswers[i])) totalScore += 1;
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Quiz Summary</Text>
      <Text testID="total" style={styles.score}>
        Score: {totalScore} / {data.length}
      </Text>

      {data.map((question, qi) => {
        const userAnswer = userAnswers[qi];
        const correct = isCorrect(question, userAnswer);
        const correctIndices = Array.isArray(question.correct)
          ? question.correct
          : [question.correct];
        const chosenIndices = Array.isArray(userAnswer) ? userAnswer : [userAnswer];

        return (
          <View
            key={qi}
            style={[styles.questionCard, correct ? styles.correctCard : styles.incorrectCard]}
          >
            <Text style={styles.questionPrompt}>
              {qi + 1}. {question.prompt}
            </Text>
            <Text style={styles.resultBadge}>
              {correct ? '✓ Correct' : '✗ Incorrect'}
            </Text>

            {question.choices.map((choice, ci) => {
              const isCorrectChoice = correctIndices.includes(ci);
              const wasChosen = chosenIndices.includes(ci);

              let textStyle = [styles.choiceText];
              if (isCorrectChoice) {
                // Always bold correct answers
                textStyle.push(styles.correctChoice);
              }
              if (wasChosen && !isCorrectChoice) {
                // Strikethrough incorrectly chosen answers
                textStyle.push(styles.wrongChoice);
              }

              return (
                <Text key={ci} style={textStyle}>
                  {isCorrectChoice ? '★ ' : wasChosen ? '✗ ' : '  '}
                  {choice}
                </Text>
              );
            })}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#222',
  },
  score: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#2e7d32',
  },
  questionCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  correctCard: {
    borderLeftColor: '#2e7d32',
  },
  incorrectCard: {
    borderLeftColor: '#c62828',
  },
  questionPrompt: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  resultBadge: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
  },
  choiceText: {
    fontSize: 14,
    color: '#555',
    paddingVertical: 2,
    paddingLeft: 8,
  },
  correctChoice: {
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  wrongChoice: {
    textDecorationLine: 'line-through',
    color: '#c62828',
  },
});
