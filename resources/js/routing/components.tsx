import { Link } from '@inertiajs/react';
import type { InertiaLinkProps } from '@inertiajs/react';
import { forwardRef } from 'react';

// ----------------------------------------------------------------------

type RouterLinkProps = Omit<InertiaLinkProps, 'href'> & {
  href: string;
};

export const RouterLink = forwardRef<HTMLAnchorElement, RouterLinkProps>(
  ({ href, ...other }, ref) => {
    return <Link ref={ref} href={href} {...other} />;
  }
);

