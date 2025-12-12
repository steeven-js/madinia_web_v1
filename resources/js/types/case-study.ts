import type { ISocialLinks } from './socials';
import type { DateInput } from '@/utils/format-time';

// ----------------------------------------------------------------------

export type ICaseStudyProps = {
  id: string;
  title: string;
  heroUrl: string;
  website: string;
  content: string;
  category: string;
  coverUrl: string;
  description: string;
  createdAt: DateInput;
  galleryImgs: string[];
  socialLinks?: ISocialLinks;
};
