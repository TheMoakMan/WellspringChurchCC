// Messages Page Dynamic Content Handler
// Handles YouTube API integration and YouTube Live streaming

class MessagesPageHandler {
    constructor() {
        this.youtubeChannelId = 'UCAFwEAi4EEo1P2vFB9UYOxA';
        this.init();
    }

    init() {
        this.setupMessageCardInteractions();
        this.loadYouTubeAPI();
        this.setupEventListeners();
        this.observeVideoLoading();
    }

    // Enhanced message card interactions
    setupMessageCardInteractions() {
        // Handle featured video loading
        const featuredIframe = document.getElementById('featured-video-iframe');
        if (featuredIframe) {
            featuredIframe.addEventListener('load', () => {
                const container = featuredIframe.parentElement;
                container.classList.add('loaded');
            });
        }

        // Handle message cards in the grid - basic loading states only
        const messageCards = document.querySelectorAll('.message-card');
        messageCards.forEach(card => {
            const iframe = card.querySelector('iframe');
            const videoContainer = card.querySelector('.message-video-container');
            
            if (iframe) {
                iframe.addEventListener('load', () => {
                    videoContainer.classList.add('loaded');
                });
            }
        });
    }

    // Observe video loading states
    observeVideoLoading() {
        const iframes = document.querySelectorAll('.message-video-container iframe');
        
        iframes.forEach(iframe => {
            // Add loading indicator
            const container = iframe.parentElement;
            if (!container.querySelector('.video-loading-indicator')) {
                const loadingIndicator = document.createElement('div');
                loadingIndicator.className = 'video-loading-indicator';
                loadingIndicator.innerHTML = `
                    <div class="loading-spinner"></div>
                    <p>Loading video...</p>
                `;
                loadingIndicator.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: white;
                    text-align: center;
                    z-index: 2;
                    font-size: 14px;
                `;
                container.appendChild(loadingIndicator);
                
                // Remove loading indicator when iframe loads
                iframe.addEventListener('load', () => {
                    setTimeout(() => {
                        if (loadingIndicator.parentElement) {
                            loadingIndicator.remove();
                        }
                    }, 500);
                });
            }
        });
    }

    // Load YouTube API and get recent videos
    loadYouTubeAPI() {
        // Note: This requires a YouTube API key for production use
        // For now, we'll use a fallback method with publicly available data
        this.loadRecentVideosFromRSS();
    }

    // Alternative method using YouTube RSS feed (no API key required)
    async loadRecentVideosFromRSS() {
        try {
            // YouTube RSS feed URL
            const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${this.youtubeChannelId}`;
            
            // Use a CORS proxy for development (replace with your own in production)
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;
            
            const response = await fetch(proxyUrl);
            const data = await response.json();
            
            if (data.contents) {
                this.parseYouTubeRSS(data.contents);
            }
        } catch (error) {
            console.log('YouTube RSS feed not available, using static content');
            // Fallback to current static content
        }
    }

    parseYouTubeRSS(xmlString) {
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
            const entries = xmlDoc.getElementsByTagName('entry');

            const videos = [];
            for (let i = 0; i < Math.min(6, entries.length); i++) {
                const entry = entries[i];
                const videoId = entry.getElementsByTagName('yt:videoId')[0]?.textContent;
                const title = entry.getElementsByTagName('title')[0]?.textContent;
                const published = entry.getElementsByTagName('published')[0]?.textContent;
                
                if (videoId && title) {
                    videos.push({
                        id: videoId,
                        title: title,
                        publishedAt: published
                    }); 
                }
            }
            
            if (videos.length > 0) {
                this.updateVideoGrid(videos);
            }
        } catch (error) {
            console.log('Error parsing YouTube RSS:', error);
        }
    }

    updateVideoGrid(videos) {
        // Update featured video (most recent)
        if (videos.length > 0) {
            this.updateFeaturedVideo(videos[0]);
        }
        
        // Update grid with remaining videos (skip first one since it's featured)
        const grid = document.querySelector('.messages-grid');
        if (!grid) return;

        const cards = grid.querySelectorAll('.message-card');
        const gridVideos = videos.slice(1); // Skip the first video (it's featured)
        
        gridVideos.forEach((video, index) => {
            if (index < cards.length) {
                this.updateVideoCard(cards[index], video);
            }
        });
    }

    updateFeaturedVideo(video) {
        // Update featured video iframe
        const featuredIframe = document.getElementById('featured-video-iframe');
        if (featuredIframe) {
            featuredIframe.src = `https://www.youtube.com/embed/${video.id}`;
            featuredIframe.title = video.title;
        }

        // Update featured video title (remove series prefix for cleaner look)
        const featuredTitle = document.getElementById('featured-message-title');
        if (featuredTitle) {
            const cleanTitle = video.title.replace(/New Life Unlocked\s*-\s*/i, '');
            featuredTitle.textContent = cleanTitle;
        }

        // Update featured video date with day, month, and year
        const featuredDate = document.getElementById('featured-message-date');
        if (featuredDate && video.publishedAt) {
            const date = new Date(video.publishedAt);
            featuredDate.textContent = date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long',
                day: 'numeric'
            });
        }
    }

    updateVideoCard(card, video) {
        // Update iframe src
        const iframe = card.querySelector('iframe');
        if (iframe) {
            iframe.src = `https://www.youtube.com/embed/${video.id}`;
            iframe.title = video.title;
        }

        // Update title (clean it up by removing series prefix)
        const titleElement = card.querySelector('.message-title');
        if (titleElement) {
            const cleanTitle = video.title.replace(/New Life Unlocked\s*-\s*/i, '');
            titleElement.textContent = cleanTitle;
        }

        // Update date with day, month, and year
        const dateElement = card.querySelector('.message-date');
        if (dateElement && video.publishedAt) {
            const date = new Date(video.publishedAt);
            dateElement.textContent = date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long',
                day: 'numeric'
            });
        }
    }

    setupEventListeners() {
        // Setup any additional event listeners for the messages page
        document.addEventListener('DOMContentLoaded', () => {
            this.enhanceVideoCards();
        });
    }

    enhanceVideoCards() {
        // Add loading states and error handling for video embeds
        const iframes = document.querySelectorAll('iframe[src*="youtube"]');
        
        iframes.forEach(iframe => {
            const container = iframe.closest('.service-card');
            if (container) {
                // Add loading indicator
                const loader = document.createElement('div');
                loader.className = 'video-loader';
                loader.innerHTML = '<div class="loading-spinner"></div>';
                loader.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 1;
                `;
                
                const videoContainer = iframe.parentElement;
                videoContainer.appendChild(loader);
                
                iframe.addEventListener('load', () => {
                    loader.remove();
                });
            }
        });
    }

    // Method to force refresh YouTube videos
    refreshYouTubeVideos() {
        this.loadRecentVideosFromRSS();
    }
}

// Instructions for YouTube Live streaming
function getYouTubeLiveInstructions() {
    console.log(`
=== 📺 YOUTUBE LIVE STREAMING ===

✅ LIVE STREAMING SETUP:
   Channel ID: UCAFwEAi4EEo1P2vFB9UYOxA
   Stream URL: https://www.youtube.com/embed/live_stream?channel=UCAFwEAi4EEo1P2vFB9UYOxA

🔧 HOW IT WORKS:
- Automatically displays live stream when the church goes live on YouTube
- Shows recent videos when not streaming live
- No domain restrictions or complex setup required

📱 BENEFITS:
- Reliable cross-platform streaming
- Mobile-friendly player
- Automatic quality adjustment
- Familiar YouTube interface for users

🎥 TO GO LIVE:
1. Start a live stream on the church's YouTube channel
2. The embed will automatically show the live stream
3. When stream ends, it reverts to showing recent videos

📅 DATE FORMAT:
- All video dates now display as "Month Day, Year" (e.g., "June 15, 2025")
- Titles use modern sans-serif font (Inter) for better readability
    `);
}

// Helper function to refresh YouTube content
function refreshYouTubeContent() {
    if (window.messagesHandler) {
        window.messagesHandler.refreshYouTubeVideos();
        console.log('✅ YouTube content refreshed');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.messagesHandler = new MessagesPageHandler();
    
    // Show instructions in console for setup
    getYouTubeLiveInstructions();
});

// YouTube API Configuration (for future use with API key)
const YOUTUBE_CONFIG = {
    // To use YouTube Data API v3 (requires API key):
    // 1. Go to Google Cloud Console
    // 2. Create a project and enable YouTube Data API v3
    // 3. Create credentials (API key)
    // 4. Add the key here
    API_KEY: 'YOUR_YOUTUBE_API_KEY_HERE',
    CHANNEL_ID: 'UCAFwEAi4EEo1P2vFB9UYOxA',
    MAX_RESULTS: 6 // 1 featured + 5 in grid (total 6)
};

// Function to use YouTube API (when API key is available)
async function loadVideosWithAPI() {
    if (YOUTUBE_CONFIG.API_KEY === 'YOUR_YOUTUBE_API_KEY_HERE') {
        console.log('YouTube API key not configured. Using RSS feed instead.');
        return;
    }

    const url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_CONFIG.API_KEY}&channelId=${YOUTUBE_CONFIG.CHANNEL_ID}&part=snippet,id&order=date&maxResults=${YOUTUBE_CONFIG.MAX_RESULTS}&type=video`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.items) {
            // Process the video data
            return data.items.map(item => ({
                id: item.id.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                publishedAt: item.snippet.publishedAt,
                thumbnail: item.snippet.thumbnails.medium.url
            }));
        }
    } catch (error) {
        console.error('YouTube API error:', error);
    }
}
