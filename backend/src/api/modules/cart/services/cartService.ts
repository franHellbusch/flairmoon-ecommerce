import { inject, injectable } from "inversify";
import { createCustomError } from "../../../shared/helpers/createCustomError";
import { ErrorNames } from "../../../shared/helpers/errorNames";
import ICartService from "../interfaces/ICartService";
import CART_TYPES from "../types/cartTypes";
import ICartRepository from "../interfaces/ICartRepository";
import IDBCart, { ICartProductVariant } from "../interfaces/IDBCart";
import PRODUCT_TYPES from "../../product/types/productTypes";
import IProductRepository from "../../product/interfaces/IProductRepository";
import ICreateCartDTO from "../dtos/ICreateCartDTO";
import { CartStrictZodSchema } from "../schemas/cartZodSchema";
import USER_TYPES from "../../user/types/userTypes";
import IUserService from "../../user/interfaces/IUserService";

@injectable()
class CartService implements ICartService {
  constructor(
    @inject(CART_TYPES.CartRepository)
    private readonly cartRepository: ICartRepository,
    @inject(PRODUCT_TYPES.ProductRepository)
    private readonly productRepository: IProductRepository,
    @inject(USER_TYPES.UserService)
    private readonly userService: IUserService
  ) {}

  async createCart(userId: string, cartData?: ICreateCartDTO): Promise<IDBCart> {
    if (!cartData) {
      const cart = await this.cartRepository.createOne();
      await this.userService.updateUser(userId, { cartId: cart.id });
      return cart;
    }

    const parsedCartData = CartStrictZodSchema.parse(cartData);

    const cart = await this.cartRepository.createOne(parsedCartData);

    await this.userService.updateUser(userId, { cartId: cart.id });

    return cart;
  }

  async getCartById(id: string): Promise<IDBCart> {
    const cart = await this.cartRepository.getOneById(id);

    if (!cart) {
      throw createCustomError(ErrorNames.NOT_FOUND);
    }

    return cart;
  }

  async addOneProductToCart(
    id: string,
    productId: string,
    variant?: ICartProductVariant
  ): Promise<IDBCart> {
    const product = await this.productRepository.getOneById(productId);
    if (!product) {
      throw createCustomError(ErrorNames.NOT_FOUND);
    }

    const cart = await this.cartRepository.addOneProduct(id, product, variant);
    if (!cart) {
      throw createCustomError(ErrorNames.NOT_FOUND);
    }

    return cart;
  }

  async deleteOneProductToCart(
    id: string,
    productId: string,
    variant?: ICartProductVariant
  ): Promise<IDBCart> {
    const product = await this.productRepository.getOneById(productId);
    if (!product) {
      throw createCustomError(ErrorNames.NOT_FOUND);
    }

    const cart = await this.cartRepository.deleteOneProduct(id, product, variant);
    if (!cart) {
      throw createCustomError(ErrorNames.NOT_FOUND);
    }

    return cart;
  }

  async deleteAllFromCart(id: string): Promise<IDBCart> {
    const cart = await this.cartRepository.deleteAllFromCart(id);

    if (!cart) {
      throw createCustomError(ErrorNames.NOT_FOUND);
    }

    return cart;
  }

  async deleteCartById(id: string): Promise<void> {
    await this.cartRepository.deleteOneById(id);
  }
}

export default CartService;
