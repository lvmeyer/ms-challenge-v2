import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  Category,
  CreateCategoryRequest,
  CreateReviewRequest,
  Product,
  Review,
} from '@app/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository, UpdateResult } from 'typeorm';

import { CreateProductRequest, UpdateProductRequest } from '@app/common';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  // ==========================================
  // ================== CATEGORIES ============
  // ==========================================
  async createCategory(
    createCategoryRequest: CreateCategoryRequest,
  ): Promise<CreateCategoryRequest & Category> {
    try {
      return await this.categoryRepository.save(createCategoryRequest);
    } catch (err) {
      throw new InternalServerErrorException(err.driverError.message);
    }
  }

  async findAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async deleteCategory(uuid: string): Promise<void> {
    const category = await this.categoryRepository.findOneBy({ id: uuid });
    if (!category) {
      throw new NotFoundException('Category not found for deletion');
    }

    await this.categoryRepository.remove(category);
  }

  // ==========================================
  // ================== PDTS ==================
  // ==========================================
  async createProduct(
    createProductRequest: CreateProductRequest,
  ): Promise<CreateProductRequest & Product> {
    try {
      return await this.productRepository.save(createProductRequest);
    } catch (err) {
      throw new InternalServerErrorException(err.driverError.message);
    }
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find({
      relations: {
        category: true
      },
    });
    return products;
  }

  async find(uuid: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: {
        id: uuid,
      },
      relations: {
        category: true,
        reviews: true,
      },
    });
    // const product = await this.productRepository.findOneBy({ id: uuid });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(
    uuid: string,
    updateProductRequest: UpdateProductRequest,
  ): Promise<UpdateResult> {
    try {
      const product = await this.productRepository.findOneBy({ id: uuid });
      if (!product) {
        throw new NotFoundException('Product not found for update');
      }
      return await this.productRepository.update(uuid, updateProductRequest);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async delete(uuid: string): Promise<void> {
    const product = await this.productRepository.findOneBy({ id: uuid });
    if (!product) {
      throw new NotFoundException('Product not found for deletion');
    }

    await this.productRepository.remove(product);
  }

  // =============== REVIEWS ===================
  async createReview(
    createReviewRequest: CreateReviewRequest,
  ): Promise<CreateReviewRequest & Review> {
    try {
      const product = await this.productRepository.findOneBy({
        id: createReviewRequest.productId,
      });
      if (!product) {
        throw new NotFoundException('Product not found for review');
      }

      return await this.reviewRepository.save({
        ...createReviewRequest,
        product,
      });
    } catch (err) {
      throw new InternalServerErrorException(err.driverError.message);
    }
  }

  async deleteReview(uuid: string): Promise<void> {
    const review = await this.reviewRepository.findOneBy({ id: uuid });
    if (!review) {
      throw new NotFoundException('Review not found for deletion');
    }

    await this.reviewRepository.remove(review);
  }

  async declineReportReview(uuid: string): Promise<void> {
    const review = await this.reviewRepository.findOneBy({ id: uuid });
    if (!review) {
      throw new NotFoundException('Review not found for deletion');
    }

    await this.reviewRepository.update(review.id, { ...review, reports: 0 });
  }

  async findAllReviews(nbOfReports: number): Promise<Review[]> {
    return this.reviewRepository.find({
      relations: {
        product: true,
      },
      where: {
        reports: MoreThanOrEqual(nbOfReports),
      },
    });
  }

  async reportReview(id: string): Promise<void> {
    const review = await this.reviewRepository.findOneBy({ id });
    if (!review) {
      throw new NotFoundException('Review not found for report');
    }
    await this.reviewRepository.update(id, {
      reports: review.reports + 1,
    });
  }
}
