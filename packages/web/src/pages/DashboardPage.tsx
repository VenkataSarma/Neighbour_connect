import { useAuth } from '../store/authStore';
import api from '../lib/api';
import { useEffect, useState } from 'react';
import { MapPin, Calendar, Clock, Shield } from 'lucide-react';

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

export const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ activitiesJoined: 0, activitiesCreated: 0, connections: 0 });
  const [todayActivities, setTodayActivities] = useState<Activity[]>([]);
  const [nearbyActivities, setNearbyActivities] = useState<Activity[]>([]);
  const [loadingToday, setLoadingToday] = useState(true);
  const [loadingNearby, setLoadingNearby] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [_userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Fetch user stats
  useEffect(() => {
    const fetchStats = async () => {
      if (user?._id) {
        try {
          const profileRes = await api.get(`/profiles/${user._id}`);
          if (profileRes.data?.data) {
            setStats({
              activitiesJoined: profileRes.data.data.activitiesJoined || 0,
              activitiesCreated: profileRes.data.data.activitiesCreated || 0,
              connections: profileRes.data.data.connectionsCount || 0,
            });
          }
        } catch (error) {
          console.error('Failed to fetch stats:', error);
        }
      }
    };
    fetchStats();
  }, [user]);

  // Check if location permission was previously granted
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((permission) => {
        if (permission.state === 'granted') {
          setLocationEnabled(true);
          getCurrentLocation();
        }
      });
    }
  }, []);

  const getCurrentLocation = () => {
    if (!('geolocation' in navigator)) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(coords);
        setLocationEnabled(true);
        fetchNearbyActivities(coords);
      },
      (error) => {
        setLocationError(error.message);
        setLocationEnabled(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const fetchNearbyActivities = async (coords: { lat: number; lng: number }) => {
    try {
      setLoadingNearby(true);
      const { data } = await api.get('/activities/nearby', {
        params: {
          longitude: coords.lng,
          latitude: coords.lat,
          radius: 10000, // 10km radius
        },
      });
      setNearbyActivities(data.data || []);
    } catch (error) {
      console.error('Failed to fetch nearby activities:', error);
      setNearbyActivities([]);
    } finally {
      setLoadingNearby(false);
    }
  };

  // Fetch today's activities
  useEffect(() => {
    const fetchTodayActivities = async () => {
      try {
        setLoadingToday(true);
        const now = new Date();
        const startOfDay = new Date(now);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(now);
        endOfDay.setHours(23, 59, 59, 999);

        const { data } = await api.get('/activities', {
          params: {
            startDate: startOfDay.toISOString(),
            endDate: endOfDay.toISOString(),
            status: 'open',
            limit: 2,
          },
        });
        setTodayActivities(data.data || []);
      } catch (error) {
        console.error('Failed to fetch today activities:', error);
        setTodayActivities([]);
      } finally {
        setLoadingToday(false);
      }
    };
    fetchTodayActivities();
  }, []);

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const requestLocation = () => {
    getCurrentLocation();
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--text)]">Welcome Back!</h1>
        <p className="text-[var(--text-secondary)] mt-2">
          Discover activities happening near you
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="text-[var(--accent)]" size={20} />
            <h3 className="font-semibold text-[var(--text)]">Activities Joined</h3>
          </div>
          <div className="text-3xl font-bold text-[var(--accent)]">{stats.activitiesJoined}</div>
          <div className="text-[var(--text-secondary)] text-sm">Total activities you've participated in</div>
        </div>
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="text-[var(--accent)]" size={20} />
            <h3 className="font-semibold text-[var(--text)]">Activities Created</h3>
          </div>
          <div className="text-3xl font-bold text-[var(--accent)]">{stats.activitiesCreated}</div>
          <div className="text-[var(--text-secondary)] text-sm">Total activities you've organized</div>
        </div>
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="text-[var(--accent)]" size={20} />
            <h3 className="font-semibold text-[var(--text)]">Connections</h3>
          </div>
          <div className="text-3xl font-bold text-[var(--accent)]">{stats.connections}</div>
          <div className="text-[var(--text-secondary)] text-sm">People you're connected with</div>
        </div>
      </div>

      {/* Activities Today */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="text-[var(--accent)]" size={24} />
            <h2 className="text-2xl font-bold text-[var(--text)]">Activities Today</h2>
          </div>
          <a href="/activities" className="text-[var(--accent)] hover:underline text-sm flex items-center gap-1">
            View all
            <span>→</span>
          </a>
        </div>

        {loadingToday ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-4 animate-pulse">
                <div className="h-6 w-3/4 bg-[var(--border)] rounded mb-2" />
                <div className="h-4 w-full bg-[var(--border)] rounded mb-1" />
                <div className="h-4 w-1/2 bg-[var(--border)] rounded mb-1" />
                <div className="h-4 w-1/3 bg-[var(--border)] rounded" />
              </div>
            ))}
          </div>
        ) : todayActivities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {todayActivities.map((activity) => (
              <div key={activity._id} className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-[var(--text)] flex-1 pr-2">{activity.title}</h3>
                  <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded-full text-xs font-medium">
                    Live Today
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-3 line-clamp-2">{activity.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                    <Clock size={16} className="shrink-0" />
                    <span>{formatTime(activity.startTime)} - {activity.endTime ? formatTime(activity.endTime) : ''}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                    <MapPin size={16} className="shrink-0" />
                    <span>{activity.venue || activity.locality}, {activity.city}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                    <span className="bg-[var(--accent-light)] text-[var(--accent)] px-2 py-0.5 rounded-full text-xs font-medium">
                      {activity.currentParticipants}/{activity.maxParticipants} joined
                    </span>
                  </div>
                </div>
                <a href={`/activities/${activity._id}`} className="block mt-4 text-center text-[var(--accent)] hover:underline text-sm font-medium">
                  View Details →
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-8 text-center">
            <Calendar className="w-12 h-12 text-[var(--text-secondary)] mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-[var(--text)] mb-2">No activities scheduled for today</h3>
            <p className="text-[var(--text-secondary)] mb-4">
              Be the first to create one or check back later for new activities!
            </p>
            <a href="/activities/create" className="inline-flex items-center gap-2 text-[var(--accent)] hover:underline font-medium">
              <span>Create Activity</span>
              <span>→</span>
            </a>
          </div>
        )}
      </div>

      {/* Nearby Activities with Location */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="text-[var(--accent)]" size={24} />
            <h2 className="text-2xl font-bold text-[var(--text)]">Nearby Activities</h2>
          </div>
          {!locationEnabled ? (
            <button
              onClick={requestLocation}
              disabled={loadingNearby}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white rounded-lg hover:opacity-90 transition-all text-sm font-medium"
            >
              <MapPin size={16} />
              <span>Enable Location</span>
            </button>
          ) : (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-xs font-medium">
              <MapPin size={12} />
              <span>Location Active</span>
            </span>
          )}
        </div>

        {locationError && (
          <div className="mb-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
              <Shield size={18} />
              <span className="text-sm">{locationError}</span>
            </div>
            <button
              onClick={requestLocation}
              className="mt-2 text-sm text-[var(--accent)] hover:underline"
            >
              Try Again
            </button>
          </div>
        )}

        {loadingNearby ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-4 animate-pulse">
                <div className="aspect-video bg-[var(--border)] rounded-lg mb-3" />
                <div className="h-5 w-3/4 bg-[var(--border)] rounded mb-2" />
                <div className="h-4 w-full bg-[var(--border)] rounded mb-1" />
                <div className="h-4 w-1/2 bg-[var(--border)] rounded mb-1" />
                <div className="flex gap-2">
                  <div className="h-4 w-16 bg-[var(--border)] rounded-full" />
                  <div className="h-4 w-20 bg-[var(--border)] rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : nearbyActivities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nearbyActivities.map((activity) => (
              <div key={activity._id} className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-[var(--text)] flex-1 pr-2">{activity.title}</h3>
                  <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded-full text-xs font-medium">
                    Open
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-3 line-clamp-2">{activity.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                    <Clock size={16} className="shrink-0" />
                    <span>{formatTime(activity.startTime)} - {activity.endTime ? formatTime(activity.endTime) : ''}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                    <MapPin size={16} className="shrink-0" />
                    <span>{activity.venue || activity.locality}, {activity.city}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                    <span className="bg-[var(--accent-light)] text-[var(--accent)] px-2 py-0.5 rounded-full text-xs font-medium">
                      {activity.currentParticipants}/{activity.maxParticipants} joined
                    </span>
                  </div>
                </div>
                <a href={`/activities/${activity._id}`} className="block mt-4 text-center text-[var(--accent)] hover:underline text-sm font-medium">
                  View Details →
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-8 text-center">
            <MapPin className="w-12 h-12 text-[var(--text-secondary)] mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-[var(--text)] mb-2">No nearby activities found</h3>
            <p className="text-[var(--text-secondary)] mb-4">
              Try expanding your search radius or check back later for new activities in your area!
            </p>
            <button
              onClick={requestLocation}
              className="inline-flex items-center gap-2 text-[var(--accent)] hover:underline font-medium"
            >
              <span>Refresh Location</span>
              <span>→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
