# Travel Explorer

**Live Site:** https://vacation-planner-eta.vercel.app/
**Repository:** https://github.com/Chenzie2/vacation-planner

## Description

Travel Explorer is a frontend React application that lets users browse a curated collection of travel destinations, explore detailed information and photo galleries for each location, and build a personal trip itinerary. The app is fully static and deployed on Vercel with no backend dependency.

## Features

**Destination Browsing:** The Explore page displays destination cards with image sliders, names, categories, and descriptions pulled from static data.

**Filtering and Search:** Users can filter destinations by category (Beach, Mountain, City) and search by name or description in real time.

**Sorting:** Destinations can be sorted alphabetically in ascending or descending order.

**Detailed View:** Each destination has a dedicated page showing its full description, category, and a complete photo gallery.

**My Trip:** Users can save destinations to a personal trip list. The list persists across browser sessions using localStorage. Destinations can be added from both the Explore page cards and the individual destination detail pages.

**Custom Destinations:** Users can add their own destinations via a form on the My Trip page. Custom destinations display their full description directly on the trip card.

**Contact Form:** A contact form is available in the footer for users to reach out.

**Responsive Design:** Built with Tailwind CSS and a dark luxury theme using Cormorant Garamond and Outfit typefaces.

## Tech Stack

**Frontend:**
React 19, React Router DOM v7, Tailwind CSS v3, Lucide React, Swiper, React Hot Toast

**Deployment:**
Vercel (frontend), static data via JavaScript module

## Installation

Clone the repository:

```bash
git clone https://github.com/Chenzie2/vacation-planner.git
cd vacation-planner
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The app will be available at http://localhost:5173

## Project Structure

```
vacation-planner/
  public/
    assets/
      destinations/       # All destination images (flat structure)
  src/
    components/
      DestinationCard.jsx
      NavBar.jsx
      Footer.jsx
    context/
      TripContext.jsx      # Global trip state with localStorage persistence
    data/
      destinationData.js   # Static destination data
    pages/
      Home.jsx
      Explore.jsx
      DestinationDetails.jsx
      MyTrip.jsx
    App.jsx
    index.css              # CSS variables, global styles, reusable component classes
    main.jsx
  package.json
  vite.config.js
```

## Destinations

The app includes six curated destinations across three categories:

Beach: Bali, Maldives

City: Japan, Budapest

Mountain: Austria, Switzerland

Each destination includes a name, category, description, and a gallery of five images.

## Deployment

The app is deployed on Vercel. 
To build locally:

```bash
npm run build
```

## Author
GRACE ZAWADI.