import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import { TextDecoder, TextEncoder } from 'util';

globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder;
