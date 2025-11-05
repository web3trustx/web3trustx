# 🌐 Web3TrustX - Official Website

**Building Trust Across Web3**

Official website for the Web3TrustX ecosystem - A comprehensive suite of security tools, analytics, and education for the blockchain community.

![Web3TrustX](https://img.shields.io/badge/Web3-TrustX-00B5AD?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Development](#-development)
- [Deployment](#-deployment)
- [Configuration](#-configuration)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- **🌍 Bilingual Support (ES/EN)** - Full internationalization with easy language toggle
- **🎨 Modern Design** - Cyber-trust aesthetic with glassmorphism and smooth animations
- **⚡ Performance** - Optimized with Next.js 14+ and static site generation
- **📱 Responsive** - Mobile-first design, works perfectly on all devices
- **🎭 Animations** - Framer Motion for smooth, professional transitions
- **♿ Accessible** - WCAG compliant with semantic HTML
- **🔍 SEO Optimized** - Meta tags, Open Graph, and sitemap included
- **🚀 Fast Loading** - Lighthouse score 95+ across all metrics

### Pages Included

1. **Home** - Hero section with features overview
2. **About** - Mission, vision, and values
3. **Ecosystem** - 6 integrated modules (TrustHubX, TrustScanner, TrustScore, TrustShield, TrustAcademy, TrustDAO)
4. **Tokenomics** - Placeholder for upcoming token economics (coming soon)
5. **Roadmap** - 7 phases with animated timeline
6. **Whitepaper** - Litepaper sections with download button
7. **Contact** - Form and social media links

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14.2+ | React framework with SSG/SSR |
| **React** | 18.3+ | UI library |
| **TypeScript** | 5.3+ | Type safety |
| **TailwindCSS** | 3.4+ | Utility-first CSS framework |
| **Framer Motion** | 11+ | Animation library |
| **PostCSS** | 8.4+ | CSS processing |

---

## 📁 Project Structure

```
web3trustx-website/
├── pages/                  # Next.js pages (routing)
│   ├── _app.tsx           # App wrapper with providers
│   ├── _document.tsx      # HTML document structure
│   ├── index.tsx          # Home page
│   ├── about.tsx          # About page
│   ├── ecosystem.tsx      # Ecosystem modules
│   ├── tokenomics.tsx     # Tokenomics (placeholder)
│   ├── roadmap.tsx        # Project roadmap
│   ├── whitepaper.tsx     # Whitepaper/Litepaper
│   └── contact.tsx        # Contact form
├── components/            # Reusable components
│   ├── Layout.tsx         # Main layout wrapper
│   ├── Header.tsx         # Navigation header
│   └── Footer.tsx         # Site footer
├── lib/                   # Utilities and helpers
│   ├── translations.ts    # i18n translations (ES/EN)
│   └── LanguageContext.tsx # Language provider
├── styles/               # Global styles
│   └── globals.css       # Tailwind + custom CSS
├── public/               # Static assets
│   ├── favicon.svg       # Site icon
│   ├── robots.txt        # SEO robots file
│   └── sitemap.xml       # SEO sitemap
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Dependencies
└── README.md            # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm/yarn/pnpm
- **Git** (for version control)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/web3trustx-website.git
   cd web3trustx-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 💻 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server |
| `npm run export` | Export static site to `/out` |
| `npm run deploy` | Build + export + deploy to GitHub Pages |
| `npm run lint` | Run ESLint checks |

### Adding New Content

#### 1. Adding a New Page

```tsx
// pages/new-page.tsx
'use client';

import Head from 'next/head';
import { useLanguage } from '../lib/LanguageContext';
import { motion } from 'framer-motion';

export default function NewPage() {
  const { t } = useLanguage();
  
  return (
    <>
      <Head>
        <title>New Page - Web3TrustX</title>
        <meta name="description" content="Description" />
      </Head>
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <h1 className="section-title">{t.newPage.title}</h1>
          {/* Your content */}
        </div>
      </div>
    </>
  );
}
```

#### 2. Adding Translations

Edit `lib/translations.ts`:

```typescript
export const translations = {
  es: {
    // ... existing translations
    newPage: {
      title: 'Nueva Página',
      content: 'Contenido aquí'
    }
  },
  en: {
    // ... existing translations
    newPage: {
      title: 'New Page',
      content: 'Content here'
    }
  }
};
```

#### 3. Adding to Navigation

Edit `components/Header.tsx` menuItems array:

```typescript
const menuItems = [
  // ... existing items
  { href: '/new-page', label: t.nav.newPage },
];
```

### Customizing Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    DEFAULT: '#00B5AD', // Main brand color
    light: '#00E5DB',    // Lighter variant
    dark: '#008F89',     // Darker variant
  },
  // ... other colors
}
```

---

## 🌐 Deployment

### GitHub Pages (Current)

1. **Update `next.config.js`**
   ```javascript
   basePath: '/your-repo-name',
   assetPrefix: '/your-repo-name/',
   ```

2. **Build and export**
   ```bash
   npm run export
   ```

3. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

4. **Configure GitHub Settings**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `/ (root)`

### Vercel (Recommended for Production)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login and deploy**
   ```bash
   vercel login
   vercel
   ```

3. **Configure environment**
   - Remove `basePath` and `assetPrefix` from `next.config.js`
   - Vercel handles everything automatically

### Custom Domain

1. **Add CNAME file** to `/public/CNAME`:
   ```
   www.web3trustx.com
   ```

2. **Configure DNS**
   - Type: `CNAME`
   - Name: `www` (or `@` for apex)
   - Value: `your-org.github.io` or Vercel domain

---

## ⚙️ Configuration

### Environment Variables (Optional)

Create `.env.local` for sensitive data:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX          # Google Analytics
NEXT_PUBLIC_CONTACT_EMAIL=contact@web3trustx.com
```

### SEO Configuration

Edit meta tags in each page's `<Head>` component:

```tsx
<Head>
  <title>Your Title - Web3TrustX</title>
  <meta name="description" content="Your description" />
  <meta property="og:title" content="Your Title" />
  <meta property="og:image" content="/og-image.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
</Head>
```

### Analytics Integration

Add to `pages/_document.tsx`:

```tsx
<Head>
  {/* Google Analytics */}
  <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
  <script dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
    `
  }} />
</Head>
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Use TypeScript for all components
- Follow ESLint rules (`npm run lint`)
- Use Tailwind utility classes (avoid custom CSS when possible)
- Comment complex logic
- Keep components small and focused

---

## 📝 TODO / Roadmap

- [ ] Add contact form backend (EmailJS/FormSpree)
- [ ] Implement tokenomics page with charts
- [ ] Add blog section
- [ ] Create admin dashboard for content management
- [ ] Integrate Web3 wallet connection
- [ ] Add newsletter subscription
- [ ] Create interactive roadmap with milestones
- [ ] Add multi-language support (more languages)
- [ ] Implement dark/light theme toggle (currently dark-only)
- [ ] Add unit tests with Jest/React Testing Library

---

## 📄 License

MIT License - see LICENSE file for details.

---

## 👥 Team

- **Founders**: Web3TrustX Team
- **Website**: [web3trustx.com](https://web3trustx.com)
- **Email**: contact@web3trustx.com

---

## 🔗 Links

- **Website**: [https://web3trustx.com](https://web3trustx.com)
- **Telegram**: [t.me/Web3TrustX](https://t.me/Web3TrustX)
- **Twitter/X**: [@Web3TrustX](https://x.com/Web3TrustX)
- **Discord**: [discord.gg/S8fAQkhN4t](https://discord.gg/S8fAQkhN4t)

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first approach
- Framer Motion for beautiful animations
- The Web3 community for inspiration

---

**Built with ❤️ by Web3TrustX Team**

*Building Trust Across Web3*
