const { Porcupine } = require("@picovoice/porcupine-node");
// const { Cobra } = require("@picovoice/cobra-node");
const { PvRecorder } = require("@picovoice/pvrecorder-node");
// const OpenAI = require("openai");
const robot = require("robotjs");

const accessKey = process.env.PICOVOICE_API_KEY; // Make sure to set your Picovoice access key in the environment variables

const porcupine = new Porcupine(accessKey, [process.env.WAKE_MODEL], [0.5]);
// const cobra = new Cobra(accessKey);

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY, // Make sure to set your OpenAI API key in the environment variables
// });
// const openai = new OpenAI();

const recorder = new PvRecorder(512);
recorder.start();

console.log("Listening for wake word...");

async function getNextAudioFrame() {
  const audioFrame = await recorder.read();
  return audioFrame;
}

async function main() {
  while (true) {
    const audioFrame = await getNextAudioFrame();
    const keywordIndex = porcupine.process(audioFrame);
    if (keywordIndex >= 0) {
      console.log("detected wake word");
      robot.keyTap("n");
    }
  }
}

main();
