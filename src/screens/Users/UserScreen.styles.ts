import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },

  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },

  row: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
  },

  email: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },

  listContent: {
    paddingBottom: 16,
  },

  emptyBox: {
    paddingVertical: 20,
    alignItems: "center",
  },

  emptyText: {
    fontSize: 14,
    color: "#888",
  },

  loaderBox: {
    paddingVertical: 12,
    alignItems: "center",
  },

  errorBox: {
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#ffecec",
    borderRadius: 8,
  },

  errorText: {
    color: "#cc0000",
    marginBottom: 8,
    fontWeight: "500",
  },

  retryBtn: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    alignSelf: "flex-start",
  },

  retryText: {
    color: "#fff",
    fontWeight: "600",
  },
});