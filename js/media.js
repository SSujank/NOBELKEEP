/* ============================================================
   media.js — Centralised Media Assets
   All YouTube embeds and image URLs live here.
   To swap a video or image, edit only this file.
   Developed by Sujan Karki
   ============================================================ */

const MEDIA = {

  /* ── YOUTUBE VIDEOS ───────────────────────────────────────
     Each entry: { id, title, description, category, date }
     Embed URL = https://www.youtube.com/embed/{id}?rel=0&modestbranding=1
  ──────────────────────────────────────────────────────────── */
  videos: {

    /* Treasury page articles */
    treasury: [
      {
        id: '4PzgK6mK6bE',
        title: 'The 50/30/20 Rule: A Sovereign\'s Guide to Budgeting',
        description: 'Allocate 50% of income to needs, 30% to wants, and 20% to savings. This timeless framework ensures long-term financial stability and freedom.',
        category: 'Financial Strategy',
        date: 'Apr 26, 2026'
      },
      {
        id: '3p7u8mGPZvQ',
        title: 'Compound Interest: The Crown Jewel of Wealth Building',
        description: 'Discover how compound interest multiplies your wealth. Small, consistent investments today build formidable financial security for future generations.',
        category: 'Investment Wisdom',
        date: 'Apr 20, 2026'
      },
      {
        id: 'gFQNPmLKj1k',
        title: 'Investing for Beginners: Where to Start',
        description: 'Index funds, ETFs, or individual stocks? Learn the landscape before deploying your first dollar — knowledge is the safest investment.',
        category: 'Stock Market',
        date: 'Apr 18, 2026'
      },
      {
        id: 'Rpt5pJkHjPo',
        title: 'How to Pay Off Debt Fast',
        description: 'The debt avalanche and snowball methods compared. One saves you money, one saves your motivation. Both beat the minimum payment trap.',
        category: 'Debt Freedom',
        date: 'Apr 12, 2026'
      }
    ],

    /* AI Advisor knowledge hub — featured video */
    featured: {
      id: 'HQzoZfc3GwQ',
      title: 'How Money Works',
      description: 'A comprehensive guide to understanding money, wealth, and the financial system.'
    }
  },

  /* ── IMAGES ───────────────────────────────────────────────
     All sourced from Unsplash (free to use).
     Each entry: { url, alt, tag, title, description }
  ──────────────────────────────────────────────────────────── */
  images: {

    /* Treasury hero banner */
    treasuryHero: {
      url: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=1200&q=80&auto=format&fit=crop',
      alt: 'Finance and wealth management'
    },

    /* Treasury article inline images (text-only articles) */
    treasuryArticles: [
      {
        url: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&q=80&auto=format&fit=crop',
        alt: 'Shopping temptation — impulse spending',
        article: 'Avoiding the Traps of Impulse Spending'
      },
      {
        url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80&auto=format&fit=crop',
        alt: 'Financial safety net — emergency fund',
        article: 'Emergency Funds: Your Kingdom\'s Safety Net'
      }
    ],

    /* AI Advisor / Knowledge Hub media cards */
    knowledgeHub: [
      {
        url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80&auto=format&fit=crop',
        alt: 'Stock market charts and graphs',
        tag: 'Investing',
        title: 'Understanding Market Charts',
        description: 'Reading candlestick charts and trend lines gives you an edge in understanding where money flows.'
      },
      {
        url: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=600&q=80&auto=format&fit=crop',
        alt: 'Savings jar with coins',
        tag: 'Savings',
        title: 'The Power of Micro-Savings',
        description: 'Even $5 a day compounds into $55,000 over 20 years at a 7% return. Small habits, extraordinary wealth.'
      },
      {
        url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80&auto=format&fit=crop',
        alt: 'Budget planning notebook and calculator',
        tag: 'Budgeting',
        title: 'Zero-Based Budgeting',
        description: 'Assign every dollar a job. Start from zero each month — nothing goes unaccounted for.'
      },
      {
        url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80&auto=format&fit=crop',
        alt: 'Gold coins representing wealth',
        tag: 'Wealth',
        title: 'Building Generational Wealth',
        description: 'True sovereign wealth spans generations. Invest in index funds, real estate, and financial education.'
      },
      {
        url: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&q=80&auto=format&fit=crop',
        alt: 'Credit cards representing debt',
        tag: 'Debt',
        title: 'Debt Avalanche vs Snowball',
        description: 'Avalanche saves the most interest. Snowball provides motivation. Pick the method you\'ll stick to.'
      },
      {
        url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80&auto=format&fit=crop',
        alt: 'Professional in a suit — success mindset',
        tag: 'Mindset',
        title: 'The Millionaire Mindset',
        description: 'Wealth is built with patience, discipline, and delayed gratification. Think long-term in a short-term world.'
      }
    ]
  },

  /* ── HELPERS ──────────────────────────────────────────────
     Utility functions to build embed URLs and render HTML.
  ──────────────────────────────────────────────────────────── */

  /**
   * Returns a YouTube embed iframe string.
   * @param {string} videoId   - YouTube video ID
   * @param {string} title     - Accessibility title attribute
   * @param {number} height    - iframe height in px (default 200)
   */
  embedUrl(videoId) {
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
  },

  iframeHTML(videoId, title, height = 200) {
    return `<iframe
      src="${this.embedUrl(videoId)}"
      title="${title}"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      style="width:100%;height:${height}px;border:none;display:block"></iframe>`;
  },

  /**
   * Renders a knowledge hub media card HTML string.
   */
  mediaCardHTML(item) {
    return `<div class="media-card">
      <img src="${item.url}" alt="${item.alt}" loading="lazy">
      <div class="media-card-body">
        <div class="media-tag">${item.tag}</div>
        <div class="media-card-title">${item.title}</div>
        <div class="media-card-desc">${item.description}</div>
      </div>
    </div>`;
  }
};

/* ── AUTO-RENDER knowledge hub cards if container exists ────
   The AI Advisor page has id="knowledge-hub-grid".
   This replaces the hardcoded HTML with MEDIA-driven cards.
──────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('knowledge-hub-grid');
  if (grid) {
    grid.innerHTML = MEDIA.images.knowledgeHub.map(item => MEDIA.mediaCardHTML(item)).join('');
  }

  const featuredVideo = document.getElementById('featured-video-container');
  if (featuredVideo) {
    const v = MEDIA.videos.featured;
    featuredVideo.innerHTML = MEDIA.iframeHTML(v.id, v.title, 360);
  }
});
