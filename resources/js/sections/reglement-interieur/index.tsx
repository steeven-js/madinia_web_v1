import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { CtaPreinscription } from '@/components/cta-preinscription';

// Types pour les données
interface ArticleItem {
  numero: number;
  titre: string;
  contenu: string;
  regles_specifiques?: string[];
  consignes_incendie?: string;
  types_sanctions?: string[];
  application?: string;
  duree_conservation?: string;
  reference_legale?: string;
}

interface ReglementInterieurData {
  titre: string;
  articles: ArticleItem[];
}

interface ReglementInterieurViewProps {
  data: ReglementInterieurData;
}

export function ReglementInterieurView({ data }: ReglementInterieurViewProps) {
  const theme = useTheme();

  const renderSpecificProperties = (article: ArticleItem) => {
    const properties = [];

    // Gestion des règles spécifiques (Article 2)
    if (article.regles_specifiques) {
      properties.push(
        <Box key="regles_specifiques" sx={{ mt: 2 }}>
          <Box component="ul" sx={{ pl: 2, m: 0 }}>
            {article.regles_specifiques.map((item, idx) => (
              <Typography
                key={idx}
                component="li"
                variant="body2"
                sx={{ color: 'text.secondary', mb: 0.5 }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
      );
    }

    // Gestion des consignes incendie (Article 2)
    if (article.consignes_incendie) {
      properties.push(
        <Box key="consignes_incendie" sx={{ mt: 2 }}>
          <Typography variant="h6" sx={{ color: 'primary.main', mb: 1 }}>
            Consignes incendie :
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
            {article.consignes_incendie}
          </Typography>
        </Box>
      );
    }

    // Gestion des types de sanctions (Article 4)
    if (article.types_sanctions) {
      properties.push(
        <Box key="types_sanctions" sx={{ mt: 2 }}>
          <Box component="ul" sx={{ pl: 2, m: 0 }}>
            {article.types_sanctions.map((item, idx) => (
              <Typography
                key={idx}
                component="li"
                variant="body2"
                sx={{ color: 'text.secondary', mb: 0.5 }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
      );
    }

    // Gestion de l'application des sanctions (Article 4)
    if (article.application) {
      properties.push(
        <Box key="application" sx={{ mt: 2 }}>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', mb: 1, fontStyle: 'italic' }}
          >
            {article.application}
          </Typography>
        </Box>
      );
    }

    // Gestion des informations supplémentaires sur les données personnelles (Article 12)
    if (article.duree_conservation || article.reference_legale) {
      properties.push(
        <Box key="donnees_supplementaires" sx={{ mt: 2 }}>
          {article.duree_conservation && (
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
              <strong>Durée de conservation :</strong> {article.duree_conservation}
            </Typography>
          )}
          {article.reference_legale && (
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
              <strong>Référence légale :</strong> {article.reference_legale}
            </Typography>
          )}
        </Box>
      );
    }

    return properties;
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: { xs: 10, md: 15 },
        pb: 8,
      }}
    >
      <Container>
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            mb: 6,
            color: 'primary.main',
          }}
        >
          {data.titre}
        </Typography>

        {data.articles.map((article) => (
          <Box
            key={article.numero}
            sx={{
              mb: 3,
              p: 3,
              borderRadius: 2,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h4" sx={{ color: 'primary.main', mb: 2 }}>
              Article {article.numero} - {article.titre}
            </Typography>

            <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
              {article.contenu}
            </Typography>

            {renderSpecificProperties(article)}
          </Box>
        ))}
      </Container>

      <CtaPreinscription />
    </Box>
  );
}
