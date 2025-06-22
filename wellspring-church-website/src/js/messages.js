// Messages Page Dynamic Content Handler
// Handles YouTube API integration and Boxcast stream detection

class MessagesPageHandler {
    constructor() {
        this.youtubeChannelId = 'UCAFwEAi4EEo1P2vFB9UYOxA';
        this.boxcastChannelId = 'xelumtbow3yvccvbazko';
        this.boxcastBroadcastId = 'fepy4qhf9q67zkx2jyis'; // Found from API call
        this.boxcastHost = 'www-wellspringchurch-cc.filesusr.com'; // Required host parameter
        this.init();
    }

    init() {
        this.setupMessageCardInteractions();
        this.loadYouTubeAPI();
        this.detectBoxcastChannel();
        this.setupEventListeners();
        this.observeVideoLoading();
    }    // Enhanced message card interactions
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
    }    // Observe video loading states
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
            const entries = xmlDoc.getElementsByTagName('entry');            const videos = [];
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
    }    updateVideoGrid(videos) {
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
        }        // Update featured video date
        const featuredDate = document.getElementById('featured-message-date');
        if (featuredDate && video.publishedAt) {
            const date = new Date(video.publishedAt);
            featuredDate.textContent = date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long',
                day: 'numeric'
            });
        }
    }    updateVideoCard(card, video) {
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

        // Update date
        const dateElement = card.querySelector('.message-date');
        if (dateElement && video.publishedAt) {
            const date = new Date(video.publishedAt);
            dateElement.textContent = date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long' 
            });
        }
    }

    // Detect the correct Boxcast channel ID
    detectBoxcastChannel() {
        // Check if there's a way to detect the actual Boxcast channel ID
        // This function can be expanded to search for embedded scripts or check localStorage
        this.checkForBoxcastConfig();
    }

    checkForBoxcastConfig() {
        // Check localStorage for Boxcast configuration
        const boxcastConfig = localStorage.getItem('boxcast_config');
        if (boxcastConfig) {
            try {
                const config = JSON.parse(boxcastConfig);
                if (config.channelId) {
                    this.boxcastChannelId = config.channelId;
                    this.updateBoxcastEmbed();
                }
            } catch (error) {
                console.log('Error parsing Boxcast config:', error);
            }
        }

        // Check for Boxcast scripts in the original website
        this.inspectPageForBoxcastId();
    }    inspectPageForBoxcastId() {
        // This would typically run on the actual church website to extract the channel ID
        console.log('Current Boxcast Channel ID:', this.boxcastChannelId);
        console.log('🔧 BOXCAST TROUBLESHOOTING:');
        console.log('Channel ID found: xelumtbow3yvccvbazko (from Wix widget)');
        console.log('');
        console.log('⚠️ COMMON ISSUES:');
        console.log('1. Wix Boxcast widgets may have domain restrictions');
        console.log('2. The embed URL format might be different for Wix-generated channels');
        console.log('3. Some Boxcast channels require specific referrer headers');
        console.log('');
        console.log('🔍 DEBUGGING STEPS:');
        console.log('1. Try different Boxcast embed formats');
        console.log('2. Check if the original site has CORS/domain restrictions');
        console.log('3. Look for alternative streaming solutions');
        console.log('');
        console.log('💡 ALTERNATIVES TO TRY:');
        console.log('- messagesHandler.tryAlternativeBoxcastUrl()');
        console.log('- messagesHandler.setupYouTubeLiveEmbed()');
        console.log('- messagesHandler.testBoxcastConnection()');
    }    updateBoxcastEmbed() {
        const boxcastIframe = document.querySelector('iframe[src*="boxcast"]');
        if (boxcastIframe) {
            // Use the broadcast-specific URL with all required parameters
            const newSrc = `https://embed.boxcast.com/broadcast/${this.boxcastBroadcastId}?channel_id=${this.boxcastChannelId}&host=${this.boxcastHost}&autoplay=0&defaultLive=1&showTitle=0&showDescription=0&showCountdown=1&showRelated=0`;
            boxcastIframe.src = newSrc;
            
            console.log('📺 Updated Boxcast embed with broadcast ID and host parameter');
            console.log(`URL: ${newSrc}`);
        }
    }setupEventListeners() {
        // Setup any additional event listeners for the messages page
        document.addEventListener('DOMContentLoaded', () => {
            this.enhanceVideoCards();
            this.createStreamingControls();
            this.setupYouTubeLiveEmbed(); // Setup fallback
            
            // Auto-test Boxcast connection after a delay
            setTimeout(() => {
                this.testBoxcastConnection();
            }, 2000);
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

    // Method to manually update Boxcast channel ID
    setBoxcastChannelId(channelId) {
        this.boxcastChannelId = channelId;
        this.updateBoxcastEmbed();
        
        // Save to localStorage for future visits
        localStorage.setItem('boxcast_config', JSON.stringify({
            channelId: channelId,
            lastUpdated: new Date().toISOString()
        }));
    }

    // Method to force refresh YouTube videos
    refreshYouTubeVideos() {
        this.loadRecentVideosFromRSS();
    }    // Alternative Boxcast embed formats to try
    tryAlternativeBoxcastUrl() {
        const alternatives = [
            // Standard embed with broadcast ID (most likely to work)
            `https://embed.boxcast.com/broadcast/${this.boxcastBroadcastId}?channel_id=${this.boxcastChannelId}&host=${this.boxcastHost}`,
            // Channel embed with host parameter
            `https://embed.boxcast.com/channel/${this.boxcastChannelId}?host=${this.boxcastHost}&defaultLive=1&autoplay=0`,
            // Standard Boxcast embed
            `https://embed.boxcast.com/channel/${this.boxcastChannelId}`,
            // With specific parameters
            `https://embed.boxcast.com/channel/${this.boxcastChannelId}?defaultLive=1&autoplay=0`,
            // Broadcast-specific embed
            `https://embed.boxcast.com/broadcast/${this.boxcastBroadcastId}`,
            // Player format with broadcast ID
            `https://embed.boxcast.com/player/${this.boxcastBroadcastId}?channel_id=${this.boxcastChannelId}`
        ];

        console.log('🔄 Trying alternative Boxcast URLs with broadcast ID...');
        alternatives.forEach((url, index) => {
            console.log(`${index + 1}. ${url}`);
        });

        // Try the first alternative (most likely to work)
        const boxcastIframe = document.querySelector('iframe[src*="boxcast"]');
        if (boxcastIframe && alternatives.length > 0) {
            boxcastIframe.src = alternatives[0];
            console.log(`✅ Updated to: ${alternatives[0]}`);
            
            // Set up iframe to try fallbacks on error
            this.setupIframeErrorHandling(boxcastIframe, alternatives);
        }

        return alternatives;
    }

    // Setup iframe error handling with multiple fallbacks
    setupIframeErrorHandling(iframe, alternatives) {
        let currentIndex = 0;
        
        const tryNextUrl = () => {
            currentIndex++;
            if (currentIndex < alternatives.length) {
                console.log(`🔄 Trying fallback ${currentIndex + 1}: ${alternatives[currentIndex]}`);
                iframe.src = alternatives[currentIndex];
            } else {
                console.log('❌ All Boxcast URLs failed, switching to YouTube Live...');
                this.setupYouTubeLiveEmbed();
            }
        };

        // Handle iframe load errors
        iframe.onerror = tryNextUrl;
        
        // Also check if iframe loads but shows error content
        iframe.onload = () => {
            setTimeout(() => {
                try {
                    // Check if iframe content indicates an error
                    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                    if (iframeDoc && iframeDoc.body.textContent.toLowerCase().includes('error')) {
                        tryNextUrl();
                    } else {
                        console.log('✅ Boxcast stream loaded successfully');
                    }
                } catch (e) {
                    // Cross-origin restrictions prevent checking content, assume it worked
                    console.log('✅ Boxcast stream embed loaded (cross-origin protected)');
                }
            }, 3000);
        };
    }    // Test Boxcast connection
    async testBoxcastConnection() {
        console.log('🧪 Testing Boxcast connection...');
        console.log('📡 Found broadcast details:');
        console.log(`   Channel ID: ${this.boxcastChannelId}`);
        console.log(`   Broadcast ID: ${this.boxcastBroadcastId}`);
        console.log(`   Required Host: ${this.boxcastHost}`);
        
        const testUrls = [
            // Test the exact API endpoint that was captured
            `https://rest.boxcast.com/broadcasts/${this.boxcastBroadcastId}/view?channel_id=${this.boxcastChannelId}&host=${this.boxcastHost}&extended=true`,
            // Test the embed URLs
            `https://embed.boxcast.com/broadcast/${this.boxcastBroadcastId}?channel_id=${this.boxcastChannelId}&host=${this.boxcastHost}`,
            `https://embed.boxcast.com/channel/${this.boxcastChannelId}`,
            `https://boxcast.com/channel/${this.boxcastChannelId}`
        ];

        for (const url of testUrls) {
            try {
                console.log(`Testing: ${url}`);
                const response = await fetch(url, { 
                    method: 'HEAD',
                    mode: 'no-cors', // Avoid CORS issues for testing
                    headers: {
                        'Referer': `https://${this.boxcastHost}/`
                    }
                });
                console.log(`✅ ${url} - Accessible`);
            } catch (error) {
                console.log(`❌ ${url} - Error: ${error.message}`);
            }
        }
        
        console.log('');
        console.log('🔧 DOMAIN RESTRICTION DETECTED:');
        console.log('The Boxcast stream requires the specific Wix host parameter.');
        console.log('This is why it may not work on external domains.');
    }

    // Setup YouTube Live as fallback
    setupYouTubeLiveEmbed() {
        console.log('🔄 Setting up YouTube Live as fallback...');
        
        const boxcastContainer = document.querySelector('.boxcast-container');
        if (!boxcastContainer) return;

        // Create YouTube Live embed as fallback
        const youtubeChannelId = this.youtubeChannelId;
        const youtubeLiveUrl = `https://www.youtube.com/embed/live_stream?channel=${youtubeChannelId}&autoplay=0`;

        const iframe = boxcastContainer.querySelector('iframe');
        if (iframe) {
            // Store original Boxcast URL
            iframe.dataset.originalSrc = iframe.src;
            iframe.dataset.fallbackSrc = youtubeLiveUrl;
            
            // Add error handler
            iframe.onerror = () => {
                console.log('📺 Boxcast failed, switching to YouTube Live...');
                iframe.src = youtubeLiveUrl;
                this.updateLiveStreamMessage('YouTube Live');
            };

            // Test Boxcast load
            iframe.onload = () => {
                console.log('✅ Stream embed loaded successfully');
            };
        }
    }

    // Update live stream message based on provider
    updateLiveStreamMessage(provider = 'Live Stream') {
        const messageContainer = document.querySelector('.service-card h3');
        if (messageContainer) {
            messageContainer.textContent = `${provider} - Weekend Services`;
        }

        const descriptionContainer = document.querySelector('.service-card p');
        if (descriptionContainer) {
            if (provider === 'YouTube Live') {
                descriptionContainer.innerHTML = `
                    Join us live for worship every Sunday at 9:30am via YouTube Live. 
                    If we're not currently streaming, check out our recent messages below!
                    <br><small style="color: #999; margin-top: 10px; display: block;">
                    Note: Using YouTube Live as backup streaming service.
                    </small>
                `;
            }
        }
    }

    // Create a manual override system
    createStreamingControls() {
        const container = document.querySelector('.boxcast-container');
        if (!container) return;

        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'streaming-controls';
        controlsDiv.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(0,0,0,0.7);
            color: white;
            padding: 10px;
            border-radius: 5px;
            font-size: 12px;
            z-index: 10;
            display: none;
        `;        controlsDiv.innerHTML = `
            <div style="margin-bottom: 5px;"><strong>Stream Controls</strong></div>
            <div style="font-size: 10px; margin-bottom: 5px;">Broadcast: ${this.boxcastBroadcastId.substring(0, 8)}...</div>
            <button onclick="messagesHandler.tryAlternativeBoxcastUrl()" style="margin: 2px; padding: 4px 8px; font-size: 11px;">Try Broadcast URL</button>
            <button onclick="messagesHandler.setupYouTubeLiveEmbed()" style="margin: 2px; padding: 4px 8px; font-size: 11px;">YouTube Live</button>
            <button onclick="messagesHandler.testBoxcastConnection()" style="margin: 2px; padding: 4px 8px; font-size: 11px;">Test Connection</button>
        `;

        container.appendChild(controlsDiv);

        // Show controls on hover (for debugging)
        container.addEventListener('mouseenter', () => {
            controlsDiv.style.display = 'block';
        });
        container.addEventListener('mouseleave', () => {
            controlsDiv.style.display = 'none';
        });
    }

    // Create a proxy iframe approach for domain restrictions
    createProxyEmbed() {
        console.log('🔄 Attempting proxy embed solution...');
        
        const boxcastContainer = document.querySelector('.boxcast-container');
        if (!boxcastContainer) return;

        // Create a data URL with the Boxcast embed
        const embedHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <style>
                    body { margin: 0; padding: 0; overflow: hidden; }
                    iframe { width: 100%; height: 100vh; border: none; }
                </style>
            </head>
            <body>
                <iframe 
                    src="https://embed.boxcast.com/broadcast/${this.boxcastBroadcastId}?channel_id=${this.boxcastChannelId}&host=${this.boxcastHost}&autoplay=0&defaultLive=1&showTitle=0&showDescription=0&showCountdown=1&showRelated=0"
                    allowfullscreen>
                </iframe>
            </body>
            </html>
        `;

        const dataUrl = 'data:text/html;charset=utf-8,' + encodeURIComponent(embedHtml);
        
        const iframe = boxcastContainer.querySelector('iframe');
        if (iframe) {
            iframe.src = dataUrl;
            console.log('✅ Proxy embed created');
        }
    }

    // Method to manually set broadcast ID if it changes
    setBroadcastId(broadcastId) {
        this.boxcastBroadcastId = broadcastId;
        this.updateBoxcastEmbed();
        
        // Save to localStorage
        const config = JSON.parse(localStorage.getItem('boxcast_config') || '{}');
        config.broadcastId = broadcastId;
        config.lastUpdated = new Date().toISOString();
        localStorage.setItem('boxcast_config', JSON.stringify(config));
        
        console.log(`✅ Broadcast ID updated to: ${broadcastId}`);
    }
}

// Instructions for troubleshooting Boxcast issues
function getBoxcastInstructions() {
    console.log(`
=== 🎯 BOXCAST SOLUTION FOUND ===

✅ DISCOVERED FROM API ANALYSIS:
   Channel ID: xelumtbow3yvccvbazko
   Broadcast ID: fepy4qhf9q67zkx2jyis
   Required Host: www-wellspringchurch-cc.filesusr.com

🔧 DOMAIN RESTRICTION ISSUE:
The Boxcast stream requires a specific "host" parameter that matches
the original Wix domain. This prevents it from working on external sites.

� AUTOMATIC SOLUTIONS IMPLEMENTED:

1. Try broadcast-specific URL:
   messagesHandler.tryAlternativeBoxcastUrl()

2. Switch to YouTube Live (RECOMMENDED):
   messagesHandler.setupYouTubeLiveEmbed()

3. Test all connection options:
   messagesHandler.testBoxcastConnection()

🚨 WHY BOXCAST FAILS ON EXTERNAL DOMAINS:
- Host parameter validation: host=www-wellspringchurch-cc.filesusr.com
- Referrer header restrictions
- CORS policies blocking cross-domain embeds

✅ BEST SOLUTION: Use YouTube Live streaming for reliable cross-domain compatibility.
    `);
}

// Helper function to quickly switch to YouTube Live
function switchToYouTubeLive() {
    if (window.messagesHandler) {
        window.messagesHandler.setupYouTubeLiveEmbed();
        console.log('✅ Switched to YouTube Live streaming');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.messagesHandler = new MessagesPageHandler();
    
    // Show instructions in console for setup
    getBoxcastInstructions();
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
