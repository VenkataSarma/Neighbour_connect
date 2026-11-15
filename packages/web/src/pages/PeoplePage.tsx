import { useState, useEffect } from 'react';
import { Search, Filter, UserPlus, MapPin } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import api from '../lib/api';

interface UserProfile {
  _id: string;
  user: {
    _id: string;
    fullName: string;
    username: string;
  };
  bio?: string;
  city: string;
  locality: string;
  interests: string[];
  hobbies: string[];
  skills: string[];
  occupation?: string;
  connectionsCount: number;
  activitiesCreated: number;
  activitiesJoined: number;
}

const ALL_INTERESTS = ['All', 'Running', 'Hiking', 'Photography', 'Travel', 'Gaming', 'Music', 'Food', 'Cricket', 'Badminton', 'Football', 'Cycling', 'Yoga', 'Swimming', 'Gym', 'Music', 'Dance', 'Cooking', 'Coding', 'Design', 'Writing'];

export const PeoplePage = () => {
  const [people, setPeople] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInterest, setSelectedInterest] = useState('All');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPeople = async (pageNum = 1, append = false) => {
    try {
      setLoading(true);
      const params: any = {
        page: pageNum,
        limit: 12,
      };

      if (searchQuery) params.query = searchQuery;
      if (selectedInterest !== 'All') params.interests = selectedInterest;

      const { data } = await api.get('/people/discover', { params });
      const profiles = data.data || [];

      if (append) {
        setPeople(prev => [...prev, ...profiles]);
      } else {
        setPeople(profiles);
      }
      setHasMore(profiles.length === 12);
    } catch (error) {
      console.error('Failed to fetch people:', error);
      setPeople([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople(1, false);
  }, [searchQuery, selectedInterest]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchPeople(1, false);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPeople(nextPage, true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--text)]">Discover People</h1>
        <p className="text-[var(--text-secondary)] mt-2">
          Find and connect with people in your neighbourhood
        </p>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by name, interests, or location..."
            leftIcon={<Search size={18} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button type="submit" variant="outline" leftIcon={<Filter size={18} />}>
          Search
        </Button>
      </form>

      {/* Interest Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {ALL_INTERESTS.map((interest) => (
          <Button
            key={interest}
            size="sm"
            variant={selectedInterest === interest ? 'primary' : 'outline'}
            onClick={() => {
              setSelectedInterest(interest);
              setPage(1);
              fetchPeople(1, false);
            }}
            className="transition-colors"
          >
            {interest}
          </Button>
        ))}
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} padding="lg" className="animate-pulse">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full bg-[var(--border)]" />
                </div>
                <div className="h-6 w-40 bg-[var(--border)] rounded mx-auto mb-2" />
                <div className="h-4 w-32 bg-[var(--border)] rounded mx-auto mb-4" />
                <div className="h-4 w-full bg-[var(--border)] rounded mb-2" />
                <div className="h-4 w-3/4 bg-[var(--border)] rounded mx-auto mb-4" />
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  <div className="h-6 w-20 bg-[var(--border)] rounded-full" />
                  <div className="h-6 w-24 bg-[var(--border)] rounded-full" />
                  <div className="h-6 w-16 bg-[var(--border)] rounded-full" />
                </div>
                <div className="flex justify-center gap-4 mb-4 text-sm">
                  <div className="h-4 w-16 bg-[var(--border)] rounded" />
                  <div className="h-4 w-20 bg-[var(--border)] rounded" />
                </div>
                <div className="flex gap-2">
                  <div className="h-10 w-full bg-[var(--border)] rounded-lg" />
                  <div className="h-10 w-full bg-[var(--border)] rounded-lg" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {!loading && people.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-12 h-12 text-[var(--text-secondary)] mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold text-[var(--text)] mb-2">No people found</h3>
          <p className="text-[var(--text-secondary)]">
            {selectedInterest !== 'All'
              ? `No users with interest "${selectedInterest}" found. Try another filter.`
              : 'No discoverable users in your area yet.'}
          </p>
        </div>
      )}

      {!loading && people.length > 0 && (
        <>
          {/* People Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {people.map((person) => (
              <Card key={person._id} padding="lg" hover>
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <Avatar size="xl" fallback={person.user?.fullName || 'User'} />
                  </div>
                  <h3 className="font-semibold text-[var(--text)] mb-1">{person.user?.fullName || 'User'}</h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-4">@{person.user?.username || 'user'}</p>
                  <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
                    {person.bio || `${person.occupation || 'Professional'} | ${person.city}, ${person.locality}`}
                  </p>

                  {/* Interests */}
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {person.interests?.slice(0, 5).map((interest) => (
                      <Badge key={interest} variant="default" size="sm">
                        {interest}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex justify-center gap-4 mb-4 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-[var(--text)]">{person.activitiesCreated || 0}</div>
                      <div className="text-[var(--text-secondary)]">Created</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-[var(--text)]">{person.activitiesJoined || 0}</div>
                      <div className="text-[var(--text-secondary)]">Joined</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-[var(--text)]">{person.connectionsCount || 0}</div>
                      <div className="text-[var(--text-secondary)]">Connections</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button size="sm" fullWidth leftIcon={<UserPlus size={16} />}>
                      Connect
                    </Button>
                    <Button size="sm" variant="outline">
                      View Profile
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
                Load More People
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};