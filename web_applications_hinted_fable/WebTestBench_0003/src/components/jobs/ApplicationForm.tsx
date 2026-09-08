import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useJobs } from '@/context/JobContext';
import { toast } from '@/hooks/use-toast';

interface ApplicationFormProps {
  jobId: string;
  jobTitle: string;
  company: string;
}

export function ApplicationForm({ jobId, jobTitle, company }: ApplicationFormProps) {
  const { addApplication } = useJobs();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    addApplication({
      jobId,
      ...formData,
    });

    toast({
      title: 'Application submitted!',
      description: `Your application for ${jobTitle} at ${company} has been sent.`,
    });

    setFormData({ name: '', email: '', phone: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="text-lg">Apply for this position</CardTitle>
        <CardDescription>
          Fill out the form below to submit your application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          data-semtag-id="application.form"
          data-semtag-role="region"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              data-semtag-id="application.form.name"
              data-semtag-role="input"
              data-semtag-state="application.name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
              data-semtag-id="application.form.email"
              data-semtag-role="input"
              data-semtag-state="application.email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="555-0123"
              data-semtag-id="application.form.phone"
              data-semtag-role="input"
              data-semtag-state="application.phone"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Cover Letter / Message *</Label>
            <Textarea
              id="message"
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us why you're a great fit for this role..."
              data-semtag-id="application.form.message"
              data-semtag-role="input"
              data-semtag-state="application.message"
            />
          </div>

          <Button
            type="submit"
            variant="accent"
            className="w-full"
            disabled={isSubmitting}
            data-semtag-id="application.form.submit"
            data-semtag-role="action"
            data-semtag-action="submit-application"
          >
            {isSubmitting ? (
              'Submitting...'
            ) : (
              <>
                <Send className="h-4 w-4" />
                Submit Application
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
