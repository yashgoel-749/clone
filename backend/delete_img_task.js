const { query } = require('./db');

async function deleteSecondImage() {
  try {
    // Find all images for product ID 1, ordered by their entry ID
    const res = await query('SELECT id FROM product_images WHERE product_id = 1 ORDER BY id');
    
    if (res.rows.length >= 2) {
      const secondImageId = res.rows[1].id;
      await query('DELETE FROM product_images WHERE id = $1', [secondImageId]);
      console.log(`Successfully deleted the second image for Product 1 (ID: ${secondImageId})`);
    } else {
      console.log(`Product 1 only has ${res.rows.length} image(s). No second image to delete.`);
    }
    process.exit(0);
  } catch (err) {
    console.error('Error during deletion:', err);
    process.exit(1);
  }
}

deleteSecondImage();
