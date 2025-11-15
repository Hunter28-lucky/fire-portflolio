// Google Analytics Configuration
// Add your Google Analytics ID after deployment

// Google Analytics tracking ID
export const GA_TRACKING_ID = 'G-8808J83YNY';

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as Window & { gtag?: (...args: unknown[]) => void }).gtag) {
    ((window as unknown) as Window & { gtag: (...args: unknown[]) => void }).gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track events
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && (window as Window & { gtag?: (...args: unknown[]) => void }).gtag) {
    ((window as unknown) as Window & { gtag: (...args: unknown[]) => void }).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
