import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { ThreadCard } from "@/components/ThreadCard";
import { useForum } from "@/context/ForumContext";
import { categories } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit2, X, Check, Calendar, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { users, threads, currentUser, updateProfile } = useForum();
  const [isEditing, setIsEditing] = useState(false);
  const [editBio, setEditBio] = useState("");
  const [editInterests, setEditInterests] = useState("");

  const user = users.find((u) => u.id === id);
  const userThreads = threads.filter((t) => t.authorId === id);
  const isOwnProfile = currentUser?.id === id;

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <div className="container py-12 text-center">
          <h1 className="font-heading text-2xl font-bold mb-4">User not found</h1>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  const handleStartEdit = () => {
    setEditBio(user.bio);
    setEditInterests(user.interests.join(", "));
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    updateProfile(user.id, {
      bio: editBio,
      interests: editInterests
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
    });
    setIsEditing(false);
    toast.success("Profile updated!");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      <main className="container py-6 max-w-4xl">
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

        {/* Profile Card */}
        <div
          className="rounded-xl border bg-card p-6 shadow-soft mb-6 animate-fade-in"
          data-semtag-id="profile.card"
          data-semtag-role="region"
        >
          <div className="flex flex-col sm:flex-row gap-6">
            <img
              src={user.avatar}
              alt={user.username}
              className="h-24 w-24 rounded-2xl shadow-medium"
            />

            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1
                    className="font-heading text-2xl font-bold"
                    data-semtag-id="profile.username"
                    data-semtag-role="observable"
                    data-semtag-state="profile.username"
                  >
                    {user.username}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Joined {formatDistanceToNow(new Date(user.joinedAt), { addSuffix: true })}
                    </span>
                    <span
                      className="flex items-center gap-1"
                      data-semtag-id="profile.reputation"
                      data-semtag-role="observable"
                      data-semtag-state="profile.reputation"
                    >
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      {user.reputation.toLocaleString()} reputation
                    </span>
                  </div>
                </div>

                {isOwnProfile && !isEditing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleStartEdit}
                    data-semtag-id="profile.edit"
                    data-semtag-role="action"
                    data-semtag-action="edit-profile"
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>

              {isEditing ? (
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label>Bio</Label>
                    <Textarea
                      value={editBio}
                      onChange={(e) => setEditBio(e.target.value)}
                      placeholder="Tell us about yourself..."
                      className="min-h-[80px]"
                      data-semtag-id="profile.bio.input"
                      data-semtag-role="input"
                      data-semtag-state="profile.bio"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Interests (comma-separated)</Label>
                    <Input
                      value={editInterests}
                      onChange={(e) => setEditInterests(e.target.value)}
                      placeholder="Programming, Gaming, Music..."
                      data-semtag-id="profile.interests.input"
                      data-semtag-role="input"
                      data-semtag-state="profile.interests"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={handleSaveEdit}
                      data-semtag-id="profile.save"
                      data-semtag-role="action"
                      data-semtag-action="save-profile"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      data-semtag-id="profile.cancel"
                      data-semtag-role="action"
                      data-semtag-action="cancel-edit"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <p
                    className="text-muted-foreground mt-4"
                    data-semtag-id="profile.bio"
                    data-semtag-role="observable"
                    data-semtag-state="profile.bio"
                  >
                    {user.bio || "No bio yet."}
                  </p>

                  {user.interests.length > 0 && (
                    <div
                      className="flex flex-wrap gap-2 mt-4"
                      data-semtag-id="profile.interests"
                      data-semtag-role="observable"
                      data-semtag-state="profile.interests"
                    >
                      {user.interests.map((interest) => (
                        <Badge key={interest} variant="secondary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* User Threads */}
        <div className="animate-slide-up">
          <h2 className="font-heading text-xl font-bold mb-4">
            Threads by {user.username} ({userThreads.length})
          </h2>

          {userThreads.length > 0 ? (
            <div
              className="space-y-4"
              data-semtag-id="profile.threads"
              data-semtag-role="collection"
            >
              {userThreads.map((thread) => {
                const category = categories.find(
                  (c) => c.id === thread.categoryId
                );
                if (!category) return null;

                return (
                  <ThreadCard
                    key={thread.id}
                    thread={thread}
                    author={user}
                    category={category}
                    semtagCollectionId="profile.threads"
                  />
                );
              })}
            </div>
          ) : (
            <div
              className="text-center py-12 text-muted-foreground rounded-xl border bg-card"
              data-semtag-id="profile.threads.empty"
              data-semtag-role="observable"
              data-semtag-state="empty"
            >
              <p>No threads yet.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
