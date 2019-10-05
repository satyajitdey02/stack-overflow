import NextHead from 'next/head';
import buildFAIcons from '../../utils/fontAwesome';

buildFAIcons();

export default ({ title = 'Mini Stackoverflow' }) => (
  <NextHead>
    <title>{title}</title>
    <meta charSet="utf-8" />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
  </NextHead>
);
