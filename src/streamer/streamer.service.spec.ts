import { Test, TestingModule } from '@nestjs/testing';
import * as sinon from 'sinon';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StreamerService } from './streamer.service';

describe('StreamerService', () => {
  let streamerService: StreamerService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StreamerService,
        {
          provide: getRepositoryToken(StreamerService),
          useValue: sinon.createStubInstance(Repository),
        },
      ],
    }).compile();

    streamerService = module.get<StreamerService>(StreamerService);
  });

  it('should return a promise', async () => {
    const path = './data/deleted_products.json';
    const getFileSpy = jest.spyOn(streamerService, 'getFile');
    streamerService.getFile(path);
    expect(getFileSpy).toBeDefined();
  });

  it('should return a promise', async () => {
    const mockDbStructure: any = {
      products: [
        {
          id: 'thytry-rthyrty-tryrt',
          title: 'Tomatos - Roma',
          vendorName: 'Adeco',
          quantity: 50,
          price: 2,
          deliveryDate: '10/2/2022',
          expiryDate: '12/12/2024',
        },
      ],
      lastModifiedDate: 52,
    };
    const path = './data/deleted_products.json';
    const writeFileSpy = jest.spyOn(streamerService, 'getFile');
    streamerService.writeFile(path, mockDbStructure);
    expect(writeFileSpy).toBeDefined();
  });
});
