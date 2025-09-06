H# Guide to Google GenAI Image Generation With gemini-2.5-flash-image-preview

## Overview

Google Gemini 2.5 Flash Image (aka Nano Banana) enables powerful, conversational image generation using the Gemini API. Features include:

- **Text-to-Image:** Generate images purely from text prompts.
- **Image + Text-to-Image (Editing):** Edit user-uploaded images with textual instructions.
- **Multi-Image Composition & Style Transfer:** Merge or style images using visual and language context.
- **Iterative Refinement:** Improve images across multiple conversational turns.
- **High-Fidelity Text Rendering:** Create images with accurate, legible embedded text.

Every image includes a SynthID watermark for provenance.

---

## Quickstart: Generating an Image

Use the official npm package `@google/genai`:

```
import { GoogleGenAI, Modality } from "@google/genai";
import * as fs from "node:fs";

async function main() {
  const ai = new GoogleGenAI({});
  const prompt = "Create a picture of a nano banana dish in a fancy restaurant with a Gemini theme";
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image-preview",
    contents: [prompt],
  });
  for (const part of response.candidates.content.parts) {
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData) {
      const imageData = part.inlineData.data;
      const buffer = Buffer.from(imageData, "base64");
      fs.writeFileSync("gemini-native-image.png", buffer);
      console.log("Image saved as gemini-native-image.png");
    }
  }
}
main();
```

---

## Editing Images (Text-and-Image-to-Image)

Edit an image by first loading it (as base64), then providing both the image and your prompt:

```
import { GoogleGenAI, Modality } from "@google/genai";
import * as fs from "node:fs";

async function main() {
  const ai = new GoogleGenAI({});
  const imagePath = "path/to/cat_image.png";
  const imageData = fs.readFileSync(imagePath);
  const base64Image = imageData.toString("base64");
  const prompt = [
    { text: "Create a picture of my cat eating a nano-banana in a fancy restaurant under the Gemini constellation" },
    {
      inlineData: {
        mimeType: "image/png",
        data: base64Image,
      },
    },
  ];
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image-preview",
    contents: prompt,
  });
  for (const part of response.candidates.content.parts) {
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData) {
      const imageData = part.inlineData.data;
      const buffer = Buffer.from(imageData, "base64");
      fs.writeFileSync("gemini-native-image.png", buffer);
      console.log("Image saved as gemini-native-image.png");
    }
  }
}
main();
```

---

## Other Image Generation Modes

- **Text → Images + Text (interleaved):** Output related visuals and descriptive text.

  - *Example Prompt:* `Generate an illustrated recipe for a paella.`
- **Image(s) + Text → Images + Text:** Upload images and ask for new visuals/text based on them.

  - *Example Prompt:* `What other color sofas would work in my space? Can you update the image?`
- **Multi-turn chat:** Iteratively edit images in a conversational flow.

---

## Prompting Guide and Strategies

> **Describe, don't just list keywords.** Narrative prompts produce better results.

### Prompts for Generating Images

- **Photorealistic scenes:***A photorealistic [shot type] of [subject], [action], set in [environment]. The scene is illuminated by [lighting], creating a [mood]. Captured with a [camera/lens]; emphasizing [textures and details]. Format: [aspect ratio].*
- **Stylized illustrations / stickers:***A [style] sticker of a [subject] with [details], [palette]. [Line style] and [shading]. Transparent background.*
- **Accurate text in images:***Create a [image type] for [brand] with "[text]" in [font]. [Style], [color scheme].*
- **Product mockups:***Studio-lit, high-resolution [product] on [background], [lighting], [angle], [focus details]. [Aspect ratio].*
- **Minimalist with negative space:***Single [subject] in [frame edge], background: [color], negative space. [Lighting], [aspect ratio].*
- **Sequential art:**
  *Comic panel in [style], foreground: [character], background: [setting]. Dialogue: "[Text]". [Mood], [aspect ratio].*

### Prompts for Editing Images

- **Adding/removing elements:***Using the provided image of [subject], [add/remove/modify] [element]. Integrate seamlessly with [description].*
- **Inpainting:***Change only the [element] to [new], preserve style/composition.*
- **Style transfer:***Transform photo of [subject] into [artist/art style].*
- **Combine multiple images:***Combine [element from img1] with [element from img2]. Result: [scene description].*
- **Preserving details:**
  *Using provided images, add [element2] to [element1], features of [element1] unchanged, integration as [description].*

### Best Practices

- **Be hyper-specific:**Provide as much detail as possible for finer control.
- **Context and intent:**State the usage/purpose for contextual influence.
- **Iterate/refine:**Use conversation for incremental improvements.
- **Step-by-step:**Break up complex scenes.
- **Use positive (“semantic negative”) prompts:**Describe what you want present, not just what to avoid.
- **Camera control:**
  Use photography/cinematography terms for composition.

---

## Limitations & Recommendations

- Languages: Best in EN, es-MX, ja-JP, zh-CN, hi-IN
- Does **not** process audio/video inputs.
- Max 3 input images per request.
- Generates SynthID watermarked images only.
- For images with text: Generate text first, then use that for images.
- Do **not** upload children’s images in EEA, CH, UK.

---

## Imagen vs Gemini Native Image

| Attribute         | Imagen                                | Gemini Native Image                  |
| ----------------- | ------------------------------------- | ------------------------------------ |
| Strengths         | Photorealism, clarity, typography.    | Flexibility; multi-turn, editing.    |
| Availability      | General                               | Preview (production allowed)         |
| Latency           | Low                                   | Higher                               |
| Cost              | $0.02–$0.12/image                    | $30/million tokens (1290 tokens/img) |
| Recommended Tasks | Highest image quality, special styles | Edits, conversational workflows      |

---

## Further Resources

- [Cookbook code samples](https://colab.sandbox.google.com/github/google-gemini/cookbook/blob/main/quickstarts/Image_out.ipynb)
- [Google GenAI documentation](https://ai.google.dev/gemini-api/docs/image-generation)
- [Model info](https://ai.google.dev/gemini-api/docs/models)

---
