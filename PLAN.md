# Nanorama Project Plan
## AI-Assisted Infographic Poster Generator for Marketers

---

## 🎯 Project Overview

**Vision**: Create an AI-powered web application that allows marketers to generate professional infographic posters by providing raw content (text info, image descriptions), with AI handling the complete design, layout, and styling.

**Tech Stack**: Next.js 14+ with TypeScript, Google GenAI (@google/genai)

---

## 🏗️ System Architecture

### Core Components
1. **Frontend**: Next.js TypeScript React application
2. **AI Engine**: Google GenAI integration for image generation and poster creation
3. **Export Service**: PDF/PNG generation
4. **State Management**: React Context or Zustand for poster state
5. **File Handling**: Canvas/SVG-based poster rendering

### Data Flow
```
User Input (Text + Image Descriptions) → 
Google GenAI Processing → 
Poster Generation → 
User Review/Edit → 
Export (PDF/PNG)
```

---

## 📋 Feature Specifications

### Phase 1: Core MVP Features

#### 1. **User Input Interface**
- **Component Addition Panel**
  - Text area for info card content input
  - Text area for image description/prompts
  - Add/remove component buttons
  - Component counter and preview list

#### 2. **Layout Template System**
- **Preset Templates** (Start with 5-7 options):
  - Single focus: 100% single component
  - Split vertical: 50/50 vertical split
  - Split horizontal: 50/50 horizontal split
  - Triple column: 33/33/34 vertical split
  - Header + dual: 40% top, 30/30 bottom split
  - Grid 2x2: Four equal quadrants
  - Hero + sidebar: 70/30 split with sidebar

#### 3. **AI Processing Engine**
- **Image Generation**
  - Process user descriptions via Google GenAI
  - Generate appropriate marketing/infographic style images
  - Optimize for poster integration

- **Info Card Processing**
  - Transform raw text into structured info cards
  - Extract key points, statistics, headers
  - Format for visual appeal

- **Complete Poster Generation**
  - Combine components into selected layout
  - Auto-generate color schemes (3-4 brand-appropriate palettes)
  - Select appropriate fonts (headers, body, accent)
  - Apply consistent styling and spacing

#### 4. **Poster Preview & Edit**
- **Canvas-based Preview**
  - Real-time poster visualization
  - Component positioning preview
  - Layout template switching

- **Basic Edit Controls**
  - Regenerate individual components
  - Switch layout templates
  - Regenerate entire poster
  - Color scheme switcher

#### 5. **Export System**
- **PDF Export**: High-resolution, print-ready
- **PNG Export**: Web-optimized, social media ready
- **Download management**: Filename customization

---

## 🛠️ Technical Implementation Plan

### Project Structure
```
nanorama/
├── src/
│   ├── components/
│   │   ├── input/
│   │   │   ├── ComponentInput.tsx
│   │   │   ├── LayoutSelector.tsx
│   │   │   └── GenerateButton.tsx
│   │   ├── poster/
│   │   │   ├── PosterCanvas.tsx
│   │   │   ├── ComponentRenderer.tsx
│   │   │   └── LayoutTemplates.tsx
│   │   ├── edit/
│   │   │   ├── EditPanel.tsx
│   │   │   ├── ColorSchemeSelector.tsx
│   │   │   └── RegenerateControls.tsx
│   │   └── export/
│   │       ├── ExportPanel.tsx
│   │       └── DownloadButton.tsx
│   ├── lib/
│   │   ├── genai/
│   │   │   ├── client.ts
│   │   │   ├── imageGeneration.ts
│   │   │   ├── posterGeneration.ts
│   │   │   └── infoCardProcessor.ts
│   │   ├── poster/
│   │   │   ├── layoutTemplates.ts
│   │   │   ├── colorSchemes.ts
│   │   │   └── fontSets.ts
│   │   └── export/
│   │       ├── pdfExport.ts
│   │       └── pngExport.ts
│   ├── types/
│   │   ├── poster.ts
│   │   ├── components.ts
│   │   └── genai.ts
│   └── hooks/
│       ├── useGenAI.ts
│       ├── usePosterState.ts
│       └── useExport.ts
```

### Key APIs & Libraries
- **@google/genai**: Core AI functionality
- **html2canvas**: Canvas rendering for export
- **jspdf**: PDF generation
- **fabric.js** (optional): Advanced canvas manipulation
- **react-colorful**: Color picker for schemes

---

## 🚀 Development Phases

### Phase 1: Foundation (Weeks 1-3)
- [ ] Project setup (Next.js + TypeScript)
- [ ] Google GenAI integration setup
- [ ] Basic UI components (input forms)
- [ ] Layout template system
- [ ] Data models and types

### Phase 2: AI Integration (Weeks 4-6)
- [ ] Image generation via GenAI
- [ ] Info card text processing
- [ ] Complete poster generation pipeline
- [ ] Error handling and loading states

### Phase 3: Preview & Edit (Weeks 7-8)
- [ ] Canvas-based poster preview
- [ ] Component rendering system
- [ ] Basic edit controls
- [ ] Layout switching functionality

### Phase 4: Export & Polish (Weeks 9-10)
- [ ] PDF/PNG export functionality
- [ ] UI/UX refinement
- [ ] Performance optimization
- [ ] Testing and bug fixes

---

## 🎨 User Experience Flow

### 1. **Input Stage**
```
Landing Page → 
Add Components (Text + Image descriptions) → 
Select Layout Template → 
Generate Poster (AI Processing)
```

### 2. **Review Stage**
```
View Generated Poster → 
Edit Options Panel → 
Regenerate Components/Layout/Colors → 
Finalize Design
```

### 3. **Export Stage**
```
Choose Export Format → 
Download Poster → 
Share/Use in Marketing
```

---

## 🧪 Testing Strategy

### Unit Testing
- AI integration functions
- Export functionality
- Component rendering logic

### Integration Testing
- Full poster generation pipeline
- Edit and regeneration workflows
- Export format validation

### User Testing
- Marketing professional feedback
- Usability testing on poster creation flow
- Export quality validation

---

## 📈 Success Metrics

### Technical Metrics
- Poster generation time < 30 seconds
- Export success rate > 95%
- AI generation accuracy for marketing content

### User Metrics
- User completion rate (input → export)
- Average time to create poster
- User satisfaction with AI-generated content

---

## 🔮 Future Enhancements (Post-MVP)

### Phase 2 Features
- Custom layout builder
- Brand asset integration
- Batch poster generation
- Template saving/sharing

### Phase 3 Features
- Real-time collaboration
- Advanced AI suggestions
- Integration with marketing platforms
- Analytics and A/B testing for posters

---

## 🚨 Technical Considerations

### Performance
- Optimize GenAI API calls
- Implement caching for generated assets
- Progressive loading for large posters

### Scalability
- Rate limiting for AI API calls
- User session management
- Asset storage optimization

### Security
- API key protection
- Input sanitization
- Export file size limits
