import { Task } from '@/types/task';

export const defaultTasks: Task[] = [
  {
    id: '1',
    title: 'Review project proposal',
    description: 'Go through the Q1 marketing proposal and provide feedback to the team.',
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    priority: 'high',
    completed: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    title: 'Schedule dentist appointment',
    description: 'Call Dr. Smith\'s office for annual checkup.',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    priority: 'medium',
    completed: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    title: 'Buy groceries',
    description: 'Milk, eggs, bread, vegetables, and coffee.',
    deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
    priority: 'low',
    completed: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: '4',
    title: 'Complete tax filing',
    description: 'Gather all documents and submit through the online portal.',
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
    priority: 'high',
    completed: false,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    prerequisites: ['1'], // Depends on reviewing project proposal
  },
  {
    id: '5',
    title: 'Organize desk',
    priority: 'low',
    completed: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: '6',
    title: 'Reply to client emails',
    description: 'Respond to pending inquiries from last week.',
    deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    priority: 'medium',
    completed: true,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
  },
  {
    id: '7',
    title: 'Submit final report',
    description: 'Compile findings and submit the quarterly report.',
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    priority: 'high',
    completed: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    prerequisites: ['1', '4'], // Depends on reviewing proposal and tax filing
  },
];
