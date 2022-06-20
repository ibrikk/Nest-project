import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../api/products.controller';
import { ProductsService } from './products.service';
import { StreamerService } from '../streamer/streamer.service';

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService, StreamerService],
    }).compile();

    productsController = module.get<ProductsController>(ProductsController);
    productsService = module.get<ProductsService>(ProductsService);
  });

  describe('ProductsController', () => {
    it('if array is ampty, read all products', async () => {
      const input = [];
      const expectedOutput: any = [
        {
          id: '1630f7a3-17a5-4cee-b6a7-6316e852a68e',
          title: 'Grapes - Red',
          vendorName: 'Hane-Hermiston',
          quantity: 205,
          price: 5,
          deliveryDate: '9/29/2021',
          expiryDate: '5/7/2023',
        },
        {
          id: '5388fdd1-6d71-43cb-8c64-3cb2d9e06657',
          title: 'Hog / Sausage Casing - Pork',
          vendorName: 'Ward, Kreiger and Terry',
          quantity: 271,
          price: 45,
          deliveryDate: '3/28/2022',
          expiryDate: '3/23/2022',
        },
        {
          id: 'a3f36d00-c69f-4c18-9272-3674d704fbb2',
          title: 'Butter - Pod',
          vendorName: 'Funk Inc',
          quantity: 435,
          price: 23,
          deliveryDate: '2/2/2022',
          expiryDate: '6/30/2022',
        },
        {
          id: '33755a6e-0c33-4de2-8278-f7f7e25cdd74',
          title: 'Peas Snow',
          vendorName: 'Armstrong Group',
          quantity: 409,
          price: 5,
          deliveryDate: '9/17/2021',
          expiryDate: '10/13/2023',
        },
        {
          id: 'b43398e4-3426-4c5a-9c1c-7a27defc90b7',
          title: 'Wine - Kwv Chenin Blanc South',
          vendorName: 'Wisoky Group',
          quantity: 351,
          price: 2,
          deliveryDate: '12/29/2021',
          expiryDate: '1/25/2022',
        },
        {
          id: 'ced9e746-d718-4751-a0ec-44ade1e195e2',
          title: 'Tea - Mint',
          vendorName: 'Lehner, Towne and McLaughlin',
          quantity: 77,
          price: 25,
          deliveryDate: '11/27/2021',
          expiryDate: '5/19/2021',
        },
      ];

      jest
        .spyOn(productsService, 'getAllActiveProducts')
        .mockImplementation(() => expectedOutput);

      expect(await productsController.getProducts(input)).toBe(expectedOutput);
    });

    it('should return correct Products that match the ID', async () => {
      const input = [
        'b43398e4-3426-4c5a-9c1c-7a27defc90b7',
        'ced9e746-d718-4751-a0ec-44ade1e195e2',
      ];

      const expectedOutput: any = [
        {
          id: 'b43398e4-3426-4c5a-9c1c-7a27defc90b7',
          title: 'Wine - Kwv Chenin Blanc South',
          vendorName: 'Wisoky Group',
          quantity: 351,
          price: 2,
          deliveryDate: '12/29/2021',
          expiryDate: '1/25/2022',
        },
        {
          id: 'ced9e746-d718-4751-a0ec-44ade1e195e2',
          title: 'Tea - Mint',
          vendorName: 'Lehner, Towne and McLaughlin',
          quantity: 77,
          price: 25,
          deliveryDate: '11/27/2021',
          expiryDate: '5/19/2021',
        },
      ];

      jest
        .spyOn(productsService, 'getProduct')
        .mockImplementation(() => expectedOutput);

      expect(await productsController.getProducts(input)).toBe(expectedOutput);
    });

    it("should add new Products into the db if it doesn't exist in db", async () => {
      const input: any = [
        {
          id: 'bv78edfefwewe-efwefw-ewfew-35',
          title: 'Credit Card',
          vendorName: 'PC Group',
          quantity: 450,
          price: 2,
          deliveryDate: '12/29/2021',
          expiryDate: '1/25/2028',
        },
        {
          id: 'bv78edfefwewe-efwefw-ewfew-379',
          title: 'Insurance',
          vendorName: 'Thrillworks',
          quantity: 78,
          price: 5,
          deliveryDate: '9/29/2021',
          expiryDate: '5/7/2025',
        },
      ];

      const expectedOutput: any = [
        {
          id: '1630f7a3-17a5-4cee-b6a7-6316e852a68e',
          title: 'Grapes - Red',
          vendorName: 'Hane-Hermiston',
          quantity: 205,
          price: 5,
          deliveryDate: '9/29/2021',
          expiryDate: '5/7/2023',
        },
        {
          id: '5388fdd1-6d71-43cb-8c64-3cb2d9e06657',
          title: 'Hog / Sausage Casing - Pork',
          vendorName: 'Ward, Kreiger and Terry',
          quantity: 271,
          price: 45,
          deliveryDate: '3/28/2022',
          expiryDate: '3/23/2022',
        },
        {
          id: 'a3f36d00-c69f-4c18-9272-3674d704fbb2',
          title: 'Butter - Pod',
          vendorName: 'Funk Inc',
          quantity: 435,
          price: 23,
          deliveryDate: '2/2/2022',
          expiryDate: '6/30/2022',
        },
        {
          id: '33755a6e-0c33-4de2-8278-f7f7e25cdd74',
          title: 'Peas Snow',
          vendorName: 'Armstrong Group',
          quantity: 409,
          price: 5,
          deliveryDate: '9/17/2021',
          expiryDate: '10/13/2023',
        },
        {
          id: 'b43398e4-3426-4c5a-9c1c-7a27defc90b7',
          title: 'Wine - Kwv Chenin Blanc South',
          vendorName: 'Wisoky Group',
          quantity: 351,
          price: 2,
          deliveryDate: '12/29/2021',
          expiryDate: '1/25/2022',
        },
        {
          id: 'ced9e746-d718-4751-a0ec-44ade1e195e2',
          title: 'Tea - Mint',
          vendorName: 'Lehner, Towne and McLaughlin',
          quantity: 77,
          price: 25,
          deliveryDate: '11/27/2021',
          expiryDate: '5/19/2021',
        },
        {
          id: 'bv78edfefwewe-efwefw-ewfew-35',
          title: 'Credit Card',
          vendorName: 'PC Group',
          quantity: 450,
          price: 2,
          deliveryDate: '12/29/2021',
          expiryDate: '1/25/2028',
        },
        {
          id: 'bv78edfefwewe-efwefw-ewfew-379',
          title: 'Insurance',
          vendorName: 'Thrillworks',
          quantity: 78,
          price: 5,
          deliveryDate: '9/29/2021',
          expiryDate: '5/7/2025',
        },
      ];

      jest
        .spyOn(productsService, 'upsertProducts')
        .mockImplementation(() => expectedOutput);

      expect(await productsController.upsertProducts(input)).toBe(
        expectedOutput,
      );
    });

    it('should update products by the given ID if they exist in db', async () => {
      const input = [
        {
          id: 'bv78edfefwewe-efwefw-ewfew-35',
          title: 'Benefits Membership Card',
          vendorName: 'Atlantis Group',
          quantity: 8,
          price: 5,
          deliveryDate: '10/05/2020',
          expiryDate: '2/5/2024',
        },
        {
          id: 'bv78edfefwewe-efwefw-ewfew-379',
          title: 'Website Product',
          vendorName: 'Adeco',
          quantity: 72,
          price: 8,
          deliveryDate: '9/29/2020',
          expiryDate: '1/8/2027',
        },
      ];

      const expectedOutput: any = [
        {
          id: '1630f7a3-17a5-4cee-b6a7-6316e852a68e',
          title: 'Grapes - Red',
          vendorName: 'Hane-Hermiston',
          quantity: 205,
          price: 5,
          deliveryDate: '9/29/2021',
          expiryDate: '5/7/2023',
        },
        {
          id: '5388fdd1-6d71-43cb-8c64-3cb2d9e06657',
          title: 'Hog / Sausage Casing - Pork',
          vendorName: 'Ward, Kreiger and Terry',
          quantity: 271,
          price: 45,
          deliveryDate: '3/28/2022',
          expiryDate: '3/23/2022',
        },
        {
          id: 'a3f36d00-c69f-4c18-9272-3674d704fbb2',
          title: 'Butter - Pod',
          vendorName: 'Funk Inc',
          quantity: 435,
          price: 23,
          deliveryDate: '2/2/2022',
          expiryDate: '6/30/2022',
        },
        {
          id: '33755a6e-0c33-4de2-8278-f7f7e25cdd74',
          title: 'Peas Snow',
          vendorName: 'Armstrong Group',
          quantity: 409,
          price: 5,
          deliveryDate: '9/17/2021',
          expiryDate: '10/13/2023',
        },
        {
          id: 'b43398e4-3426-4c5a-9c1c-7a27defc90b7',
          title: 'Wine - Kwv Chenin Blanc South',
          vendorName: 'Wisoky Group',
          quantity: 351,
          price: 2,
          deliveryDate: '12/29/2021',
          expiryDate: '1/25/2022',
        },
        {
          id: 'ced9e746-d718-4751-a0ec-44ade1e195e2',
          title: 'Tea - Mint',
          vendorName: 'Lehner, Towne and McLaughlin',
          quantity: 77,
          price: 25,
          deliveryDate: '11/27/2021',
          expiryDate: '5/19/2021',
        },
        {
          id: 'bv78edfefwewe-efwefw-ewfew-35',
          title: 'Benefits Membership Card',
          vendorName: 'Atlantis Group',
          quantity: 8,
          price: 5,
          deliveryDate: '10/05/2020',
          expiryDate: '2/5/2024',
        },
        {
          id: 'bv78edfefwewe-efwefw-ewfew-379',
          title: 'Website Product',
          vendorName: 'Adeco',
          quantity: 72,
          price: 8,
          deliveryDate: '9/29/2020',
          expiryDate: '1/8/2027',
        },
      ];
      jest
        .spyOn(productsService, 'upsertProducts')
        .mockImplementation(() => expectedOutput);

      expect(await productsController.upsertProducts(input)).toBe(
        expectedOutput,
      );
    });

    it('should remove products by given IDs and return new Products Array', async () => {
      const input = [
        'bv78edfefwewe-efwefw-ewfew-35',
        'bv78edfefwewe-efwefw-ewfew-379',
      ];
      const expectedOutput = null;

      jest
        .spyOn(productsService, 'deleteProductsById')
        .mockImplementation(() => expectedOutput);

      expect(await productsController.deleteProductsById(input)).toBe(
        expectedOutput,
      );
    });

    
  });
});
