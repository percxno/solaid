import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import {
  PawPrintIcon,
  BriefcaseIcon,
  UsersIcon,
  PaintbrushIcon,
  BookOpenIcon,
  AlertTriangleIcon,
  LeafIcon,
  CalendarIcon,
  StarIcon,
  HomeIcon,
  AmbulanceIcon,
  FeatherIcon,
  HandshakeIcon,
  VolleyballIcon,
  CakeSliceIcon,
  LucideProps,
} from 'lucide-react';

export const categories = [
  { name: 'Animal', icon: PawPrintIcon },
  { name: 'Business', icon: BriefcaseIcon },
  { name: 'Community', icon: UsersIcon },
  { name: 'Creative', icon: PaintbrushIcon },
  { name: 'Education', icon: BookOpenIcon },
  { name: 'Emergency', icon: AlertTriangleIcon },
  { name: 'Environment', icon: LeafIcon },
  { name: 'Event', icon: CalendarIcon },
  { name: 'Faith', icon: StarIcon },
  { name: 'Family', icon: HomeIcon },
  { name: 'Medical', icon: AmbulanceIcon },
  { name: 'Memorial', icon: FeatherIcon },
  { name: 'Nonprofit', icon: HandshakeIcon },
  { name: 'Sports', icon: VolleyballIcon },
  { name: 'Wishes', icon: CakeSliceIcon },
];

export const categorieHeroContent: Record<
  string,
  { heading: string; subheading: string }
> = {
  animal: {
    heading: 'Help Animals in Need',
    subheading: 'Support rescue efforts and animal welfare campaigns.',
  },
  business: {
    heading: 'Empower Entrepreneurs',
    subheading: 'Back small businesses and startups.',
  },
  community: {
    heading: 'Strengthen Communities',
    subheading: 'Promote local projects and neighborhood initiatives.',
  },
  creative: {
    heading: 'Fuel Creativity',
    subheading: 'Support artists, makers, and creative endeavors.',
  },
  education: {
    heading: 'Advance Education',
    subheading: 'Fund scholarships, libraries, and learning programs.',
  },
  emergency: {
    heading: 'Respond to Emergencies',
    subheading: 'Provide immediate aid in crisis situations.',
  },
  environment: {
    heading: 'Protect the Planet',
    subheading: 'Support environmental conservation efforts.',
  },
  event: {
    heading: 'Host Community Events',
    subheading: 'Bring people together for meaningful occasions.',
  },
  faith: {
    heading: 'Inspire Faith Projects',
    subheading: 'Support religious and spiritual initiatives.',
  },
  family: {
    heading: 'Support Families',
    subheading: 'Help families with essential needs and services.',
  },
  medical: {
    heading: 'Aid Medical Causes',
    subheading: 'Back healthcare campaigns and patient support.',
  },
  memorial: {
    heading: 'Honor Loved Ones',
    subheading: 'Fund tributes and memorial initiatives.',
  },
  nonprofit: {
    heading: 'Boost Nonprofits',
    subheading: 'Support nonprofit organizations and missions.',
  },
  sports: {
    heading: 'Champion Sports Causes',
    subheading: 'Back athletic programs and sports projects.',
  },
  wishes: {
    heading: 'Grant Wishes',
    subheading: 'Help fulfill dreams and special wish campaigns.',
  },
};

export const categoryIconMap: Record<
  string,
  ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
> = {
  animal: PawPrintIcon,
  business: BriefcaseIcon,
  community: UsersIcon,
  creative: PaintbrushIcon,
  education: BookOpenIcon,
  emergency: AlertTriangleIcon,
  environment: LeafIcon,
  event: CalendarIcon,
  faith: StarIcon,
  family: HomeIcon,
  medical: AmbulanceIcon,
  memorial: FeatherIcon,
  nonprofit: HandshakeIcon,
  sports: VolleyballIcon,
  wishes: CakeSliceIcon,
};
