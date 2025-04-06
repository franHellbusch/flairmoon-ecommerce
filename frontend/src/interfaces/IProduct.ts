interface IProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  stock: number;
  offers: string[];
  variants: {
    color?: string | null;
    tone?: string | null;
    stock: number;
  }[];
}

export default IProduct;
