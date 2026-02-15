export const queryKeys = {
  concerts: ["concerts"] as const,
  adminSummary: ["admin", "summary"] as const,
  adminHistory: ["admin", "history"] as const,
  userHistory: (userId: string) => ["users", userId, "history"] as const
};
