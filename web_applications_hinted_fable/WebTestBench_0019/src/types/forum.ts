export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  interests: string[];
  joinedAt: string;
  reputation: number;
}

export interface Thread {
  id: string;
  title: string;
  content: string;
  authorId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  upvotes: number;
  viewCount: number;
  replyCount: number;
  isPinned: boolean;
  upvotedBy: string[];
}

export interface Reply {
  id: string;
  threadId: string;
  content: string;
  authorId: string;
  createdAt: string;
  upvotes: number;
  upvotedBy: string[];
  parentReplyId?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: "general" | "tech" | "creative" | "lifestyle" | "gaming" | "news";
  threadCount: number;
}
