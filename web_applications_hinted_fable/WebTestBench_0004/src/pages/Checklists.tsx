import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { checklists, checklistCategories, Checklist, ChecklistItem } from "@/data/checklists";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Calendar, Clipboard, Heart, Music, Sparkles, Plane, Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  calendar: Calendar,
  clipboard: Clipboard,
  heart: Heart,
  music: Music,
  sparkles: Sparkles,
  plane: Plane,
};

export default function ChecklistsPage() {
  const [savedChecklistIds, setSavedChecklistIds] = useLocalStorage<string[]>("savedChecklists", []);
  const [completedItems, setCompletedItems] = useLocalStorage<Record<string, boolean>>("completedChecklistItems", {});
  const [expandedChecklist, setExpandedChecklist] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const toggleSaveChecklist = (id: string) => {
    setSavedChecklistIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleItemComplete = (itemId: string) => {
    setCompletedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const getCompletionPercentage = (checklist: Checklist): number => {
    const completedCount = checklist.items.filter((item) => completedItems[item.id]).length;
    return Math.round((completedCount / checklist.items.length) * 100);
  };

  const filteredChecklists = categoryFilter
    ? checklists.filter((c) => c.category === categoryFilter)
    : checklists;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center slide-up">
          <h1 className="text-4xl font-display font-bold mb-2">Planning Checklists</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay organized with our curated checklists. Save them to your dashboard and track your progress.
          </p>
        </div>

        {/* Category Filters */}
        <div
          className="flex flex-wrap gap-2 justify-center mb-8 fade-in"
          data-semtag-id="checklists.filters"
          data-semtag-role="collection"
        >
          <Badge
            variant={categoryFilter === null ? "default" : "outline"}
            className="cursor-pointer px-4 py-2 text-sm"
            onClick={() => setCategoryFilter(null)}
            data-semtag-id="checklists.filters.item.all"
            data-semtag-role="toggle"
            data-semtag-state={categoryFilter === null ? "selected" : "not-selected"}
            data-semtag-controls="checklists.grid"
          >
            All
          </Badge>
          {checklistCategories.map((cat) => (
            <Badge
              key={cat.value}
              variant={categoryFilter === cat.value ? "default" : "outline"}
              className="cursor-pointer px-4 py-2 text-sm"
              onClick={() => setCategoryFilter(cat.value)}
              data-semtag-id={`checklists.filters.item.${cat.value}`}
              data-semtag-role="toggle"
              data-semtag-state={categoryFilter === cat.value ? "selected" : "not-selected"}
              data-semtag-controls="checklists.grid"
            >
              {cat.label}
            </Badge>
          ))}
        </div>

        {/* Checklists Grid */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          data-semtag-id="checklists.grid"
          data-semtag-role="collection"
        >
          {filteredChecklists.map((checklist, index) => {
            const Icon = iconMap[checklist.icon] || Clipboard;
            const completion = getCompletionPercentage(checklist);
            const isSaved = savedChecklistIds.includes(checklist.id);
            const isExpanded = expandedChecklist === checklist.id;

            return (
              <Card
                key={checklist.id}
                className={cn(
                  "fade-in transition-all cursor-pointer",
                  isExpanded && "ring-2 ring-primary/20"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader
                  className="cursor-pointer"
                  onClick={() => setExpandedChecklist(isExpanded ? null : checklist.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle
                          className="text-lg"
                          data-semtag-id={`checklists.grid.item.${checklist.id}`}
                          data-semtag-role="toggle"
                          data-semtag-action="expand-checklist"
                          data-semtag-state={isExpanded ? "open" : "closed"}
                        >{checklist.title}</CardTitle>
                        <CardDescription>{checklist.items.length} tasks</CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant={isSaved ? "sage" : "outline"}
                      data-semtag-id={`checklists.grid.item.${checklist.id}.status`}
                      data-semtag-role="observable"
                      data-semtag-state="checklist.saved"
                    >
                      {isSaved ? "Saved" : "Available"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{checklist.description}</p>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progress</span>
                      <span
                        data-semtag-id={`checklists.grid.item.${checklist.id}.progress`}
                        data-semtag-role="observable"
                        data-semtag-state="checklist.progress"
                      >{completion}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-sage transition-all duration-500"
                        style={{ width: `${completion}%` }}
                      />
                    </div>
                  </div>

                  {/* Expanded Items */}
                  {isExpanded && (
                    <div
                      className="space-y-2 pt-2 border-t"
                      data-semtag-id={`checklists.tasks.${checklist.id}`}
                      data-semtag-role="collection"
                    >
                      {checklist.items.map((item) => (
                        <div
                          key={item.id}
                          className={cn(
                            "flex items-start gap-3 p-2 rounded-lg transition-colors",
                            completedItems[item.id] ? "bg-sage-light/50" : "hover:bg-muted/50"
                          )}
                        >
                          <Checkbox
                            id={item.id}
                            checked={completedItems[item.id] || false}
                            onCheckedChange={() => toggleItemComplete(item.id)}
                            className="mt-0.5"
                            data-semtag-id={`checklists.tasks.${checklist.id}.item.${item.id}`}
                            data-semtag-role="toggle"
                            data-semtag-state={completedItems[item.id] ? "completed" : "not-completed"}
                          />
                          <label
                            htmlFor={item.id}
                            className={cn(
                              "text-sm cursor-pointer flex-1",
                              completedItems[item.id] && "line-through text-muted-foreground"
                            )}
                          >
                            <span className="font-medium">{item.title}</span>
                            <p className="text-muted-foreground text-xs mt-0.5">
                              {item.description}
                            </p>
                          </label>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant={isSaved ? "outline" : "default"}
                      size="sm"
                      className="flex-1 gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveChecklist(checklist.id);
                      }}
                      data-semtag-id={`checklists.grid.item.${checklist.id}.save`}
                      data-semtag-role="action"
                      data-semtag-action="toggle-save-checklist"
                      data-semtag-state="checklist.saved"
                    >
                      {isSaved ? (
                        <>
                          <Check className="h-4 w-4" />
                          Saved
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" />
                          Save to Dashboard
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
