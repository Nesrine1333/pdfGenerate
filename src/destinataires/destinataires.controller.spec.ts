import { Test, TestingModule } from '@nestjs/testing';
import { DestinatairesController } from './destinataires.controller';

describe('DestinatairesController', () => {
  let controller: DestinatairesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DestinatairesController],
    }).compile();

    controller = module.get<DestinatairesController>(DestinatairesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
