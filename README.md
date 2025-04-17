# StepMaster Shoes Sales Dashboard

A comprehensive sales analytics dashboard for StepMaster Shoes, providing real-time insights into sales performance, customer behavior, product performance, and regional analytics.

![Dashboard Preview](/placeholder.svg?height=400&width=800)

## Features

### Dashboard Overview
- Real-time KPI monitoring (revenue, orders, units sold)
- Sales trend analysis with period comparison
- Regional sales distribution visualization
- Product performance analytics

### Product Management
- Complete product catalog management
- Product performance metrics
- Inventory tracking
- Add, edit, and remove products

### Customer Analytics
- Customer growth and retention metrics
- Regional customer distribution
- Customer behavior analysis
- Time-based filtering for trend analysis

### Order Management
- Comprehensive order listing and filtering
- Order status tracking and management
- Order analytics and trends
- Detailed order information and editing

### Region Management
- Regional performance metrics
- Interactive region map visualization
- Region-specific sales analytics
- Add, edit, and manage regions

### Settings
- User profile management
- Application appearance customization
- Notification preferences
- Regional settings (language, timezone, currency)
- Security settings

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State Management**: React Hooks
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/stepmaster-sales-dashboard.git
   cd stepmaster-sales-dashboard
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the dashboard.

## Project Structure

\`\`\`
stepmaster-sales-dashboard/
├── app/                    # Next.js app router pages
│   ├── customers/          # Customer analytics page
│   ├── orders/             # Orders management page
│   ├── products/           # Product management page
│   ├── regions/            # Region management page
│   ├── settings/           # Settings page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Dashboard home page
├── components/             # React components
│   ├── ui/                 # shadcn/ui components
│   ├── dashboard-*.tsx     # Dashboard components
│   ├── customer-*.tsx      # Customer-related components
│   ├── orders-*.tsx        # Order-related components
│   ├── product-*.tsx       # Product-related components
│   ├── region-*.tsx        # Region-related components
│   └── settings-*.tsx      # Settings components
├── lib/                    # Utility functions and data
│   └── mock-data.ts        # Mock data generation
├── public/                 # Static assets
├── styles/                 # Global styles
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── package.json            # Project dependencies
\`\`\`

## Usage Guide

### Dashboard Navigation

The main dashboard provides an overview of key sales metrics. Use the sidebar to navigate between different sections:

- **Dashboard**: Overview of sales performance
- **Orders**: Manage and track orders
- **Products**: Manage product catalog
- **Customers**: Analyze customer behavior
- **Regions**: View regional performance
- **Settings**: Configure application settings

### Filtering Data

Most sections include filtering capabilities:

1. Use the dropdown filters at the top of each section to filter by region, product, or time period
2. Use the search functionality to find specific items
3. Use the time period selectors to adjust the data timeframe

### Managing Products and Regions

1. Navigate to the Products or Regions section
2. Use the "Add" button to create new entries
3. Use the action buttons to edit or delete existing entries

### Order Management

1. Navigate to the Orders section
2. Use filters to find specific orders
3. Click on an order to view details
4. Use the action menu to edit, update shipping, or mark as problem

### Customizing Settings

1. Navigate to the Settings section
2. Use the tabs to access different setting categories
3. Adjust settings as needed and save changes

## Development

### Adding New Features

1. Create new components in the `components` directory
2. Add new pages in the `app` directory
3. Update the sidebar navigation in `components/dashboard-sidebar.tsx`

### Extending Mock Data

Modify the data generation functions in `lib/mock-data.ts` to add or modify mock data.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the UI components
- [Recharts](https://recharts.org/) for the chart components
- [Lucide React](https://lucide.dev/) for the icons
