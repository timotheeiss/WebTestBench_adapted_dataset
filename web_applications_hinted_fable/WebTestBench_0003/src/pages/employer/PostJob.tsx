import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useJobs } from '@/context/JobContext';
import { toast } from '@/hooks/use-toast';
import { industries, locations, employmentTypes } from '@/data/initialData';
import { semtagSlug } from '@/lib/semtag';

const PostJob = () => {
  const navigate = useNavigate();
  const { addJob, currentEmployer } = useJobs();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    industry: '',
    employmentType: '' as '' | 'full-time' | 'part-time' | 'contract' | 'remote',
    skills: [] as string[],
  });

  const addSkill = () => {
    const skill = skillInput.trim();
    if (skill && !formData.skills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    addJob({
      title: formData.title,
      company: currentEmployer.company,
      description: formData.description,
      location: formData.location,
      salaryMin: parseInt(formData.salaryMin),
      salaryMax: parseInt(formData.salaryMax),
      skills: formData.skills,
      industry: formData.industry,
      employmentType: formData.employmentType as 'full-time' | 'part-time' | 'contract' | 'remote',
    });

    toast({
      title: 'Job posted successfully!',
      description: 'Your job listing is now live and visible to job seekers.',
    });

    navigate('/employer/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8 max-w-2xl">
        <Link
          to="/employer/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          data-semtag-id="post-job.back"
          data-semtag-role="navigation"
          data-semtag-target="employer.dashboard"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Post a New Job</CardTitle>
            <CardDescription>
              Fill out the details below to create a new job listing for {currentEmployer.company}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              data-semtag-id="post-job.form"
              data-semtag-role="region"
            >
              <div className="space-y-2">
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Senior Software Engineer"
                  data-semtag-id="post-job.form.title"
                  data-semtag-role="input"
                  data-semtag-state="job-form.title"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry *</Label>
                  <Select
                    required
                    value={formData.industry}
                    onValueChange={(value) => setFormData({ ...formData, industry: value })}
                  >
                    <SelectTrigger
                      className="bg-card"
                      data-semtag-id="post-job.form.industry"
                      data-semtag-role="select"
                      data-semtag-state="job-form.industry"
                      data-semtag-options={industries.map((i) => `${i}|${i}`).join(';')}
                    >
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent className="bg-card">
                      {industries.map((industry) => (
                        <SelectItem
                          key={industry}
                          value={industry}
                          data-semtag-id={`post-job.form.industry.option.${semtagSlug(industry)}`}
                          data-semtag-role="option"
                        >
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employmentType">Employment Type *</Label>
                  <Select
                    required
                    value={formData.employmentType}
                    onValueChange={(value) => setFormData({ ...formData, employmentType: value as any })}
                  >
                    <SelectTrigger
                      className="bg-card"
                      data-semtag-id="post-job.form.type"
                      data-semtag-role="select"
                      data-semtag-state="job-form.employment-type"
                      data-semtag-options={employmentTypes.map((t) => `${t.value}|${t.label}`).join(';')}
                    >
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-card">
                      {employmentTypes.map((type) => (
                        <SelectItem
                          key={type.value}
                          value={type.value}
                          data-semtag-id={`post-job.form.type.option.${type.value}`}
                          data-semtag-role="option"
                        >
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Select
                  required
                  value={formData.location}
                  onValueChange={(value) => setFormData({ ...formData, location: value })}
                >
                  <SelectTrigger
                    className="bg-card"
                    data-semtag-id="post-job.form.location"
                    data-semtag-role="select"
                    data-semtag-state="job-form.location"
                    data-semtag-options={locations.map((l) => `${l}|${l}`).join(';')}
                  >
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    {locations.map((location) => (
                      <SelectItem
                        key={location}
                        value={location}
                        data-semtag-id={`post-job.form.location.option.${semtagSlug(location)}`}
                        data-semtag-role="option"
                      >
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salaryMin">
                    Minimum Salary {formData.employmentType === 'part-time' || formData.employmentType === 'contract' ? '(hourly)' : '(annual)'} *
                  </Label>
                  <Input
                    id="salaryMin"
                    type="number"
                    required
                    min="0"
                    value={formData.salaryMin}
                    onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                    placeholder={formData.employmentType === 'part-time' || formData.employmentType === 'contract' ? 'e.g. 25' : 'e.g. 80000'}
                    data-semtag-id="post-job.form.salary-min"
                    data-semtag-role="input"
                    data-semtag-state="job-form.salary-min"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salaryMax">
                    Maximum Salary {formData.employmentType === 'part-time' || formData.employmentType === 'contract' ? '(hourly)' : '(annual)'} *
                  </Label>
                  <Input
                    id="salaryMax"
                    type="number"
                    required
                    min="0"
                    value={formData.salaryMax}
                    onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                    placeholder={formData.employmentType === 'part-time' || formData.employmentType === 'contract' ? 'e.g. 45' : 'e.g. 120000'}
                    data-semtag-id="post-job.form.salary-max"
                    data-semtag-role="input"
                    data-semtag-state="job-form.salary-max"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  required
                  rows={8}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the role, responsibilities, and requirements..."
                  data-semtag-id="post-job.form.description"
                  data-semtag-role="input"
                  data-semtag-state="job-form.description"
                />
              </div>

              <div className="space-y-2">
                <Label>Required Skills</Label>
                <div className="flex gap-2">
                  <Input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="Add a skill"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addSkill();
                      }
                    }}
                    data-semtag-id="post-job.form.skill-input"
                    data-semtag-role="input"
                    data-semtag-state="job-form.skill-input"
                    data-semtag-controls="post-job.form.skills"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addSkill}
                    data-semtag-id="post-job.form.skill-add"
                    data-semtag-role="action"
                    data-semtag-action="add-skill"
                    data-semtag-controls="post-job.form.skills"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.skills.length > 0 && (
                  <div
                    className="flex flex-wrap gap-2 mt-3"
                    data-semtag-id="post-job.form.skills"
                    data-semtag-role="collection"
                  >
                    {formData.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="skill"
                        className="gap-1 pr-1"
                        data-semtag-id={`post-job.form.skills.item.${semtagSlug(skill)}`}
                        data-semtag-role="observable"
                        data-semtag-state="job-form.skill"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-1 hover:text-destructive transition-colors"
                          data-semtag-id={`post-job.form.skills.item.${semtagSlug(skill)}.remove`}
                          data-semtag-role="action"
                          data-semtag-action="remove-skill"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  variant="accent"
                  className="flex-1"
                  disabled={isSubmitting}
                  data-semtag-id="post-job.form.submit"
                  data-semtag-role="action"
                  data-semtag-action="post-job"
                >
                  {isSubmitting ? 'Posting...' : 'Post Job'}
                </Button>
                <Link
                  to="/employer/dashboard"
                  data-semtag-id="post-job.form.cancel"
                  data-semtag-role="navigation"
                  data-semtag-target="employer.dashboard"
                >
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PostJob;
