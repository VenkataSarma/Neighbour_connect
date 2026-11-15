import { useState, useEffect } from 'react';
import { Search, Filter, Calendar, MapPin, Users, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { Select } from '../components/ui/Select';
import api from '../lib/api';

interface Activity {
  _id: string;
  title: string;
  description: string;
  category: {
    _id: string;
    name: string;
    slug: string;
    icon: string;
  };
  subcategory?: string;
  image?: string;
  organizer: {
    _id: string;
    fullName: string;
    username: string;
  };
  date: string;
  startTime: string;
  endTime?: string;
  city: string;
  locality: string;
  venue?: string;
  meetingPoint?: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  maxParticipants: number;
  currentParticipants: number;
  participationType: 'open' | 'approval' | 'invite';
  visibility: 'public' | 'restricted';
  status: 'draft' | 'open' | 'full' | 'cancelled' | 'completed' | 'expired';
  tags: string[];
  createdAt: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  icon: string;
  subcategories: { name: string; slug: string; isActive: boolean; _id: string }[];
}

const CATEGORY_COLORS: Record<string, string> = {
  'sports-fitness': 'bg-emerald-500',
  'travel-exploration': 'bg-blue-500',
  'learning-education': 'bg-purple-500',
  'gaming-entertainment': 'bg-orange-500',
  'social-community': 'bg-pink-500',
  'hobbies-creativity': 'bg-amber-500',
};


export const ActivitiesPage = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('open');
  const [selectedDate, setSelectedDate] = useState('upcoming');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  const getCategoryId = (categoryName: string): string => {
    if (categoryName === 'All') return '';
    const cat = categories.find(c => c.name === categoryName);
    return cat?._id || '';
  };

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/categories');
      setCategories(data.data || []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchActivities = async (pageNum = 1, append = false) => {
    try {
      setLoading(true);
      const params: any = {
        page: pageNum,
        limit: 12,
      };

      if (searchQuery) params.search = searchQuery;
      if (selectedCategory !== 'All') params.category = getCategoryId(selectedCategory);
      if (selectedStatus !== 'All') params.status = selectedStatus;
      if (selectedDate !== 'upcoming') {
        const now = new Date();
        if (selectedDate === 'today') {
          const endOfDay = new Date();
          endOfDay.setHours(23, 59, 59, 999);
          params.startDate = now.toISOString();
          params.endDate = endOfDay.toISOString();
        } else if (selectedDate === 'this-week') {
          const endOfWeek = new Date();
          endOfWeek.setDate(now.getDate() + 7);
          params.startDate = now.toISOString();
          params.endDate = endOfWeek.toISOString();
        }
      }

      const { data } = await api.get('/activities', { params });
      const newActivities = data.data || [];
      const meta = data.meta;

      if (append) {
        setActivities(prev => [...prev, ...newActivities]);
      } else {
        setActivities(newActivities);
      }
      setHasMore(newActivities.length === 12);
      setTotal(meta?.total || newActivities.length);
    } catch (error) {
      console.error('Failed to fetch activities:', error);
      setActivities([]);
      setHasMore(false);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchActivities(1, false);
  }, [searchQuery, selectedCategory, selectedStatus, selectedDate, categories]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchActivities(1, false);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchActivities(nextPage, true);
  };

  const getCategoryColor = (categoryName: string) => {
    if (categoryName === 'All') return 'bg-gray-500';
    const cat = categories.find(c => c.name === categoryName);
    return cat ? CATEGORY_COLORS[cat.slug] : 'bg-gray-500';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const getStatusVariant = (status: string): 'default' | 'success' | 'warning' | 'danger' | 'info' => {
    switch (status) {
      case 'open': return 'success';
      case 'full': return 'warning';
      case 'cancelled': return 'danger';
      case 'completed': return 'info';
      default: return 'default';
    }
  };

  const getParticipationVariant = (type: string): 'default' | 'success' | 'warning' | 'danger' | 'info' | 'secondary' => {
    switch (type) {
      case 'open': return 'success';
      case 'approval': return 'info';
      case 'invite': return 'secondary';
      default: return 'default';
    }
  };

  const statusBadge = (status: string) => (
    <Badge variant={getStatusVariant(status)} size="sm">
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );

  const participationBadge = (type: string) => (
    <Badge variant={getParticipationVariant(type)} size="sm">
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </Badge>
  );

  const categoryFilters = [
    'All',
    'Sports and Fitness',
    'Travel and Exploration',
    'Learning and Education',
    'Gaming and Entertainment',
    'Social and Community',
    'Hobbies and Creativity',
  ];

  const dateFilters = [
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'today', label: 'Today' },
    { value: 'this-week', label: 'This Week' },
  ];

  const statusFilters = [
    { value: 'All', label: 'All Status' },
    { value: 'open', label: 'Open' },
    { value: 'full', label: 'Full' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--text)]">Discover Activities</h1>
        <p className="text-[var(--text-secondary)] mt-2">
          Find activities near you and connect with people who share your interests
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search activities by title, description, or tags..."
            leftIcon={<Search size={18} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button type="submit" variant="outline" leftIcon={<Filter size={18} />}>
          Search
        </Button>
      </form>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3">
        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-[var(--text-secondary)]">Category:</label>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categoryFilters.map((category) => (
              <Button
                key={category}
                size="sm"
                variant={selectedCategory === category ? 'primary' : 'outline'}
                onClick={() => {
                  setSelectedCategory(category);
                  setPage(1);
                  fetchActivities(1, false);
                }}
                className={`transition-colors whitespace-nowrap ${selectedCategory === category ? getCategoryColor(category) : ''}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Date Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-[var(--text-secondary)]">When:</label>
          <Select
            value={selectedDate}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedDate(value);
              setPage(1);
              fetchActivities(1, false);
            }}
            options={dateFilters}
            className="w-40"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-[var(--text-secondary)]">Status:</label>
          <Select
            value={selectedStatus}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedStatus(value);
              setPage(1);
              fetchActivities(1, false);
            }}
            options={statusFilters}
            className="w-40"
          />
        </div>
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between text-sm text-[var(--text-secondary)]">
        <span>{total} {total === 1 ? 'activity' : 'activities'} found</span>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => setPage(1)} disabled={page === 1}>
            <ChevronLeft size={16} />
          </Button>
          <span>Page {page}</span>
          <Button variant="ghost" size="sm" onClick={handleLoadMore} disabled={!hasMore}>
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} padding="none" className="animate-pulse">
              <div className="aspect-video bg-[var(--border)] rounded-t-lg" />
              <div className="p-4 space-y-3">
                <div className="h-5 w-3/4 bg-[var(--border)] rounded" />
                <div className="h-4 w-full bg-[var(--border)] rounded" />
                <div className="h-4 w-1/2 bg-[var(--border)] rounded" />
                <div className="flex gap-2">
                  <div className="h-4 w-16 bg-[var(--border)] rounded-full" />
                  <div className="h-4 w-20 bg-[var(--border)] rounded-full" />
                </div>
                <div className="h-10 w-full bg-[var(--border)] rounded-lg" />
              </div>
            </Card>
          ))}
        </div>
      )}

      {!loading && activities.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-[var(--text-secondary)] mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold text-[var(--text)] mb-2">No activities found</h3>
          <p className="text-[var(--text-secondary)]">
            {searchQuery
              ? `No activities match "${searchQuery}". Try different search terms.`
              : selectedCategory !== 'All'
              ? `No ${selectedCategory} activities found. Try another category.`
              : 'No activities available at the moment.'}
          </p>
          <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedCategory('All'); fetchActivities(1, false); }} className="mt-4">
            Clear Filters
          </Button>
        </div>
      )}

      {!loading && activities.length > 0 && (
        <>
          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <Card key={activity._id} padding="none" hover>
                <div className="relative">
                  {activity.image ? (
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="aspect-video w-full object-cover rounded-t-lg"
                    />
                  ) : (
                    <div className="aspect-video bg-gradient-to-br rounded-t-lg" style={{ backgroundColor: getCategoryColor(activity.category?.name) }}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-4xl font-bold opacity-20">
                          {activity.category?.icon || '📅'}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    {statusBadge(activity.status)}
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-[var(--text)] flex-1 pr-2">
                      {activity.title}
                    </h3>
                    {participationBadge(activity.participationType)}
                  </div>

                  <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
                    {activity.description}
                  </p>

                  {/* Category & Subcategory */}
                  <div className="flex items-center gap-2">
                    <Badge variant="default" size="sm" className={getCategoryColor(activity.category?.name)}>
                      {activity.category?.name}
                    </Badge>
                    {activity.subcategory && (
                      <Badge variant="default" size="sm" className="bg-[var(--bg)] text-[var(--text-secondary)] border border-[var(--border)]">
                        {activity.subcategory}
                      </Badge>
                    )}
                  </div>

                  {/* Date, Time, Location */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                      <Calendar size={16} className="shrink-0" />
                      <span>{formatDate(activity.date)}</span>
                      <span>•</span>
                      <Clock size={16} className="shrink-0" />
                      <span>{formatTime(activity.startTime)} - {activity.endTime ? formatTime(activity.endTime) : ''}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                      <MapPin size={16} className="shrink-0" />
                      <span>{activity.venue || activity.locality}, {activity.city}</span>
                    </div>
                    {activity.meetingPoint && (
                      <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                        <MapPin size={16} className="shrink-0" />
                        <span className="text-xs">Meet: {activity.meetingPoint}</span>
                      </div>
                    )}
                  </div>

                  {/* Participants & Organizer */}
                  <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
                    <div className="flex items-center gap-2">
                      <Avatar size="sm" fallback={activity.organizer?.fullName?.charAt(0) || 'U'} />
                      <div>
                        <p className="text-sm font-medium text-[var(--text)]">
                          {activity.organizer?.fullName || 'Unknown'}
                        </p>
                        <p className="text-xs text-[var(--text-secondary)]">
                          @{activity.organizer?.username || 'user'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <Users size={16} className="shrink-0" />
                      <span>{activity.currentParticipants}/{activity.maxParticipants}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  {activity.tags && activity.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {activity.tags.slice(0, 4).map((tag) => (
                        <Badge key={tag} variant="default" size="sm" className="bg-[var(--bg)] text-[var(--text-secondary)] border border-[var(--border)]">
                          {tag}
                        </Badge>
                      ))}
                      {activity.tags.length > 4 && (
                        <Badge variant="default" size="sm" className="bg-[var(--bg)] text-[var(--text-secondary)] border border-[var(--border)]">
                          +{activity.tags.length - 4} more
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" fullWidth variant="primary">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      Join
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="text-center">
              <Button variant="outline" onClick={handleLoadMore} loading={loading}>
                Load More Activities
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};