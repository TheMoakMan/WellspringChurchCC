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
  - Community (Hebrews 10:24-25)
  - Worship (Psalm 95:1-2)
  - Missions (Acts 1:8)
- **Two-Panel Section**: "What to Expect" (left) + "Core Beliefs" (right)
- **Link**: Assemblies of God beliefs reference
- **Responsive**: All sections work on mobile and desktop

#### 3. Team Page (team.html)
- **NO HERO IMAGE** (removed per latest update)
- **Leadership Team**: 
  - Pastor Ryan Martin (Lead Pastor) - real bio, team_ryan.avif
  - Pastor Kenny Martin (Associate Pastor/Legacy Adults) - real bio, team_kenny.avif  
  - Danika Martin (Director of Ministries) - real bio, team_danika.avif
  - Pastor Jaela Pruitt (Worship Pastor) - moved from Ministry Leaders
- **Ministry Leaders**:
  - Heath & Mindy Middleton (Missions Team Directors)
  - Shane & Jill Hale (Marriage Ministry)
  - Evan & Faith Moak (Student Ministry Youth Leaders)
- All using real bios and content from church website

#### 4. Ministries Page (ministries.html)
- **Small Hero Section**: 40vh height (reduced from 60vh)
- **NextGen Ministries**: Real content from church website
  - Nursery (Ages 8 Weeks - 3 Years)
  - Lil' Springs Pre-K (Ages 3-5 Years)
  - WC Kids (Ages 5 - 6th Grade) - Contact: Danika@WellspringChurch.cc
  - The Well Youth (Grades 7-12) - Wednesdays @ 6:00 PM in Student Center
- **Compact Design**: Streamlined for adding more content later

#### 5. Giving Page (giving.html)
- **Simplified Design**: Based on actual church website content
- **Three Main Sections**:
  1. **Give Online**: Link to Church Center giving platform
  2. **Get Connected**: Information about joining the team
  3. **Join the Team**: Contact Danika for ministry involvement
- **Real Content**: Uses exact text from church website

### 🚧 REMAINING PAGES TO COMPLETE

#### 6. Messages Page (messages.html)
- **Status**: Basic structure exists, needs real content
- **Next Steps**: Fetch content from church website and update with real sermon information

#### 7. Contact Page (contact.html)
- **Status**: Basic structure exists, needs real content
- **Next Steps**: Update with real contact forms and church information

## Key Team Members & Contact Info
- **Pastor Ryan Martin**: Lead Pastor - PastorRyan@WellspringChurch.cc
- **Pastor Kenny Martin**: Associate Pastor/Legacy Adults - PastorKenny@WellspringChurch.cc
- **Danika Martin**: Director of Ministries - Danika@WellspringChurch.cc
- **Pastor Jaela Pruitt**: Worship Pastor

## Worship Schedule
- **Weekend Worship**: Sunday @ 9:30am
- **Sunday School**: Sunday @ 11:00am  
- **Mid-Week Service**: Wednesday @ 6:00pm

## Technical Notes

### Image Assets
- **Logo**: wc_logo.avif (wellspring logo)
- **Team Photos**: team_ryan.avif, team_kenny.avif, team_danika.avif
- **Placeholder**: avatar.5.png (for missing team photos)
- **Hero Images**: hero.avif (main), services_*.avif (various)

### CSS Classes to Remember
- `.desktop-only` / `.mobile-only`: For responsive navigation
- `.scripture-text`: For scripture quotations styling
- `.service-card`: Main card component
- `.nav-floating`: Navigation bar
- `.hero-section`: Hero sections (some pages have smaller heroes)

### Footer Consistency
- **"WELLSPRING CHURCH" text**: Must match header styling
- **Contact Info**: Phone, address, email with proper icons
- **Social Links**: Facebook, Instagram, YouTube
- **Guest Connect**: Link to Church Center

## Development Guidelines

### When Adding New Content:
1. **Always fetch real content** from church website when possible
2. **Maintain responsive navigation** pattern (desktop dropdown, mobile separate links)
3. **Use consistent styling** with existing card-based design
4. **Keep church contact info accurate** across all pages
5. **Test mobile responsiveness** for all new sections

### Navigation Updates:
When updating any page navigation, ensure ALL pages have the consistent pattern:
```html
<div class="nav-dropdown desktop-only">...</div>
<a href="about.html" class="nav-link mobile-only">Values</a>
<a href="team.html" class="nav-link mobile-only">Team</a>
```

### Content Fetching:
Use the fetch_webpage tool to get real content from:
- Main site: https://www.wellspringchurch.cc/
- Specific pages: /about, /ministries, /giving, /contact, /messages

## Next Session Priorities
1. **Complete Messages Page**: Fetch and implement real sermon/message content
2. **Complete Contact Page**: Update with real contact forms and information  
3. **Final Testing**: Ensure all responsive behavior works correctly
4. **Content Review**: Verify all real church information is accurate and up-to-date

## File Structure
```
src/
├── index.html (✅ Complete)
├── about.html (✅ Complete) 
├── team.html (✅ Complete)
├── ministries.html (✅ Complete)
├── giving.html (✅ Complete)
├── messages.html (🚧 Needs content)
├── contact.html (🚧 Needs content)
├── css/
│   ├── styles.css (main styles)
│   └── animations.css
├── js/
│   ├── main.js
│   ├── interactive.js
│   └── scroll-effects.js
├── assets/
│   ├── images/ (team photos, logos, hero images)
│   └── fonts/
└── copilot.md (this file)
```

---
**Last Updated**: December 2024
**Church Website**: https://www.wellspringchurch.cc/
**Project Status**: ~80% Complete - 5/7 main pages finished
