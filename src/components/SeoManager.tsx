import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useBusiness } from '../context/BusinessContext.tsx';
import { SURVEILLANCE_FAQS } from '../data/solutionsData.ts';

interface RouteSeoConfig {
  title: string;
  description: string;
  breadcrumbName: string;
}

const ROUTE_SEO: Record<string, RouteSeoConfig> = {
  '/': {
    title: 'TRINETRA CCTV SOLUTIONS – CCTV Store, Installation & AMC',
    description:
      'Shop CCTV cameras, DVR/NVR kits, biometric access control, video door phones & fire alarms with expert installation across Andhra Pradesh & Telangana.',
    breadcrumbName: 'Home',
  },
  '/store': {
    title: 'Online CCTV Store – Cameras, Kits & Access Control | TRINETRA',
    description:
      'Buy Bullet, Dome, IP, Wi-Fi cameras, CCTV combo kits, NVRs, hard disks, PoE switches & biometric terminals with GST invoices across AP & Telangana.',
    breadcrumbName: 'Online Store',
  },
  '/products': {
    title: 'CCTV Products Catalogue – 23 Security Categories | TRINETRA',
    description:
      'Explore 23 categories of CCTV cameras, recorders, networking racks, cables, smart locks, and fire detectors with bulk dealer & installation options.',
    breadcrumbName: 'Products',
  },
  '/solutions': {
    title: 'Smart CCTV, AI Alerts & ELV Security Solutions | TRINETRA',
    description:
      'On-premise smart AI CCTV upgrades, industrial warehouse security, office biometrics, apartment intercoms, boom barriers & 4G solar surveillance.',
    breadcrumbName: 'Solutions',
  },
  '/services': {
    title: 'CCTV Installation, Repair, HDD Replacement & AMC | TRINETRA',
    description:
      'Professional CCTV camera installation, DVR/NVR setup, PoE networking, troubleshooting, hard disk replacement & AMC across AP & Telangana.',
    breadcrumbName: 'Services',
  },
  '/planner': {
    title: 'CCTV System Planner & HDD Storage Calculator | TRINETRA',
    description:
      'Calculate exact surveillance HDD TB storage, DVR/NVR channels, PoE switch power, cable rolls & printable BoQ for your CCTV installation.',
    breadcrumbName: 'System Planner',
  },
  '/guides': {
    title: 'CCTV Buyer Guides, Storage Tips & Store Policies | TRINETRA',
    description:
      'Practical 2026 buyer guides on choosing CCTV cameras, IP vs HD comparison, HDD retention days, biometric access control & store warranty policies.',
    breadcrumbName: 'Guides & Policies',
  },
  '/coverage': {
    title: 'CCTV Service Coverage – Andhra Pradesh & Telangana | TRINETRA',
    description:
      'Interactive Google Map showing TRINETRA CCTV sales, installation & AMC hubs across Hyderabad, Vijayawada, Vizag, Warangal, Tirupati & Guntur.',
    breadcrumbName: 'Coverage Map',
  },
  '/track': {
    title: 'Live Order & Service Ticket Tracker | TRINETRA CCTV',
    description:
      'Track your TRINETRA CCTV store order status or technician installation/repair enquiry live using your Order ID or Enquiry ID.',
    breadcrumbName: 'Order Tracker',
  },
  '/contact': {
    title: 'Contact TRINETRA CCTV – Free Site Survey & Quote (AP & TS)',
    description:
      'Call, WhatsApp, or book a free CCTV site survey and quotation across Andhra Pradesh and Telangana with TRINETRA CCTV SOLUTIONS.',
    breadcrumbName: 'Contact',
  },
  '/admin': {
    title: 'Admin Control Center | TRINETRA CCTV SOLUTIONS',
    description:
      'Owner administration portal for managing TRINETRA CCTV products, pricing, orders, offers, brand partners, enquiries, and settings.',
    breadcrumbName: 'Admin',
  },
};

function setMetaTag(selector: string, attrName: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function SeoManager() {
  const { pathname } = useLocation();
  const { settings } = useBusiness();

  useEffect(() => {
    const config = ROUTE_SEO[pathname] ?? ROUTE_SEO['/'];
    const baseUrl = (settings.domain || window.location.origin).replace(/\/+$/, '');
    const canonicalUrl = `${baseUrl}${pathname === '/' ? '/' : pathname}`;
    const ogImageUrl = `${baseUrl}/src/assets/images/hero_cctv_command_1795171532012.jpg`;

    document.title = config.title;
    setMetaTag('meta[name="description"]', 'name', 'description', config.description);
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', config.title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', config.description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImageUrl);
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', config.title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', config.description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImageUrl);
    setMetaTag(
      'meta[name="robots"]',
      'name',
      'robots',
      pathname === '/admin' ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
    );

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Dynamic Route Schema (BreadcrumbList + FAQPage on Home/Solutions)
    const graph: Array<Record<string, unknown>> = [
      {
        '@type': 'BreadcrumbList',
        itemListElement:
          pathname === '/'
            ? [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: `${baseUrl}/`,
                },
              ]
            : [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: `${baseUrl}/`,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: config.breadcrumbName,
                  item: canonicalUrl,
                },
              ],
      },
    ];

    if (pathname === '/' || pathname === '/solutions') {
      graph.push({
        '@type': 'FAQPage',
        mainEntity: SURVEILLANCE_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      });
    }

    let routeLd = document.getElementById('trinetra-route-seo-jsonld') as HTMLScriptElement | null;
    if (!routeLd) {
      routeLd = document.createElement('script');
      routeLd.id = 'trinetra-route-seo-jsonld';
      routeLd.type = 'application/ld+json';
      document.head.appendChild(routeLd);
    }
    routeLd.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph,
    });
  }, [pathname, settings.domain]);

  return null;
}
