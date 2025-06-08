# E-commerce Website

A modern, feature-rich e-commerce website built with Angular and Tailwind CSS.

## Features

- 📱 Responsive layout optimized for all screen sizes
- 🛒 Full shopping cart functionality
  - Add/remove products
  - Update quantities
  - Persist cart state
- 💳 Secure checkout process
- ✨ Interactive elements with hover states
- 📦 Product catalog with detailed views
- 💰 Accurate order calculations
  - Product totals
  - Fixed shipping cost ($50)
  - VAT (20% of product total)
- ✅ Form validation
- 🎉 Order confirmation system

## Technical Stack

- **Frontend Framework**: Angular
- **Styling**: Tailwind CSS
- **State Management**: Angular Services
- **Form Handling**: Angular Reactive Forms
- **Data Storage**: Local Storage for cart persistence

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── product-list/      # Product catalog display
│   │   ├── product-detail/    # Individual product view
│   │   ├── shopping-cart/     # Cart management
│   │   ├── checkout/          # Checkout process
│   │   ├── navbar/           # Navigation component
│   │   └── footer/           # Footer component
│   ├── services/
│   │   ├── cart.service.ts    # Shopping cart logic
│   │   └── product.service.ts # Product data management
│   ├── models/
│   │   ├── product.ts         # Product interface
│   │   └── cart-item.ts       # Cart item interface
│   └── shared/
│       └── components/        # Reusable UI components
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm package manager

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd ecommerce
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

### Coding Standards

- Follow Angular style guide
- Use TypeScript strict mode
- Implement lazy loading for optimized performance
- Write unit tests for components and services

### CSS Guidelines

- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Maintain consistent spacing and color schemes
- Use CSS variables for theme colors

### Git Workflow

1. Create feature branches from `main`
2. Use conventional commits
3. Submit pull requests for review
4. Merge after approval

## Testing

Run unit tests:
```bash
ng test
```

Run end-to-end tests:
```bash
ng e2e
```

## Build

Generate production build:
```bash
ng build --prod
```

The build artifacts will be stored in the `dist/` directory.

## Features in Detail

### Shopping Cart

- Real-time cart updates
- Quantity adjustments
- Price calculations including VAT
- Cart persistence across sessions

### Checkout Process

- Multi-step form validation
- Shipping cost calculation
- Order summary
- Success confirmation

### Product Catalog

- Grid and list views
- Search functionality
- Filtering options
- Sorting capabilities
