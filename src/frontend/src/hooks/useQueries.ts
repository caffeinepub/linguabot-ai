import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type Message, Role, type UserPreferences } from "../backend.d";
import { useActor } from "./useActor";

export function useConversationHistory() {
  const { actor, isFetching } = useActor();
  return useQuery<Message[]>({
    queryKey: ["conversationHistory"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getConversationHistory();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUserPreferences() {
  const { actor, isFetching } = useActor();
  return useQuery<UserPreferences | null>({
    queryKey: ["userPreferences"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getUserPreferences();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      content,
      language,
      role,
    }: { content: string; language: string; role: Role }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveMessage(content, language, role);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversationHistory"] });
    },
  });
}

export function useSetUserPreferences() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      preferredLanguage,
      voiceEnabled,
    }: { preferredLanguage: string; voiceEnabled: boolean }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.setUserPreferences(preferredLanguage, voiceEnabled);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userPreferences"] });
    },
  });
}

export { Role };
