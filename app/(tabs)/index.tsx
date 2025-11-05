import { useMutation, useQuery } from "convex/react";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import InputField from "../../components/InputField";
import ThemeToggle from "../../components/ThemeToggle";
import TodoItem from "../../components/TodoItem";
import { api } from "../../convex/_generated/api";
import { ThemeProvider, useTheme } from "../../src/hooks/useThemeStore";

type Todo = { _id: string; title: string; completed?: boolean };

const { width } = Dimensions.get("window");
const CARD_WIDTH = Math.min(480, Math.round(width * 0.78));

export default function HomeScreenWrapper() {
  return (
    <ThemeProvider>
      <HomeScreen />
    </ThemeProvider>
  );
}

function HomeScreen() {
  const { theme, isDark } = useTheme();
  const todosQuery = useQuery(api.todos.getTodos) as any[] | undefined;
  const createTodo = useMutation(api.todos.addTodo);
  const updateTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  const [data, setData] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (todosQuery) setData(todosQuery.map((t) => ({ ...t, _id: t._id })));
  }, [todosQuery]);

  const onAdd = async () => {
    if (!title.trim()) return;
    try {
      await createTodo({ title: title.trim() } as any);
      setTitle("");
    } catch (err) {
      console.warn("add err", err);
    }
  };

  const onToggle = async (id: string, done: boolean) => {
    try {
      await updateTodo({ id: id as any, completed: done } as any);
    } catch (err) {
      console.warn("toggle err", err);
    }
  };

  const onDelete = async (id: string) => {
    try {
      await deleteTodo({ id: id as any } as any);
    } catch (err) {
      console.warn("delete err", err);
    }
  };

  const renderItem = useCallback(({ item }: { item: Todo }) => (
    <TodoItem item={item} onToggle={onToggle} onDelete={onDelete} onEdit={() => {}} />
  ), [onToggle, onDelete]);

  if (!todosQuery) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
        <ActivityIndicator style={{ marginTop: 40 }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}> 
      <View style={[styles.header, { backgroundColor: isDark ? '#5b21b6' : '#7f5af0' }]}>
        <Text style={styles.logo}>T O D O</Text>
        <ThemeToggle />
      </View>

      <View style={styles.outerCenter}>
        <View style={[styles.card, { width: CARD_WIDTH, backgroundColor: theme.card }]}> 
          <InputField 
            value={title} 
            onChangeText={setTitle} 
            placeholder="Create a new todo..." 
            onSubmit={onAdd} 
          />

          <View style={{ marginTop: 8, maxHeight: 340 }}>
            <FlatList 
              data={data} 
              keyExtractor={(item: Todo) => item._id} 
              renderItem={renderItem} 
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: { height: 180, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  logo: { color: '#fff', fontSize: 28, fontWeight: '800', letterSpacing: 8, marginBottom: 8 },
  outerCenter: { alignItems: 'center', marginTop: -40 },
  card: { borderRadius: 12, padding: 18, shadowColor: '#000', shadowOpacity: 0.08, shadowOffset: { width: 0, height: 6 }, shadowRadius: 14, elevation: 6 },
});
