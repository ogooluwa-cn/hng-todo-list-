// components/TodoItem.tsx
import { MaterialIcons } from "@expo/vector-icons";
import React, { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import Animated, { interpolateColor, useAnimatedStyle } from "react-native-reanimated";
import { useTheme } from "../src/hooks/useThemeStore";

type Todo = {
  _id: string;
  title: string;
  description?: string;
  completed?: boolean;
};

type Props = {
  item: Todo;
  onToggle: (id: string, done: boolean) => void;
  onDelete: (id: string) => void;
  onEdit?: (item: Todo) => void;
};

export default function TodoItem({ item, onToggle, onDelete, onEdit }: Props) {
  const { theme, progress } = useTheme();
  const swipeRef = useRef<Swipeable | null>(null);

  // Animated card style derived from theme progress
  const cardStyle = useAnimatedStyle(() => {
    // interpolate between light card and dark card
    const light = theme.card as unknown as string;
    const dark = "#111418"; // keep same as darkTheme.card
    const backgroundColor = interpolateColor(progress.value, [0, 1], [light, dark]);
    return {
      backgroundColor,
    };
  });

  const renderRightActions = () => {
    return (
      <RectButton style={styles.deleteButton} onPress={() => onDelete(item._id)}>
        <MaterialIcons name="delete" size={20} color="#fff" />
        <Text style={{ color: "white", marginLeft: 8, fontWeight: "600" }}>Delete</Text>
      </RectButton>
    );
  };

  return (
    <Swipeable
      ref={(r) => { swipeRef.current = r; }}
      friction={2}
      rightThreshold={40}
      renderRightActions={renderRightActions}
    >
      <Animated.View style={[styles.container, cardStyle, { borderColor: theme.border as string }]}>
        <TouchableOpacity
          onPress={() => onToggle(item._id, !item.completed)}
          style={[
            styles.checkbox,
            {
              borderColor: theme.border as string,
              backgroundColor: item.completed ? (theme.primary as string) : "transparent",
            },
          ]}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: !!item.completed }}
        >
          {item.completed ? <MaterialIcons name="check" size={18} color="#fff" /> : null}
        </TouchableOpacity>

        <View style={{ flex: 1, paddingRight: 12 }}>
          <Text style={{ color: theme.text, fontWeight: "600", fontSize: 15 }}>{item.title}</Text>
          {item.description ? (
            <Text style={{ color: theme.subText, marginTop: 6, fontSize: 13 }}>{item.description}</Text>
          ) : null}
        </View>

        <TouchableOpacity onPress={() => onEdit?.(item)} style={{ padding: 8 }}>
          <MaterialIcons name="drag-handle" size={20} color={theme.subText as string} />
        </TouchableOpacity>
      </Animated.View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    // shadow
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  checkbox: {
    width: 34,
    height: 34,
    borderRadius: 18,
    borderWidth: 1,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
    width: 110,
    flexDirection: "row",
    paddingHorizontal: 12,
    borderRadius: 12,
    marginVertical: 6,
    marginRight: 8,
  },
});
