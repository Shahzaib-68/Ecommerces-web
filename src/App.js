import { useEffect, useState } from "react";
import "./App.css";
import Category from "../src/Component/category"; // Ensure the path is correct
import axios from "axios";

function App() {
  let [finalcategory, setCategory] = useState([]);
  let [finalproduct, setProduct] = useState([]);
  let [catName ,  SetcatName] = useState("")

  let productCategory = () => {
    axios.get(`https://jsonexamples.com/products/categories`)
      .then(res => res.data)
      .then(responses => {
        setCategory(responses);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  };

  let productItem = () => {
    axios.get("https://jsonexamples.com/products")
      .then(prores => prores.data)
      .then(finalres => {
        setProduct(finalres.products); // Ensure this is correct based on API response structure
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  };

  useEffect(() => {
    productCategory();
    productItem();
  }, []);

  useEffect(()=>{
    if(catName!==""){
      axios.get(`https://jsonexamples.com/products/category/${catName}`)
      .then(prores => prores.data)
      .then(finalres => {
        setProduct(finalres.products); // Ensure this is correct based on API response structure
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
    }
  },[catName])

  let pItems = finalproduct.map((provalue, index1) => (
    <ProductItems key={index1} pdata={provalue} />
  ));

  return (
    <div className="py-[40px] font-mono">
      <div className="max-w-[1220px] mx-[auto]">
        <h1 className="text-center font-bold text-4xl mt-[20px] mb-[30px]">OUR PRODUCT</h1>
        <div className="grid grid-cols-[30%_70%] gap-[30px]">
          <div>
            <Category finalcategory={finalcategory} SetcatName={SetcatName} />
          </div>
          <div>
            <div className="grid grid-cols-3 gap-4">
              {
                finalproduct.length>=1 ?
                pItems :
              "no product found"
            }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

export function ProductItems({ pdata }) {
  // console.log(pdata);
  return (
    <div className="shadow-lg text-center font-semibold font-mono">
     <img src={pdata.details?.image || pdata.thumbnail} alt={pdata.title}/>
      <h3>{pdata.title}</h3>
      <b>Rs: {pdata.price}</b>
    </div>
  );
}
