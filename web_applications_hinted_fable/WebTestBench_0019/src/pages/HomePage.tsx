import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { ThreadCard } from "@/components/ThreadCard";
import { useForum } from "@/context/ForumContext";
import { categories } from "@/data/mockData";
import { Flame } from "lucide-react";

export default function HomePage() {
  const { threads, users } = useForum();
  const [filter, setFilter] = useState<"trending" | "recent" | "hot">("trending");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredThreads = useMemo(() => {
    let result = [...threads];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.content.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (filter) {
      case "trending":
        result.sort((a, b) => b.upvotes - a.upvotes);
        break;
      case "recent":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "hot":
        result.sort((a, b) => b.replyCount - a.replyCount);
        break;
    }

    return result;
  }, [threads, filter, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header onSearch={setSearchQuery} />
      
      <main className="container py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-64 shrink-0">
            <Sidebar activeFilter={filter} onFilterChange={setFilter} />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Flame className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1
                  className="font-heading text-2xl font-bold"
                  data-semtag-id="threads.heading"
                  data-semtag-role="observable"
                  data-semtag-state="threads.filter"
                >
                  {filter === "trending" && "Trending Discussions"}
                  {filter === "recent" && "Recent Discussions"}
                  {filter === "hot" && "Most Active Discussions"}
                </h1>
                <p
                  className="text-sm text-muted-foreground"
                  data-semtag-id="search.summary"
                  data-semtag-role="observable"
                  data-semtag-state="search.query"
                >
                  {searchQuery
                    ? `Showing results for "${searchQuery}"`
                    : "Join the conversation with our community"}
                </p>
              </div>
            </div>

            {/* Thread List */}
            <div
              className="space-y-4"
              data-semtag-id="threads.list"
              data-semtag-role="collection"
            >
              {filteredThreads.length > 0 ? (
                filteredThreads.map((thread, index) => {
                  const author = users.find((u) => u.id === thread.authorId);
                  const category = categories.find(
                    (c) => c.id === thread.categoryId
                  );
                  if (!author || !category) return null;

                  return (
                    <div
                      key={thread.id}
                      className="animate-slide-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <ThreadCard
                        thread={thread}
                        author={author}
                        category={category}
                        semtagCollectionId="threads.list"
                      />
                    </div>
                  );
                })
              ) : (
                <div
                  className="text-center py-12 text-muted-foreground"
                  data-semtag-id="threads.empty"
                  data-semtag-role="observable"
                  data-semtag-state="empty"
                >
                  <p>No threads found.</p>
                  {searchQuery && (
                    <p className="text-sm mt-1">
                      Try adjusting your search terms.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
