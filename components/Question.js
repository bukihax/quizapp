import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { ButtonGroup, Button } from '@rneui/themed';

/*
 * Sample question answers:
 * Q1 (multiple-choice): correct = 1 ("Paris")
 * Q2 (multiple-answer): correct = [0, 2] ("Photosynthesis" and "Respiration")
 * Q3 (true-false): correct = 0 ("True")
 * Q4 (multiple-choice): correct = 2 ("Mars")
 * Q5 (true-false): correct = 1 ("False")
 */

export default function Question({ route, navigation }) {
  const { data, index, userAnswers = [] } = route.params;
  const question = data[index];
  const isMultiAnswer = question.type === 'multiple-answer';

  const [selectedIndices, setSelectedIndices] = useState([]);

  const handleSelect = (selectedIndex) => {
    if (isMultiAnswer) {
      setSelectedIndices((prev) =>
        prev.includes(selectedIndex)
          ? prev.filter((i) => i !== selectedIndex)
          : [...prev, selectedIndex]
      );
    } else {
      setSelectedIndices([selectedIndex]);
    }
  };

  const handleNext = () => {
    if (selectedIndices.length === 0) {
      Alert.alert('Please select an answer before continuing.');
      return;
    }

    const answer = isMultiAnswer ? selectedIndices : selectedIndices[0];
    const updatedAnswers = [...userAnswers, answer];

    const nextIndex = index + 1;
    if (nextIndex >= data.length) {
      navigation.navigate('Summary', { data, userAnswers: updatedAnswers });
    } else {
      navigation.push('Question', { data, index: nextIndex, userAnswers: updatedAnswers });
    }
  };

  const buttonLabels = question.choices.map((choice, i) => {
    const isSelected = selectedIndices.includes(i);
    return isSelected ? `✓ ${choice}` : choice;
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.progress}>
        Question {index + 1} of {data.length}
      </Text>
      <Text style={styles.typeLabel}>{question.type.toUpperCase()}</Text>
      <Text style={styles.prompt}>{question.prompt}</Text>

      {isMultiAnswer && (
        <Text style={styles.hint}>Select all that apply</Text>
      )}

      <ButtonGroup
        testID="choices"
        buttons={buttonLabels}
        selectedIndexes={selectedIndices}
        onPress={handleSelect}
        vertical
        containerStyle={styles.buttonGroup}
        selectedButtonStyle={styles.selectedButton}
        selectedTextStyle={styles.selectedText}
        textStyle={styles.buttonText}
      />

      <Button
        testID="next-question"
        title={index + 1 === data.length ? 'See Results' : 'Next Question'}
        onPress={handleNext}
        buttonStyle={styles.nextButton}
        containerStyle={styles.nextButtonContainer}
        disabled={selectedIndices.length === 0}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  progress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    textAlign: 'right',
  },
  typeLabel: {
    fontSize: 12,
    color: '#888',
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 12,
    textAlign: 'center',
  },
  prompt: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#222',
    textAlign: 'center',
    lineHeight: 28,
  },
  hint: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  buttonGroup: {
    marginHorizontal: 0,
    marginBottom: 24,
    borderRadius: 8,
  },
  selectedButton: {
    backgroundColor: '#4a90d9',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: 15,
    color: '#333',
  },
  nextButton: {
    backgroundColor: '#2e7d32',
    borderRadius: 8,
    paddingVertical: 12,
  },
  nextButtonContainer: {
    marginHorizontal: 20,
  },
});
