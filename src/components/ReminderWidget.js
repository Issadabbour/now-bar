import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function ReminderWidget() {
  const { colors, accentColor } = useContext(ThemeContext);
  const [reminders, setReminders] = useState([
    { id: '1', text: 'Team meeting at 2 PM', completed: false },
    { id: '2', text: 'Buy groceries', completed: false },
    { id: '3', text: 'Call the doctor', completed: true },
  ]);
  const [newReminder, setNewReminder] = useState('');

  const addReminder = () => {
    if (newReminder.trim()) {
      const reminder = {
        id: Date.now().toString(),
        text: newReminder,
        completed: false,
      };
      setReminders([...reminders, reminder]);
      setNewReminder('');
    }
  };

  const toggleReminder = (id) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    );
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  const renderReminder = ({ item }) => (
    <View
      style={[
        styles.reminderItem,
        {
          backgroundColor: item.completed
            ? colors.card + '80'
            : colors.card,
          borderColor: colors.border,
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => toggleReminder(item.id)}
        style={styles.checkbox}
      >
        <Text style={styles.checkboxIcon}>
          {item.completed ? '✓' : '○'}
        </Text>
      </TouchableOpacity>
      <Text
        style={[
          styles.reminderText,
          {
            color: colors.text,
            textDecorationLine: item.completed ? 'line-through' : 'none',
          },
        ]}
      >
        {item.text}
      </Text>
      <TouchableOpacity onPress={() => deleteReminder(item.id)}>
        <Text style={styles.deleteIcon}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
    >
      <Text style={[styles.title, { color: colors.text }]}>Reminders</Text>

      <FlatList
        data={reminders}
        renderItem={renderReminder}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        style={styles.remindersList}
      />

      <View
        style={
          [
            styles.inputContainer,
            { borderTopColor: colors.border },
          ]
        }
      >
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: colors.border }]}
          placeholder="Add a reminder..."
          placeholderTextColor={colors.text + '80'}
          value={newReminder}
          onChangeText={setNewReminder}
          onSubmitEditing={addReminder}
        />
        <TouchableOpacity
          onPress={addReminder}
          style={[
            styles.addButton,
            { backgroundColor: accentColor },
          ]}
        >
          <Text style={styles.addIcon}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  remindersList: {
    marginBottom: 12,
  },
  reminderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  checkbox: {
    marginRight: 12,
  },
  checkboxIcon: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reminderText: {
    flex: 1,
    fontSize: 14,
  },
  deleteIcon: {
    fontSize: 16,
    color: '#FF3B30',
  },
  inputContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingTop: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});