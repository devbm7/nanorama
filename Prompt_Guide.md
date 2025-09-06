# Gemini Image Generation Prompting Guides

## General Principle

> **Describe the scene, don't just list keywords.**
> The model's strength is deep language understanding. A narrative, descriptive paragraph produces better images than a list of disconnected words.

---

## Prompts for Generating Images

### 1. Photorealistic Scenes

For realistic images, use photography terminology: camera angles, lens, lighting, and details.

**Prompt Template:**
```
A photorealistic [shot type] of [subject], [action or expression], set in [environment]. The scene is illuminated by [lighting description], creating a [mood] atmosphere. Captured with a [camera/lens details], emphasizing [key textures and details]. The image should be in a [aspect ratio] format.
```

---

### 2. Stylized Illustrations & Stickers

Specify style and request a transparent background.

**Prompt Template:**
```
A [style] sticker of a [subject], featuring [key characteristics] and a [color palette]. The design should have [line style] and [shading style]. The background must be transparent.
```

---

### 3. Accurate Text in Images

Gemini is strong at rendering text—be clear about text, font, and design.

**Prompt Template:**
```
Create a [image type] for [brand/concept] with the text "[text to render]" in a [font style]. The design should be [style description], with a [color scheme].
```

---

### 4. Product Mockups & Commercial Photography

For professional product images.

**Prompt Template:**
```
A high-resolution, studio-lit product photograph of a [product description] on a [background surface/description]. The lighting is a [lighting setup, e.g., three-point softbox setup] to [lighting purpose]. The camera angle is a [angle type] to showcase [specific feature]. Ultra-realistic, with sharp focus on [key detail]. [Aspect ratio].
```

---

### 5. Minimalist & Negative Space Design

Great for backgrounds where text overlays are needed.

**Prompt Template:**
```
A minimalist composition featuring a single [subject] positioned in the [bottom-right/top-left/etc.] of the frame. The background is a vast, empty [color] canvas, creating significant negative space. Soft, subtle lighting. [Aspect ratio].
```

---

### 6. Sequential Art (Comics/Storyboard)

For consistent characters and scenes in panels.

**Prompt Template:**
```
A single comic book panel in a [art style] style. In the foreground, [character description and action]. In the background, [setting details]. The panel has a [dialogue/caption box] with the text "[Text]". The lighting creates a [mood] mood. [Aspect ratio].
```

---

## Prompts for Editing Images

### 1. Adding and Removing Elements

Describe the change with the image as reference.

**Prompt Template:**
```
Using the provided image of [subject], please [add/remove/modify] [element] to/from the scene. Ensure the change is [description of how the change should integrate].
```

---

### 2. Inpainting (Semantic Masking)

Edit a specific part and keep the rest unchanged.

**Prompt Template:**
```
Using the provided image, change only the [specific element] to [new element/description]. Keep everything else in the image exactly the same, preserving the original style, lighting, and composition.
```

---

### 3. Style Transfer

Recreate content in a different artistic style.

**Prompt Template:**
```
Transform the provided photograph of [subject] into the artistic style of [artist/art style]. Preserve the original composition but render it with [description of stylistic elements].
```

---

### 4. Advanced Composition (Combine Multiple Images)

Perfect for collages or product mockups.

**Prompt Template:**
```
Create a new image by combining the elements from the provided images. Take the [element from image 1] and place it with/on the [element from image 2]. The final image should be a [description of the final scene].
```

---

### 5. High-Fidelity Detail Preservation

Preserve critical details during edits.

**Prompt Template:**
```
Using the provided images, place [element from image 2] onto [element from image 1]. Ensure that the features of [element from image 1] remain completely unchanged. The added element should [description of how the element should integrate].
```

---

## Best Practices

- **Be Hyper-Specific:** Provide as much detail as possible.
- **Provide Context and Intent:** Explain the image’s purpose (e.g., “Create a logo for a high-end, minimalist skincare brand”).
- **Iterate and Refine:** Make small changes and use follow-up prompts for adjustments.
- **Step-by-Step Instructions:** For complex scenes, break the prompt into steps.
- **Use Semantic Negative Prompts:** Describe what you want (“empty, deserted street”) instead of negatives (“no cars”).
- **Control the Camera:** Use photographic/cinematographic terms like “wide-angle shot”, “macro shot”.
