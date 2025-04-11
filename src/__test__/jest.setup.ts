import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import { TextEncoder, TextDecoder } from 'util';

globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder;
