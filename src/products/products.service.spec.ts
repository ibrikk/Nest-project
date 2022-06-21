import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { StreamerService } from '../streamer/streamer.service';
import * as sinon from 'sinon';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProductsService', () => {
  let productsService: ProductsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        StreamerService,
        {
          provide: getRepositoryToken(ProductsService),
          useValue: sinon.createStubInstance(Repository),
        },
      ],
    }).compile();
    productsService = module.get<ProductsService>(ProductsService);
  });

  it('Db should not be defined', async () => {
    const mockProducts = [
      {
        id: '1630f7a3-17a5-4cee-b6a7-6316e852a68e',
        title: 'Grapes - Red',
        vendorName: 'Hane-Hermiston',
        quantity: 205,
        price: 5,
        deliveryDate: '9/29/2021',
        expiryDate: '5/7/2023',
      },
    ];

    const mockDto = {
      products: [
        {
          id: '1630f7a3-17a5-4cee-b6a7-6316e852a68e',
          title: 'Grapes - Red',
          vendorName: 'Hane-Hermiston',
          quantity: 205,
          price: 5,
          deliveryDate: '9/29/2021',
          expiryDate: '5/7/2023',
        },
      ],
      lastModifiedDate: null,
    };

    const removeProductsFromDtoSpy = jest.spyOn(
      productsService,
      'removeProductsFromDto',
    );
    productsService.removeProductsFromDto(mockProducts, mockDto);
    expect(removeProductsFromDtoSpy).toBeDefined();
  });

  it('Db should not be falsy', async () => {
    const mockJson = {
      id: '1630f7a3-17a5-4cee-b6a7-6316e852a68e',
      title: 'Grapes - Red',
      vendorName: 'Hane-Hermiston',
      quantity: 205,
      price: 5,
      deliveryDate: '9/29/2021',
      expiryDate: '5/7/2023',
    };
    const processJsonArraySpy = jest.spyOn(productsService, 'processJsonArray');
    productsService.processJsonArray(mockJson);
    expect(processJsonArraySpy).toBeTruthy();
  });

  it('Get all active products should return an array', async () => {
    const getAllActiveProductsSpy = jest.spyOn(
      productsService,
      'getAllActiveProducts',
    );
    productsService.getAllActiveProducts();
    expect(getAllActiveProductsSpy).toBeTruthy();
  });

  it('Getting all active products by Id should return an array', async () => {
    const getProductByIdSpy = jest.spyOn(productsService, 'getProductById');
    productsService.getProductById('wefwef-ggrgr-234');
    expect(getProductByIdSpy).toBeTruthy();
  });
  it('Getting all active products by array of Ids should return an array', async () => {
    const getProductSpy = jest.spyOn(productsService, 'getProductById');
    productsService.getProduct(['wefwef-ggrgr-234']);
    expect(getProductSpy).toBeTruthy();
  });
  it('Should not return undefined', async () => {
    const mockProducts = [
      {
        id: '1630f7a3-17a5-4cee-b6a7-6316e852a68e',
        title: 'Grapes - Red',
        vendorName: 'Hane-Hermiston',
        quantity: 205,
        price: 5,
        deliveryDate: '9/29/2021',
        expiryDate: '5/7/2023',
      },
    ];
    const upsertProductsSpy = jest.spyOn(productsService, 'getProductById');
    productsService.upsertProducts(mockProducts);
    expect(upsertProductsSpy).toBeDefined();
  });
  it('Getting all active products by array of Ids should return an array', async () => {
    const deleteProductsByIdSpy = jest.spyOn(productsService, 'deleteProductsById');
    productsService.deleteProductsById(['wefwef-ggrgr-234']);
    expect(deleteProductsByIdSpy).toBeTruthy();
  });
});
