import { ContactInfo } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface ContactFormProps {
  contact: ContactInfo;
  onChange: (contact: ContactInfo) => void;
}

export function ContactForm({ contact, onChange }: ContactFormProps) {
  const handleChange = (field: keyof ContactInfo, value: string) => {
    onChange({ ...contact, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName" className="flex items-center gap-2">
          <User className="w-4 h-4" />
          Full Name
        </Label>
        <Input
          id="fullName"
          value={contact.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          placeholder="John Doe"
          data-semtag-id="editor.contact.full-name"
          data-semtag-role="input"
          data-semtag-state="contact.full-name"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={contact.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john@email.com"
            data-semtag-id="editor.contact.email"
            data-semtag-role="input"
            data-semtag-state="contact.email"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Phone
          </Label>
          <Input
            id="phone"
            type="tel"
            value={contact.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="(555) 123-4567"
            data-semtag-id="editor.contact.phone"
            data-semtag-role="input"
            data-semtag-state="contact.phone"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location" className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Location
        </Label>
        <Input
          id="location"
          value={contact.location}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="San Francisco, CA"
          data-semtag-id="editor.contact.location"
          data-semtag-role="input"
          data-semtag-state="contact.location"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="linkedin" className="flex items-center gap-2">
            <Linkedin className="w-4 h-4" />
            LinkedIn (optional)
          </Label>
          <Input
            id="linkedin"
            value={contact.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/johndoe"
            data-semtag-id="editor.contact.linkedin"
            data-semtag-role="input"
            data-semtag-state="contact.linkedin"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Website (optional)
          </Label>
          <Input
            id="website"
            value={contact.website || ''}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="johndoe.com"
            data-semtag-id="editor.contact.website"
            data-semtag-role="input"
            data-semtag-state="contact.website"
          />
        </div>
      </div>
    </div>
  );
}
