import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Building2, Users, Clock, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { competencyModels, CompetencyModel } from '@/data/competencyModels';

interface JobSearchProps {
  onSelectJob: (model: CompetencyModel) => void;
}

const JobSearch = ({ onSelectJob }: JobSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');

  const departments = useMemo(() => {
    const depts = new Set(competencyModels.map((m) => m.department));
    return Array.from(depts);
  }, []);

  const filteredModels = useMemo(() => {
    return competencyModels.filter((model) => {
      const matchesSearch =
        searchQuery === '' ||
        model.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
        model.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDepartment =
        departmentFilter === 'all' || model.department === departmentFilter;

      return matchesSearch && matchesDepartment;
    });
  }, [searchQuery, departmentFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs, skills, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-semtag-id="jobs.search.query"
            data-semtag-role="input"
            data-semtag-state="search.query"
            data-semtag-controls="jobs.grid"
            className="pl-10 h-11 bg-card border-border"
          />
        </div>
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger
            data-semtag-id="jobs.filter.department"
            data-semtag-role="select"
            data-semtag-state="filters.department"
            data-semtag-controls="jobs.grid"
            data-semtag-options={['all|All Departments', ...departments.map((d) => `${d}|${d}`)].join(';')}
            className="w-full sm:w-[200px] h-11 bg-card"
          >
            <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="All Departments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value="all"
              data-semtag-id="jobs.filter.department.option.all"
              data-semtag-role="option"
            >
              All Departments
            </SelectItem>
            {departments.map((dept) => (
              <SelectItem
                key={dept}
                value={dept}
                data-semtag-id={`jobs.filter.department.option.${dept.toLowerCase().replace(/\s+/g, '-')}`}
                data-semtag-role="option"
              >
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        data-semtag-id="jobs.grid"
        data-semtag-role="collection"
      >
        {filteredModels.map((model, index) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className="glass-card hover-lift cursor-pointer group"
              onClick={() => onSelectJob(model)}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3
                      data-semtag-id={`jobs.grid.item.${model.id}`}
                      data-semtag-role="navigation"
                      data-semtag-target="model.detail"
                      className="font-semibold font-display text-lg group-hover:text-primary transition-colors"
                    >
                      {model.jobTitle}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <Building2 className="w-3.5 h-3.5" />
                      <span
                        data-semtag-id={`jobs.grid.item.${model.id}.department`}
                        data-semtag-role="observable"
                        data-semtag-state="model.department"
                      >
                        {model.department}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                  {model.description}
                </p>

                <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    <span
                      data-semtag-id={`jobs.grid.item.${model.id}.competency-count`}
                      data-semtag-role="observable"
                      data-semtag-state="model.competencyCount"
                    >
                      {model.competencies.length} competencies
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{model.createdAt}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {model.keywords.slice(0, 3).map((keyword) => (
                    <Badge key={keyword} variant="secondary" className="text-xs capitalize">
                      {keyword}
                    </Badge>
                  ))}
                  {model.keywords.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{model.keywords.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredModels.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3
            data-semtag-id="jobs.search.empty"
            data-semtag-role="observable"
            data-semtag-state="search.results"
            className="font-semibold text-lg"
          >
            No jobs found
          </h3>
          <p className="text-muted-foreground mt-1">
            Try adjusting your search or filter criteria
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default JobSearch;
