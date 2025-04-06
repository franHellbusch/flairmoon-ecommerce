import { createCustomError } from "../../../shared/helpers/createCustomError";
import { ErrorNames } from "../../../shared/helpers/errorNames";
import { BaseMongoRepository } from "../../../shared/repositories/baseMongoRepository";
import IDBProduct from "../../product/interfaces/IDBProduct";
import ICreateCartDTO from "../dtos/ICreateCartDTO";
import ICartRepository from "../interfaces/ICartRepository";
import IDBCart, { ICartProductVariant } from "../interfaces/IDBCart";
import { IDBMongoCart } from "../interfaces/IDBMongoCart";
import { cartModel } from "../models/CartModel";

/**
 * Mongoose repository for managing task-related data.
 * Extends the BaseMongoRepository to provide CRUD operations for task documents.
 */
class CartMongoRepository extends BaseMongoRepository<IDBMongoCart> implements ICartRepository {
  constructor() {
    super(cartModel);
  }

  async createOne(cartData?: ICreateCartDTO): Promise<IDBCart> {
    return await this.create(cartData || { products: [] });
  }

  async getOneById(id: string): Promise<IDBCart | null> {
    return await this.getById(id);
  }

  async addOneProduct(
    id: string,
    product: IDBProduct,
    variant?: ICartProductVariant
  ): Promise<IDBCart | null> {
    const cart = await this.getById(id);
    if (!cart) {
      return null;
    }

    let selectedVariant;

    if (variant) {
      selectedVariant = product.variants.find(
        (v) => v.color === variant.color && v.tone === variant.tone
      );

      if (!selectedVariant) {
        throw createCustomError(ErrorNames.INVALID_FIELDS);
      }

      if (selectedVariant.stock <= 0) {
        throw createCustomError(ErrorNames.cart.INSUFFICIENT_VARIANT_STOCK);
      }
    } else {
      if (product.stock <= 0) {
        throw createCustomError(ErrorNames.cart.INSUFFICIENT_GENERAL_STOCK);
      }
    }

    const existingProductIndex = cart.products.findIndex(
      (item) =>
        item.product?.toString() === product.id &&
        (variant
          ? item.variant?.color === variant.color && item.variant?.tone === variant.tone
          : !item.variant)
    );

    if (existingProductIndex !== -1) {
      const existingProduct = cart.products[existingProductIndex];
      if (
        selectedVariant
          ? selectedVariant.stock < existingProduct.quantity + 1
          : product.stock < existingProduct.quantity + 1
      ) {
        if (selectedVariant) {
          throw createCustomError(ErrorNames.cart.INSUFFICIENT_VARIANT_STOCK);
        } else {
          throw createCustomError(ErrorNames.cart.INSUFFICIENT_GENERAL_STOCK);
        }
      }
      existingProduct.quantity += 1;
      existingProduct.subtotal = existingProduct.quantity * product.price;
      cart.products[existingProductIndex] = existingProduct;
    } else {
      cart.products.push({
        product,
        quantity: 1,
        subtotal: product.price,
        variant,
      });
    }

    cart.total = cart.products.reduce((acc, item) => acc + item.subtotal, 0);

    return await this.updateById(id, cart);
  }

  async deleteOneProduct(
    id: string,
    product: IDBProduct,
    variant?: ICartProductVariant
  ): Promise<IDBCart | null> {
    const cart = await this.getById(id);
    if (!cart) {
      return null;
    }

    const productIndex = cart.products.findIndex((item) =>
      item.product?.toString() == product.id && variant
        ? item.variant?.color == variant.color && item.variant?.tone == variant.tone
        : true
    );

    if (productIndex === -1) {
      return cart;
    }

    const cartProduct = cart.products[productIndex];

    if (cartProduct.quantity > 1) {
      cartProduct.quantity -= 1;
      cartProduct.subtotal =
        (cartProduct.quantity * cartProduct.subtotal) / (cartProduct.quantity + 1);
      cart.products[productIndex] = cartProduct;
    } else {
      cart.products.splice(productIndex, 1);
    }

    cart.total = cart.products.reduce((acc, item) => acc + item.subtotal, 0);

    return await this.updateById(id, cart);
  }

  async deleteAllFromCart(id: string): Promise<IDBCart | null> {
    try {
      const cart = await this.getById(id);
      if (!cart) {
        return null;
      }

      cart.products = [];
      cart.total = 0;
      await cart.save();

      return cart;
    } catch (err) {
      throw err;
    }
  }

  async deleteOneById(id: string): Promise<void> {
    await this.deleteById(id);
  }
}

export default CartMongoRepository;
