import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Calendar,
  Users,
  MessageCircle,
  MapPin,
  Star,
  Shield,
  Zap,
  Heart,
  Globe,
  CheckCircle,
  ChevronRight,
  Dumbbell,
  Camera,
  Music,
  Gamepad2,
  BookOpen,
  Utensils,
  Plane,
  Mountain,
  Wifi,
  Sparkles
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';

const stats = [
  { value: '10K+', label: 'Active Members', icon: Users },
  { value: '500+', label: 'Activities Weekly', icon: Calendar },
  { value: '50+', label: 'Neighbourhoods', icon: MapPin },
  { value: '98%', label: 'Match Success Rate', icon: Star },
];

const features = [
  {
    icon: Users,
    title: 'Find Your Tribe',
    description: 'Connect with people who share your passions. Whether you\'re into hiking, coding, photography, or gaming—there\'s a community waiting for you.',
    color: 'bg-emerald-500',
  },
  {
    icon: Calendar,
    title: 'Discover Local Events',
    description: 'From sunrise yoga to weekend hackathons. Browse activities happening right in your neighbourhood, tailored to your interests.',
    color: 'bg-blue-500',
  },
  {
    icon: MessageCircle,
    title: 'Build Real Connections',
    description: 'Move beyond superficial likes. Join activities, chat in groups, and build meaningful friendships with people who actually share your values.',
    color: 'bg-purple-500',
  },
  {
    icon: Zap,
    title: 'Create in Seconds',
    description: 'Host a board game night, organize a study group, or plan a trek. Our intuitive tools help you create and manage events effortlessly.',
    color: 'bg-orange-500',
  },
  {
    icon: Shield,
    title: 'Safe & Verified',
    description: 'Every member is verified. Built-in safety features, community guidelines, and moderation ensure a respectful environment for everyone.',
    color: 'bg-red-500',
  },
  {
    icon: Globe,
    title: 'Hyperlocal Focus',
    description: 'Connect with people within 5km of you. No more travelling across the city—your next best friend or activity partner is just around the corner.',
    color: 'bg-teal-500',
  },
];

const categories = [
  { name: 'Sports & Fitness', icon: Dumbbell, color: 'bg-emerald-100 text-emerald-600', count: '120+' },
  { name: 'Photography & Art', icon: Camera, color: 'bg-pink-100 text-pink-600', count: '85+' },
  { name: 'Music & Jam Sessions', icon: Music, color: 'bg-purple-100 text-purple-600', count: '60+' },
  { name: 'Gaming & Esports', icon: Gamepad2, color: 'bg-blue-100 text-blue-600', count: '200+' },
  { name: 'Learning & Workshops', icon: BookOpen, color: 'bg-amber-100 text-amber-600', count: '150+' },
  { name: 'Food & Social', icon: Utensils, color: 'bg-orange-100 text-orange-600', count: '90+' },
  { name: 'Travel & Adventure', icon: Plane, color: 'bg-teal-100 text-teal-600', count: '75+' },
  { name: 'Hiking & Outdoors', icon: Mountain, color: 'bg-green-100 text-green-600', count: '110+' },
];

const suggestedActivities = [
  {
    title: 'Sunrise Yoga at Central Park',
    category: 'Sports & Fitness',
    subcategory: 'Yoga',
    time: 'Tomorrow, 6:00 AM',
    location: 'Central Park, Meadow',
    participants: '12/20 joined',
    status: 'open',
    organizer: { name: 'Sarah Chen', username: 'sarah_yoga', initials: 'SC' },
    tags: ['Beginner Friendly', 'Outdoor', 'Free'],
  },
  {
    title: 'Street Photography Walk - Downtown',
    category: 'Photography & Art',
    subcategory: 'Street Photography',
    time: 'This Saturday, 10:00 AM',
    location: 'Downtown Arts District',
    participants: '8/15 joined',
    status: 'open',
    organizer: { name: 'Mike Rodriguez', username: 'mike_shots', initials: 'MR' },
    tags: ['All Levels', '2 Hours', 'Coffee After'],
  },
  {
    title: 'Indie Game Dev Meetup',
    category: 'Gaming & Esports',
    subcategory: 'Game Development',
    time: 'Friday, 7:00 PM',
    location: 'Tech Hub Coworking',
    participants: '25/30 joined',
    status: 'almost_full',
    organizer: { name: 'Alex Kim', username: 'alex_codes', initials: 'AK' },
    tags: ['Unity', 'Networking', 'Pizza Provided'],
  },
  {
    title: 'Weekend Hike - Eagle Trail',
    category: 'Travel & Adventure',
    subcategory: 'Hiking',
    time: 'Sunday, 7:30 AM',
    location: 'Eagle Trailhead',
    participants: '18/25 joined',
    status: 'open',
    organizer: { name: 'Priya Patel', username: 'priya_hikes', initials: 'PP' },
    tags: ['Moderate', '5 Miles', 'Nature Photography'],
  },
];

const friendRecommendations = [
  { name: 'Emma Wilson', username: 'emma_runs', mutual: 3, interests: ['Running', 'Coffee', 'Photography'], location: '0.8 km away', avatar: 'EW' },
  { name: 'James Park', username: 'james_codes', mutual: 5, interests: ['React', 'Gaming', 'Hiking'], location: '1.2 km away', avatar: 'JP' },
  { name: 'Lisa Thompson', username: 'lisa_creates', mutual: 2, interests: ['Pottery', 'Yoga', 'Travel'], location: '0.5 km away', avatar: 'LT' },
  { name: 'David Kim', username: 'david_games', mutual: 4, interests: ['Valorant', 'Board Games', 'Cooking'], location: '1.5 km away', avatar: 'DK' },
];

const testimonials = [
  {
    quote: "I moved to a new city and knew no one. Within two weeks, I found a running group, a photography buddy, and made genuine friends. This app changed my life.",
    author: 'Maria Santos',
    role: 'Software Engineer',
    location: 'Brooklyn, NY',
    avatar: 'MS',
  },
  {
    quote: "As an introvert, meeting people was hard. But joining activities based on shared interests made it natural. No awkward small talk—just pure connection.",
    author: 'David Chen',
    role: 'Designer',
    location: 'Austin, TX',
    avatar: 'DC',
  },
  {
    quote: "I started a weekly board game night that grew from 4 to 30 regulars. Now we have a whole community. The tools make organizing effortless.",
    author: 'Rachel Kim',
    role: 'Teacher',
    location: 'Seattle, WA',
    avatar: 'RK',
  },
];

const whyNow = [
  {
    icon: Wifi,
    title: 'Digital Fatigue is Real',
    description: 'We spend 7+ hours on screens but feel more isolated than ever. We need real connections, not more followers.',
  },
  {
    icon: Heart,
    title: 'Community is Health',
    description: 'Research shows strong social connections increase lifespan by 50%. Loneliness is as harmful as smoking 15 cigarettes a day.',
  },
  {
    icon: Sparkles,
    title: 'Your Interests Define You',
    description: 'Algorithms show you what you\'ve seen. We show you who you could become—through people who share your passions.',
  },
  {
    icon: Globe,
    title: 'Hyperlocal is the Future',
    description: 'The best connections happen within walking distance. Strong neighbourhoods build resilient, happy cities.',
  },
];

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--card)]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">NC</span>
              </div>
              <span className="font-semibold text-xl hidden sm:block">Neighbourhood Connect</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-[var(--text-secondary)] hover:text-[var(--text)] font-medium transition-colors">
                Login
              </Link>
              <Link to="/register">
                <Button size="sm" rightIcon={<ArrowRight size={16} />}>
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-light)] text-[var(--accent)] text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Now live in 50+ neighbourhoods — Join 10,000+ members
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[var(--text)] leading-tight mb-6">
            Find People Who{' '}
            <span className="text-[var(--accent)]">Share Your Passions</span>
            {' '}Right Around the Corner
          </h1>

          <p className="text-xl sm:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-10 leading-relaxed">
            Tired of superficial social media? Connect with real people nearby who love what you love.
            From sunrise runs to coding sessions, pottery to gaming—your tribe is waiting.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/register">
              <Button size="lg" rightIcon={<ArrowRight size={20} />} className="w-full sm:w-auto">
                Start Free — No Credit Card Required
              </Button>
            </Link>
            <Link to="/activities">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Browse Activities Near You
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-[var(--text-secondary)]">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-emerald-500" size={16} />
              <span>Verified profiles only</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-emerald-500" size={16} />
              <span>No ads, ever</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-emerald-500" size={16} />
              <span>Your data stays yours</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-emerald-500" size={16} />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Now Section */}
      <section className="py-24 px-4 bg-[var(--card)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="info" className="mb-4">Why Neighbourhood Connect? Why Now?</Badge>
            <h2 className="text-4xl font-bold text-[var(--text)] mb-4">
              The World Needs Real Connection More Than Ever
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              We're more "connected" than ever, yet loneliness is at an all-time high. Here's why we built this differently.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyNow.map((item, index) => (
              <Card key={index} padding="lg" hover className="h-full">
                <div className="w-12 h-12 rounded-xl bg-[var(--accent-light)] flex items-center justify-center mb-4">
                  <item.icon className="text-[var(--accent)]" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-[var(--text)] mb-2">{item.title}</h3>
                <p className="text-[var(--text-secondary)]">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="success" className="mb-4">How It Works</Badge>
            <h2 className="text-4xl font-bold text-[var(--text)] mb-4">Three Steps to Your New Community</h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              No complex algorithms. No endless swiping. Just genuine connections based on what you love.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: feature.color }}>
                  <feature.icon className="text-white" size={28} />
                </div>
                <Card padding="lg" className="pt-10 h-full text-center">
                  <h3 className="text-xl font-semibold text-[var(--text)] mb-3">{feature.title}</h3>
                  <p className="text-[var(--text-secondary)]">{feature.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Preview - Suggested Activities */}
      <section className="py-24 px-4 bg-[var(--card)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <Badge variant="info" className="mb-4">Live Preview</Badge>
              <h2 className="text-4xl font-bold text-[var(--text)] mb-2">Activities Happening Near You Right Now</h2>
              <p className="text-xl text-[var(--text-secondary)]">This is what your feed looks like after you join. Real activities from real people.</p>
            </div>
            <Link to="/activities">
              <Button variant="outline" rightIcon={<ChevronRight size={16} />}>
                View All Activities
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {suggestedActivities.map((activity, index) => (
              <Card key={index} padding="none" hover className="overflow-hidden h-full flex flex-col">
                <div className="relative h-40 bg-gradient-to-br from-emerald-500 to-teal-600">
                  <div className="absolute top-3 right-3">
                    <Badge variant={activity.status === 'almost_full' ? 'warning' : 'success'} size="sm">
                      {activity.status === 'almost_full' ? 'Almost Full' : 'Open Spots'}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between">
                    <Badge variant="default" size="sm" className="bg-[var(--accent-light)] text-[var(--accent)]">
                      {activity.category}
                    </Badge>
                    <Badge variant="default" size="sm" className="bg-[var(--bg)] text-[var(--text-secondary)] border border-[var(--border)]">
                      {activity.subcategory}
                    </Badge>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-semibold text-[var(--text)] mb-2 line-clamp-1">{activity.title}</h3>

                  <div className="space-y-2 mb-4 text-sm text-[var(--text-secondary)]">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{activity.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{activity.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      <span>{activity.participants}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {activity.tags.map((tag) => (
                      <Badge key={tag} variant="default" size="sm" className="bg-[var(--bg)] text-[var(--text-secondary)] border border-[var(--border)]">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[var(--border)] mt-auto">
                    <div className="flex items-center gap-3">
                      <Avatar size="sm" fallback={activity.organizer.initials} />
                      <div>
                        <p className="text-sm font-medium text-[var(--text)]">{activity.organizer.name}</p>
                        <p className="text-xs text-[var(--text-secondary)]">@{activity.organizer.username}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Join</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/activities">
              <Button variant="outline" rightIcon={<ChevronRight size={16} />}>
                Explore All Activities →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Friend Recommendations Preview */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <Badge variant="secondary" className="mb-4">For You</Badge>
              <h2 className="text-4xl font-bold text-[var(--text)] mb-2">People You Might Know</h2>
              <p className="text-xl text-[var(--text-secondary)]">Based on mutual friends, shared interests, and proximity. Your community starts here.</p>
            </div>
            <Link to="/people">
              <Button variant="outline" rightIcon={<ChevronRight size={16} />}>
                Discover More People
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {friendRecommendations.map((friend, index) => (
              <Card key={index} padding="lg" hover className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar size="xl" fallback={friend.avatar} />
                </div>
                <h3 className="font-semibold text-[var(--text)] mb-1">{friend.name}</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-2">@{friend.username}</p>

                <div className="flex items-center justify-center gap-2 text-sm text-[var(--accent)] mb-3">
                  <Users size={16} />
                  <span>{friend.mutual} mutual connections</span>
                </div>

                <p className="text-xs text-[var(--text-secondary)] mb-4 flex items-center justify-center gap-1">
                  <MapPin size={12} />
                  <span>{friend.location}</span>
                </p>

                <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                  {friend.interests.map((interest) => (
                    <Badge key={interest} variant="default" size="sm" className="bg-[var(--accent-light)] text-[var(--accent)]">
                      {interest}
                    </Badge>
                  ))}
                </div>

                <Button size="sm" variant="outline" className="w-full">
                  Connect
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-[var(--accent-light)] flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-[var(--accent)]" size={28} />
                </div>
                <div className="text-4xl font-bold text-[var(--text)] mb-1">{stat.value}</div>
                <div className="text-[var(--text-secondary)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="success" className="mb-4">Trusted by Thousands</Badge>
            <h2 className="text-4xl font-bold text-[var(--text)] mb-4">Real Stories from Real People</h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Don't just take our word for it. Hear from members who found their community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} padding="lg" hover className="h-full">
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="text-amber-400" size={20} fill="currentColor" />
                  ))}
                </div>
                <p className="text-[var(--text)] mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <Avatar fallback={testimonial.avatar} />
                  <div>
                    <p className="font-semibold text-[var(--text)]">{testimonial.author}</p>
                    <p className="text-sm text-[var(--text-secondary)]">{testimonial.role} · {testimonial.location}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 px-4 bg-[var(--card)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="info" className="mb-4">Explore</Badge>
            <h2 className="text-4xl font-bold text-[var(--text)] mb-4">50+ Interest Categories</h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Whatever you're into, there's a community for it. And if there isn't—create one.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category) => (
              <Card key={category.name} padding="md" hover className="text-center group">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: category.color.replace('100', '500').replace('600', '500') }}>
                  <category.icon className="text-white" size={24} />
                </div>
                <h3 className="font-semibold text-[var(--text)] mb-1">{category.name}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{category.count} activities</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2036v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%206V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-10" />

        <div className="relative max-w-4xl mx-auto text-center">
          <Badge variant="default" className="mb-6 bg-white/20 text-white border-white/30">Ready to Find Your People?</Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Join 10,000+ People Building Real Connections
          </h2>
          <p className="text-xl text-emerald-50 mb-10 max-w-2xl mx-auto">
            Free to join. No credit card required. Cancel anytime. Your neighbourhood is waiting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" rightIcon={<ArrowRight size={20} />} className="bg-white text-emerald-600 hover:bg-emerald-50 w-full sm:w-auto">
                Create Free Account
              </Button>
            </Link>
            <Link to="/activities">
              <Button size="lg" variant="ghost" className="text-white border-white/30 hover:bg-white/10 w-full sm:w-auto">
                Browse Activities First
              </Button>
            </Link>
          </div>
          <p className="mt-8 text-emerald-100 text-sm">
            <Shield className="inline w-4 h-4 mr-1" /> Secure · <Users className="inline w-4 h-4 mx-1" /> Verified · <Globe className="inline w-4 h-4 mx-1" /> Local
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] bg-[var(--card)] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">NC</span>
                </div>
                <span className="font-semibold text-xl">Neighbourhood Connect</span>
              </Link>
              <p className="text-[var(--text-secondary)] max-w-sm mb-6">
                Building real connections in a digital world. Find your tribe, share your passions, experience more together.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors" aria-label="Twitter">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
                </a>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors" aria-label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-[var(--text)] mb-4">Explore</h4>
              <ul className="space-y-2">
                <li><Link to="/activities" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Browse Activities</Link></li>
                <li><Link to="/people" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Discover People</Link></li>
                <li><Link to="/categories" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Categories</Link></li>
                <li><Link to="/create" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Create Activity</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-[var(--text)] mb-4">Community</h4>
              <ul className="space-y-2">
                <li><Link to="/guidelines" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Community Guidelines</Link></li>
                <li><Link to="/safety" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Safety Center</Link></li>
                <li><Link to="/help" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Help Center</Link></li>
                <li><Link to="/blog" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Blog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-[var(--text)] mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">About Us</Link></li>
                <li><Link to="/careers" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Careers</Link></li>
                <li><Link to="/press" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Press</Link></li>
                <li><Link to="/contact" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center">
            <p className="text-[var(--text-secondary)] text-sm">
              © 2026 Neighbourhood Connect. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-[var(--text-secondary)] hover:text-[var(--accent)] text-sm transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-[var(--text-secondary)] hover:text-[var(--accent)] text-sm transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="text-[var(--text-secondary)] hover:text-[var(--accent)] text-sm transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};