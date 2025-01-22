import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BACKEND_URL } from "../config/apiUrls";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState({ type: "all", value: "" });
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    featured: false,
    rating: "",
    company: "",
  });
  const navigate = useNavigate()

  // Fetch all products initially or based on filter
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let endpoint = `${API_BACKEND_URL}/api/products`;
        if (filter.type === "featured") endpoint = `${API_BACKEND_URL}/api/products/featured`;
        else if (filter.type === "price") endpoint = `${API_BACKEND_URL}/api/products/price?price=${filter.value}`;
        else if (filter.type === "rating") endpoint = `${API_BACKEND_URL}/api/products/rating?rating=${filter.value}`;

        const { data } = await axios.get(endpoint);
        setProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [filter]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddProduct = async () => {
    try {
      const token = localStorage.getItem('token');

      if(!token) {
        alert("please login to add products")
        navigate('/login')
        return;
      }
  
      const { data } = await axios.post(
        `${API_BACKEND_URL}/api/products`,
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setProducts([...products, data.data]);
      setNewProduct({
        name: "",
        price: "",
        featured: false,
        rating: "",
        company: "",
      });
     setShowModal(false)
    } catch (error) {
      console.error("Error adding product:", error);
      alert(error.response.data.error)
    }
  };
  

  return (
    <div className="bg-gray-50 min-h-screen p-6">
    

      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
            onClick={() => setShowModal(true)}
          >
            Add Product
          </button>

         
          <div className="flex space-x-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              onClick={() => setFilter({ type: "featured" })}
            >
              Featured Products
            </button>
            <input
              type="number"
              placeholder="Price Less Than"
              className="border rounded-md px-4 py-2"
              onChange={(e) => setFilter({ type: "price", value: e.target.value })}
            />
            <input
              type="number"
              placeholder="Rating Greater Than"
              step="0.1"
              className="border rounded-md px-4 py-2"
              onChange={(e) => setFilter({ type: "rating", value: e.target.value })}
            />
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
            >
              <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
              <p className="text-gray-600 mt-2">
                <strong>Price:</strong> ${product.price}
              </p>
              <p className="text-gray-600">
                <strong>Featured:</strong> {product.featured ? "Yes" : "No"}
              </p>
              <p className="text-gray-600">
                <strong>Rating:</strong> {product.rating}
              </p>
              <p className="text-gray-600">
                <strong>Company:</strong> {product.company}
              </p>
             
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Add Product</h3>
            <form>
              
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 mt-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Price</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 mt-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Featured</label>
                <input
                  type="checkbox"
                  name="featured"
                  checked={newProduct.featured}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Rating</label>
                <input
                  type="number"
                  step="0.1"
                  name="rating"
                  min="1"
                  max="10"
                  value={newProduct.rating}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 mt-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Company</label>
                <input
                  type="text"
                  name="company"
                  value={newProduct.company}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 mt-1"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  onClick={handleAddProduct}
                >
                  Add Product
                </button>
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
