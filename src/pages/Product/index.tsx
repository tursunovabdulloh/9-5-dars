import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  attributes: {
    title: string;
    company: string;
    description: string;
    featured: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    category: string;
    image: string;
    price: string;
    shipping: boolean;
    colors: string[];
  };
}

export default function Product() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [company, setCompany] = useState("all");
  const [filter, setFilter] = useState("a-z");
  const [price, setPrice] = useState(1000);
  const [freeShipping, setFreeShipping] = useState(false);

  // ///////
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://strapi-store-server.onrender.com/api/products`
        );

        if (!response.ok) {
          throw new Error(`xatolik ${response.status}`);
        }

        const data = await response.json();

        const productsData = data.data.map((item: Product) => ({
          id: item.id,
          title: item.attributes.title,
          price: parseInt(item.attributes.price, 10),
          image: item.attributes.image,
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Ma'lumot olishda xato:", error);
      }
    }

    fetchData();
  }, []);

  const resetForm = () => {
    setSearch("");
    setCategory("all");
    setCompany("all");
    setFilter("a-z");
    setPrice(1000);
    setFreeShipping(false);
  };

  return (
    <main className="container mt-10">
      <div
        className={`${
          theme === "synthwave"
            ? "bg-gray-900 text-white"
            : "bg-blue-50 text-black"
        }  px-8 mt-20 pb-[1px] mb-1 rounded-[6px]`}
      >
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 pt-6 items-center">
          {/* 1st Row */}
          <div>
            <label className="block  text-sm font-medium text-gray-600 ">
              Search Product
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered w-full min-h-0 h-[32px]"
              placeholder="Search"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Select Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className=" select select-bordered min-h-0 w-full h-[32px] "
            >
              <option value="all">all</option>
              <option value="beauty">beauty</option>
              <option value="electronics">electronics</option>
              <option value="clothing">clothing</option>
              <option value="home">home</option>
              <option value="sports">sports</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Select Company
            </label>
            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="select select-bordered min-h-0 w-full h-[32px]"
            >
              <option value="all">all</option>
              <option value="ikea">ikea</option>
              <option value="liddy">liddy</option>
              <option value="marcos">marcos</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Sort By
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="select select-bordered min-h-0 w-full h-[32px]"
            >
              <option value="a-z">a-z</option>
              <option value="z-a">z-a</option>
              <option value="low">low to high</option>
              <option value="high">high to low</option>
            </select>
          </div>

          {/* Price */}
          <div className="col-span-1 ">
            <label className="flex  items-center justify-between mb-1 text-sm font-medium text-gray-600">
              Select Price
              <p className="text-sm font-sans ">
                Max: <span className="text-lg ">${price}</span>
              </p>
            </label>
            <input
              type="range"
              min={0}
              max={100000}
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
              className="range range-info w-full"
            />
          </div>

          {/* Free Shipping */}
          <div className="col-span-1 flex items-center text-xs ml-14">
            <label className="mr-2 text-gray-600">Free Shipping</label>
            <input
              type="checkbox"
              checked={freeShipping}
              onChange={() => setFreeShipping(!freeShipping)}
              className="checkbox checkbox-info"
            />
          </div>

          {/* Search Button */}
          <div className="col-span-1">
            <button
              type="submit"
              className="w-full btn btn-info btn-sm"
              onClick={(e) => e.preventDefault()}
            >
              SEARCH
            </button>
          </div>

          {/* Reset Button */}
          <div className="col-span-1">
            <button
              type="button"
              className="w-full btn btn-secondary btn-sm"
              onClick={resetForm}
            >
              RESET
            </button>
          </div>
        </form>
      </div>
      <div className="mt-10 mb-12 flex flex-col gap-2">
        <p className="text-lg font-medium ">{products.length} products</p>
        <hr className="w-full border-gray-600 mt-6" />
      </div>
      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {products.map((product) => (
          <div
            key={product.id}
            className={`${
              theme === "synthwave"
                ? "bg-gray-900 text-white hover:shadow-[#000]"
                : "bg-white text-black hover:shadow-[#afacac]"
            } cursor-pointer rounded-xl p-4  shadow-lg `}
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <div className="flex flex-col items-center">
              <h2 className="font-bold text-lg mt-4">{product.title}</h2>
              <p className="text-gray-500">${product.price / 100}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
