import { Link } from "react-router-dom";
import { Thread, User, Category } from "@/types/forum";
import { CategoryBadge } from "@/components/CategoryBadge";
import { ArrowUp, MessageSquare, Eye, Pin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForum } from "@/context/ForumContext";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface ThreadCardProps {
  thread: Thread;
  author: User;
  category: Category;
  /** data-semtag collection id of the list this card is rendered in */
  semtagCollectionId?: string;
}

export function ThreadCard({ thread, author, category, semtagCollectionId }: ThreadCardProps) {
  const { currentUser, upvoteThread } = useForum();
  const hasUpvoted = currentUser && thread.upvotedBy.includes(currentUser.id);

  // Emit semantic hint attributes only when a collection id was supplied,
  // so ids stay unique page-wide (spec §8).
  const semtagItemId = semtagCollectionId
    ? `${semtagCollectionId}.item.${thread.id}`
    : undefined;
  const semtag = (
    suffix: string,
    attrs: Record<string, string>,
  ): Record<string, string> =>
    semtagItemId
      ? {
          "data-semtag-id": suffix ? `${semtagItemId}.${suffix}` : semtagItemId,
          ...attrs,
        }
      : {};

  const handleUpvote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    upvoteThread(thread.id);
  };

  return (
    <article className="group relative rounded-xl border bg-card p-4 shadow-soft transition-all hover:shadow-medium hover:border-primary/20">
      {thread.isPinned && (
        <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Pin className="h-3 w-3" />
        </div>
      )}
      
      <div className="flex gap-4">
        {/* Upvote Section */}
        <div className="flex flex-col items-center gap-1 pt-1">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 rounded-full transition-colors",
              hasUpvoted && "bg-primary/10 text-primary"
            )}
            onClick={handleUpvote}
            disabled={!currentUser}
            {...semtag("upvote", {
              "data-semtag-role": "action",
              "data-semtag-action": "upvote-thread",
              "data-semtag-state": "thread.upvotes",
            })}
          >
            <ArrowUp className={cn("h-4 w-4", hasUpvoted && "fill-current")} />
          </Button>
          <span
            className={cn("text-sm font-semibold", hasUpvoted && "text-primary")}
            {...semtag("upvotes", {
              "data-semtag-role": "observable",
              "data-semtag-state": "thread.upvotes",
            })}
          >
            {thread.upvotes}
          </span>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <CategoryBadge category={category} size="sm" />
            <span className="text-xs text-muted-foreground">•</span>
            <Link
              to={`/profile/${author.id}`}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => e.stopPropagation()}
              {...semtag("author", {
                "data-semtag-role": "navigation",
                "data-semtag-target": "profile.page",
              })}
            >
              <img
                src={author.avatar}
                alt={author.username}
                className="h-5 w-5 rounded-full"
              />
              <span>{author.username}</span>
            </Link>
            <span className="text-xs text-muted-foreground">•</span>
            <time className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(thread.createdAt), { addSuffix: true })}
            </time>
          </div>

          <Link
            to={`/thread/${thread.id}`}
            {...semtag("", {
              "data-semtag-role": "navigation",
              "data-semtag-target": "thread.detail",
            })}
          >
            <h3 className="font-heading text-lg font-semibold leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {thread.title}
            </h3>
          </Link>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {thread.content.replace(/[#*`]/g, "").substring(0, 200)}...
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span
              className="flex items-center gap-1.5"
              {...semtag("replies", {
                "data-semtag-role": "observable",
                "data-semtag-state": "thread.reply-count",
              })}
            >
              <MessageSquare className="h-4 w-4" />
              {thread.replyCount} replies
            </span>
            <span
              className="flex items-center gap-1.5"
              {...semtag("views", {
                "data-semtag-role": "observable",
                "data-semtag-state": "thread.view-count",
              })}
            >
              <Eye className="h-4 w-4" />
              {thread.viewCount.toLocaleString()} views
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
