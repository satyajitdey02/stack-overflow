import fontawesome from '@fortawesome/fontawesome';

import faHome from '@fortawesome/fontawesome-free-solid/faHome';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';

export default function buildFAIcons() {
  fontawesome.library.add(faHome, faSpinner);
}
