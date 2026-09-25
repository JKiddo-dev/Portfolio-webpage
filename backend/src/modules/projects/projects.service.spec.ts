import { Test, TestingModule } from "@nestjs/testing";
import { ProjectsService } from "./projects.service";
import { NotFoundException } from "@nestjs/common";

describe("ProjectsService", () => {
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectsService],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return all projects in Spanish by default", () => {
    const projects = service.findAll({ lang: "es" });
    expect(projects).toBeInstanceOf(Array);
    expect(projects.length).toBeGreaterThan(0);
    expect(projects[0]).toHaveProperty("id");
    expect(projects[0]).toHaveProperty("title");
  });

  it("should return projects in English when requested", () => {
    const projects = service.findAll({ lang: "en" });
    expect(projects[0].description).toBeDefined();
  });

  it("should filter projects by category correctly", () => {
    const fullStackProjects = service.findAll({ lang: "es", category: "Full-Stack" });
    expect(fullStackProjects.every((p) => p.category === "Full-Stack")).toBe(true);
  });

  it("should find project by id", () => {
    const project = service.findOne("rio-clarillo-mesh", "es");
    expect(project.id).toBe("rio-clarillo-mesh");
  });

  it("should throw NotFoundException for unknown id", () => {
    expect(() => service.findOne("non-existent-id", "es")).toThrow(NotFoundException);
  });
});