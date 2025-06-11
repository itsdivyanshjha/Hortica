# PlantBuilder Image Management Guide

## Overview
This guide explains how to organize and manage images in the PlantBuilder application.

## Directory Structure

```
public/
├── images/
│   ├── plants/           # Plant images
│   │   ├── Variegated-Snake-Plant.jpg
│   │   └── Bamboo-Palm.jpg
│   ├── pots/            # Pot images
│   │   ├── Nursery_Pot.jpg
│   │   ├── Gifting_Pot.jpg
│   │   └── Ceramic_Pot.jpg
│   ├── soils/           # Soil images (to be added)
│   └── catalog/         # Additional product catalog images
│       ├── plants/      # Multiple angles, care instructions
│       ├── pots/        # Color variations, size comparisons
│       └── soils/       # Texture, composition images
```

## Image Requirements

### File Naming Convention
- Use kebab-case for plant names: `variegated-snake-plant.jpg`
- Use PascalCase for pots: `Nursery_Pot.jpg`, `Gifting_Pot.jpg`
- Use lowercase for soil names: `nutrient-mix.jpg`, `coco-peat.jpg`

### Image Specifications
- **Format**: JPG or PNG (JPG preferred for file size)
- **Main Product Images**: 800x800px minimum, square aspect ratio
- **Catalog Images**: 400x400px minimum
- **Quality**: High quality, well-lit, clean background
- **File Size**: Under 1MB per image (optimize for web)

## Adding New Images

### For Plants
1. Add main product image to `public/images/plants/`
2. Update the plant data in `src/lib/init-database.ts`
3. Add catalog images to `public/images/catalog/plants/plant-name/`:
   - `main.jpg` - Primary product image
   - `care.jpg` - Care instruction infographic
   - `detail-1.jpg`, `detail-2.jpg` - Close-up shots
   - `environment.jpg` - Plant in natural setting

### For Pots
1. Add main product image to `public/images/pots/`
2. Update the pot data in `src/lib/init-database.ts`
3. Add catalog images to `public/images/catalog/pots/pot-name/`:
   - `main.jpg` - Primary product image
   - `size-small.jpg`, `size-medium.jpg`, `size-large.jpg` - Size variations
   - `color-[colorname].jpg` - Different color options
   - `engraving-example.jpg` - Engraving examples

### For Soils
1. Add main product image to `public/images/soils/`
2. Update the soil data in `src/lib/init-database.ts`
3. Add catalog images to `public/images/catalog/soils/soil-name/`:
   - `main.jpg` - Primary product image
   - `texture.jpg` - Close-up of soil texture
   - `composition.jpg` - Ingredients breakdown
   - `usage.jpg` - Soil being used with plants

## Current Product Catalog

### Plants (Indoor)
1. **Variegated Snake Plant**
   - File: `public/images/plants/Variegated-Snake-Plant.jpg`
   - Price: ₹1,299
   - Stock: 25 units

2. **Bamboo Palm**
   - File: `public/images/plants/Bamboo-Palm.jpg`
   - Price: ₹1,899
   - Stock: 18 units

### Soils
1. **Premium Nutrient Mix**
   - File: *To be added* - `public/images/soils/premium-nutrient-mix.jpg`
   - Price: ₹299
   - Stock: 50 units

2. **Coco Peat Premium**
   - File: *To be added* - `public/images/soils/coco-peat-premium.jpg`
   - Price: ₹199
   - Stock: 75 units

3. **Organic Manure Mix**
   - File: *To be added* - `public/images/soils/organic-manure-mix.jpg`
   - Price: ₹249
   - Stock: 40 units

### Pots
1. **Nursery Pot**
   - File: `public/images/pots/Nursery_Pot.jpg`
   - Price: ₹49 - ₹129 (size dependent)
   - Material: High-quality plastic

2. **Premium Gifting Pot**
   - File: `public/images/pots/Gifting_Pot.jpg`
   - Price: ₹599 - ₹1,299 (size dependent)
   - Material: Premium ceramic
   - Engraving: Sticker (₹99), Embossing (₹199)

3. **Artisan Ceramic Pot**
   - File: `public/images/pots/Ceramic_Pot.jpg`
   - Price: ₹899 - ₹1,899 (size dependent)
   - Material: Hand-thrown ceramic
   - Engraving: Sticker (₹149), Embossing (₹299)

## Image Optimization

### Tools Recommended
- **TinyPNG** - For compressing images without quality loss
- **GIMP/Photoshop** - For resizing and editing
- **ImageOptim** (Mac) or **ImageCompressor** (Windows) - For batch optimization

### Best Practices
1. Always optimize images before uploading
2. Use consistent lighting and backgrounds
3. Show products from multiple angles
4. Include lifestyle shots showing products in use
5. Create high-contrast images for accessibility
6. Test images on different screen sizes

## Database Integration

When adding new images, update the corresponding data in:
- `src/lib/init-database.ts` - Main product data
- `src/types/index.ts` - Type definitions if needed
- API routes in `src/app/api/` - For fetching image URLs

## Stock Photography

### Where to Add New Product Images
1. **Main Product Images**: `public/images/[category]/`
2. **Catalog/Gallery Images**: `public/images/catalog/[category]/[product-name]/`
3. **UI/Marketing Images**: `public/images/ui/`
4. **Icons/Graphics**: `public/images/icons/`

### Image URL Structure in Code
```typescript
// Main product images
const plantImage = '/images/plants/variegated-snake-plant.jpg';
const potImage = '/images/pots/Gifting_Pot.jpg';
const soilImage = '/images/soils/premium-nutrient-mix.jpg';

// Catalog images
const catalogImages = [
  '/images/catalog/plants/variegated-snake-plant/main.jpg',
  '/images/catalog/plants/variegated-snake-plant/care.jpg',
  '/images/catalog/plants/variegated-snake-plant/environment.jpg'
];
```

## Next Steps

### Immediate Actions Required
1. **Add soil images** to `public/images/soils/`:
   - `premium-nutrient-mix.jpg`
   - `coco-peat-premium.jpg`
   - `organic-manure-mix.jpg`

2. **Create catalog directories** for additional product images

3. **Add color variations** for pots in `public/images/catalog/pots/`

### Future Enhancements
1. Implement image lazy loading
2. Add image alt text for accessibility
3. Create image zoom functionality
4. Add 360° product views
5. Implement automatic image optimization pipeline

---

For any questions about image management, refer to this guide or contact the development team. 