import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

actor {
  type Message = {
    role : Role;
    content : Text;
    language : Text;
    timestamp : Time.Time;
  };

  type Role = {
    #user;
    #assistant;
  };

  type Conversation = {
    messages : List.List<Message>;
  };

  type KnowledgeEntry = {
    topic : Text;
    questionPatterns : [Text];
    answers : Map.Map<Text, Text>; // language -> answer
  };

  type UserPreferences = {
    preferredLanguage : Text;
    voiceEnabled : Bool;
  };

  let conversations = Map.empty<Principal, Conversation>();
  let knowledgeBase = Map.empty<Text, KnowledgeEntry>();
  let userPreferences = Map.empty<Principal, UserPreferences>();

  public shared ({ caller }) func saveMessage(content : Text, language : Text, role : Role) : async Message {
    let message : Message = {
      role;
      content;
      language;
      timestamp = Time.now();
    };
    let conversation = switch (conversations.get(caller)) {
      case (null) { { messages = List.empty<Message>() } };
      case (?conv) { conv };
    };
    conversation.messages.add(message);
    conversations.add(caller, conversation);
    message;
  };

  public query ({ caller }) func getConversationHistory() : async [Message] {
    switch (conversations.get(caller)) {
      case (null) { [] };
      case (?conversation) { conversation.messages.toArray() };
    };
  };

  public shared ({ caller }) func clearConversationHistory() : async () {
    if (not conversations.containsKey(caller)) {
      Runtime.trap("No conversation history found");
    };
    conversations.remove(caller);
  };

  public shared ({ caller }) func saveKnowledgeEntry(topic : Text, questionPatterns : [Text], answers : [(Text, Text)]) : async () {
    let entry : KnowledgeEntry = {
      topic;
      questionPatterns;
      answers = Map.fromIter<Text, Text>(answers.values());
    };
    knowledgeBase.add(topic, entry);
  };

  public shared ({ caller }) func setUserPreferences(preferredLanguage : Text, voiceEnabled : Bool) : async () {
    let prefs : UserPreferences = {
      preferredLanguage;
      voiceEnabled;
    };
    userPreferences.add(caller, prefs);
  };

  public query ({ caller }) func getUserPreferences() : async ?UserPreferences {
    userPreferences.get(caller);
  };
};
