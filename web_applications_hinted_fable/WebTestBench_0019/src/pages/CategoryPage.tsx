import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { ThreadCard } from "@/components/ThreadCard";
import { useForum } from "@/context/ForumContext";
import { categories } from "@/data/mockData";
import { CategoryBadge } from "@/components/CategoryBadge";

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const { threads, users } = useForum();
  const [filter, setFilter] = useState<"trending" | "recent" | "hot">("trending");
  const [searchQuery, setSearchQuery] = useState("");

  const category = categories.find((c) => c.id === id);

  const filteredThreads = useMemo(() => {
    let result = threads.filter((t) => t.categoryId === id);

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.content.toLowerCase().includes(query)
      );
    }

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
  }, [threads, id, filter, searchQuery]);

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <div className="container py-12 text-center">
          <h1 className="font-heading text-2xl font-bold">Category not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header onSearch={setSearchQuery} />

      <main className="container py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-64 shrink-0">
            <Sidebar
              activeCategory={id}
              activeFilter={filter}
              onFilterChange={setFilter}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="mb-6">
              <CategoryBadge category={category} size="lg" asLink={false} />
              <h1
                className="font-heading text-2xl font-bold mt-3"
                data-semtag-id="category.title"
                data-semtag-role="observable"
                data-semtag-state="category.name"
              >
                {category.name}
              </h1>
              <p
                className="text-muted-foreground"
                data-semtag-id="category.description"
                data-semtag-role="observable"
                data-semtag-state="category.description"
              >{category.description}</p>
            </div>

            <div
              className="space-y-4"
              data-semtag-id="threads.list"
              data-semtag-role="collection"
            >
              {filteredThreads.length > 0 ? (
                filteredThreads.map((thread, index) => {
                  const author = users.find((u) => u.id === thread.authorId);
                  if (!author) return null;

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
                  <p>No threads in this category yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
