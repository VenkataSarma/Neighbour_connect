import Category from '../models/Category';
import User from '../models/User';
import UserProfile from '../models/UserProfile';
import Activity from '../models/Activity';
import bcrypt from 'bcryptjs';

export const seedCategories = async (): Promise<void> => {
  try {
    // Seed categories if not already seeded
    const catCount = await Category.countDocuments();
    if (catCount === 0) {
      const initialCategories = [
        {
          name: 'Sports and Fitness',
          slug: 'sports-fitness',
          description: 'Join sports activities, fitness groups, and workout partners',
          icon: 'Trophy',
          subcategories: [
            { name: 'Cricket', slug: 'cricket', isActive: true },
            { name: 'Football', slug: 'football', isActive: true },
            { name: 'Badminton', slug: 'badminton', isActive: true },
            { name: 'Basketball', slug: 'basketball', isActive: true },
            { name: 'Volleyball', slug: 'volleyball', isActive: true },
            { name: 'Running', slug: 'running', isActive: true },
            { name: 'Cycling', slug: 'cycling', isActive: true },
            { name: 'Gym', slug: 'gym', isActive: true },
            { name: 'Yoga', slug: 'yoga', isActive: true },
            { name: 'Swimming', slug: 'swimming', isActive: true },
            { name: 'Trekking', slug: 'trekking', isActive: true },
          ],
          isActive: true,
          sortOrder: 1,
        },
        {
          name: 'Travel and Exploration',
          slug: 'travel-exploration',
          description: 'Find travel companions and explore new places',
          icon: 'Map',
          subcategories: [
            { name: 'Weekend Trips', slug: 'weekend-trips', isActive: true },
            { name: 'Road Trips', slug: 'road-trips', isActive: true },
            { name: 'Bike Rides', slug: 'bike-rides', isActive: true },
            { name: 'Trekking', slug: 'trekking', isActive: true },
            { name: 'Camping', slug: 'camping', isActive: true },
            { name: 'Sightseeing', slug: 'sightseeing', isActive: true },
            { name: 'Photography Trips', slug: 'photography-trips', isActive: true },
          ],
          isActive: true,
          sortOrder: 2,
        },
        {
          name: 'Learning and Education',
          slug: 'learning-education',
          description: 'Study together and learn new skills',
          icon: 'BookOpen',
          subcategories: [
            { name: 'Programming', slug: 'programming', isActive: true },
            { name: 'Language Learning', slug: 'language-learning', isActive: true },
            { name: 'Mathematics', slug: 'mathematics', isActive: true },
            { name: 'Exam Preparation', slug: 'exam-preparation', isActive: true },
            { name: 'Study Groups', slug: 'study-groups', isActive: true },
            { name: 'Music Learning', slug: 'music-learning', isActive: true },
            { name: 'Skill Development', slug: 'skill-development', isActive: true },
          ],
          isActive: true,
          sortOrder: 3,
        },
        {
          name: 'Gaming and Entertainment',
          slug: 'gaming-entertainment',
          description: 'Gaming sessions, movie outings, and entertainment',
          icon: 'Gamepad2',
          subcategories: [
            { name: 'Online Gaming', slug: 'online-gaming', isActive: true },
            { name: 'Multiplayer Gaming', slug: 'multiplayer-gaming', isActive: true },
            { name: 'Chess', slug: 'chess', isActive: true },
            { name: 'Board Games', slug: 'board-games', isActive: true },
            { name: 'Movie Outings', slug: 'movie-outings', isActive: true },
            { name: 'Concerts', slug: 'concerts', isActive: true },
            { name: 'Gaming Meetups', slug: 'gaming-meetups', isActive: true },
          ],
          isActive: true,
          sortOrder: 4,
        },
        {
          name: 'Social and Community',
          slug: 'social-community',
          description: 'Social meetups and community events',
          icon: 'Users',
          subcategories: [
            { name: 'Coffee Meetups', slug: 'coffee-meetups', isActive: true },
            { name: 'Food Outings', slug: 'food-outings', isActive: true },
            { name: 'Weekend Gatherings', slug: 'weekend-gatherings', isActive: true },
            { name: 'Cultural Events', slug: 'cultural-events', isActive: true },
            { name: 'Volunteering', slug: 'volunteering', isActive: true },
            { name: 'Community Events', slug: 'community-events', isActive: true },
            { name: 'Book Clubs', slug: 'book-clubs', isActive: true },
          ],
          isActive: true,
          sortOrder: 5,
        },
        {
          name: 'Hobbies and Creativity',
          slug: 'hobbies-creativity',
          description: 'Creative pursuits and hobby groups',
          icon: 'Palette',
          subcategories: [
            { name: 'Photography', slug: 'photography', isActive: true },
            { name: 'Painting', slug: 'painting', isActive: true },
            { name: 'Drawing', slug: 'drawing', isActive: true },
            { name: 'Music', slug: 'music', isActive: true },
            { name: 'Dance', slug: 'dance', isActive: true },
            { name: 'Video Editing', slug: 'video-editing', isActive: true },
            { name: 'Content Creation', slug: 'content-creation', isActive: true },
            { name: 'Creative Workshops', slug: 'creative-workshops', isActive: true },
          ],
          isActive: true,
          sortOrder: 6,
        },
      ];

      await Category.insertMany(initialCategories);
      console.log('✅ Initial categories seeded successfully');
    } else {
      console.log('✅ Categories already seeded');
    }

    // Seed sample users and activities
    await seedSampleUsers();
    await seedSampleActivities();
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  }
};

const seedSampleUsers = async (): Promise<void> => {
  try {
    const userCount = await User.countDocuments();
    // Check if our specific seeded users exist
    const existingUsers = await User.find({ email: { $in: [
      'runner1@example.com', 'runner2@example.com', 'sports1@example.com',
      'sports2@example.com', 'photo1@example.com', 'photo2@example.com',
      'photo3@example.com', 'travel1@example.com', 'gaming1@example.com',
      'music1@example.com', 'food1@example.com', 'user@gmail.com'
    ]}}).select('email');

    if (existingUsers.length >= 12) {
      console.log('✅ Sample users already seeded');
      return;
    }

    const sampleUsers = [
      // Test user for easy login
      {
        email: 'user@gmail.com',
        password: await bcrypt.hash('user1234', 12),
        fullName: 'Test User',
        username: 'testuser',
        phone: '+91 9876543200',
        role: 'user',
        isEmailVerified: true,
        isActive: true,
        profile: {
          city: 'Hyderabad',
          locality: 'Banjara Hills',
          location: { type: 'Point', coordinates: [78.4244, 17.4183] },
          interests: ['Running', 'Photography', 'Travel', 'Food'],
          hobbies: ['Running', 'Photography', 'Cooking'],
          skills: ['Street Photography', 'Marathon Running'],
          occupation: 'Software Developer',
          bio: 'Love exploring new places and capturing moments!',
        },
      },
      // Chat contacts for test user
      {
        email: 'akhil@gmail.com',
        password: await bcrypt.hash('password123', 12),
        fullName: 'Akhil',
        username: 'akhil',
        phone: '+91 9876543290',
        role: 'user',
        isEmailVerified: true,
        isActive: true,
        profile: {
          city: 'Hyderabad',
          locality: 'Jubilee Hills',
          location: { type: 'Point', coordinates: [78.4244, 17.4183] },
          interests: ['Running', 'Photography', 'Cycling'],
          hobbies: ['Running', 'Cycling', 'Coffee'],
          skills: ['Long Distance Running', 'Cycling'],
          occupation: 'Fitness Enthusiast',
          bio: 'Love running and cycling around the city!',
        },
      },
      {
        email: 'ram@gmail.com',
        password: await bcrypt.hash('password123', 12),
        fullName: 'Ram',
        username: 'ram',
        phone: '+91 9876543291',
        role: 'user',
        isEmailVerified: true,
        isActive: true,
        profile: {
          city: 'Hyderabad',
          locality: 'Gachibowli',
          location: { type: 'Point', coordinates: [78.3447, 17.4405] },
          interests: ['Cricket', 'Badminton', 'Food'],
          hobbies: ['Cricket', 'Badminton', 'Cooking'],
          skills: ['Cricket Coaching', 'Badminton'],
          occupation: 'Sports Coach',
          bio: 'Sports lover and foodie!',
        },
      },
      // Running (2 users)
      // Running (2 users)
      {
        email: 'runner1@example.com',
        password: await bcrypt.hash('password123', 12),
        fullName: 'Rahul Kumar',
        username: 'rahul_runs',
        phone: '+91 9876543210',
        role: 'user',
        isEmailVerified: true,
        isActive: true,
        profile: {
          city: 'Hyderabad',
          locality: 'Banjara Hills',
          location: { type: 'Point', coordinates: [78.4867, 17.3850] },
          interests: ['Running', 'Marathon', 'Fitness'],
          hobbies: ['Running', 'Cycling'],
          skills: ['Long Distance Running'],
          occupation: 'Software Engineer',
        },
      },
      {
        email: 'runner2@example.com',
        password: await bcrypt.hash('password123', 12),
        fullName: 'Priya Sharma',
        username: 'priya_marathon',
        phone: '+91 9876543211',
        role: 'user',
        isEmailVerified: true,
        isActive: true,
        profile: {
          city: 'Hyderabad',
          locality: 'Jubilee Hills',
          location: { type: 'Point', coordinates: [78.4244, 17.4183] },
          interests: ['Running', 'Sprinting', 'Fitness'],
          hobbies: ['Running', 'Yoga'],
          skills: ['Sprint Training'],
          occupation: 'Fitness Trainer',
        },
      },
      // Sports (2 users)
      {
        email: 'sports1@example.com',
        password: await bcrypt.hash('password123', 12),
        fullName: 'Arjun Reddy',
        username: 'arjun_sports',
        phone: '+91 9876543212',
        role: 'user',
        isEmailVerified: true,
        isActive: true,
        profile: {
          city: 'Hyderabad',
          locality: 'Gachibowli',
          location: { type: 'Point', coordinates: [78.3447, 17.4405] },
          interests: ['Cricket', 'Badminton', 'Football'],
          hobbies: ['Cricket', 'Football'],
          skills: ['Cricket Coaching'],
          occupation: 'Sports Coach',
        },
      },
      {
        email: 'sports2@example.com',
        password: await bcrypt.hash('password123', 12),
        fullName: 'Sneha Patel',
        username: 'sneha_badminton',
        phone: '+91 9876543213',
        role: 'user',
        isEmailVerified: true,
        isActive: true,
        profile: {
          city: 'Hyderabad',
          locality: 'Kondapur',
          location: { type: 'Point', coordinates: [78.3582, 17.4671] },
          interests: ['Badminton', 'Tennis', 'Table Tennis'],
          hobbies: ['Badminton', 'Swimming'],
          skills: ['Badminton Umpire'],
          occupation: 'Physical Education Teacher',
        },
      },
      // Photography (3 users)
      {
        email: 'photo1@example.com',
        password: await bcrypt.hash('password123', 12),
        fullName: 'Karan Singh',
        username: 'karan_clicks',
        phone: '+91 9876543214',
        role: 'user',
        isEmailVerified: true,
        isActive: true,
        profile: {
          city: 'Hyderabad',
          locality: 'Hitech City',
          location: { type: 'Point', coordinates: [78.3836, 17.4435] },
          interests: ['Photography', 'Street Photography', 'Portrait'],
          hobbies: ['Photography', 'Travel'],
          skills: ['Lightroom', 'Photoshop'],
          occupation: 'Freelance Photographer',
        },
      },
      {
        email: 'photo2@example.com',
        password: await bcrypt.hash('password123', 12),
        fullName: 'Ananya Desai',
        username: 'ananya_lens',
        phone: '+91 9876543215',
        role: 'user',
        isEmailVerified: true,
        isActive: true,
        profile: {
          city: 'Hyderabad',
          locality: 'Madhapur',
          location: { type: 'Point', coordinates: [78.3872, 17.4474] },
          interests: ['Photography', 'Landscape', 'Wildlife'],
          hobbies: ['Photography', 'Hiking'],
          skills: ['Wildlife Photography', 'Drone Flying'],
          occupation: 'Travel Blogger',
        },
      },
      {
        email: 'photo3@example.com',
        password: await bcrypt.hash('password123', 12),
        fullName: 'Vikram Nair',
        username: 'vikram_shutter',
        phone: '+91 9876543216',
        role: 'user',
        isEmailVerified: true,
        isActive: true,
        profile: {
          city: 'Hyderabad',
          locality: 'Kukatpally',
          location: { type: 'Point', coordinates: [78.4319, 17.4856] },
          interests: ['Photography', 'Macro', 'Astrophotography'],
          hobbies: ['Photography', 'Stargazing'],
          skills: ['Macro Photography', 'Night Photography'],
          occupation: 'IT Professional',
        },
      },
      // Travel (1 user)
      {
        email: 'travel1@example.com',
        password: await bcrypt.hash('password123', 12),
        fullName: 'Meera Joshi',
        username: 'meera_wanderer',
        phone: '+91 9876543217',
        role: 'user',
        isEmailVerified: true,
        isActive: true,
        profile: {
          city: 'Hyderabad',
          locality: 'Secunderabad',
          location: { type: 'Point', coordinates: [78.4983, 17.4399] },
          interests: ['Travel', 'Backpacking', 'Road Trips'],
          hobbies: ['Travel', 'Camping', 'Trekking'],
          skills: ['Trip Planning', 'Budget Travel'],
          occupation: 'Travel Consultant',
        },
      },
      // Gaming (1 user)
      {
        email: 'gaming1@example.com',
        password: await bcrypt.hash('password123', 12),
        fullName: 'Aditya Rao',
        username: 'aditya_gamer',
        phone: '+91 9876543218',
        role: 'user',
        isEmailVerified: true,
        isActive: true,
        profile: {
          city: 'Hyderabad',
          locality: 'Ameerpet',
          location: { type: 'Point', coordinates: [78.4462, 17.4421] },
          interests: ['Gaming', 'Esports', 'Streaming'],
          hobbies: ['Gaming', 'Content Creation'],
          skills: ['Video Editing', 'Live Streaming'],
          occupation: 'Content Creator',
        },
      },
      // Music (1 user)
      {
        email: 'music1@example.com',
        password: await bcrypt.hash('password123', 12),
        fullName: 'Shreya Iyer',
        username: 'shreya_music',
        phone: '+91 9876543219',
        role: 'user',
        isEmailVerified: true,
        isActive: true,
        profile: {
          city: 'Hyderabad',
          locality: 'Somajiguda',
          location: { type: 'Point', coordinates: [78.4589, 17.4239] },
          interests: ['Music', 'Guitar', 'Singing'],
          hobbies: ['Music', 'Songwriting'],
          skills: ['Guitar', 'Vocal Training'],
          occupation: 'Music Teacher',
        },
      },
      // Food (1 user)
      {
        email: 'food1@example.com',
        password: await bcrypt.hash('password123', 12),
        fullName: 'Rohit Agarwal',
        username: 'rohit_foodie',
        phone: '+91 9876543220',
        role: 'user',
        isEmailVerified: true,
        isActive: true,
        profile: {
          city: 'Hyderabad',
          locality: 'Charminar',
          location: { type: 'Point', coordinates: [78.4744, 17.3616] },
          interests: ['Food', 'Cooking', 'Food Photography'],
          hobbies: ['Cooking', 'Food Blogging'],
          skills: ['Recipe Development', 'Food Styling'],
          occupation: 'Food Blogger',
        },
      },
    ];

    for (const userData of sampleUsers) {
      const { profile, ...userFields } = userData;
      const existingUser = await User.findOne({ email: userFields.email });
      if (existingUser) continue;

      const user = await User.create(userFields);

      await UserProfile.create({
        user: user._id,
        ...profile,
        isDiscoverable: true,
        profileVisibility: 'public',
        onboardingCompleted: true,
        onboardingStep: 10,
      });
    }

    console.log('✅ Sample users seeded successfully');

    // Seed conversations, messages, and activity participations for test user
    await seedTestUserData();

    // Seed sample activities after users
    await seedSampleActivities();
  } catch (error) {
    console.error('❌ Error seeding sample users:', error);
  }
};

const seedTestUserData = async (): Promise<void> => {
  try {
    console.log('🔄 Seeding test user data (conversations, messages, participations)...');

    // Get test user and chat contacts
    const testUser = await User.findOne({ email: 'user@gmail.com' });
    const akhil = await User.findOne({ email: 'akhil@gmail.com' });
    const ram = await User.findOne({ email: 'ram@gmail.com' });

    if (!testUser || !akhil || !ram) {
      console.log('⚠️ Test users not found, skipping test user data seeding');
      return;
    }

    // Import models
    const Conversation = (await import('../models/Conversation')).default;
    const Message = (await import('../models/Message')).default;
    const ActivityParticipant = (await import('../models/ActivityParticipant')).default;
    const Activity = (await import('../models/Activity')).default;

    // Create conversation with Akhil
    let conversationAkhil = await Conversation.findOne({
      type: 'direct',
      participants: { $all: [testUser._id, akhil._id], $size: 2 }
    });

    if (!conversationAkhil) {
      conversationAkhil = await Conversation.create({
        type: 'direct',
        participants: [testUser._id, akhil._id],
        isActive: true,
      });
      console.log('✅ Created conversation with Akhil');
    }

    // Create conversation with Ram
    let conversationRam = await Conversation.findOne({
      type: 'direct',
      participants: { $all: [testUser._id, ram._id], $size: 2 }
    });

    if (!conversationRam) {
      conversationRam = await Conversation.create({
        type: 'direct',
        participants: [testUser._id, ram._id],
        isActive: true,
      });
      console.log('✅ Created conversation with Ram');
    }

    // Create messages with Akhil
    const messagesAkhil = [
      { sender: akhil._id, content: 'Hey! Are you joining the morning run tomorrow?', createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) },
      { sender: testUser._id, content: 'Yes! I\'ll be there at 6 AM', createdAt: new Date(Date.now() - 90 * 60 * 1000) },
      { sender: akhil._id, content: 'Perfect! Share the location and timings when you will arrive so that I will catch you up', createdAt: new Date(Date.now() - 60 * 60 * 1000) },
      { sender: testUser._id, content: 'Will do! I\'ll be at Jubilee Hills Park main gate by 5:50 AM', createdAt: new Date(Date.now() - 30 * 60 * 1000) },
    ];

    for (const msg of messagesAkhil) {
      const message = await Message.create({
        conversation: conversationAkhil._id,
        sender: msg.sender,
        content: msg.content,
        type: 'text',
        readBy: msg.sender === testUser._id ? [testUser._id] : [akhil._id],
        createdAt: msg.createdAt,
      });

      // Update conversation last message
      await Conversation.findByIdAndUpdate(conversationAkhil._id, {
        lastMessage: message._id,
        lastMessageAt: msg.createdAt,
      });
    }

    // Create messages with Ram
    const messagesRam = [
      { sender: ram._id, content: 'Hey! The cricket match is at 7 AM tomorrow', createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000) },
      { sender: testUser._id, content: 'Great! I\'ll be there', createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) },
      { sender: ram._id, content: 'Share the location and timings when you will arrive so that I will catch you up', createdAt: new Date(Date.now() - 60 * 60 * 1000) },
      { sender: testUser._id, content: 'Will meet at Gachibowli Cricket Ground pavilion at 6:45 AM', createdAt: new Date(Date.now() - 30 * 60 * 1000) },
    ];

    for (const msg of messagesRam) {
      const message = await Message.create({
        conversation: conversationRam._id,
        sender: msg.sender,
        content: msg.content,
        type: 'text',
        readBy: msg.sender === testUser._id ? [testUser._id] : [ram._id],
        createdAt: msg.createdAt,
      });

      // Update conversation last message
      await Conversation.findByIdAndUpdate(conversationRam._id, {
        lastMessage: message._id,
        lastMessageAt: msg.createdAt,
      });
    }

    console.log('✅ Created conversations and messages');

    // Add activity participations for test user
    const activities = await Activity.find({ status: 'open' }).select('_id').limit(10);

    if (activities.length > 0) {
      // Join first 3 activities
      for (let i = 0; i < Math.min(3, activities.length); i++) {
        const activity = activities[i];

        // Check if already participating
        const existing = await ActivityParticipant.findOne({
          activity: activity._id,
          user: testUser._id,
        });

        if (!existing) {
          await ActivityParticipant.create({
            activity: activity._id,
            user: testUser._id,
            status: 'accepted',
            respondedAt: new Date(Date.now() - (i + 1) * 24 * 60 * 60 * 1000),
          });

          // Increment currentParticipants
          await Activity.findByIdAndUpdate(activity._id, {
            $inc: { currentParticipants: 1 },
          });
        }
      }

      // Update user profile stats
      const participatedCount = await ActivityParticipant.countDocuments({
        user: testUser._id,
        status: 'accepted',
      });

      await UserProfile.findOneAndUpdate(
        { user: testUser._id },
        { $set: { activitiesJoined: participatedCount } }
      );

      console.log(`✅ Added ${Math.min(3, activities.length)} activity participations for test user`);
    }

  } catch (error) {
    console.error('❌ Error seeding test user data:', error);
  }
};

const seedSampleActivities = async (): Promise<void> => {
  try {
    console.log('🔄 Starting activity seeding...');
    const activityCount = await Activity.countDocuments();
    console.log(`📊 Current activity count: ${activityCount}`);
    if (activityCount > 20) {
      console.log('✅ Sample activities already seeded');
      return;
    }

    // Get user IDs for organizing activities
    const userEmails = [
      'user@gmail.com', 'runner1@example.com', 'runner2@example.com', 'sports1@example.com',
      'sports2@example.com', 'photo1@example.com', 'photo2@example.com',
      'photo3@example.com', 'travel1@example.com', 'gaming1@example.com',
      'music1@example.com', 'food1@example.com'
    ];
    const users = await User.find({ email: { $in: userEmails }}).select('_id email');
    console.log(`👥 Found ${users.length} users for activity seeding:`, users.map(u => u.email));

    if (users.length === 0) {
      console.log('⚠️ No users found for activity seeding');
      // Try to get any users
      const allUsers = await User.find({}).select('_id email').limit(15);
      console.log('👥 All users:', allUsers.map(u => u.email));
      if (allUsers.length === 0) return;
      // Use first user for all activities if needed
      users.push(...allUsers);
    }

    // Find test user for specific activities
    const testUser = users.find(u => u.email === 'user@gmail.com');
    const testUserId = testUser ? testUser._id : users[0]._id;

    // Get category IDs
    const categories = await Category.find({}).select('_id slug name');
    const categoryMap = new Map();
    categories.forEach(cat => categoryMap.set(cat.slug, cat));
    console.log('📂 Category map:', Array.from(categoryMap.keys()));

    const now = new Date();
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(now);
    todayEnd.setHours(23, 59, 59, 999);
    const tomorrowStart = new Date(todayStart);
    tomorrowStart.setDate(tomorrowStart.getDate() + 1);
    const tomorrowEnd = new Date(todayEnd);
    tomorrowEnd.setDate(tomorrowEnd.getDate() + 1);
    const in3Days = new Date(todayStart);
    in3Days.setDate(in3Days.getDate() + 3);
    const in5Days = new Date(todayStart);
    in5Days.setDate(in5Days.getDate() + 5);
    const in7Days = new Date(todayStart);
    in7Days.setDate(in7Days.getDate() + 7);
    const in2Weeks = new Date(todayStart);
    in2Weeks.setDate(in2Weeks.getDate() + 14);
    const in3Weeks = new Date(todayStart);
    in3Weeks.setDate(in3Weeks.getDate() + 21);

    const sampleActivities = [
      // ===== TODAY'S ACTIVITIES =====
      {
        title: 'Sunrise Yoga in the Park',
        description: 'Start your day with a peaceful sunrise yoga session suitable for all levels. Mats provided!',
        category: categoryMap.get('sports-fitness')?._id,
        categoryName: 'Sports and Fitness',
        subcategory: 'Yoga',
        organizer: users[1]._id,
        date: todayStart,
        startTime: '06:00',
        endTime: '07:00',
        city: 'Hyderabad',
        locality: 'Banjara Hills',
        venue: 'Banjara Hills Park',
        meetingPoint: 'Park center',
        location: { type: 'Point', coordinates: [78.4319, 17.4856] },
        maxParticipants: 20,
        currentParticipants: 8,
        participationType: 'open',
        visibility: 'public',
        status: 'open',
        tags: ['yoga', 'sunrise', 'park', 'wellness', 'morning'],
      },
      {
        title: 'Morning Run in Jubilee Hills',
        description: 'Join us for a refreshing 5km morning run through the beautiful streets of Jubilee Hills. Perfect for all fitness levels!',
        category: categoryMap.get('sports-fitness')?._id,
        categoryName: 'Sports and Fitness',
        subcategory: 'Running',
        organizer: users[1]._id,
        date: todayStart,
        startTime: '06:30',
        endTime: '07:30',
        city: 'Hyderabad',
        locality: 'Jubilee Hills',
        venue: 'Jubilee Hills Park',
        meetingPoint: 'Main gate of Jubilee Hills Park',
        location: { type: 'Point', coordinates: [78.4244, 17.4183] },
        maxParticipants: 20,
        currentParticipants: 12,
        participationType: 'open',
        visibility: 'public',
        status: 'open',
        tags: ['running', 'morning', 'fitness', 'jubilee-hills'],
      },
      {
        title: 'Weekend Cricket Match',
        description: 'Friendly cricket match for all skill levels. We provide bats and balls!',
        category: categoryMap.get('sports-fitness')?._id,
        categoryName: 'Sports and Fitness',
        subcategory: 'Cricket',
        organizer: users[2]._id,
        date: todayStart,
        startTime: '07:00',
        endTime: '10:00',
        city: 'Hyderabad',
        locality: 'Gachibowli',
        venue: 'Gachibowli Cricket Ground',
        meetingPoint: 'Ground pavilion',
        location: { type: 'Point', coordinates: [78.3447, 17.4405] },
        maxParticipants: 22,
        currentParticipants: 18,
        participationType: 'open',
        visibility: 'public',
        status: 'open',
        tags: ['cricket', 'weekend', 'friendly', 'sports'],
      },

      // ===== TOMORROW'S ACTIVITIES (Nearby) =====
      {
        title: 'Sunrise Yoga in the Park',
        description: 'Peaceful sunrise yoga session suitable for all levels. Mats provided!',
        category: categoryMap.get('sports-fitness')?._id,
        categoryName: 'Sports and Fitness',
        subcategory: 'Yoga',
        organizer: users[1]._id,
        date: tomorrowStart,
        startTime: '06:00',
        endTime: '07:00',
        city: 'Hyderabad',
        locality: 'Banjara Hills',
        venue: 'Banjara Hills Park',
        meetingPoint: 'Park center',
        location: { type: 'Point', coordinates: [78.4319, 17.4856] },
        maxParticipants: 20,
        currentParticipants: 8,
        participationType: 'open',
        visibility: 'public',
        status: 'open',
        tags: ['yoga', 'sunrise', 'park', 'wellness', 'morning'],
      },
      {
        title: 'Morning Run in Jubilee Hills',
        description: 'Join us for a refreshing 5km morning run through the beautiful streets of Jubilee Hills. Perfect for all fitness levels!',
        category: categoryMap.get('sports-fitness')?._id,
        categoryName: 'Sports and Fitness',
        subcategory: 'Running',
        organizer: users[1]._id,
        date: tomorrowStart,
        startTime: '06:00',
        endTime: '07:30',
        city: 'Hyderabad',
        locality: 'Jubilee Hills',
        venue: 'Jubilee Hills Park',
        meetingPoint: 'Main gate of Jubilee Hills Park',
        location: { type: 'Point', coordinates: [78.4244, 17.4183] },
        maxParticipants: 20,
        currentParticipants: 3,
        participationType: 'open',
        visibility: 'public',
        status: 'open',
        tags: ['running', 'morning', 'fitness', 'jubilee-hills'],
      },
      {
        title: 'Weekend Marathon Training - 10km',
        description: 'Training session for upcoming marathon. We\'ll run 10km at a comfortable pace with water breaks.',
        category: categoryMap.get('sports-fitness')?._id,
        categoryName: 'Sports and Fitness',
        subcategory: 'Running',
        organizer: users[1]._id,
        date: tomorrowStart,
        startTime: '05:30',
        endTime: '07:00',
        city: 'Hyderabad',
        locality: 'Banjara Hills',
        venue: 'KBR National Park',
        meetingPoint: 'Park entrance near parking',
        location: { type: 'Point', coordinates: [78.4319, 17.4856] },
        maxParticipants: 15,
        currentParticipants: 5,
        participationType: 'open',
        visibility: 'public',
        status: 'open',
        tags: ['marathon', 'training', '10km', 'weekend'],
      },
      {
        title: 'Street Photography Walk - Old City',
        description: 'Explore the vibrant streets of Old Hyderabad with your camera. Capture architecture, people, and culture.',
        category: categoryMap.get('hobbies-creativity')?._id,
        categoryName: 'Hobbies and Creativity',
        subcategory: 'Photography',
        organizer: users[4]._id,
        date: tomorrowStart,
        startTime: '07:00',
        endTime: '10:00',
        city: 'Hyderabad',
        locality: 'Charminar',
        venue: 'Charminar Area',
        meetingPoint: 'Charminar main entrance',
        location: { type: 'Point', coordinates: [78.4744, 17.3616] },
        maxParticipants: 10,
        currentParticipants: 4,
        participationType: 'open',
        visibility: 'public',
        status: 'open',
        tags: ['photography', 'street', 'old-city', 'charminar', 'walk'],
      },

      // ===== IN 3 DAYS =====
      {
        title: 'Weekend Marathon Training - 10km',
        description: 'Training session for upcoming marathon. We\'ll run 10km at a comfortable pace with water breaks.',
        category: categoryMap.get('sports-fitness')?._id,
        categoryName: 'Sports and Fitness',
        subcategory: 'Running',
        organizer: users[1]._id,
        date: in3Days,
        startTime: '05:30',
        endTime: '07:00',
        city: 'Hyderabad',
        locality: 'Banjara Hills',
        venue: 'KBR National Park',
        meetingPoint: 'Park entrance near parking',
        location: { type: 'Point', coordinates: [78.4319, 17.4856] },
        maxParticipants: 15,
        currentParticipants: 5,
        participationType: 'open',
        visibility: 'public',
        status: 'open',
        tags: ['marathon', 'training', '10km', 'weekend'],
      },
      {
        title: 'Friendly Cricket Match - Weekends',
        description: 'Weekly friendly cricket match. All skill levels welcome. We provide bats and balls!',
        category: categoryMap.get('sports-fitness')?._id,
        categoryName: 'Sports and Fitness',
        subcategory: 'Cricket',
        organizer: users[2]._id,
        date: in3Days,
        startTime: '07:00',
        endTime: '10:00',
        city: 'Hyderabad',
        locality: 'Gachibowli',
        venue: 'Gachibowli Cricket Ground',
        meetingPoint: 'Ground pavilion',
        location: { type: 'Point', coordinates: [78.3447, 17.4405] },
        maxParticipants: 22,
        currentParticipants: 12,
        participationType: 'open',
        visibility: 'public',
        status: 'open',
        tags: ['cricket', 'weekend', 'friendly', 'sports'],
      },
      {
        title: 'Cricket Coaching Session',
        description: 'Professional cricket coaching for beginners. Learn batting, bowling, and fielding techniques.',
        category: categoryMap.get('sports-fitness')?._id,
        categoryName: 'Sports and Fitness',
        subcategory: 'Cricket',
        organizer: users[2]._id,
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // In 1 week
        startTime: '08:00',
        endTime: '10:00',
        city: 'Hyderabad',
        locality: 'Kondapur',
        venue: 'Kondapur Sports Complex',
        meetingPoint: 'Complex reception',
        location: { type: 'Point', coordinates: [78.3582, 17.4671] },
        maxParticipants: 16,
        currentParticipants: 4,
        participationType: 'approval',
        visibility: 'public',
        status: 'open',
        tags: ['cricket', 'coaching', 'training', 'beginners'],
      },
      // Badminton activities (2)
      {
        title: 'Badminton Doubles Tournament',
        description: 'Fun badminton doubles tournament. Form your pair or we\'ll match you! Prizes for winners.',
        category: categoryMap.get('sports-fitness')?._id,
        categoryName: 'Sports and Fitness',
        subcategory: 'Badminton',
        organizer: users[3]._id,
        date: in5Days, // In 4 days
        startTime: '16:00',
        endTime: '20:00',
        city: 'Hyderabad',
        locality: 'Hitech City',
        venue: 'Hitech City Badminton Courts',
        meetingPoint: 'Court lobby',
        location: { type: 'Point', coordinates: [78.3836, 17.4435] },
        maxParticipants: 16,
        currentParticipants: 8,
        participationType: 'open',
        visibility: 'public',
        status: 'open',
        tags: ['badminton', 'tournament', 'doubles', 'competition'],
      },
      {
        title: 'Badminton Practice Session',
        description: 'Casual badminton practice. Bring your racket or use ours. All levels welcome!',
        category: categoryMap.get('sports-fitness')?._id,
        categoryName: 'Sports and Fitness',
        subcategory: 'Badminton',
        organizer: users[3]._id,
        date: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // In 6 days
        startTime: '19:00',
        endTime: '21:00',
        city: 'Hyderabad',
        locality: 'Kukatpally',
        venue: 'Kukatpally Indoor Stadium',
        meetingPoint: 'Stadium entrance',
        location: { type: 'Point', coordinates: [78.4319, 17.4856] },
        maxParticipants: 12,
        currentParticipants: 3,
        participationType: 'open',
        visibility: 'public',
        status: 'open',
        tags: ['badminton', 'practice', 'casual', 'indoor'],
      },
      // Photography activities (3)
      {
        title: 'Street Photography Walk - Old City',
        description: 'Explore the vibrant streets of Old Hyderabad with your camera. Capture architecture, people, and culture.',
        category: categoryMap.get('hobbies-creativity')?._id,
        categoryName: 'Hobbies and Creativity',
        subcategory: 'Photography',
        organizer: users[4]._id,
        date: tomorrowStart, // Tomorrow
        startTime: '07:00',
        endTime: '10:00',
        city: 'Hyderabad',
        locality: 'Charminar',
        venue: 'Charminar Area',
        meetingPoint: 'Charminar main entrance',
        location: { type: 'Point', coordinates: [78.4744, 17.3616] },
        maxParticipants: 10,
        currentParticipants: 4,
        participationType: 'open',
        visibility: 'public',
        status: 'open',
        tags: ['photography', 'street', 'old-city', 'charminar', 'walk'],
      },
      {
        title: 'Nature Photography at KBR Park',
        description: 'Capture the beauty of nature at KBR National Park. Birds, landscapes, and macro photography.',
        category: categoryMap.get('hobbies-creativity')?._id,
        categoryName: 'Hobbies and Creativity',
        subcategory: 'Photography',
        organizer: users[5]._id,
        date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), // In 8 days
        startTime: '06:00',
        endTime: '09:00',
        city: 'Hyderabad',
        locality: 'Banjara Hills',
        venue: 'KBR National Park',
        meetingPoint: 'Park main gate',
        location: { type: 'Point', coordinates: [78.4319, 17.4856] },
        maxParticipants: 12,
        currentParticipants: 5,
        participationType: 'open',
        visibility: 'public',
        status: 'open',
        tags: ['photography', 'nature', 'wildlife', 'macro', 'park'],
      },
      {
        title: 'Portrait Photography Workshop',
        description: 'Learn portrait photography techniques. Lighting, composition, and posing. Model provided!',
        category: categoryMap.get('hobbies-creativity')?._id,
        categoryName: 'Hobbies and Creativity',
        subcategory: 'Photography',
        organizer: users[6]._id,
        date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // In 10 days
        startTime: '14:00',
        endTime: '17:00',
        city: 'Hyderabad',
        locality: 'Madhapur',
        venue: 'Madhapur Studio',
        meetingPoint: 'Studio reception',
        location: { type: 'Point', coordinates: [78.3872, 17.4474] },
        maxParticipants: 8,
        currentParticipants: 2,
        participationType: 'approval',
        visibility: 'public',
        status: 'open',
        tags: ['photography', 'portrait', 'workshop', 'lighting', 'studio'],
      },
      // Travel activities (2)
      {
        title: 'Weekend Trek to Ananthagiri Hills',
        description: 'Beautiful trek to Ananthagiri Hills. Camping, bonfire, and sunrise view. Transport included!',
        category: categoryMap.get('travel-exploration')?._id,
        categoryName: 'Travel and Exploration',
        subcategory: 'Trekking',
        organizer: users[7]._id,
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // In 2 weeks
        startTime: '06:00',
        endTime: '18:00',
        city: 'Hyderabad',
        locality: 'Secunderabad',
        venue: 'Ananthagiri Hills',
        meetingPoint: 'Secunderabad Railway Station',
        location: { type: 'Point', coordinates: [78.4983, 17.4399] },
        maxParticipants: 15,
        currentParticipants: 7,
        participationType: 'approval',
        visibility: 'public',
        status: 'open',
        tags: ['trekking', 'camping', 'weekend', 'nature', 'hills'],
      },
      {
        title: 'Road Trip to Nagarjuna Sagar',
        description: 'Scenic road trip to Nagarjuna Sagar Dam. Photography stops, lunch, and boat ride included.',
        category: categoryMap.get('travel-exploration')?._id,
        categoryName: 'Travel and Exploration',
        subcategory: 'Road Trips',
        organizer: users[7]._id,
        date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // In 3 weeks
        startTime: '07:00',
        endTime: '20:00',
        city: 'Hyderabad',
        locality: 'Hyderabad',
        venue: 'Nagarjuna Sagar',
        meetingPoint: 'ORR Exit 12',
        location: { type: 'Point', coordinates: [78.4867, 17.3850] },
        maxParticipants: 12,
        currentParticipants: 5,
        participationType: 'open',
        visibility: 'public',
        status: 'open',
        tags: ['road-trip', 'dam', 'photography', 'boat-ride', 'day-trip'],
      },
      // Gaming activities (1)
      {
        title: 'Gaming Night - Multiplayer Tournament',
        description: 'Fun gaming night with multiple games. Valorant, FIFA, and more. Snacks provided!',
        category: categoryMap.get('gaming-entertainment')?._id,
        categoryName: 'Gaming and Entertainment',
        subcategory: 'Multiplayer Gaming',
        organizer: users[8]._id,
        date: in3Days, // In 2 days
        startTime: '19:00',
        endTime: '23:00',
        city: 'Hyderabad',
        locality: 'Ameerpet',
        venue: 'Ameerpet Gaming Cafe',
        meetingPoint: 'Cafe entrance',
        location: { type: 'Point', coordinates: [78.4462, 17.4421] },
        maxParticipants: 20,
        currentParticipants: 10,
        participationType: 'open',
        visibility: 'public',
        status: 'open',
        tags: ['gaming', 'tournament', 'multiplayer', 'valorant', 'fifa', 'night'],
      },
      // Music activities (1)
      {
        title: 'Acoustic Jam Session',
        description: 'Bring your instrument and join our acoustic jam session. All genres welcome!',
        category: categoryMap.get('hobbies-creativity')?._id,
        categoryName: 'Hobbies and Creativity',
        subcategory: 'Music',
        organizer: users[9]._id,
        date: in3Days, // In 3 days
        startTime: '18:00',
        endTime: '21:00',
        city: 'Hyderabad',
        locality: 'Somajiguda',
        venue: 'Somajiguda Community Hall',
        meetingPoint: 'Hall entrance',
        location: { type: 'Point', coordinates: [78.4589, 17.4239] },
        maxParticipants: 15,
        currentParticipants: 6,
        participationType: 'open',
        visibility: 'public',
        status: 'open',
        tags: ['music', 'acoustic', 'jam', 'instruments', 'session'],
      },
      // Food activities (1)
      {
        title: 'Hyderabadi Biryani Cooking Workshop',
        description: 'Learn to make authentic Hyderabadi Biryani from scratch. Eat what you cook!',
        category: categoryMap.get('social-community')?._id,
        categoryName: 'Social and Community',
        subcategory: 'Cooking',
        organizer: users[10]._id,
        date: in5Days, // In 5 days
        startTime: '11:00',
        endTime: '14:00',
        city: 'Hyderabad',
        locality: 'Charminar',
        venue: 'Charminar Kitchen Studio',
        meetingPoint: 'Studio entrance',
        location: { type: 'Point', coordinates: [78.4744, 17.3616] },
        maxParticipants: 10,
        currentParticipants: 4,
        participationType: 'approval',
        visibility: 'public',
        status: 'open',
        tags: ['cooking', 'biryani', 'hyderabadi', 'workshop', 'food'],
      },
      // Yoga activities (1)
      {
        title: 'Sunrise Yoga in the Park',
        description: 'Peaceful sunrise yoga session suitable for all levels. Mats provided!',
        category: categoryMap.get('sports-fitness')?._id,
        categoryName: 'Sports and Fitness',
        subcategory: 'Yoga',
        organizer: users[1]._id,
        date: tomorrowStart, // Tomorrow
        startTime: '06:00',
        endTime: '07:00',
        city: 'Hyderabad',
        locality: 'Banjara Hills',
        venue: 'Banjara Hills Park',
        meetingPoint: 'Park center',
        location: { type: 'Point', coordinates: [78.4319, 17.4856] },
        maxParticipants: 20,
        currentParticipants: 8,
        participationType: 'open',
        visibility: 'public',
        status: 'open',
        tags: ['yoga', 'sunrise', 'park', 'wellness', 'morning'],
      },
      // Cycling activity (1)
      {
        title: 'City Cycling Tour - 25km',
        description: 'Explore Hyderabad on wheels! 25km cycling tour covering major landmarks. Bring your bike.',
        category: categoryMap.get('sports-fitness')?._id,
        categoryName: 'Sports and Fitness',
        subcategory: 'Cycling',
        organizer: users[0]._id,
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // In 1 week
        startTime: '05:30',
        endTime: '09:00',
        city: 'Hyderabad',
        locality: 'Hitech City',
        venue: 'Hitech City Junction',
        meetingPoint: 'Near Metro station',
        location: { type: 'Point', coordinates: [78.3836, 17.4435] },
        maxParticipants: 15,
        currentParticipants: 5,
        participationType: 'open',
        visibility: 'public',
        status: 'open',
        tags: ['cycling', 'tour', 'city', 'landmarks', '25km'],
      },
    ];

    console.log(`📝 Attempting to seed ${sampleActivities.length} activities...`);
    let seededCount = 0;
    for (const activityData of sampleActivities) {
      // Skip if category not found
      if (!activityData.category) {
        console.log(`⚠️ Skipping "${activityData.title}" - category not found`);
        continue;
      }

      const existingActivity = await Activity.findOne({ title: activityData.title, organizer: activityData.organizer });
      if (existingActivity) {
        console.log(`⚠️ Activity "${activityData.title}" already exists, skipping`);
        continue;
      }

      await Activity.create(activityData);
      seededCount++;
      console.log(`✅ Created: "${activityData.title}"`);
    }

    console.log(`✅ Sample activities seeded successfully (${seededCount} new activities)`);
  } catch (error) {
    console.error('❌ Error seeding sample activities:', error);
  }
};
