interface IDBProduct {
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
  createdAt: Date;
  updatedAt: Date;
}

export default IDBProduct;
