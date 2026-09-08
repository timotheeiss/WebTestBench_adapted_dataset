export function formatSalary(min: number, max: number, employmentType: string): string {
  const isHourly = employmentType === 'part-time' || employmentType === 'contract';
  
  if (isHourly) {
    return `$${min} - $${max}/hr`;
  }
  
  const formatK = (n: number) => {
    if (n >= 1000) {
      return `$${(n / 1000).toFixed(0)}k`;
    }
    return `$${n}`;
  };
  
  return `${formatK(min)} - ${formatK(max)}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function getEmploymentTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    'full-time': 'Full-time',
    'part-time': 'Part-time',
    'contract': 'Contract',
    'remote': 'Remote',
  };
  return labels[type] || type;
}
