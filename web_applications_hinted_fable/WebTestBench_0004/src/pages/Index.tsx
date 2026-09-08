import { useState, useMemo, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { checklists } from "@/data/checklists";
import { venues } from "@/data/venues";
import { vendors } from "@/data/vendors";
import heroImage from "@/assets/hero-wedding.jpg";
import {
  Calendar,
  DollarSign,
  Users,
  Heart,
  MapPin,
  CheckSquare,
  Edit3,
  Save,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { format, differenceInDays, parseISO, isValid } from "date-fns";
import { cn } from "@/lib/utils";

interface WeddingDetails {
  weddingDate: string;
  budget: number;
  guestCount: number;
  partnerOneName: string;
  partnerTwoName: string;
}

const defaultDetails: WeddingDetails = {
  weddingDate: "",
  budget: 25000,
  guestCount: 100,
  partnerOneName: "",
  partnerTwoName: "",
};

export default function Index() {
  const [details, setDetails] = useLocalStorage<WeddingDetails>("weddingDetails", defaultDetails);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(details);
  const [favoriteVenueIds] = useLocalStorage<string[]>("favoriteVenues", []);
  const [favoriteVendorIds] = useLocalStorage<string[]>("favoriteVendors", []);
  const [savedChecklistIds] = useLocalStorage<string[]>("savedChecklists", []);
  const [completedItems] = useLocalStorage<Record<string, boolean>>("completedChecklistItems", {});

  useEffect(() => {
    setEditForm(details);
  }, [details]);

  const handleSave = () => {
    setDetails(editForm);
    setIsEditing(false);
  };

  const daysUntilWedding = useMemo(() => {
    if (!details.weddingDate) return null;
    const date = parseISO(details.weddingDate);
    if (!isValid(date)) return null;
    const days = differenceInDays(date, new Date());
    return days > 0 ? days : null;
  }, [details.weddingDate]);

  const savedChecklists = checklists.filter((c) => savedChecklistIds.includes(c.id));
  const totalChecklistItems = savedChecklists.reduce((acc, c) => acc + c.items.length, 0);
  const completedChecklistItems = savedChecklists.reduce(
    (acc, c) => acc + c.items.filter((item) => completedItems[item.id]).length,
    0
  );
  const checklistProgress = totalChecklistItems > 0
    ? Math.round((completedChecklistItems / totalChecklistItems) * 100)
    : 0;

  const hasSetup = details.partnerOneName || details.partnerTwoName || details.weddingDate;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Beautiful wedding ceremony setup"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/30 to-background" />
        </div>
        <div className="relative z-10 text-center text-primary-foreground px-4 slide-up">
          {hasSetup ? (
            <>
              <h1
                className="text-4xl md:text-6xl font-display font-bold mb-4"
                data-semtag-id="home.hero.couple"
                data-semtag-role="observable"
                data-semtag-state="wedding.partnerOneName,wedding.partnerTwoName"
              >
                {details.partnerOneName && details.partnerTwoName
                  ? `${details.partnerOneName} & ${details.partnerTwoName}`
                  : "Your Wedding"}
              </h1>
              {daysUntilWedding && (
                <p
                  className="text-xl md:text-2xl opacity-90 mb-6"
                  data-semtag-id="home.hero.countdown"
                  data-semtag-role="observable"
                  data-semtag-state="wedding.daysUntil"
                >
                  <span className="font-display text-3xl md:text-5xl font-bold">{daysUntilWedding}</span>
                  {" "}days until your special day
                </p>
              )}
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
                Plan Your Perfect Day
              </h1>
              <p className="text-xl md:text-2xl opacity-90 mb-6">
                Your wedding planning journey starts here
              </p>
            </>
          )}
          <Button
            variant="hero"
            size="xl"
            onClick={() => setIsEditing(true)}
            className="gap-2"
            data-semtag-id="home.details.open"
            data-semtag-role="action"
            data-semtag-action="edit-wedding-details"
            data-semtag-controls="home.details.dialog"
          >
            <Sparkles className="h-5 w-5" />
            {hasSetup ? "Update Details" : "Get Started"}
          </Button>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Edit Modal */}
        {isEditing && (
          <div className="fixed inset-0 z-50 bg-foreground/50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md fade-in" data-semtag-id="home.details.dialog" data-semtag-role="region">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit3 className="h-5 w-5 text-primary" />
                  Wedding Details
                </CardTitle>
                <CardDescription>
                  Set up your wedding information to personalize your dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Partner One</label>
                    <Input
                      value={editForm.partnerOneName}
                      onChange={(e) => setEditForm({ ...editForm, partnerOneName: e.target.value })}
                      placeholder="Name"
                      data-semtag-id="home.details.partnerOne"
                      data-semtag-role="input"
                      data-semtag-state="wedding.partnerOneName"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Partner Two</label>
                    <Input
                      value={editForm.partnerTwoName}
                      onChange={(e) => setEditForm({ ...editForm, partnerTwoName: e.target.value })}
                      placeholder="Name"
                      data-semtag-id="home.details.partnerTwo"
                      data-semtag-role="input"
                      data-semtag-state="wedding.partnerTwoName"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Wedding Date</label>
                  <Input
                    type="date"
                    value={editForm.weddingDate}
                    onChange={(e) => setEditForm({ ...editForm, weddingDate: e.target.value })}
                    data-semtag-id="home.details.date"
                    data-semtag-role="input"
                    data-semtag-state="wedding.date"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Budget ($)</label>
                  <Input
                    type="number"
                    value={editForm.budget}
                    onChange={(e) => setEditForm({ ...editForm, budget: Number(e.target.value) })}
                    data-semtag-id="home.details.budget"
                    data-semtag-role="input"
                    data-semtag-state="wedding.budget"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Expected Guests</label>
                  <Input
                    type="number"
                    value={editForm.guestCount}
                    onChange={(e) => setEditForm({ ...editForm, guestCount: Number(e.target.value) })}
                    data-semtag-id="home.details.guests"
                    data-semtag-role="input"
                    data-semtag-state="wedding.guestCount"
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsEditing(false)}
                    data-semtag-id="home.details.cancel"
                    data-semtag-role="action"
                    data-semtag-action="cancel-wedding-details"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 gap-2"
                    onClick={handleSave}
                    data-semtag-id="home.details.save"
                    data-semtag-role="action"
                    data-semtag-action="save-wedding-details"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="hover-lift">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Wedding Date
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p
                className="text-2xl font-display font-semibold"
                data-semtag-id="home.stats.date"
                data-semtag-role="observable"
                data-semtag-state="wedding.date"
              >
                {details.weddingDate
                  ? format(parseISO(details.weddingDate), "MMM d, yyyy")
                  : "Not set"}
              </p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Budget
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p
                className="text-2xl font-display font-semibold"
                data-semtag-id="home.stats.budget"
                data-semtag-role="observable"
                data-semtag-state="wedding.budget"
              >
                ${details.budget.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Guest Count
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p
                className="text-2xl font-display font-semibold"
                data-semtag-id="home.stats.guests"
                data-semtag-role="observable"
                data-semtag-state="wedding.guestCount"
              >{details.guestCount}</p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <CheckSquare className="h-4 w-4" />
                Planning Progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p
                  className="text-2xl font-display font-semibold"
                  data-semtag-id="home.stats.progress"
                  data-semtag-role="observable"
                  data-semtag-state="checklists.progress"
                >{checklistProgress}%</p>
                <Progress value={checklistProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Link
            to="/venues"
            className="group"
            data-semtag-id="home.quicklinks.venues"
            data-semtag-role="navigation"
            data-semtag-target="venues.page"
          >
            <Card className="h-full hover-lift romantic-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <MapPin className="h-8 w-8 text-primary" />
                  <Badge
                    variant="blush"
                    data-semtag-id="home.quicklinks.venues.count"
                    data-semtag-role="observable"
                    data-semtag-state="favorites.venues.count"
                  >{favoriteVenueIds.length} saved</Badge>
                </div>
                <CardTitle className="mt-4">Find Venues</CardTitle>
                <CardDescription>
                  Browse stunning venues from gardens to ballrooms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Explore Venues
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link
            to="/vendors"
            className="group"
            data-semtag-id="home.quicklinks.vendors"
            data-semtag-role="navigation"
            data-semtag-target="vendors.page"
          >
            <Card className="h-full hover-lift romantic-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Users className="h-8 w-8 text-secondary" />
                  <Badge
                    variant="sage"
                    data-semtag-id="home.quicklinks.vendors.count"
                    data-semtag-role="observable"
                    data-semtag-state="favorites.vendors.count"
                  >{favoriteVendorIds.length} saved</Badge>
                </div>
                <CardTitle className="mt-4">Find Vendors</CardTitle>
                <CardDescription>
                  Connect with photographers, caterers, and more
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                  Explore Vendors
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link
            to="/checklists"
            className="group"
            data-semtag-id="home.quicklinks.checklists"
            data-semtag-role="navigation"
            data-semtag-target="checklists.page"
          >
            <Card className="h-full hover-lift romantic-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CheckSquare className="h-8 w-8 text-accent" />
                  <Badge
                    variant="gold"
                    data-semtag-id="home.quicklinks.checklists.count"
                    data-semtag-role="observable"
                    data-semtag-state="checklists.saved.count"
                  >{savedChecklistIds.length} saved</Badge>
                </div>
                <CardTitle className="mt-4">Checklists</CardTitle>
                <CardDescription>
                  Stay organized with curated planning checklists
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full group-hover:bg-gold group-hover:text-accent-foreground transition-colors">
                  View Checklists
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Saved Checklists Preview */}
        {savedChecklists.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-semibold">Your Saved Checklists</h2>
              <Link
                to="/checklists"
                data-semtag-id="home.checklists.viewall"
                data-semtag-role="navigation"
                data-semtag-target="checklists.page"
              >
                <Button variant="ghost" size="sm">View all</Button>
              </Link>
            </div>
            <div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
              data-semtag-id="home.checklists"
              data-semtag-role="collection"
            >
              {savedChecklists.slice(0, 3).map((checklist) => {
                const completed = checklist.items.filter((item) => completedItems[item.id]).length;
                const progress = Math.round((completed / checklist.items.length) * 100);
                return (
                  <Card key={checklist.id} className="hover-lift">
                    <CardHeader className="pb-2">
                      <CardTitle
                        className="text-lg"
                        data-semtag-id={`home.checklists.item.${checklist.id}`}
                        data-semtag-role="observable"
                        data-semtag-state="checklist.title"
                      >{checklist.title}</CardTitle>
                      <CardDescription
                        data-semtag-id={`home.checklists.item.${checklist.id}.progress`}
                        data-semtag-role="observable"
                        data-semtag-state="checklist.progress"
                      >
                        {completed} of {checklist.items.length} completed
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Progress value={progress} className="h-2" />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* Favorites Preview */}
        {(favoriteVenueIds.length > 0 || favoriteVendorIds.length > 0) && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-semibold flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Your Favorites
              </h2>
              <Link
                to="/favorites"
                data-semtag-id="home.favorites.viewall"
                data-semtag-role="navigation"
                data-semtag-target="favorites.page"
              >
                <Button variant="ghost" size="sm">View all</Button>
              </Link>
            </div>
            <div
              className="flex flex-wrap gap-2"
              data-semtag-id="home.favorites"
              data-semtag-role="collection"
            >
              {favoriteVenueIds.slice(0, 4).map((id) => {
                const venue = venues.find((v) => v.id === id);
                if (!venue) return null;
                return (
                  <Badge
                    key={id}
                    variant="blush"
                    className="text-sm py-1.5 px-3"
                    data-semtag-id={`home.favorites.item.${id}`}
                    data-semtag-role="observable"
                    data-semtag-state="favorites.venue.name"
                  >
                    <MapPin className="h-3 w-3 mr-1" />
                    {venue.name}
                  </Badge>
                );
              })}
              {favoriteVendorIds.slice(0, 4).map((id) => {
                const vendor = vendors.find((v) => v.id === id);
                if (!vendor) return null;
                return (
                  <Badge
                    key={id}
                    variant="sage"
                    className="text-sm py-1.5 px-3"
                    data-semtag-id={`home.favorites.item.${id}`}
                    data-semtag-role="observable"
                    data-semtag-state="favorites.vendor.name"
                  >
                    <Users className="h-3 w-3 mr-1" />
                    {vendor.name}
                  </Badge>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
