import { useState } from 'react';
import { Resume } from '@/types/resume';
import { useResume } from '@/context/ResumeContext';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { MoreVertical, Copy, Pencil, Trash2, FileText } from 'lucide-react';
import { format } from 'date-fns';

interface ResumeCardProps {
  resume: Resume;
  onEdit: (id: string) => void;
}

export function ResumeCard({ resume, onEdit }: ResumeCardProps) {
  const { duplicateResume, renameResume, deleteResume } = useResume();
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(resume.title);

  const handleRename = () => {
    renameResume(resume.id, newTitle);
    setIsRenameOpen(false);
  };

  const handleDuplicate = () => {
    duplicateResume(resume.id);
  };

  const handleDelete = () => {
    deleteResume(resume.id);
    setIsDeleteOpen(false);
  };

  const templateColors = {
    modern: 'bg-accent/10 text-accent',
    classic: 'bg-primary/10 text-primary',
    minimal: 'bg-muted text-muted-foreground',
  };

  return (
    <>
      <div className="group glass-card glass-card-hover rounded-xl p-5 cursor-pointer" onClick={() => onEdit(resume.id)}>
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                data-semtag-id={`dashboard.resumes.item.${resume.id}.menu`}
                data-semtag-role="action"
                data-semtag-action="open-resume-menu"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-popover">
              <DropdownMenuItem
                onClick={(e) => { e.stopPropagation(); setIsRenameOpen(true); }}
                data-semtag-id={`dashboard.resumes.item.${resume.id}.rename`}
                data-semtag-role="action"
                data-semtag-action="rename-resume"
              >
                <Pencil className="w-4 h-4 mr-2" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => { e.stopPropagation(); handleDuplicate(); }}
                data-semtag-id={`dashboard.resumes.item.${resume.id}.duplicate`}
                data-semtag-role="action"
                data-semtag-action="duplicate-resume"
              >
                <Copy className="w-4 h-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={(e) => { e.stopPropagation(); setIsDeleteOpen(true); }}
                data-semtag-id={`dashboard.resumes.item.${resume.id}.delete`}
                data-semtag-role="action"
                data-semtag-action="delete-resume"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <h3
          className="font-semibold text-foreground mb-1 truncate"
          data-semtag-id={`dashboard.resumes.item.${resume.id}`}
          data-semtag-role="navigation"
          data-semtag-target="editor.screen"
          data-semtag-state="resume.title"
        >{resume.title}</h3>
        <p
          className="text-sm text-muted-foreground mb-3"
          data-semtag-id={`dashboard.resumes.item.${resume.id}.updated`}
          data-semtag-role="observable"
          data-semtag-state="resume.updated-at"
        >
          Updated {format(new Date(resume.updatedAt), 'MMM d, yyyy')}
        </p>

        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${templateColors[resume.template]}`}
            data-semtag-id={`dashboard.resumes.item.${resume.id}.template`}
            data-semtag-role="observable"
            data-semtag-state="resume.template"
          >
            {resume.template}
          </span>
        </div>
      </div>

      {/* Rename Dialog */}
      <Dialog open={isRenameOpen} onOpenChange={setIsRenameOpen}>
        <DialogContent
          className="sm:max-w-md"
          data-semtag-id={`dashboard.resumes.item.${resume.id}.rename-dialog`}
          data-semtag-role="region"
        >
          <DialogHeader>
            <DialogTitle>Rename Resume</DialogTitle>
          </DialogHeader>
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Resume title"
            className="mt-2"
            data-semtag-id={`dashboard.resumes.item.${resume.id}.rename-dialog.title`}
            data-semtag-role="input"
            data-semtag-state="resume.title"
          />
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setIsRenameOpen(false)}
              data-semtag-id={`dashboard.resumes.item.${resume.id}.rename-dialog.cancel`}
              data-semtag-role="action"
              data-semtag-action="cancel-rename"
            >Cancel</Button>
            <Button
              onClick={handleRename}
              data-semtag-id={`dashboard.resumes.item.${resume.id}.rename-dialog.save`}
              data-semtag-role="action"
              data-semtag-action="confirm-rename"
            >Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent
          className="sm:max-w-md"
          data-semtag-id={`dashboard.resumes.item.${resume.id}.delete-dialog`}
          data-semtag-role="region"
        >
          <DialogHeader>
            <DialogTitle>Delete Resume</DialogTitle>
          </DialogHeader>
          <p
            className="text-muted-foreground"
            data-semtag-id={`dashboard.resumes.item.${resume.id}.delete-dialog.message`}
            data-semtag-role="observable"
          >
            Are you sure you want to delete "{resume.title}"? This action cannot be undone.
          </p>
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setIsDeleteOpen(false)}
              data-semtag-id={`dashboard.resumes.item.${resume.id}.delete-dialog.cancel`}
              data-semtag-role="action"
              data-semtag-action="cancel-delete"
            >Cancel</Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              data-semtag-id={`dashboard.resumes.item.${resume.id}.delete-dialog.confirm`}
              data-semtag-role="action"
              data-semtag-action="confirm-delete"
            >Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
