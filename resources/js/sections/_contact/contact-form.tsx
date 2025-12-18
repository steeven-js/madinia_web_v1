import type { Theme, SxProps } from '@mui/material/styles';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormHelperText from '@mui/material/FormHelperText';

import { useContactForm } from '@/hooks/use-contact-form';
import { fCurrency } from '@/utils/format-number';
import { varAlpha } from 'minimal-shared/utils';

import { Form, Field } from '@/components/hook-form';

// ----------------------------------------------------------------------

type MarketingContactFormProps = {
  sx?: SxProps<Theme>;
  [key: string]: any;
};

const SERVICES = ['Formations IA', 'Conférences', 'Consulting IA', 'Chatbot IA'];

export function MarketingContactForm({ sx, ...other }: MarketingContactFormProps) {
  const theme = useTheme();

  const MarketingContactSchema = zod.object({
    services: zod.string().array().min(1, { message: 'Vous devez choisir au moins un service' }),
    firstName: zod.string().min(1, { message: 'Le prénom est requis' }),
    lastName: zod.string().min(1, { message: 'Le nom est requis' }),
    email: zod
      .string()
      .min(1, { message: "L'email est requis" })
      .email({ message: "L'email doit être valide" }),
    phone: zod.string().optional(),
    company: zod.string().optional(),
    budget: zod.number().array().min(1, { message: 'Budget requis' }),
    message: zod.string().min(1, { message: 'Le message est requis' }),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    services: [],
    budget: [2000, 10000],
    message: '',
  };

  const methods = useForm({
    resolver: zodResolver(MarketingContactSchema),
    defaultValues,
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { isSubmitting, error, onSubmit } = useContactForm(methods);

  const values = watch();

  const getSelected = (selectedItems: string[], item: string) =>
    selectedItems.includes(item) ? selectedItems.filter((value) => value !== item) : [...selectedItems, item];

  return (
    <Box sx={sx} {...other}>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-start">
          <Box sx={{ width: '100%' }}>
            <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.primary', fontWeight: 600 }}>
              Services souhaités
            </Typography>
            <Box gap={1} display="flex" flexWrap="wrap">
              {SERVICES.map((service: string) => (
                <ButtonBase
                  disableRipple
                  key={service}
                  onClick={() =>
                    setValue('services', getSelected(values.services, service), {
                      shouldValidate: true,
                    })
                  }
                  sx={{
                    py: 1,
                    px: 2,
                    borderRadius: 2,
                    typography: 'body2',
                    fontWeight: 500,
                    color: 'text.secondary',
                    border: (theme) => `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.2)}`,
                    transition: 'all 0.2s ease-in-out',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-1px)',
                      boxShadow: (theme) =>
                        `0 4px 12px ${varAlpha(theme.vars.palette.primary.mainChannel, 0.15)}`,
                    },
                    ...(values.services.includes(service) && {
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      border: (theme) => `solid 1px ${theme.palette.primary.main}`,
                    }),
                  }}
                >
                  {service}
                </ButtonBase>
              ))}
            </Box>

            {!!errors.services && (
              <FormHelperText error sx={{ px: 0, mt: 1 }}>
                {errors.services.message}
              </FormHelperText>
            )}
          </Box>

          <Stack spacing={{ xs: 2, md: 1.5 }} direction={{ xs: 'column', md: 'row' }} sx={{ width: 1 }}>
            <Field.Text name="firstName" label="Prénom" required />
            <Field.Text name="lastName" label="Nom" required />
          </Stack>

          <Field.Text name="email" label="Email" type="email" required />

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 2, md: 1.5 }} sx={{ width: 1 }}>
            <Field.Text name="phone" label="Téléphone" />
            <Field.Text name="company" label="Entreprise" />
          </Stack>

          <Stack spacing={3} sx={{ py: 1.5, width: 1 }}>
            <Typography variant="overline" sx={{ color: 'text.disabled' }}>
              Votre budget
            </Typography>

            <Field.Slider
              name="budget"
              valueLabelDisplay="on"
              min={0}
              max={20000}
              step={1000}
              valueLabelFormat={(value) => fCurrency(value)}
            />
          </Stack>

          <Field.Text name="message" label="Message" multiline rows={4} required />
        </Stack>

        <LoadingButton
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{
            mt: 4,
            py: 1.5,
            px: 4,
            borderRadius: 2,
            fontWeight: 600,
            fontSize: '1rem',
          }}
        >
          Envoyer le message
        </LoadingButton>

        {error && (
          <FormHelperText error sx={{ mt: 2 }}>
            {error}
          </FormHelperText>
        )}
      </Form>
    </Box>
  );
}
