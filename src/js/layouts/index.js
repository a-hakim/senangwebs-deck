/**
 * Layouts Index - Export all layouts
 * @module layouts
 */

import defaultLayout from './default.js';
import cover from './cover.js';
import center from './center.js';
import twoCols from './two-cols.js';
import threeCols from './three-cols.js';
import quote from './quote.js';
import section from './section.js';
import imageRight from './image-right.js';
import imageLeft from './image-left.js';
import fullImage from './full-image.js';

export default {
  default: defaultLayout,
  cover,
  center,
  'two-cols': twoCols,
  'three-cols': threeCols,
  quote,
  section,
  'image-right': imageRight,
  'image-left': imageLeft,
  'full-image': fullImage,
};
