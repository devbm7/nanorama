# Bugs and Issues Fixed

This document lists the bugs and issues that have been fixed in the project to avoid them in the future.

## 1. Unused "Add Text" Feature

- **Issue:** The "Add Text" button and its related functionality were no longer in use but the code was still present in the codebase.
- **Files Affected:**
    - `src/components/input/ComponentInput.tsx`: Removed the "Add Text" button and the conditional rendering for the text component.
    - `src/hooks/usePosterState.ts`: Removed the `addTextComponent` function.
    - `src/types/poster.ts`: Removed the `PosterTextComponent` type.
    - `src/components/poster/LayoutTemplates.tsx`: Removed the rendering logic for the text component.
- **Resolution:** Removed all the code related to the "Add Text" feature.

## 2. TypeScript `no-explicit-any` Errors

- **Issue:** There were multiple instances of `any` being used, which defeats the purpose of TypeScript.
- **Files Affected:**
    - `src/app/api/generate-image/route.ts`: Provided specific types for the `parts` array, the `p` parameter in the `find` call, and the `err` in the `catch` block.
    - `src/components/input/ComponentInput.tsx`: Removed the `as any` cast in the `updateComponent` calls for `bullets`.
    - `src/components/input/GenerateButton.tsx`: Used type guards to filter for `infoCard` and `image` components instead of casting to `any[]`. Changed the `catch` block to use `unknown` and checked if the error is an instance of `Error`.
    - `src/components/poster/LayoutTemplates.tsx`: Added the `PosterComponent` type to the `c` parameter in the `filter` calls in the layout components.
- **Resolution:** Replaced all instances of `any` with more specific types or used type guards.

## 3. Unused Variables

- **Issue:** There were unused variables that cluttered the code.
- **Files Affected:**
    - `src/components/input/GenerateButton.tsx`: Removed the unused `assetBase64` variable.
    - `src/components/input/LayoutSelector.tsx`: Removed the unused `components` and `updateComponent` variables.
- **Resolution:** Removed all the unused variables.

## 4. Unescaped Entities in React

- **Issue:** The error message in `src/components/poster/GeneratedOnly.tsx` contained unescaped single quotes, which caused a linting error.
- **File Affected:** `src/components/poster/GeneratedOnly.tsx`
- **Resolution:** Replaced the single quotes with the HTML entity `&apos;`.

## 5. Dependency Conflict

- **Issue:** Both `@google/genai` and `@google/generative-ai` were installed as dependencies, which caused a type conflict with the `Part` type.
- **Files Affected:**
    - `package.json`: Uninstalled `@google/generative-ai`.
    - `src/app/api/generate-image/route.ts`: Changed the import statement to import `Part` from `@google/genai`.
- **Resolution:** Removed the conflicting dependency and updated the import statement.
