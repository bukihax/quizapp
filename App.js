import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import QuestionComponent from './components/Question';
import SummaryComponent from './components/Summary';

export { QuestionComponent as Question, SummaryComponent as Summary };

/*
 * Quiz answers (sample data):
 * Q1 (multiple-choice) - "What is the capital of France?" correct = 1 ("Paris")
 * Q2 (multiple-answer) - "Which are cellular processes?" correct = [0, 2] ("Photosynthesis", "Respiration")
 * Q3 (true-false) - "The Earth orbits the Sun." correct = 0 ("True")
 * Q4 (multiple-choice) - "Which planet is called the Red Planet?" correct = 2 ("Mars")
 * Q5 (true-false) - "Sound travels faster than light." correct = 1 ("False")
 */
const QUESTIONS = [
  {
    prompt: 'What is the capital of France?',
    type: 'multiple-choice',
    choices: ['Berlin', 'Paris', 'Madrid', 'Rome'],
    correct: 1,
  },
  {
    prompt: 'Which of the following are cellular processes? (Select all that apply)',
    type: 'multiple-answer',
    choices: ['Photosynthesis', 'Erosion', 'Respiration', 'Tectonic drift'],
    correct: [0, 2],
  },
  {
    prompt: 'The Earth orbits the Sun.',
    type: 'true-false',
    choices: ['True', 'False'],
    correct: 0,
  },
  {
    prompt: 'Which planet is known as the Red Planet?',
    type: 'multiple-choice',
    choices: ['Venus', 'Jupiter', 'Mars', 'Saturn'],
    correct: 2,
  },
  {
    prompt: 'Sound travels faster than light.',
    type: 'true-false',
    choices: ['True', 'False'],
    correct: 1,
  },
];

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Question"
            screenOptions={{
              headerStyle: { backgroundColor: '#4a90d9' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
              gestureEnabled: false,
            }}
          >
            <Stack.Screen
              name="Question"
              component={QuestionComponent}
              initialParams={{ data: QUESTIONS, index: 0, userAnswers: [] }}
              options={{ title: 'Quiz', headerBackVisible: false }}
            />
            <Stack.Screen
              name="Summary"
              component={SummaryComponent}
              options={{ title: 'Results', headerBackVisible: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
