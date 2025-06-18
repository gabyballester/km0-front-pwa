import { TextDecoder, TextEncoder } from 'util';

import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';

globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder;
