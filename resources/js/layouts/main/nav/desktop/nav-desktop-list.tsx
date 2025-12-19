import type { NavListProps } from '../types';

import { useBoolean } from 'minimal-shared/hooks';
import { useRef, useEffect, useCallback } from 'react';
import { isActiveLink, isExternalLink } from 'minimal-shared/utils';

import { usePathname } from '@/routing/hooks';

import { NavItem } from './nav-desktop-item';
import { NavSubList } from './nav-desktop-sub-list';
import { Nav, NavLi, NavUl, NavDropdown } from '../components';

// ----------------------------------------------------------------------

export function NavList({ data, sx, ...other }: NavListProps) {
  const pathname = usePathname();
  const navItemRef = useRef<HTMLButtonElement | null>(null);

  // Vérifier si le pathname correspond à un des enfants de l'item
  const isPathInChildren = data.children?.some((section) =>
    section.items?.some((item) => isActiveLink(pathname, item.path, false))
  );

  // Pour les items avec children, être actif seulement si:
  // 1. Le pathname correspond exactement au path de l'item (ex: /about)
  // 2. OU le pathname correspond à un des enfants (ex: /about/certification-qualiopi)
  // Pour les items sans children, utiliser match exact
  const isActive = data.children
    ? isActiveLink(pathname, data.path, false) || !!isPathInChildren
    : isActiveLink(pathname, data.path, false);
  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  const mainList = data?.children?.filter((list) => list.subheader !== 'Common');
  const commonList = data?.children?.find((list) => list.subheader === 'Common');

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpenMenu = useCallback(() => {
    if (data.children) {
      onOpen();
    }
  }, [data.children, onOpen]);

  const renderNavItem = () => (
    <NavItem
      ref={navItemRef}
      // slots
      path={data.path}
      title={data.title}
      // state
      open={open}
      active={isActive}
      // options
      hasChild={!!data.children}
      externalLink={isExternalLink(data.path)}
      // action
      onMouseEnter={handleOpenMenu}
      onMouseLeave={onClose}
    />
  );

  const renderDropdown = () =>
    !!data.children && (
      <NavDropdown open={open} onMouseEnter={handleOpenMenu} onMouseLeave={onClose}>
        <Nav>
          <NavUl sx={{ gap: { xs: 3, lg: 5 }, flexDirection: 'row' }}>
            {mainList?.map((list) => (
              <NavSubList
                key={list.subheader}
                subheader={list.subheader}
                coverUrl={list.coverUrl}
                items={list.items}
              />
            ))}

            {commonList && <NavSubList subheader={commonList.subheader} items={commonList.items} />}
          </NavUl>
        </Nav>
      </NavDropdown>
    );

  return (
    <NavLi sx={sx} {...other}>
      {renderNavItem()}
      {renderDropdown()}
    </NavLi>
  );
}

