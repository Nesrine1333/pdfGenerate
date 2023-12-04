import { Test, TestingModule } from '@nestjs/testing';
import { ExelfileService } from './exelfile.service';

describe('ExelfileService', () => {
  let service: ExelfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExelfileService],
    }).compile();

    service = module.get<ExelfileService>(ExelfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
