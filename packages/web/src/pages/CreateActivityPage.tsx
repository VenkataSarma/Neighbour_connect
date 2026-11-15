import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

const activitySchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Category is required'),
  date: z.string().min(1, 'Date is required'),
  startTime: z.string().min(1, 'Start time is required'),
  locality: z.string().min(1, 'Locality is required'),
  maxParticipants: z.number().min(2, 'Minimum 2 participants required'),
  participationType: z.enum(['open', 'approval', 'invite']),
});

type ActivityFormData = z.infer<typeof activitySchema>;

export const CreateActivityPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<ActivityFormData>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      participationType: 'open',
      maxParticipants: 5,
    },
  });

  const onSubmit = async (data: ActivityFormData) => {
    console.log('Activity data:', data);
    // API call would go here
    navigate('/activities');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text)]">Create Activity</h1>
        <p className="text-[var(--text-secondary)] mt-2">
          Share what you'd like to do and find people to join you
        </p>
      </div>

      <Card padding="lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Activity Title"
            placeholder="e.g., Morning Run in Jubilee Hills"
            error={errors.title?.message}
            {...register('title')}
          />

          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1.5">
              Description
            </label>
            <textarea
              className="w-full px-4 py-2.5 bg-[var(--card)] border border-[var(--border)] rounded-lg text-[var(--text)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent resize-none"
              rows={4}
              placeholder="Tell people what your activity is about..."
              {...register('description')}
            />
            {errors.description && (
              <p className="mt-1.5 text-sm text-[var(--error)]">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1.5">
              Category
            </label>
            <select
              className="w-full px-4 py-2.5 bg-[var(--card)] border border-[var(--border)] rounded-lg text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              {...register('category')}
            >
              <option value="">Select a category</option>
              <option value="sports">Sports & Fitness</option>
              <option value="travel">Travel & Exploration</option>
              <option value="learning">Learning & Education</option>
              <option value="gaming">Gaming & Entertainment</option>
              <option value="social">Social & Community</option>
              <option value="hobbies">Hobbies & Creativity</option>
            </select>
            {errors.category && (
              <p className="mt-1.5 text-sm text-[var(--error)]">{errors.category.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Date"
              type="date"
              error={errors.date?.message}
              {...register('date')}
            />
            <Input
              label="Start Time"
              type="time"
              error={errors.startTime?.message}
              {...register('startTime')}
            />
          </div>

          <Input
            label="Locality"
            placeholder="e.g., Banjara Hills"
            error={errors.locality?.message}
            {...register('locality')}
          />

          <Input
            label="Maximum Participants"
            type="number"
            min="2"
            error={errors.maxParticipants?.message}
            {...register('maxParticipants', { valueAsNumber: true })}
          />

          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1.5">
              Participation Type
            </label>
            <select
              className="w-full px-4 py-2.5 bg-[var(--card)] border border-[var(--border)] rounded-lg text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              {...register('participationType')}
            >
              <option value="open">Open - Anyone can join</option>
              <option value="approval">Approval Required</option>
              <option value="invite">Invite Only</option>
            </select>
          </div>

          <div className="flex gap-4">
            <Button type="submit" fullWidth>
              Create Activity
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
