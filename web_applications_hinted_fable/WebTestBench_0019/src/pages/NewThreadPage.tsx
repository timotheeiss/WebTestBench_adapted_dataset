import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { useForum } from "@/context/ForumContext";
import { categories } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Send } from "lucide-react";
import { toast } from "sonner";

export default function NewThreadPage() {
  const navigate = useNavigate();
  const { currentUser, createThread } = useForum();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !categoryId) {
      toast.error("Please fill in all fields");
      return;
    }

    const thread = createThread(title.trim(), content.trim(), categoryId);
    if (thread) {
      toast.success("Thread created successfully!");
      navigate(`/thread/${thread.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      <main className="container py-6 max-w-2xl">
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

        <div className="rounded-xl border bg-card p-6 shadow-soft animate-fade-in">
          <h1 className="font-heading text-2xl font-bold mb-6">
            Start a New Discussion
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            data-semtag-id="new-thread.form"
            data-semtag-role="region"
          >
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger
                  data-semtag-id="new-thread.category"
                  data-semtag-role="select"
                  data-semtag-state="new-thread.category"
                  data-semtag-options={categories
                    .map((cat) => `${cat.id}|${cat.name}`)
                    .join(";")}
                >
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem
                      key={cat.id}
                      value={cat.id}
                      data-semtag-id={`new-thread.category.option.${cat.id}`}
                      data-semtag-role="option"
                    >
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="What's your discussion about?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={200}
                data-semtag-id="new-thread.title"
                data-semtag-role="input"
                data-semtag-state="new-thread.title"
              />
              <p
                className="text-xs text-muted-foreground text-right"
                data-semtag-id="new-thread.title.count"
                data-semtag-role="observable"
                data-semtag-state="new-thread.title"
              >
                {title.length}/200
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Share your thoughts, questions, or ideas..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px]"
                data-semtag-id="new-thread.content"
                data-semtag-role="input"
                data-semtag-state="new-thread.content"
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                data-semtag-id="new-thread.cancel"
                data-semtag-role="action"
                data-semtag-action="cancel-thread"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="gap-2"
                data-semtag-id="new-thread.submit"
                data-semtag-role="action"
                data-semtag-action="create-thread"
              >
                <Send className="h-4 w-4" />
                Create Thread
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
