const speechSdk = require("microsoft-cognitiveservices-speech-sdk");

// Replace with your own subscription key and service region (e.g., "westus").
const subscriptionKey = "";
const serviceRegion = "eastus"; // e.g., "westus"

// Create the speech config with the subscription key and service region.
const speechConfig = speechSdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);

// Create an audio config pointing to the default microphone.
const audioConfig = speechSdk.AudioConfig.fromDefaultMicrophoneInput();

// Create the speech recognizer.
const recognizer = new speechSdk.SpeechRecognizer(speechConfig, audioConfig);

console.log("Speak into your microphone.");

// Start the recognition process.
recognizer.recognizeOnceAsync(result => {
  switch (result.reason) {
    case speechSdk.ResultReason.RecognizedSpeech:
      console.log(`RECOGNIZED: Text=${result.text}`);
      break;
    case speechSdk.ResultReason.NoMatch:
      console.log("NOMATCH: Speech could not be recognized.");
      break;
    case speechSdk.ResultReason.Canceled:
      const cancellation = speechSdk.CancellationDetails.fromResult(result);
      console.log(`CANCELED: Reason=${cancellation.reason}`);
      if (cancellation.reason === speechSdk.CancellationReason.Error) {
        console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
        console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
        console.log("CANCELED: Did you update the subscription info?");
      }
      break;
  }
}, err => {
  console.trace("err - " + err);
});