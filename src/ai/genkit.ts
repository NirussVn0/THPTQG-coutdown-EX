
/**
 * @fileOverview Initializes the Genkit AI instance.
 *
 * - ai - The global Genkit AI instance.
 */

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
// Removed: import {firebase} from '@genkit-ai/firebase/plugin';
import {enableFirebaseTelemetry} from '@genkit-ai/firebase'; // Import the telemetry enabler
// import {dotprompt} from '@genkit-ai/dotprompt'; // Dotprompt plugin - Temporarily commented out

// Enable Firebase telemetry. This is a one-time call.
enableFirebaseTelemetry();

// Initialize Genkit with Google AI and Firebase plugins
export const ai = genkit({
  plugins: [
    googleAI(),
    // Removed firebase() from plugins array
    // dotprompt({ // Temporarily commented out
    //   // Optional: configure prompt providers if needed
    //   // provider: (name: string) => {
    //   //   // Return a prompt provider based on the name
    //   // }
    // }),
  ],
  // The Google AI plugin requires a GCLOUD_API_KEY environment variable.
  // If you are developing locally, you can set this in your .env file.
  // Example: GCLOUD_API_KEY=your_api_key_here
  //
  // For production, ensure this environment variable is set in your hosting environment.

  // We will not log to the Firebase Admin console. This can be enabled by setting
  // logToFirebase: true
  // However, this requires additional Firebase Admin SDK setup.
  logToFirebase: false,
  flowStateStore: 'firebase', // Use Firebase for flow state storage
  traceStore: 'firebase', // Use Firebase for trace storage
});
