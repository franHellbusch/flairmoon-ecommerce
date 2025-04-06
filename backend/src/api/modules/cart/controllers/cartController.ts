import { NextFunction, Response, Request } from "express";
import { inject, injectable } from "inversify";
import CART_TYPES from "../types/cartTypes";
import ICartService from "../interfaces/ICartService";
import CartResponseDTOMapper from "../dtos/CartResponseDTOMapper";
import { ICartProductVariant } from "../interfaces/IDBCart";
import ICreateCartDTO from "../dtos/ICreateCartDTO";

@injectable()
class CartController {
  constructor(@inject(CART_TYPES.CartService) private readonly cartService: ICartService) {}

  async createCart(req: Request, res: Response, _next: NextFunction) {
    const userId = req.params.userId; // Get userId from params
    const cartData: ICreateCartDTO | undefined = req.body; // Cart data is optional

    const cart = await this.cartService.createCart(userId, cartData);

    res.status(200).json({
      success: true,
      payload: CartResponseDTOMapper.toDTO(cart),
    });
  }

  async getCartById(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const cart = await this.cartService.getCartById(id);

    res.status(200).json({
      success: true,
      payload: CartResponseDTOMapper.toDTO(cart),
    });
  }

  async addOneProductToCart(req: Request, res: Response, _next: NextFunction) {
    const { id, productId } = req.params;
    const variant: ICartProductVariant = req.body.variant;

    const cart = await this.cartService.addOneProductToCart(id, productId, variant);

    res.status(200).json({
      success: true,
      payload: CartResponseDTOMapper.toDTO(cart),
    });
  }

  async deleteOneProductToCart(req: Request, res: Response, _next: NextFunction) {
    const { id, productId } = req.params;
    const variant: ICartProductVariant = req.body.variant;

    const cart = await this.cartService.deleteOneProductToCart(id, productId, variant);

    res.status(200).json({
      success: true,
      payload: CartResponseDTOMapper.toDTO(cart),
    });
  }

  async deleteAllFromCart(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const cart = await this.cartService.deleteAllFromCart(id);

    res.status(200).json({
      success: true,
      payload: CartResponseDTOMapper.toDTO(cart),
    });
  }

  async deleteCartById(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    await this.cartService.deleteCartById(id);

    res.status(200).json({
      success: true,
      payload: {
        message: `Cart with id ${id} deleted successfully`,
      },
    });
  }
}

export default CartController;
