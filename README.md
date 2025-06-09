# Audiophile E-commerce Website

A premium audio gear e-commerce platform built with Angular and Tailwind CSS. Experience high-end audio equipment shopping with a modern, responsive design.

![Audiophile Hero](src/assets/home/desktop/image-hero.jpg)

## Technical Stack

- **Framework**: Angular 19
- **Styling**: Tailwind CSS
- **State Management**: Angular Services + RxJS
- **Form Handling**: Reactive Forms
- **Storage**: Local Storage
- **Type Safety**: TypeScript
- **Routing**: Angular Router


## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/audiophile-ecommerce.git
   cd audiophile-ecommerce
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

4. Open your browser and navigate to `http://localhost:4200`

## Development Guidelines

### Component Structure

- Standalone components with explicit imports
- Lazy-loaded feature modules
- Shared components for reusability
- Smart/Container component pattern

### Styling Approach

- Tailwind CSS utility classes
- Mobile-first responsive design
- Custom theme configuration
- Consistent spacing and typography

### State Management

- RxJS observables for reactive state
- Service-based state management
- Local storage persistence
- Type-safe interfaces



## Building for Production

Generate a production build:
```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## Features in Detail

### Shopping Cart

- Real-time total calculations
- Quantity adjustments with validation
- Persistent cart state using localStorage
- Cart modal with summary view

### Checkout Process

- Step-by-step form validation
- Multiple payment methods (e-Money, Cash on Delivery)
- Shipping information collection
- Order summary with price breakdown
- Success confirmation modal

### Product Navigation

- Category-based browsing
- Detailed product pages
- Related products suggestions
- "You May Also Like" section

### Responsive Design

- Mobile menu with animations
- Responsive images using picture element
- Flexible grid layouts
- Optimized typography

