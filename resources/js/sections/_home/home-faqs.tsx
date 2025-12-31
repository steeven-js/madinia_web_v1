import type { Variants } from 'framer-motion';
import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import { paths } from '@/routing/paths';

import { TrianglePattern } from '@/assets/illustrations/components/shape-pattern';

import { varFade, MotionViewport } from '@/components/animate';

// ----------------------------------------------------------------------

const FAQs = [
  {
    question: "Qu'est-ce que l'IA générative ?",
    answer: (
      <Typography>
        L'intelligence artificielle générative est une technologie capable de créer du contenu
        original, comme du texte, des images ou même du code, à partir de données préexistantes.
        Elle est utilisée pour automatiser des tâches, améliorer la créativité et optimiser les
        processus dans divers secteurs d'activité.
      </Typography>
    ),
  },
  {
    question: 'Pour qui sont destinées vos formations ?',
    answer: (
      <Typography>
        Nos formations s'adressent à tous les profils : dirigeants, managers, employés,
        entrepreneurs, étudiants et particuliers. Nous adaptons le contenu et la pédagogie selon le
        niveau et les besoins spécifiques de chaque participant.
      </Typography>
    ),
  },
  {
    question: 'Combien de temps durent vos formations ?',
    answer: (
      <Typography>
        La durée varie selon le type de formation : de quelques heures pour les sensibilisations à
        plusieurs jours pour les formations approfondies. Nous proposons aussi des accompagnements
        sur mesure qui peuvent s'étendre sur plusieurs semaines.
      </Typography>
    ),
  },
  {
    question: 'Quels sont les formats de formation proposés ?',
    answer: (
      <Typography>
        Nous proposons des formations en présentiel, en ligne (visioconférence) et en format
        hybride. Nous nous adaptons à vos contraintes géographiques et organisationnelles pour vous
        offrir la meilleure expérience d'apprentissage.
      </Typography>
    ),
  },
  {
    question: 'Y a-t-il un suivi après la formation ?',
    answer: (
      <Typography>
        Oui, nous proposons un accompagnement post-formation pour vous aider à mettre en pratique
        les connaissances acquises. Cela peut inclure des sessions de Q&R, du mentoring ou un
        support technique selon vos besoins.
      </Typography>
    ),
  },
  {
    question: 'Pourquoi choisir Madin.IA ?',
    answer: (
      <Typography>
        Madin.IA combine expertise technique, approche pédagogique adaptée et connaissance du
        marché local. Nous sommes basés en Martinique et comprenons les spécificités des entreprises
        caribéennes tout en ayant une vision globale de l'IA générative.
      </Typography>
    ),
  },
];

// ----------------------------------------------------------------------

const variants: Variants = varFade('inUp', { distance: 24 });

export function HomeFAQs({ sx, ...other }: BoxProps) {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChangeExpanded = useCallback(
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    },
    []
  );

  const renderList = () => (
    <Box sx={{ my: { xs: 5, md: 10 } }}>
      {FAQs.map((item) => (
        <Accordion
          key={item.question}
          expanded={expanded === item.question}
          onChange={handleChangeExpanded(item.question)}
          disableGutters
          sx={{ py: 0.5 }}
        >
          <AccordionSummary>
            <Box component="span" sx={{ typography: 'h6' }}>
              {item.question}
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ color: 'text.secondary' }}>{item.answer}</AccordionDetails>
        </Accordion>
      ))}
      <Divider />
    </Box>
  );

  return (
    <Box
      component="section"
      sx={[
        {
          position: 'relative',
          py: { xs: 5, md: 10 },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Container component={MotionViewport}>
        <Grid container spacing={{ md: 3 }} sx={{ justifyContent: 'center' }}>
          <Grid size={{ xs: 12, md: 8 }}>
            <m.div variants={variants}>
              <Typography variant="h2" sx={{ textAlign: 'center' }}>
                Foire Aux Questions
              </Typography>
            </m.div>

            <m.div variants={variants}>{renderList()}</m.div>

            <Box
              sx={(theme) => ({
                gap: 3,
                display: 'flex',
                borderRadius: 3,
                textAlign: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                px: { xs: 3, md: 5 },
                py: { xs: 6, md: 8 },
                border: `dashed 1px ${theme.vars.palette.divider}`,
              })}
            >
              <m.div variants={variants}>
                <Typography component="h6" variant="h3">
                  Vous avez d'autres questions ?
                </Typography>
              </m.div>

              <m.div variants={variants}>
                <Typography sx={{ color: 'text.secondary' }}>
                  Contactez notre équipe pour obtenir de plus amples informations.
                </Typography>
              </m.div>

              <m.div variants={variants}>
                <Button
                  size="large"
                  color="inherit"
                  variant="contained"
                  href={paths.contact.root}
                >
                  Nous contacter
                </Button>
              </m.div>
            </Box>
          </Grid>
        </Grid>

        <TrianglePattern
          sx={{
            top: 80,
            left: 0,
            right: 0,
            zIndex: -1,
            mx: 'auto',
            width: 600,
            height: 600,
            maxWidth: 1,
          }}
        />
      </Container>
    </Box>
  );
}
