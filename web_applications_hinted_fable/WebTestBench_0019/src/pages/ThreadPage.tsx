import { useParams, useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { CategoryBadge } from "@/components/CategoryBadge";
import { ReplyCard } from "@/components/ReplyCard";
import { useForum } from "@/context/ForumContext";
import { categories } from "@/data/mockData";
import { ArrowUp, ArrowLeft, Eye, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function ThreadPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { threads, users, replies, currentUser, upvoteThread, createReply } = useForum();
  const [replyContent, setReplyContent] = useState("");

  const thread = threads.find((t) => t.id === id);
  const author = thread ? users.find((u) => u.id === thread.authorId) : null;
  const category = thread
    ? categories.find((c) => c.id === thread.categoryId)
    : null;
  const threadReplies = replies.filter((r) => r.threadId === id);

  if (!thread || !author || !category) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <div className="container py-12 text-center">
          <h1 className="font-heading text-2xl font-bold mb-4">
            Thread not found
          </h1>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  const hasUpvoted = currentUser && thread.upvotedBy.includes(currentUser.id);

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    if (!currentUser) {
      toast.error("Please login to reply");
      navigate("/login");
      return;
    }

    createReply(thread.id, replyContent.trim());
    setReplyContent("");
    toast.success("Reply posted!");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      <main className="container py-6 max-w-4xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-4 gap-2"
          data-semtag-id="nav.back"
          data-semtag-role="action"
          data-semtag-action="go-back"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {/* Thread Header */}
        <article
          className="rounded-xl border bg-card p-6 shadow-soft mb-6 animate-fade-in"
          data-semtag-id="thread.detail"
          data-semtag-role="region"
        >
          <div className="flex gap-4">
            {/* Upvote */}
            <div className="flex flex-col items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-10 w-10 rounded-full",
                  hasUpvoted && "bg-primary/10 text-primary"
                )}
                onClick={() => upvoteThread(thread.id)}
                disabled={!currentUser}
                data-semtag-id="thread.upvote"
                data-semtag-role="action"
                data-semtag-action="upvote-thread"
                data-semtag-state="thread.upvotes"
              >
                <ArrowUp
                  className={cn("h-5 w-5", hasUpvoted && "fill-current")}
                />
              </Button>
              <span
                className={cn(
                  "text-lg font-bold",
                  hasUpvoted && "text-primary"
                )}
                data-semtag-id="thread.upvotes"
                data-semtag-role="observable"
                data-semtag-state="thread.upvotes"
              >
                {thread.upvotes}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <CategoryBadge category={category} />
                <span className="text-muted-foreground">•</span>
                <Link
                  to={`/profile/${author.id}`}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  data-semtag-id="thread.author"
                  data-semtag-role="navigation"
                  data-semtag-target="profile.page"
                >
                  <img
                    src={author.avatar}
                    alt={author.username}
                    className="h-6 w-6 rounded-full"
                  />
                  <span className="font-medium">{author.username}</span>
                </Link>
                <span className="text-muted-foreground">•</span>
                <time className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(thread.createdAt), {
                    addSuffix: true,
                  })}
                </time>
              </div>

              <h1
                className="font-heading text-2xl md:text-3xl font-bold mb-4"
                data-semtag-id="thread.title"
                data-semtag-role="observable"
                data-semtag-state="thread.title"
              >
                {thread.title}
              </h1>

              <div
                className="prose prose-sm max-w-none mb-4 whitespace-pre-wrap"
                data-semtag-id="thread.content"
                data-semtag-role="observable"
                data-semtag-state="thread.content"
              >
                {thread.content}
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 border-t">
                <span
                  className="flex items-center gap-1.5"
                  data-semtag-id="thread.reply-count"
                  data-semtag-role="observable"
                  data-semtag-state="thread.reply-count"
                >
                  <MessageSquare className="h-4 w-4" />
                  {thread.replyCount} replies
                </span>
                <span
                  className="flex items-center gap-1.5"
                  data-semtag-id="thread.view-count"
                  data-semtag-role="observable"
                  data-semtag-state="thread.view-count"
                >
                  <Eye className="h-4 w-4" />
                  {thread.viewCount.toLocaleString()} views
                </span>
              </div>
            </div>
          </div>
        </article>

        {/* Reply Form */}
        <div
          className="rounded-xl border bg-card p-4 shadow-soft mb-6 animate-slide-up"
          data-semtag-id="reply.form"
          data-semtag-role="region"
        >
          <h3 className="font-heading font-semibold mb-3">
            {currentUser ? "Add a Reply" : "Login to Reply"}
          </h3>
          <form onSubmit={handleSubmitReply}>
            <Textarea
              placeholder={
                currentUser
                  ? "Share your thoughts..."
                  : "You need to be logged in to reply"
              }
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              disabled={!currentUser}
              className="mb-3 min-h-[100px]"
              data-semtag-id="reply.content"
              data-semtag-role="input"
              data-semtag-state="reply.content"
            />
            <Button
              type="submit"
              disabled={!currentUser || !replyContent.trim()}
              className="gap-2"
              data-semtag-id="reply.submit"
              data-semtag-role="action"
              data-semtag-action="post-reply"
              data-semtag-controls="thread.replies"
            >
              <Send className="h-4 w-4" />
              Post Reply
            </Button>
          </form>
        </div>

        {/* Replies */}
        <div className="rounded-xl border bg-card p-6 shadow-soft animate-slide-up" style={{ animationDelay: "100ms" }}>
          <h3 className="font-heading font-semibold mb-4">
            Replies ({threadReplies.length})
          </h3>
          {threadReplies.length > 0 ? (
            <div data-semtag-id="thread.replies" data-semtag-role="collection">
              {threadReplies.map((reply) => {
                const replyAuthor = users.find((u) => u.id === reply.authorId);
                if (!replyAuthor) return null;
                return (
                  <ReplyCard key={reply.id} reply={reply} author={replyAuthor} />
                );
              })}
            </div>
          ) : (
            <p
              className="text-muted-foreground text-center py-8"
              data-semtag-id="thread.replies.empty"
              data-semtag-role="observable"
              data-semtag-state="empty"
            >
              No replies yet. Be the first to respond!
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
