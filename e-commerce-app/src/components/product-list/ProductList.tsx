import { useDispatch } from 'react-redux';
import {addToCart, IProduct} from '../../../redux/slices/cartSlice'
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
export interface IProductList {
  paginatedProducts: IProduct[];
}
const ProductList = ({ paginatedProducts }: IProductList) => {
    const dispatch = useDispatch()
  return (
    <>
      {paginatedProducts.map((product: IProduct) => (
        <Card key={product.id} className="hover:shadow-lg transition">
          <CardContent className="p-4 space-y-3">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-40 w-full object-cover rounded-lg"
            />
            <div>
              <h3 className="text-md font-semibold truncate">
                {product.title}
              </h3>
              <p className="text-xs text-gray-500 capitalize">
                {product.category}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-blue-600 font-bold">${product.price}</p>
              <Button size="sm"
              onClick={() =>
                dispatch(addToCart({
                    id: product.id, title: product.title, price: product.price, thumbnail: product.thumbnail,
                    category: product.category
                }))
              }
              >Add to Cart</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default ProductList;
