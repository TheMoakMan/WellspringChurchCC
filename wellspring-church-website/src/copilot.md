# Wellspring Church Website Project - Copilot Instructions

## Project Overview
This is a modern, responsive, multi-page website for Wellspring Church located in Blytheville, Arkansas. The project focuses on creating a clean, accessible, and professional church website with real content from the actual church.

## Design Specifications
- **Color Scheme**: Light blue (#87CEEB) and white
- **Layout**: Card-based design with clean, modern aesthetics
- **Typography**: Inter (body) and Playfair Display (headings)
- **Responsive**: Mobile-first design with special navigation considerations
- **Church Info**: 600 North Division Street, Blytheville, AR 72315 | 870.763.3328

## Navigation Structure (IMPORTANT - Responsive Design)
The navigation has specific mobile/desktop behavior:
- **Desktop**: Dropdown menu for "About" with "Our Values" and "Our Team" options
- **Mobile**: Separate "Values" and "Team" links (no dropdown)
- **Classes**: Use `.desktop-only` and `.mobile-only` for proper responsive behavior

```html
<div class="nav-dropdown desktop-only">
    <a href="about.html" class="nav-link dropdown-toggle">About</a>
    <div class="dropdown-menu">
        <a href="about.html" class="dropdown-item">Our Values</a>
        <a href="team.html" class="dropdown-item">Our Team</a>
    </div>
</div>
<a href="about.html" class="nav-link mobile-only">Values</a>
<a href="team.html" class="nav-link mobile-only">Team</a>
```

## Content Sources
- **Primary Source**: https://www.wellspringchurch.cc/ (real church website)
- **Contact**: info@wellspringchurch.cc
- **Online Giving**: https://wellspringchurchnea.churchcenter.com/giving
- **Guest Connect**: https://wellspringchurchnea.churchcenter.com/

## Project Status & Completed Pages

### ✅ COMPLETED PAGES

#### 1. Landing Page (index.html)
- Hero section with church logo and main messaging
- Service times and contact information
- Modern card-based layout
- Fully responsive with proper navigation

#### 2. About Page (about.html)
- **Core Values Section**: Complete with full scripture quotes (not just references)
  - Students (Ephesians 6:4)
  - Discipleship (Matthew 28:19-20) 
  - Service (1 Peter 4:10-11)
  - Scripture (2 Timothy 3:16-17)
  - Sending (Acts 1:8)
- **What to Expect/Core Beliefs**: Two-panel section with detailed content
- Responsive design and proper navigation integration

#### 3. Team Page (team.html)
- **Leadership Team**: Real bios and photos
  - Ryan Moak (Lead Pastor) - team_ryan.avif
  - Kenny Campbell (Associate Pastor) - team_kenny.avif  
  - Danika Conover (Worship Pastor) - team_danika.avif
  - Jaela Campbell (Worship Pastor) - avatar.5.png placeholder
- **Ministry Leaders**: Updated leadership structure
  - Heath & Mindy Middleton
  - Shane & Jill Hale
  - Evan & Faith Moak
- Mobile-responsive cards with real content

#### 4. Ministries Page (ministries.html)
- Small hero section (not overwhelming)
- **NextGen Ministries**: Compact card layout with 4 programs:
  - Nursery (birth to 2 years)
  - Lil' Springs Pre-K (3-5 years)
  - WC Kids (K-5th grade)
  - The Well Youth (6th-12th grade)
- Real content and descriptions for each ministry

#### 5. Giving Page (giving.html)
- Simplified three-section layout:
  - **Give Online**: Direct links to ChurchCenter giving
  - **Get Connected**: Information about involvement
  - **Join the Team**: Volunteer opportunities
- Clean, not overly complex design
- Real links and contact information

#### 6. Contact Page (contact.html) - ✅ ENHANCED
- **Professional Contact Form**: Complete form with name, email, phone, subject, and message fields
- **Form Validation**: Client-side validation with success/error messaging
- **Subject Categories**: Dropdown with relevant topics (General, Prayer Request, Visit, etc.)
- **Google Maps Placeholder**: Ready for Google Maps API integration when available
- **Address & Directions**: Direct link to Google Maps for directions
- **Contact Information Cards**: Phone, email, and service times in clean card layout
- **Responsive Design**: Mobile-first form design with proper field sizing
- **Accessibility**: Proper form labels and keyboard navigation

#### Contact Form Features:
- **Required Fields**: First name, last name, email, and message
- **Optional Fields**: Phone number and subject selection
- **Backend Ready**: Form structure ready for backend integration
- **User Feedback**: Success/error messages with auto-dismiss
- **Natural Layout**: Map appears first in HTML order (left on desktop, top on mobile)
- **Simple Responsive**: CSS Grid automatically stacks on mobile without order manipulation

#### Mobile-First Design Updates (Latest):
- **Grid Layout**: CSS Grid with responsive column structure
- **Natural Stacking**: HTML order determines mobile layout (map top, form bottom)
- **Touch-Friendly**: 16px font size on form inputs to prevent iOS zoom
- **Clean Structure**: No complex CSS order manipulation needed

#### Technical Implementation:
- **HTML**: Semantic form structure with proper field types
- **CSS**: Custom form styling with focus states and validation indicators
- **JavaScript**: Form handling, validation, and user interaction (contact.js)
- **Integration Ready**: Easy to connect to backend services like Formspree, Netlify Forms, or custom API

#### 7. Messages Page (messages.html) - ✅ FULLY UPDATED
- **Featured Video Section**: Large, prominent display of the most recent sermon
- **Recent Messages Grid**: 6 additional recent sermons in responsive grid layout
- **YouTube Live Integration**: Complete replacement of Boxcast with YouTube Live streaming
- **Date Format**: Updated to "Month Day, Year" format (e.g., "December 15, 2024")
- **Typography**: All message titles use modern sans-serif font (Inter)
- **Clean Design**: Removed all play button overlays and complex hover effects
- **Real Content**: Uses actual YouTube videos from the church channel

#### Messages Page Technical Details:
- **Streaming**: YouTube Live embed for weekend services (Sundays @ 9:30am)
- **Dynamic Loading**: JavaScript fetches latest videos from YouTube RSS feed
- **Fallback Content**: Static HTML content if dynamic loading fails
- **Video Management**: Automatically updates featured video and grid
- **Responsive**: Mobile-first design with proper video aspect ratios
- **Accessibility**: Proper iframe titles and alt text

### ✅ ALL MAJOR PAGES COMPLETED

The website is now feature-complete with all main pages implemented using real church content:
- Landing page with hero and service information
- About page with core values and beliefs
- Team page with leadership and ministry leaders
- Ministries page with NextGen programs
- Giving page with online giving integration
- Contact page with real church information
- Messages page with live stream and sermon archives

## Recent Updates

### Messages Page Card Redesign (Latest)
**Date**: December 2024
**Description**: Completely redesigned message cards for a more visual, modern experience

**Changes Made**:
- **New Card Layout**: Large video thumbnails with minimal text below
- **Visual Design**: Cards now feature:
  - Large 16:9 video containers with gradient backgrounds
  - Clean white cards with subtle shadows and rounded corners
  - Hover effects with elevation and scale transitions
  - Play button overlay on hover for better UX
- **Simplified Content**: Each card now shows only:
  - Video title (shortened, no "New Life Unlocked" prefix)
  - Date (month/year format)
  - Removed duration and meta information for cleaner look
- **Enhanced Animations**: 
  - Staggered reveal animations for cards on page load
  - Smooth hover transformations
  - Loading states for video content
- **Better Mobile Experience**: 
  - Single column layout on mobile
  - Optimized card spacing and typography
  - Touch-friendly hover states

**Technical Implementation**:
- Updated HTML structure with new classes (`.message-video-container`, `.message-content`)
- Enhanced CSS with modern grid layout, animations, and hover effects
- Improved JavaScript with card interaction handlers and loading state management
- Added accessibility features (focus states, keyboard navigation)

**Files Updated**:
- `src/messages.html` - New card structure
- `src/css/styles.css` - Enhanced card styles and animations
- `src/js/messages.js` - Card interaction handlers

### Dynamic Featured Video System (Latest)
**Date**: December 2024
**Description**: Implemented dynamic featured video system that automatically highlights the most recent sermon

**Changes Made**:
- **Featured Video Section**: 
  - Replaced static "Current Series" section with dynamic "Latest Message" section
  - Featured video automatically populated with most recent YouTube upload
  - Larger, more prominent display for the latest sermon
  - Enhanced visual design with card styling and hover effects
- **Expanded Message Grid**: 
  - Grid now shows 6 additional videos (formerly 6 total, now 7 total including featured)
  - Added 7th video slot to show more historical content
  - Grid starts with 2nd most recent video (since 1st is featured)
- **Enhanced JavaScript Logic**:
  - `updateVideoGrid()` now handles featured video separately from grid
  - `updateFeaturedVideo()` method for managing the prominent video display
  - Title cleaning logic removes "New Life Unlocked" prefix for cleaner presentation
  - Date formatting improved for both featured and grid videos
  - Enhanced card interactions for both featured and grid videos

**Technical Implementation**:
- Updated HTML structure with featured video section and IDs for dynamic updates
- Enhanced CSS with featured video card styling and larger play button overlays
- Modified JavaScript to handle 7 videos total (1 featured + 6 grid)
- Improved responsive design for featured video section
- Added hover effects and loading states for featured video

**User Experience**:
- Latest sermon always prominently featured at top
- Clear visual hierarchy: featured → grid of recent messages
- Better content discovery with 7 total videos displayed
- Consistent branding with clean title presentation
- Mobile-optimized featured video display

**Files Updated**:
- `src/messages.html` - New featured video section, expanded grid
- `src/css/styles.css` - Featured video styling and enhancements  
- `src/js/messages.js` - Dynamic video population logic

### YouTube Live Migration & UI Updates (Latest)
**Date**: December 2024
**Description**: Migrated from Boxcast to YouTube Live streaming and improved date/font formatting

**Changes Made**:
- **YouTube Live Integration**: 
  - Replaced Boxcast embed with YouTube Live stream embed
  - Uses `https://www.youtube.com/embed/live_stream?channel=UCAFwEAi4EEo1P2vFB9UYOxA`
  - Automatic live detection - shows live stream when active, recent videos when not
  - No domain restrictions or complex authentication required
- **Enhanced Date Formatting**:
  - Updated date format from "December 2024" to "December 15, 2024" (full date with day)
  - Applied to both featured video and message cards
  - Updated JavaScript date formatting logic for dynamic content
- **Typography Updates**:
  - Changed message titles from Playfair Display (serif) to Inter (sans-serif)
  - Updated both featured video title and grid card titles
  - Maintains visual hierarchy while improving readability
- **Code Cleanup**:
  - Removed all Boxcast-related JavaScript methods and properties
  - Simplified MessagesPageHandler class
  - Updated console instructions for YouTube Live setup
  - Cleaned up redundant troubleshooting code

**Technical Implementation**:
- Updated HTML iframe src to YouTube Live embed URL
- Modified JavaScript date formatting: added `day: 'numeric'` to toLocaleDateString options
- Changed CSS font-family from serif to sans-serif for titles
- Removed Boxcast troubleshooting, testing, and fallback methods
- Updated initialization and helper functions

**Benefits**:
- **Reliability**: YouTube Live is more stable and has fewer domain restrictions
- **User Experience**: Familiar YouTube interface with automatic quality adjustment
- **Mobile Friendly**: Better mobile streaming experience
- **Simplified Setup**: No complex authentication or domain configuration needed
- **Better Dates**: More specific date information helps users identify content chronologically

**Files Updated**:
- `src/messages.html` - YouTube Live embed, updated dates, sans-serif titles
- `src/css/styles.css` - Font family changes for message titles
- `src/js/messages.js` - Removed Boxcast code, enhanced date formatting
- `src/copilot.md` - Documentation updates

## Recent Changes

### January 22, 2025 - Contact Page Mobile Layout Enhancement
**Files Modified:**
- `contact.html` - Restructured form and map sections
- `css/styles.css` - Updated grid layout and mobile responsive behavior
- `copilot.md` - Updated documentation

**Changes Made:**
1. **HTML Structure**: Map section placed first in HTML order for natural layout flow
2. **CSS Grid Implementation**: Simple responsive grid that stacks to single column on mobile
3. **Natural Responsive Behavior**: Map appears left on desktop, top on mobile without CSS tricks
4. **Touch-Friendly Forms**: Ensured 16px font size to prevent iOS zoom behavior
5. **Simplified Code**: Removed unnecessary CSS order manipulation

**Technical Details:**
- Desktop: Map (left) | Form (right) 
- Mobile: Map (top) → Form (bottom)
- Natural HTML document flow determines layout
- CSS Grid handles responsive behavior automatically

3. **Troubleshooting Commands**:
   - `messagesHandler.tryAlternativeBoxcastUrl()` - Try broadcast URL
   - `messagesHandler.testBoxcastConnection()` - Test all endpoints
