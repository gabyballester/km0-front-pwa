import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';

import { TextEncoder as PolyfillEncoder, TextDecoder as PolyfillDecoder } from 'text-encoding';

globalThis.TextEncoder = globalThis.TextEncoder || PolyfillEncoder;
globalThis.TextDecoder = globalThis.TextDecoder || PolyfillDecoder;
