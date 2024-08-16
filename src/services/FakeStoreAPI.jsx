async function getCategories() {
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        return response.json();
      } catch (error) {
        console.error('An error occurred while fetching categories:', error);
        throw error;
      }
}

async function getProducts(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        return response.json();
      } catch (error) {
        console.error('An error occurred while fetching products:', error);
        throw error;
      }
}

export {getCategories, getProducts}