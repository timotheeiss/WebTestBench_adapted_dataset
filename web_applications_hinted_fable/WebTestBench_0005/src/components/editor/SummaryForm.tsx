import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface SummaryFormProps {
  summary: string;
  onChange: (summary: string) => void;
}

export function SummaryForm({ summary, onChange }: SummaryFormProps) {
  const charCount = summary.length;
  const maxChars = 500;
  const isNearLimit = charCount > maxChars * 0.8;
  const isOverLimit = charCount > maxChars;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          value={summary}
          data-semtag-id="editor.summary.text"
          data-semtag-role="input"
          data-semtag-state="summary.text"
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write a brief summary of your professional background, key skills, and career objectives. Keep it concise and impactful..."
          rows={6}
          className="resize-none"
        />
        <div className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground">
            Tip: Keep your summary between 2-4 sentences for best results.
          </p>
          <span
            className={`text-xs font-medium ${
              isOverLimit ? 'text-destructive' : isNearLimit ? 'text-accent' : 'text-muted-foreground'
            }`}
            data-semtag-id="editor.summary.char-count"
            data-semtag-role="observable"
            data-semtag-state="summary.char-count"
          >
            {charCount}/{maxChars}
          </span>
        </div>
      </div>
    </div>
  );
}
