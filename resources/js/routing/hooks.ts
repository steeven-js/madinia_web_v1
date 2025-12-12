import { usePage } from '@inertiajs/react';

// ----------------------------------------------------------------------

export function usePathname(): string {
  const { url } = usePage();
  return url;
}

export function useRouter() {
  const { url } = usePage();
  
  return {
    pathname: url,
    push: (path: string) => {
      window.location.href = path;
    },
    replace: (path: string) => {
      window.location.replace(path);
    },
    back: () => {
      window.history.back();
    },
  };
}

