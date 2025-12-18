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
  droits?: string[];
  contact_email?: string;
}

interface PolitiqueConfidentialiteData {
  titre: string;
  articles: ArticleItem[];
}

interface PolitiqueConfidentialiteViewProps {
  data: PolitiqueConfidentialiteData;
}

export function PolitiqueConfidentialiteView({ data }: PolitiqueConfidentialiteViewProps) {
  const theme = useTheme();

  const renderSpecificProperties = (article: ArticleItem) => {
    const properties = [];

    // Gestion des droits (Article 6)
    if (article.droits) {
      properties.push(
        <Box key="droits" sx={{ mt: 2 }}>
          <Box component="ul" sx={{ pl: 2, m: 0 }}>
            {article.droits.map((item, idx) => (
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

    // Gestion de l'email de contact (Article 8)
    if (article.contact_email) {
      properties.push(
        <Box key="contact_email" sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
            <strong>Email de contact :</strong> {article.contact_email}
          </Typography>
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
