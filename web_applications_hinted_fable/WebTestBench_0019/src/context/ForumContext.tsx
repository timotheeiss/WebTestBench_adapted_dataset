import React, { createContext, useContext, useState, ReactNode } from "react";
import { User, Thread, Reply } from "@/types/forum";
import { users as initialUsers, threads as initialThreads, replies as initialReplies } from "@/data/mockData";

interface ForumContextType {
  currentUser: User | null;
  users: User[];
  threads: Thread[];
  replies: Reply[];
  login: (email: string, password: string) => boolean;
  register: (username: string, email: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (userId: string, updates: Partial<User>) => void;
  createThread: (title: string, content: string, categoryId: string) => Thread | null;
  createReply: (threadId: string, content: string) => Reply | null;
  upvoteThread: (threadId: string) => void;
  upvoteReply: (replyId: string) => void;
}

const ForumContext = createContext<ForumContextType | undefined>(undefined);

export function ForumProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [threads, setThreads] = useState<Thread[]>(initialThreads);
  const [replies, setReplies] = useState<Reply[]>(initialReplies);

  const login = (email: string, _password: string): boolean => {
    const user = users.find((u) => u.email === email);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const register = (username: string, email: string, _password: string): boolean => {
    if (users.some((u) => u.email === email || u.username === username)) {
      return false;
    }
    const newUser: User = {
      id: `user-${Date.now()}`,
      username,
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      bio: "",
      interests: [],
      joinedAt: new Date().toISOString().split("T")[0],
      reputation: 0,
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (userId: string, updates: Partial<User>) => {
    setUsers(
      users.map((u) => (u.id === userId ? { ...u, ...updates } : u))
    );
    if (currentUser?.id === userId) {
      setCurrentUser({ ...currentUser, ...updates });
    }
  };

  const createThread = (title: string, content: string, categoryId: string): Thread | null => {
    if (!currentUser) return null;
    const newThread: Thread = {
      id: `thread-${Date.now()}`,
      title,
      content,
      authorId: currentUser.id,
      categoryId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      upvotes: 0,
      viewCount: 0,
      replyCount: 0,
      isPinned: false,
      upvotedBy: [],
    };
    setThreads([newThread, ...threads]);
    return newThread;
  };

  const createReply = (threadId: string, content: string): Reply | null => {
    if (!currentUser) return null;
    const newReply: Reply = {
      id: `reply-${Date.now()}`,
      threadId,
      content,
      authorId: currentUser.id,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      upvotedBy: [],
    };
    setReplies([...replies, newReply]);
    setThreads(
      threads.map((t) =>
        t.id === threadId ? { ...t, replyCount: t.replyCount + 1 } : t
      )
    );
    return newReply;
  };

  const upvoteThread = (threadId: string) => {
    if (!currentUser) return;
    setThreads(
      threads.map((t) => {
        if (t.id !== threadId) return t;
        const hasUpvoted = t.upvotedBy.includes(currentUser.id);
        return {
          ...t,
          upvotes: hasUpvoted ? t.upvotes - 1 : t.upvotes + 1,
          upvotedBy: hasUpvoted
            ? t.upvotedBy.filter((id) => id !== currentUser.id)
            : [...t.upvotedBy, currentUser.id],
        };
      })
    );
  };

  const upvoteReply = (replyId: string) => {
    if (!currentUser) return;
    setReplies(
      replies.map((r) => {
        if (r.id !== replyId) return r;
        const hasUpvoted = r.upvotedBy.includes(currentUser.id);
        return {
          ...r,
          upvotes: hasUpvoted ? r.upvotes - 1 : r.upvotes + 1,
          upvotedBy: hasUpvoted
            ? r.upvotedBy.filter((id) => id !== currentUser.id)
            : [...r.upvotedBy, currentUser.id],
        };
      })
    );
  };

  return (
    <ForumContext.Provider
      value={{
        currentUser,
        users,
        threads,
        replies,
        login,
        register,
        logout,
        updateProfile,
        createThread,
        createReply,
        upvoteThread,
        upvoteReply,
      }}
    >
      {children}
    </ForumContext.Provider>
  );
}

export function useForum() {
  const context = useContext(ForumContext);
  if (context === undefined) {
    throw new Error("useForum must be used within a ForumProvider");
  }
  return context;
}
