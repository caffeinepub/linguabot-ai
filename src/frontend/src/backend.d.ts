import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Message {
    content: string;
    role: Role;
    language: string;
    timestamp: Time;
}
export interface UserPreferences {
    preferredLanguage: string;
    voiceEnabled: boolean;
}
export type Time = bigint;
export enum Role {
    user = "user",
    assistant = "assistant"
}
export interface backendInterface {
    clearConversationHistory(): Promise<void>;
    getConversationHistory(): Promise<Array<Message>>;
    getUserPreferences(): Promise<UserPreferences | null>;
    saveKnowledgeEntry(topic: string, questionPatterns: Array<string>, answers: Array<[string, string]>): Promise<void>;
    saveMessage(content: string, language: string, role: Role): Promise<Message>;
    setUserPreferences(preferredLanguage: string, voiceEnabled: boolean): Promise<void>;
}
