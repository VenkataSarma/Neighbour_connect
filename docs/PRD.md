# Product Requirements Document
# Neighbourhood Connect

**Version:** 1.0  
**Date:** November 2025  
**Status:** Active Development

---

## 1. Product Overview

### 1.1 Product Name
Neighbourhood Connect

### 1.2 Tagline
Find people. Share interests. Experience more.

### 1.3 Vision
Neighbourhood Connect is a hyperlocal social discovery platform that connects people based on their location, interests, hobbies, activities, skills and availability. It helps people discover others nearby who share similar interests and want to participate in activities together.

### 1.4 Mission
Make it easy for people to turn their everyday interests and plans into real-world connections.

---

## 2. Problem Statement

People frequently want to participate in activities but struggle to find others who are interested:

- Someone wants to go running tomorrow morning but has nobody to accompany them
- Someone wants to play cricket but does not have enough players
- Someone wants to travel to Goa and is looking for travel companions
- Someone wants to learn guitar with other beginners
- Someone wants to find people for gaming
- Someone wants to organise a movie outing

**Current solutions fail because:**
- WhatsApp groups are unstructured and require existing contacts
- Instagram and Facebook are not designed for activity discovery
- These platforms do not match people by specific interests and availability

---

## 3. Target Users

| Segment | Description |
|---|---|
| College students | Looking for activities and social connections |
| Working professionals | Want to pursue hobbies and meet people outside work |
| Fitness enthusiasts | Running, gym, yoga, sports partners |
| Sports enthusiasts | Cricket, football, badminton teams |
| Travellers | Weekend trips, road trips, companions |
| Gamers | Online and offline gaming groups |
| Hobby enthusiasts | Photography, music, painting, crafts |
| New to city | Need to build social networks |

**Initial market:** Hyderabad, India

---

## 4. Core User Journey

```
REGISTER → BUILD PROFILE → SELECT INTERESTS → 
DISCOVER ACTIVITIES → CREATE ACTIVITY → JOIN ACTIVITY → 
CONNECT → COMMUNICATE
```

---

## 5. Key Features

### 5.1 Authentication and Onboarding
- Registration with email, phone, password
- Email verification
- 10-step guided profile completion
- Interest and hobby selection
- Location setup

### 5.2 Activity Creation
- Title, description, category, subcategory
- Date, time, venue
- Max participants
- Participation type: Open, Approval Required, Invite Only
- Status lifecycle: Draft → Open → Full/Cancelled/Completed/Expired

### 5.3 Activity Discovery
- Geospatial search (nearby activities)
- Category and subcategory filters
- Date, time, status filters
- Interest-based personalisation

### 5.4 Participation System
- Express interest, request to join, cancel, leave
- Organiser: approve, reject, remove participants
- Atomic participant slot management

### 5.5 Connections
- Send, accept, reject connection requests
- Connection-based privacy options

### 5.6 Messaging
- Direct one-to-one conversations
- Activity group chats (for confirmed participants)
- Real-time via Socket.IO

### 5.7 Notifications
- In-app notification centre
- Mobile push notifications via Firebase Cloud Messaging
- 11 notification types (join requests, approvals, messages, etc.)

### 5.8 People Discovery
- Find nearby users by interests, skills, languages
- Discoverable/hidden control

### 5.9 Admin Dashboard
- User management and moderation
- Report resolution
- Category management
- Platform statistics

---

## 6. Non-Functional Requirements

| Requirement | Target |
|---|---|
| API response time | < 500ms for standard queries |
| Concurrent users | 1,000+ (initial) |
| Uptime | 99.5% |
| Data privacy | Precise coordinates never exposed publicly |
| Security | JWT auth, rate limiting, input sanitisation |
| Accessibility | WCAG 2.1 AA compliant |

---

## 7. Out of Scope (v1)

- In-app payments or booking
- Event ticketing
- Commercial service listings
- Video/audio calling
- Stories or short-form content feed
- AI-powered matching (planned v2)
