/**
 * Dummy blog content — SEO-oriented titles, meta descriptions, and readable copy.
 * Replace or extend when connecting a CMS.
 */

const siteUrl = 'https://pixl-develop.com'

export const blogAuthors = {
  default: { name: 'Pixl Develop', role: 'Digital Product Team', roleDe: 'Team für digitale Produkte' },
}

/** @typedef {{ type: 'p' | 'h2' | 'h3' | 'ul'; text?: string; textDe?: string; items?: string[]; itemsDe?: string[] }} BlogBlock */

/**
 * @typedef {Object} BlogPost
 * @property {string} slug
 * @property {string} title
 * @property {string=} titleDe
 * @property {string} metaTitle
 * @property {string=} metaTitleDe
 * @property {string} description
 * @property {string=} descriptionDe
 * @property {string[]} keywords
 * @property {string[]=} keywordsDe
 * @property {string} publishedAt ISO date
 * @property {string} readTime e.g. "8 min read"
 * @property {string=} readTimeDe
 * @property {string} category
 * @property {string=} categoryDe
 * @property {string} excerpt
 * @property {string=} excerptDe
 * @property {BlogBlock[]} content
 */

/** @type {BlogPost[]} */
export const blogPosts = [
  {
    slug: 'technical-seo-checklist-business-websites',
    title: 'Technical SEO Checklist for Business Websites in 2025',
    titleDe: 'Technische SEO-Checkliste für Business-Websites 2025',
    metaTitle: 'Technical SEO Checklist 2025 | Web Performance & Rankings | Pixl Develop',
    metaTitleDe: 'Technische SEO-Checkliste 2025 | Web-Performance & Rankings | Pixl Develop',
    description:
      'A practical technical SEO checklist for business websites: Core Web Vitals, structured data, crawlability, and security signals that support sustainable search visibility.',
    descriptionDe:
      'Eine praktische technische SEO-Checkliste für Business-Websites: Core Web Vitals, strukturierte Daten, Crawlability und Sicherheitssignale für nachhaltige Sichtbarkeit in der Suche.',
    keywords: [
      'technical SEO',
      'SEO checklist',
      'Core Web Vitals',
      'website performance',
      'search engine optimization',
      'business website',
      'structured data',
    ],
    keywordsDe: [
      'technische SEO',
      'SEO-Checkliste',
      'Core Web Vitals',
      'Website-Performance',
      'Suchmaschinenoptimierung',
      'Business-Website',
      'strukturierte Daten',
    ],
    publishedAt: '2025-11-18',
    readTime: '9 min read',
    readTimeDe: '9 Min. Lesezeit',
    category: 'SEO',
    categoryDe: 'SEO',
    excerpt:
      'Learn how technical SEO, site speed, and clean information architecture work together to help your business website rank and convert.',
    excerptDe:
      'Erfahren Sie, wie technische SEO, Ladegeschwindigkeit und saubere Informationsarchitektur zusammenwirken, damit Ihre Business-Website besser rankt und konvertiert.',
    content: [
      {
        type: 'p',
        text: 'Technical SEO is the foundation of sustainable organic growth. When your site loads fast, renders cleanly on mobile, and gives search engines unambiguous signals about your content, you earn better crawl efficiency and stronger relevance scores. This guide distills what we implement for clients who care about rankings and revenue—not vanity metrics.',
        textDe:
          'Technische SEO ist die Grundlage für nachhaltiges organisches Wachstum. Wenn Ihre Website schnell lädt, auf mobilen Geräten sauber dargestellt wird und Suchmaschinen eindeutige Signale zu Ihren Inhalten liefert, verbessern sich Crawl-Effizienz und Relevanzbewertung. Dieser Leitfaden fasst zusammen, was wir für Kunden umsetzen, denen Rankings und Umsatz wichtiger sind als reine Vanity-Metriken.',
      },
      {
        type: 'h2',
        text: 'Why technical SEO still matters for competitive niches',
        textDe: 'Warum technische SEO in umkämpften Nischen weiterhin wichtig ist',
      },
      {
        type: 'p',
        text: 'On-page copy and backlinks attract attention, but technical SEO determines whether Google can access, understand, and trust your pages at scale. Broken redirects, bloated JavaScript, and missing canonical tags can silently cap your visibility even when content quality is high.',
        textDe:
          'On-Page-Texte und Backlinks erzeugen Aufmerksamkeit, aber technische SEO entscheidet, ob Google Ihre Seiten in großem Umfang abrufen, verstehen und ihnen vertrauen kann. Fehlerhafte Weiterleitungen, aufgeblähtes JavaScript und fehlende Canonical-Tags können Ihre Sichtbarkeit still begrenzen, selbst wenn die Inhalte hochwertig sind.',
      },
      {
        type: 'h2',
        text: 'High-impact checks we run first',
        textDe: 'Die wichtigsten Checks, die wir zuerst durchführen',
      },
      {
        type: 'ul',
        items: [
          'Indexation control: robots.txt, meta robots, and XML sitemaps aligned with your crawl budget.',
          'Core Web Vitals: LCP, INP, and CLS tuned for real-user devices—not just lab scores.',
          'Structured data: Organization, Article, FAQ, and Product markup where they reflect real page content.',
          'HTTPS, HSTS, and security headers that reinforce trust for users and browsers.',
          'Internal linking and URL consistency to consolidate authority on priority landing pages.',
        ],
        itemsDe: [
          'Indexierungssteuerung: robots.txt, Meta-Robots und XML-Sitemaps passend zu Ihrem Crawl-Budget.',
          'Core Web Vitals: LCP, INP und CLS für echte Nutzergeräte optimiert, nicht nur für Labordaten.',
          'Strukturierte Daten: Organization-, Article-, FAQ- und Product-Markup dort, wo es echte Seiteninhalte abbildet.',
          'HTTPS, HSTS und Security Header, die Vertrauen bei Nutzern und Browsern stärken.',
          'Interne Verlinkung und konsistente URLs, um Autorität auf wichtigen Landingpages zu bündeln.',
        ],
      },
      {
        type: 'h2',
        text: 'Measuring SEO success the right way',
        textDe: 'SEO-Erfolg richtig messen',
      },
      {
        type: 'p',
        text: 'Pair Search Console coverage reports with conversion paths in your analytics stack. Rankings are a leading indicator; qualified leads, demo requests, and revenue per session are the outcomes technical SEO is meant to protect and amplify.',
        textDe:
          'Kombinieren Sie Abdeckungsberichte aus der Search Console mit Conversion-Pfaden in Ihrem Analytics-Setup. Rankings sind ein Frühindikator; qualifizierte Leads, Demo-Anfragen und Umsatz pro Sitzung sind die Ergebnisse, die technische SEO schützen und verstärken soll.',
      },
    ],
  },
  {
    slug: 'react-nextjs-enterprise-web-development',
    title: 'React vs Next.js for Enterprise Web Development Projects',
    titleDe: 'React vs. Next.js für Enterprise-Webentwicklungsprojekte',
    metaTitle: 'React vs Next.js for Enterprise Web Apps | Pixl Develop',
    metaTitleDe: 'React vs. Next.js für Enterprise-Web-Apps | Pixl Develop',
    description:
      'Compare React and Next.js for enterprise web development: SSR, SEO, routing, and when a full-stack React framework accelerates delivery without sacrificing maintainability.',
    descriptionDe:
      'Vergleichen Sie React und Next.js für Enterprise-Webentwicklung: SSR, SEO, Routing und wann ein Full-Stack-React-Framework die Umsetzung beschleunigt, ohne Wartbarkeit zu opfern.',
    keywords: [
      'React development',
      'Next.js',
      'enterprise web development',
      'SSR',
      'JavaScript framework',
      'frontend architecture',
    ],
    keywordsDe: [
      'React-Entwicklung',
      'Next.js',
      'Enterprise-Webentwicklung',
      'SSR',
      'JavaScript-Framework',
      'Frontend-Architektur',
    ],
    publishedAt: '2025-10-02',
    readTime: '11 min read',
    readTimeDe: '11 Min. Lesezeit',
    category: 'Development',
    categoryDe: 'Entwicklung',
    excerpt:
      'Choosing between React and Next.js affects SEO, performance, and team velocity. Here is how we decide for serious product roadmaps.',
    excerptDe:
      'Die Entscheidung zwischen React und Next.js beeinflusst SEO, Performance und Teamgeschwindigkeit. So treffen wir die Wahl für anspruchsvolle Produkt-Roadmaps.',
    content: [
      {
        type: 'p',
        text: 'React remains the dominant UI library for component-driven interfaces. Next.js adds opinionated routing, hybrid rendering, and API routes—features that matter when marketing pages and authenticated product surfaces share one codebase.',
        textDe:
          'React bleibt die führende UI-Bibliothek für komponentenbasierte Interfaces. Next.js ergänzt ein klares Routing, hybrides Rendering und API-Routen — Funktionen, die wichtig werden, wenn Marketingseiten und geschützte Produktbereiche in einer gemeinsamen Codebasis leben.',
      },
      {
        type: 'h2',
        text: 'When plain React is enough',
        textDe: 'Wann reines React ausreicht',
      },
      {
        type: 'p',
        text: 'If you are shipping a lightweight dashboard behind authentication and SEO is not a primary acquisition channel, a SPA bundled with Vite or CRA patterns can be perfectly appropriate—provided you invest in code splitting and observability.',
        textDe:
          'Wenn Sie ein leichtgewichtiges Dashboard hinter einem Login veröffentlichen und SEO kein zentraler Akquisitionskanal ist, kann eine SPA mit Vite- oder CRA-Mustern völlig passend sein — vorausgesetzt, Sie investieren in Code-Splitting und Observability.',
      },
      {
        type: 'h2',
        text: 'When Next.js wins for SEO and scale',
        textDe: 'Wann Next.js bei SEO und Skalierung gewinnt',
      },
      {
        type: 'ul',
        items: [
          'Marketing sites that need fast first paint and predictable metadata per route.',
          'Internationalization with locale-specific URLs and hreflang-ready structure.',
          'Incremental Static Regeneration for content that updates on a schedule.',
          'Edge and server components where you want to reduce client JavaScript without sacrificing interactivity.',
        ],
        itemsDe: [
          'Marketingseiten, die schnellen First Paint und verlässliche Metadaten pro Route benötigen.',
          'Internationalisierung mit sprachspezifischen URLs und hreflang-fähiger Struktur.',
          'Incremental Static Regeneration für Inhalte, die nach Zeitplan aktualisiert werden.',
          'Edge- und Server-Komponenten, wenn Sie Client-JavaScript reduzieren möchten, ohne Interaktivität zu verlieren.',
        ],
      },
      {
        type: 'p',
        text: 'The “right” choice is rarely ideological. We map your growth goals, editorial workflow, and in-house skills to an architecture that stays maintainable for years—not just the first launch.',
        textDe:
          'Die „richtige“ Wahl ist selten ideologisch. Wir verbinden Ihre Wachstumsziele, redaktionellen Workflows und internen Fähigkeiten mit einer Architektur, die über Jahre wartbar bleibt — nicht nur bis zum ersten Launch.',
      },
    ],
  },
  {
    slug: 'storybrand-website-copy-conversions',
    title: 'StoryBrand Messaging: Turn Website Copy Into Conversions',
    titleDe: 'StoryBrand-Messaging: Website-Texte in Conversions verwandeln',
    metaTitle: 'StoryBrand Website Copy & Conversions | Messaging Strategy',
    metaTitleDe: 'StoryBrand Website-Texte & Conversions | Messaging-Strategie',
    description:
      'Apply StoryBrand principles to website copy and landing pages: clarify the customer story, reduce cognitive load, and lift conversion rates with message-led design.',
    descriptionDe:
      'Wenden Sie StoryBrand-Prinzipien auf Website-Texte und Landingpages an: Kundengeschichte klären, kognitive Last reduzieren und Conversion-Raten mit message-geführtem Design steigern.',
    keywords: [
      'StoryBrand',
      'website copy',
      'conversion rate optimization',
      'brand messaging',
      'landing page copy',
      'digital marketing',
    ],
    keywordsDe: [
      'StoryBrand',
      'Website-Texte',
      'Conversion-Optimierung',
      'Brand Messaging',
      'Landingpage-Texte',
      'digitales Marketing',
    ],
    publishedAt: '2025-09-14',
    readTime: '7 min read',
    readTimeDe: '7 Min. Lesezeit',
    category: 'Strategy',
    categoryDe: 'Strategie',
    excerpt:
      'Clear beats clever. See how a customer-centric narrative structure improves scroll depth, form fills, and sales-qualified leads.',
    excerptDe:
      'Klar schlägt clever. Sehen Sie, wie eine kundenorientierte Erzählstruktur Scrolltiefe, Formularabschlüsse und sales-qualifizierte Leads verbessert.',
    content: [
      {
        type: 'p',
        text: 'Most websites talk about what the company does. High-converting sites talk about what the customer wants to achieve—and position the brand as a capable guide. The StoryBrand framework is one of the fastest ways to audit weak messaging and rebuild a coherent narrative.',
        textDe:
          'Die meisten Websites sprechen darüber, was das Unternehmen tut. Websites mit hoher Conversion sprechen darüber, was der Kunde erreichen möchte — und positionieren die Marke als kompetenten Guide. Das StoryBrand-Framework ist eine der schnellsten Methoden, schwaches Messaging zu prüfen und eine klare Erzählung aufzubauen.',
      },
      {
        type: 'h2',
        text: 'The one-liner that anchors your site',
        textDe: 'Der One-Liner, der Ihre Website verankert',
      },
      {
        type: 'p',
        text: 'Before you touch layout, draft a single statement that names the customer, their problem, your plan, and the success state. That sentence should inform your hero headline, primary CTA, and navigation labels.',
        textDe:
          'Bevor Sie am Layout arbeiten, formulieren Sie eine einzige Aussage, die den Kunden, sein Problem, Ihren Plan und den gewünschten Erfolg beschreibt. Dieser Satz sollte Hero-Headline, primären CTA und Navigationslabels prägen.',
      },
      {
        type: 'h2',
        text: 'Pair copy with scannable structure',
        textDe: 'Texte mit scanbarer Struktur verbinden',
      },
      {
        type: 'ul',
        items: [
          'Lead with outcomes, not internal jargon or feature dumps.',
          'Use progressive disclosure: summary bullets up front, deep detail on secondary pages.',
          'Repeat the primary CTA at natural decision points—not only in the header.',
          'Add proof (metrics, logos, testimonials) immediately after claims that need credibility.',
        ],
        itemsDe: [
          'Beginnen Sie mit Ergebnissen, nicht mit internem Jargon oder Feature-Listen.',
          'Nutzen Sie progressive Offenlegung: kurze Zusammenfassung zuerst, tiefere Details auf Unterseiten.',
          'Wiederholen Sie den primären CTA an natürlichen Entscheidungspunkten, nicht nur im Header.',
          'Ergänzen Sie Belege wie Kennzahlen, Logos oder Testimonials direkt nach Aussagen, die Glaubwürdigkeit brauchen.',
        ],
      },
    ],
  },
  {
    slug: 'mobile-app-development-aso-basics',
    title: 'Mobile App Development: ASO Basics That Support Discovery',
    titleDe: 'Mobile-App-Entwicklung: ASO-Grundlagen für bessere Auffindbarkeit',
    metaTitle: 'Mobile App Development & ASO Basics | iOS & Android',
    metaTitleDe: 'Mobile-App-Entwicklung & ASO-Grundlagen | iOS & Android',
    description:
      'Connect mobile app development decisions with App Store Optimization (ASO): naming, screenshots, ratings flow, and performance signals that improve organic installs.',
    descriptionDe:
      'Verbinden Sie Entscheidungen in der Mobile-App-Entwicklung mit App Store Optimization (ASO): Naming, Screenshots, Bewertungsfluss und Performance-Signale für mehr organische Installationen.',
    keywords: [
      'mobile app development',
      'ASO',
      'App Store Optimization',
      'iOS development',
      'Android development',
      'React Native',
    ],
    keywordsDe: [
      'Mobile-App-Entwicklung',
      'ASO',
      'App Store Optimization',
      'iOS-Entwicklung',
      'Android-Entwicklung',
      'React Native',
    ],
    publishedAt: '2025-08-30',
    readTime: '8 min read',
    readTimeDe: '8 Min. Lesezeit',
    category: 'Mobile',
    categoryDe: 'Mobile',
    excerpt:
      'Product and marketing should agree on ASO before launch. Here is how engineering choices influence store visibility.',
    excerptDe:
      'Produkt und Marketing sollten ASO vor dem Launch abstimmen. So beeinflussen technische Entscheidungen die Sichtbarkeit im Store.',
    content: [
      {
        type: 'p',
        text: 'A polished UI helps retention, but discovery starts in the store listing. ASO is SEO for app marketplaces—keywords, creative assets, and ratings velocity all feed the algorithms that surface new apps.',
        textDe:
          'Eine hochwertige UI hilft bei der Retention, aber Auffindbarkeit beginnt im Store-Eintrag. ASO ist SEO für App-Marktplätze — Keywords, kreative Assets und Bewertungsgeschwindigkeit fließen in die Algorithmen ein, die neue Apps sichtbar machen.',
      },
      {
        type: 'h2',
        text: 'Engineering choices that indirectly help ASO',
        textDe: 'Technische Entscheidungen, die ASO indirekt unterstützen',
      },
      {
        type: 'ul',
        items: [
          'Crash-free sessions and fast cold start improve retention, which lifts ratings.',
          'In-app prompts for reviews should trigger after a success moment—not on first open.',
          'Deep links and universal links strengthen attribution and re-engagement campaigns.',
          'Localization of store metadata expands addressable search volume.',
        ],
        itemsDe: [
          'Absturzfreie Sessions und schneller Kaltstart verbessern Retention und unterstützen bessere Bewertungen.',
          'In-App-Aufforderungen für Bewertungen sollten nach einem Erfolgsmoment erscheinen, nicht beim ersten Öffnen.',
          'Deep Links und Universal Links stärken Attribution und Re-Engagement-Kampagnen.',
          'Lokalisierte Store-Metadaten erweitern das adressierbare Suchvolumen.',
        ],
      },
      {
        type: 'p',
        text: 'Whether you ship native Swift/Kotlin or cross-platform with React Native, treat the listing as part of the product—not an afterthought the week before release.',
        textDe:
          'Ob Sie nativ mit Swift/Kotlin oder plattformübergreifend mit React Native entwickeln: Behandeln Sie den Store-Eintrag als Teil des Produkts, nicht als Nachgedanken in der Woche vor dem Release.',
      },
    ],
  },
  {
    slug: 'ui-ux-design-accessibility-seo',
    title: 'UI/UX Design, Accessibility, and SEO: One Experience System',
    titleDe: 'UI/UX-Design, Barrierefreiheit und SEO: Ein gemeinsames Experience-System',
    metaTitle: 'UI UX Design, Accessibility & SEO | Inclusive Digital Products',
    metaTitleDe: 'UI/UX-Design, Barrierefreiheit & SEO | Inklusive digitale Produkte',
    description:
      'Why accessible UI/UX design supports SEO and brand trust: semantic HTML, readable typography, keyboard flows, and inclusive components that search engines and users both reward.',
    descriptionDe:
      'Warum barrierefreies UI/UX-Design SEO und Markenvertrauen unterstützt: semantisches HTML, lesbare Typografie, Tastaturabläufe und inklusive Komponenten, die Suchmaschinen und Nutzer belohnen.',
    keywords: [
      'UI UX design',
      'web accessibility',
      'WCAG',
      'inclusive design',
      'SEO UX',
      'conversion design',
    ],
    keywordsDe: [
      'UI UX Design',
      'Web-Barrierefreiheit',
      'WCAG',
      'inklusives Design',
      'SEO UX',
      'Conversion Design',
    ],
    publishedAt: '2025-07-22',
    readTime: '6 min read',
    readTimeDe: '6 Min. Lesezeit',
    category: 'Design',
    categoryDe: 'Design',
    excerpt:
      'Accessibility is not a checkbox—it is a quality signal. Learn how inclusive patterns reinforce rankings and customer confidence.',
    excerptDe:
      'Barrierefreiheit ist keine Checkbox, sondern ein Qualitätssignal. Erfahren Sie, wie inklusive Muster Rankings und Kundenvertrauen stärken.',
    content: [
      {
        type: 'p',
        text: 'Search engines approximate user satisfaction using signals like engagement, mobile usability, and page experience. Accessible interfaces reduce friction for everyone: larger tap targets, sufficient contrast, and predictable focus order help real users and improve measurable session quality.',
        textDe:
          'Suchmaschinen nähern sich Nutzerzufriedenheit über Signale wie Engagement, mobile Nutzbarkeit und Page Experience. Barrierefreie Interfaces reduzieren Reibung für alle: größere Touch-Ziele, ausreichender Kontrast und vorhersehbare Fokus-Reihenfolgen helfen echten Nutzern und verbessern messbare Sitzungsqualität.',
      },
      {
        type: 'h2',
        text: 'Semantic structure is SEO structure',
        textDe: 'Semantische Struktur ist SEO-Struktur',
      },
      {
        type: 'p',
        text: 'Proper heading hierarchy, landmark regions, and descriptive link text make pages easier to crawl and parse. That is why accessible refactors often coincide with SEO wins—not by accident.',
        textDe:
          'Eine saubere Überschriftenhierarchie, Landmark-Regionen und beschreibende Linktexte machen Seiten leichter crawlbar und verständlicher. Deshalb gehen barrierefreie Refactorings oft mit SEO-Gewinnen einher — nicht zufällig.',
      },
      {
        type: 'h2',
        text: 'Design tokens that scale',
        textDe: 'Design Tokens, die skalieren',
      },
      {
        type: 'p',
        text: 'We recommend a shared design system: color roles, type ramp, spacing, and component states documented for engineers. Consistency accelerates shipping and prevents one-off hacks that break accessibility regressions.',
        textDe:
          'Wir empfehlen ein gemeinsames Designsystem: Farbrollen, Typografie-Skala, Abstände und Komponenten-Zustände dokumentiert für Entwickler. Konsistenz beschleunigt Releases und verhindert Einzel-Lösungen, die Barrierefreiheit beschädigen.',
      },
    ],
  },
  {
    slug: 'content-strategy-b2b-lead-generation',
    title: 'Content Strategy for B2B Lead Generation on Search',
    titleDe: 'Content-Strategie für B2B-Leadgenerierung über die Suche',
    metaTitle: 'B2B Content Strategy for SEO Lead Generation | Pixl Develop',
    metaTitleDe: 'B2B-Content-Strategie für SEO-Leadgenerierung | Pixl Develop',
    description:
      'Build a B2B content strategy aligned with search intent: pillar pages, clusters, EEAT signals, and measurement that ties organic traffic to pipeline—not just pageviews.',
    descriptionDe:
      'Entwickeln Sie eine B2B-Content-Strategie entlang der Suchintention: Pillar Pages, Cluster, EEAT-Signale und Messung, die organischen Traffic mit Pipeline verbindet statt nur mit Seitenaufrufen.',
    keywords: [
      'B2B content strategy',
      'lead generation',
      'SEO content',
      'topic clusters',
      'EEAT',
      'search intent',
    ],
    keywordsDe: [
      'B2B-Content-Strategie',
      'Leadgenerierung',
      'SEO-Content',
      'Themencluster',
      'EEAT',
      'Suchintention',
    ],
    publishedAt: '2025-06-08',
    readTime: '10 min read',
    readTimeDe: '10 Min. Lesezeit',
    category: 'Marketing',
    categoryDe: 'Marketing',
    excerpt:
      'Editorial calendars fail without intent mapping. Here is how we connect keywords to revenue stages.',
    excerptDe:
      'Redaktionspläne scheitern ohne Intent-Mapping. So verbinden wir Keywords mit Umsatzphasen.',
    content: [
      {
        type: 'p',
        text: 'B2B buyers research in stages: problem aware, solution aware, and vendor aware. Your content library should map assets to those stages and route readers toward a clear next step—demo, assessment, or newsletter with a defined nurture path.',
        textDe:
          'B2B-Käufer recherchieren in Phasen: problembewusst, lösungsbewusst und anbieterbewusst. Ihre Content-Bibliothek sollte Inhalte diesen Phasen zuordnen und Leser zu einem klaren nächsten Schritt führen — Demo, Assessment oder Newsletter mit definiertem Nurturing-Pfad.',
      },
      {
        type: 'h2',
        text: 'Pillar pages and clusters',
        textDe: 'Pillar Pages und Cluster',
      },
      {
        type: 'p',
        text: 'A pillar page targets a broad head term with definitive coverage. Cluster articles answer long-tail questions and internally link back to the pillar, consolidating relevance while keeping each URL focused.',
        textDe:
          'Eine Pillar Page zielt auf einen breiten Hauptbegriff mit umfassender Abdeckung. Cluster-Artikel beantworten Long-Tail-Fragen und verlinken intern zurück zur Pillar Page, um Relevanz zu bündeln und jede URL fokussiert zu halten.',
      },
      {
        type: 'h2',
        text: 'EEAT without the buzzword fatigue',
        textDe: 'EEAT ohne Buzzword-Müdigkeit',
      },
      {
        type: 'ul',
        items: [
          'Show who wrote the piece and why they are qualified.',
          'Cite primary sources and refresh statistics on a schedule.',
          'Add case evidence and product context where claims are strong.',
          'Use structured data that mirrors what is visibly on the page.',
        ],
        itemsDe: [
          'Zeigen Sie, wer den Beitrag geschrieben hat und warum diese Person qualifiziert ist.',
          'Zitieren Sie Primärquellen und aktualisieren Sie Statistiken regelmäßig.',
          'Ergänzen Sie Case-Belege und Produktkontext dort, wo Aussagen besonders stark sind.',
          'Nutzen Sie strukturierte Daten, die sichtbar vorhandene Seiteninhalte widerspiegeln.',
        ],
      },
      {
        type: 'p',
        text: 'When SEO content aligns with sales conversations, organic becomes a compounding channel—not a siloed blog nobody quotes on calls.',
        textDe:
          'Wenn SEO-Content zu Vertriebsgesprächen passt, wird Organic zu einem skalierenden Kanal — nicht zu einem isolierten Blog, den niemand in Calls erwähnt.',
      },
    ],
  },
]

export function getAllPosts() {
  return [...blogPosts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
}

export function getPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug) ?? null
}

export function getRelatedPosts(currentSlug, limit = 3) {
  return getAllPosts().filter((p) => p.slug !== currentSlug).slice(0, limit)
}

export { siteUrl }
