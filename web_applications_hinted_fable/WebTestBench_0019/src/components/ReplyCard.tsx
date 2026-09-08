import { Reply, User } from "@/types/forum";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForum } from "@/context/ForumContext";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface ReplyCardProps {
  reply: Reply;
  author: User;
}

export function ReplyCard({ reply, author }: ReplyCardProps) {
  const { currentUser, upvoteReply } = useForum();
  const hasUpvoted = currentUser && reply.upvotedBy.includes(currentUser.id);

  // Item id prefix inside the "thread.replies" collection (ThreadPage).
  const semtagItemId = `thread.replies.item.${reply.id}`;

  return (
    <div className="flex gap-4 py-4 border-b last:border-0">
      {/* Upvote */}
      <div className="flex flex-col items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8 rounded-full",
            hasUpvoted && "bg-primary/10 text-primary"
          )}
          onClick={() => upvoteReply(reply.id)}
          disabled={!currentUser}
          data-semtag-id={`${semtagItemId}.upvote`}
          data-semtag-role="action"
          data-semtag-action="upvote-reply"
          data-semtag-state="reply.upvotes"
        >
          <ArrowUp className={cn("h-4 w-4", hasUpvoted && "fill-current")} />
        </Button>
        <span
          className={cn("text-sm font-semibold", hasUpvoted && "text-primary")}
          data-semtag-id={`${semtagItemId}.upvotes`}
          data-semtag-role="observable"
          data-semtag-state="reply.upvotes"
        >
          {reply.upvotes}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <Link
            to={`/profile/${author.id}`}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            data-semtag-id={`${semtagItemId}.author`}
            data-semtag-role="navigation"
            data-semtag-target="profile.page"
          >
            <img
              src={author.avatar}
              alt={author.username}
              className="h-6 w-6 rounded-full"
            />
            <span className="font-medium text-sm">{author.username}</span>
          </Link>
          <span className="text-xs text-muted-foreground">•</span>
          <time className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
          </time>
        </div>
        <p
          className="text-sm leading-relaxed whitespace-pre-wrap"
          data-semtag-id={semtagItemId}
          data-semtag-role="observable"
          data-semtag-state="reply.content"
        >
          {reply.content}
        </p>
      </div>
    </div>
  );
}
