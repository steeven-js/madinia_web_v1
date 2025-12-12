import { _offices } from '@/_mock';

import { Map } from '@/components/map';

import { CareerNewsletter } from '../career-newsletter';
import { CareerContactForm } from '../contact/career-contact-form';
import { CareerContactInfo } from '../contact/career-contact-info';

// ----------------------------------------------------------------------

export function CareerContactView() {
  return (
    <>
      <CareerContactInfo />

      <Map locations={_offices} />

      <CareerContactForm />

      <CareerNewsletter />
    </>
  );
}
