import { Test, TestingModule } from "@nestjs/testing";
import { InMemoryDbService } from "../storage/storage.service";
import { ConcertsService } from "./concerts.service";

describe("ConcertsService", () => {
  let service: ConcertsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InMemoryDbService, ConcertsService]
    }).compile();

    service = module.get<ConcertsService>(ConcertsService);
  });

  it("creates a concert", () => {
    const created = service.create({
      name: "New Concert",
      description: "Description",
      totalSeats: 300
    });

    expect(created.id).toBeDefined();
    expect(created.name).toBe("New Concert");
    expect(created.totalSeats).toBe(300);
    expect(created.remainingSeats).toBe(300);
  });

  it("deletes an existing concert", () => {
    const target = service.findAll()[0];

    service.remove(target.id);

    expect(service.findAll().some((item) => item.id === target.id)).toBe(false);
  });

  it("throws not found when deleting unknown concert", () => {
    expect(() => service.remove("missing-id")).toThrow("Concert not found");
  });
});
