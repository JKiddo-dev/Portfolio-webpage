"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/hooks/usePortfolio";
import SpotlightCard from "@/components/ui/SpotlightCard";
import {
  Code2,
  Copy,
  Check,
  Layers,
  FileCode,
  ShieldCheck,
  GitBranch,
  Boxes,
  Cpu,
  CheckCircle2,
  Maximize2,
  Minimize2,
} from "lucide-react";

interface PrincipleItem {
  id: string;
  letter: string;
  shortName: string;
  fullName: { es: string; en: string };
  contextTag: { es: string; en: string };
  summary: { es: string; en: string };
  keyBenefit: { es: string; en: string };
  filePath: string;
  code: string;
}

const PRINCIPLES: PrincipleItem[] = [
  {
    id: "srp",
    letter: "S",
    shortName: "Single Responsibility",
    fullName: {
      es: "Single Responsibility Principle (SRP)",
      en: "Single Responsibility Principle (SRP)",
    },
    contextTag: {
      es: "Validación DTO vs Transporte vs Dominio",
      en: "DTO Validation vs Transport vs Domain",
    },
    summary: {
      es: "Cada capa maneja una única responsabilidad: el DTO define y valida contratos de entrada; el controlador gestiona el protocolo HTTP y Swagger; el servicio procesa la lógica de red mesh sin acoplarse al transporte.",
      en: "Each layer handles a single responsibility: DTOs validate incoming network payloads; the controller manages HTTP routing and Swagger documentation; the service isolates mesh routing logic without transport coupling.",
    },
    keyBenefit: {
      es: "Modificar la API de transporte (ej. migrar a gRPC o WebSockets) no altera la validación ni las reglas de dominio.",
      en: "Changing the transport protocol (e.g. migrating to gRPC or WebSockets) does not affect validation or domain rules.",
    },
    filePath: "src/modules/telemetry/dto/lora-packet.dto.ts & telemetry.controller.ts",
    code: `// lora-packet.dto.ts
export class LoRaPacketDto {
  @ApiProperty({ example: 'ESP32-Node-03' })
  @IsString()
  @IsNotEmpty()
  readonly nodeId: string;

  @ApiProperty({ example: -84 })
  @IsNumber()
  @Min(-140)
  @Max(0)
  readonly rssi: number;

  @ApiProperty({ example: 9.5 })
  @IsNumber()
  readonly snr: number;

  @ApiProperty({ example: 'temp:21.8,hum:48' })
  @IsString()
  @IsNotEmpty()
  readonly payload: string;
}

// telemetry.controller.ts
@ApiTags('telemetry')
@Controller('telemetry')
export class TelemetryController {
  constructor(private readonly telemetryService: TelemetryService) {}

  @Post('packet')
  @ApiOperation({ summary: 'Ingesta de telemetría LoRa' })
  async ingestPacket(@Body() dto: LoRaPacketDto): Promise<IngestResult> {
    return this.telemetryService.processPacket(dto);
  }
}`,
  },
  {
    id: "ocp",
    letter: "O",
    shortName: "Open / Closed",
    fullName: {
      es: "Open/Closed Principle (OCP)",
      en: "Open/Closed Principle (OCP)",
    },
    contextTag: {
      es: "Patrón Strategy para Decodificación de Sensores",
      en: "Strategy Pattern for Sensor Decoders",
    },
    summary: {
      es: "El procesamiento de telemetría IoT está abierto a nuevos tipos de sensores (suelo, estaciones meteorológicas, calidad de aire) mediante el patrón Strategy. El registro despacha al decodificador correspondiente sin modificar el flujo de enrutamiento principal.",
      en: "IoT payload processing is open to new sensor types (soil moisture, weather stations, air quality) via the Strategy pattern. The registry dispatches to matching decoders without altering core routing logic.",
    },
    keyBenefit: {
      es: "Nuevos sensores se integran añadiendo una clase decodificadora independiente, con cero riesgo de regresión en sensores previos.",
      en: "New sensors integrate by adding an independent decoder class, with zero regression risk to existing sensors.",
    },
    filePath: "src/modules/telemetry/strategies/sensor-decoder.strategy.ts",
    code: `export interface SensorPayloadDecoder {
  readonly sensorType: string;
  decode(rawPayload: string): Record<string, number | string>;
}

@Injectable()
export class WeatherSensorDecoder implements SensorPayloadDecoder {
  readonly sensorType = 'DHT22_WEATHER';

  decode(rawPayload: string) {
    const params = new URLSearchParams(rawPayload.replace(/,/g, '&'));
    return {
      temperature: parseFloat(params.get('temp') ?? '0'),
      humidity: parseFloat(params.get('hum') ?? '0'),
    };
  }
}

@Injectable()
export class SoilMoistureDecoder implements SensorPayloadDecoder {
  readonly sensorType = 'SOIL_CAPACITIVE';

  decode(rawPayload: string) {
    const match = rawPayload.match(/moist:(\d+(\.\d+)?)/);
    return { moistureVwc: match ? parseFloat(match[1]) : 0 };
  }
}

@Injectable()
export class TelemetryDecoderRegistry {
  private readonly decoders = new Map<string, SensorPayloadDecoder>();

  register(decoder: SensorPayloadDecoder): void {
    this.decoders.set(decoder.sensorType, decoder);
  }

  getDecoder(sensorType: string): SensorPayloadDecoder {
    const decoder = this.decoders.get(sensorType);
    if (!decoder) throw new NotFoundException('Decoder not found: ' + sensorType);
    return decoder;
  }
}`,
  },
  {
    id: "lsp",
    letter: "L",
    shortName: "Liskov Substitution",
    fullName: {
      es: "Liskov Substitution Principle (LSP)",
      en: "Liskov Substitution Principle (LSP)",
    },
    contextTag: {
      es: "Sustituibilidad de Repositorios (Testing vs Prod)",
      en: "Repository Substitutability (Testing vs Prod)",
    },
    summary: {
      es: "Cualquier implementación del puerto de persistencia (MongoDB en producción o un almacén en memoria para Jest) cumple estrictamente el contrato sin alterar el comportamiento ni generar efectos colaterales en los servicios que lo consumen.",
      en: "Any implementation of the persistence port (MongoDB in production or an in-memory store for Jest) strictly satisfies the contract without breaking behavior or causing side effects in consuming services.",
    },
    keyBenefit: {
      es: "Las suites de pruebas unitarias corren en menos de 2 segundos en memoria sin necesidad de levantar bases de datos ni Docker.",
      en: "Unit test suites run in under 2 seconds in memory without spinning up databases or Docker containers.",
    },
    filePath: "src/modules/telemetry/ports/telemetry.repository.ts",
    code: `// ports/telemetry.repository.ts
export interface ITelemetryRepository {
  persist(packet: TelemetryPacket): Promise<void>;
  findRecentByNode(nodeId: string, limit?: number): Promise<TelemetryPacket[]>;
}

// adapters/mongo-telemetry.repository.ts
@Injectable()
export class MongoTelemetryRepository implements ITelemetryRepository {
  constructor(
    @InjectModel(Telemetry.name)
    private readonly model: Model<TelemetryDocument>,
  ) {}

  async persist(packet: TelemetryPacket): Promise<void> {
    await this.model.create(packet);
  }

  async findRecentByNode(nodeId: string, limit = 20): Promise<TelemetryPacket[]> {
    return this.model.find({ nodeId }).sort({ timestamp: -1 }).limit(limit).exec();
  }
}

// testing/in-memory-telemetry.repository.ts
export class InMemoryTelemetryRepository implements ITelemetryRepository {
  private readonly items: TelemetryPacket[] = [];

  async persist(packet: TelemetryPacket): Promise<void> {
    this.items.push({ ...packet });
  }

  async findRecentByNode(nodeId: string, limit = 20): Promise<TelemetryPacket[]> {
    return this.items.filter((p) => p.nodeId === nodeId).slice(-limit).reverse();
  }
}`,
  },
  {
    id: "isp",
    letter: "I",
    shortName: "Interface Segregation",
    fullName: {
      es: "Interface Segregation Principle (ISP)",
      en: "Interface Segregation Principle (ISP)",
    },
    contextTag: {
      es: "Contratos Granulares por Capacidad de Hardware",
      en: "Fine-Grained Hardware Capability Contracts",
    },
    summary: {
      es: "En lugar de forzar a todos los nodos de la red a implementar una interfaz masiva con GPS, sensores y radio, se definen contratos modulares. Un nodo repetidor solo implementa transmisión y telemetría de energía, evitando métodos vacíos o excepciones innecesarias.",
      en: "Instead of forcing all network nodes to implement a bulky interface with GPS, sensors, and radio, modular contracts are defined. A repeater node only implements transmission and power telemetry, avoiding empty stubs or runtime exceptions.",
    },
    keyBenefit: {
      es: "Evita acoplamientos innecesarios y elimina código muerto en nodos con hardware restringido.",
      en: "Prevents unnecessary coupling and eliminates dead code on hardware-constrained nodes.",
    },
    filePath: "src/modules/telemetry/domain/node-capabilities.ts",
    code: `export interface Transceiver {
  transmit(data: Uint8Array): Promise<boolean>;
  getSignalQuality(): { rssi: number; snr: number };
}

export interface PowerTelemetry {
  getBatteryMillivolts(): number;
  isSolarCharging(): boolean;
}

export interface GeolocationProvider {
  getCoordinates(): { lat: number; lng: number; alt: number };
}

@Injectable()
export class MeshRepeaterNode implements Transceiver, PowerTelemetry {
  async transmit(data: Uint8Array): Promise<boolean> {
    return true;
  }

  getSignalQuality() {
    return { rssi: -82, snr: 10.2 };
  }

  getBatteryMillivolts(): number {
    return 4180;
  }

  isSolarCharging(): boolean {
    return true;
  }
}`,
  },
  {
    id: "dip",
    letter: "D",
    shortName: "Dependency Inversion",
    fullName: {
      es: "Dependency Inversion Principle (DIP)",
      en: "Dependency Inversion Principle (DIP)",
    },
    contextTag: {
      es: "Inyección de Dependencias por Symbol Tokens",
      en: "Symbol-Token Dependency Injection",
    },
    summary: {
      es: "Los servicios de alto nivel dependen de abstracciones (interfaces y Symbol tokens de NestJS), nunca de clientes concretos como Mongoose o librerías MQTT. El contenedor IoC inyecta la implementación adecuada según el entorno (producción, staging o tests).",
      en: "High-level services depend on abstractions (interfaces and NestJS Symbol tokens), never on concrete Mongoose or MQTT drivers. The IoC container resolves the appropriate implementation depending on the runtime environment.",
    },
    keyBenefit: {
      es: "Facilita cambiar la infraestructura subyacente (ej. de Mosquitto a AWS IoT Core) sin tocar una sola línea de la lógica de dominio.",
      en: "Enables switching underlying infrastructure (e.g. from Mosquitto to AWS IoT Core) without touching domain logic.",
    },
    filePath: "src/modules/telemetry/telemetry.service.ts",
    code: `// tokens.ts
export const TELEMETRY_REPOSITORY = Symbol('TELEMETRY_REPOSITORY');
export const MQTT_GATEWAY = Symbol('MQTT_GATEWAY');

// telemetry.service.ts
@Injectable()
export class TelemetryService {
  constructor(
    @Inject(TELEMETRY_REPOSITORY)
    private readonly repository: ITelemetryRepository,
    @Inject(MQTT_GATEWAY)
    private readonly mqtt: IMqttGateway,
  ) {}

  async processIncomingPacket(packet: TelemetryPacket): Promise<void> {
    await this.repository.persist(packet);
    await this.mqtt.publish('mesh/telemetry/' + packet.nodeId, packet);
  }
}

// telemetry.module.ts
@Module({
  providers: [
    TelemetryService,
    {
      provide: TELEMETRY_REPOSITORY,
      useClass: process.env.NODE_ENV === 'test'
        ? InMemoryTelemetryRepository
        : MongoTelemetryRepository,
    },
  ],
})
export class TelemetryModule {}`,
  },
  {
    id: "clean",
    letter: "Hex",
    shortName: "Clean Architecture",
    fullName: {
      es: "Clean Architecture (Puertos y Adaptadores)",
      en: "Clean Architecture (Ports & Adapters)",
    },
    contextTag: {
      es: "Dominio -> Aplicación -> Infraestructura",
      en: "Domain -> Application -> Infrastructure",
    },
    summary: {
      es: "El modelo de dominio contiene únicamente reglas de negocio puras, sin importar NestJS ni bibliotecas de persistencia. La capa de aplicación orquesta casos de uso, mientras que los adaptadores (HTTP, WebSocket, MQTT) manejan la interacción con el exterior.",
      en: "The domain layer holds pure business rules, entirely decoupled from NestJS or database libraries. The application layer orchestrates use cases, while infrastructure adapters (HTTP, WebSocket, MQTT) handle external boundary transport.",
    },
    keyBenefit: {
      es: "El núcleo de negocio permanece agnóstico a frameworks, librerías y bases de datos; la infraestructura es un detalle en los bordes.",
      en: "The business core remains completely framework-agnostic; infrastructure remains a peripheral implementation detail.",
    },
    filePath: "src/modules/telemetry/architecture/layers.ts",
    code: `// 1. Core Domain: Reglas de negocio puras e invariantes
export class TelemetryRecord {
  constructor(
    public readonly nodeId: string,
    public readonly rssi: number,
    public readonly timestamp: Date = new Date(),
  ) {
    if (rssi > 0 || rssi < -140) {
      throw new Error('Out of range RSSI: ' + rssi);
    }
  }

  get isSignalDegraded(): boolean {
    return this.rssi < -110;
  }
}

// 2. Application Layer: Caso de uso orquestador
export class IngestTelemetryUseCase {
  constructor(private readonly repo: ITelemetryRepository) {}

  async execute(nodeId: string, rssi: number): Promise<TelemetryRecord> {
    const record = new TelemetryRecord(nodeId, rssi);
    await this.repo.persist(record);
    return record;
  }
}

// 3. Infrastructure Adapter: Controlador NestJS desacoplado
@Controller('telemetry')
export class TelemetryHttpAdapter {
  constructor(private readonly useCase: IngestTelemetryUseCase) {}

  @Post()
  async handle(@Body() body: IngestTelemetryDto) {
    return this.useCase.execute(body.nodeId, body.rssi);
  }
}`,
  },
];

export default function SolidArchitectureExplorer() {
  const { language } = usePortfolio();
  const isEs = language === "es";

  const [activePrincipleId, setActivePrincipleId] = useState<string>("srp");
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const activePrinciple =
    PRINCIPLES.find((p) => p.id === activePrincipleId) || PRINCIPLES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activePrinciple.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-16 pt-16 border-t border-zinc-900">
      {/* Section Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>
            {isEs
              ? "Principios de Diseño & Código Limpio"
              : "Design Principles & Clean Code"}
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          {isEs
            ? "Patrones de Arquitectura en Práctica"
            : "Architecture Patterns in Practice"}
        </h3>
        <p className="text-zinc-400 mt-2 max-w-2xl text-xs sm:text-sm">
          {isEs
            ? "Implementación real de principios SOLID y arquitectura por capas en TypeScript y NestJS. Estructurado para alta cohesión, bajo acoplamiento y testeabilidad exhaustiva."
            : "Concrete implementation of SOLID principles and layered architecture in TypeScript and NestJS. Engineered for high cohesion, loose coupling, and thorough testability."}
        </p>
      </div>

      {/* Principle Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
        {PRINCIPLES.map((principle) => {
          const isSelected = activePrincipleId === principle.id;
          return (
            <button
              key={principle.id}
              onClick={() => setActivePrincipleId(principle.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-mono transition-all shrink-0 cursor-pointer ${
                isSelected
                  ? "bg-zinc-800 border-emerald-400/80 text-white shadow-lg shadow-emerald-500/10"
                  : "bg-zinc-950/70 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black ${
                  isSelected
                    ? "bg-emerald-400 text-zinc-950"
                    : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {principle.letter}
              </span>
              <span className="font-semibold">{principle.shortName}</span>
            </button>
          );
        })}
      </div>

      {/* Principle Detail Spotlight Card */}
      <SpotlightCard
        spotlightColor="rgba(59, 130, 246, 0.12)"
        className="p-6 sm:p-8 border-zinc-800/80 bg-zinc-950/90"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Conceptual Overview & Impact */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between h-full">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-emerald-400 mb-3">
                <CheckCircle2 className="w-3 h-3" />
                <span>
                  {isEs
                    ? activePrinciple.contextTag.es
                    : activePrinciple.contextTag.en}
                </span>
              </div>

              <h4 className="text-xl font-bold text-white mb-2">
                {isEs
                  ? activePrinciple.fullName.es
                  : activePrinciple.fullName.en}
              </h4>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {isEs
                  ? activePrinciple.summary.es
                  : activePrinciple.summary.en}
              </p>
            </div>

            {/* Impact / Technical Benefit Box */}
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1.5">
              <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isEs ? "Beneficio en Producción" : "Production Benefit"}</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {isEs
                  ? activePrinciple.keyBenefit.es
                  : activePrinciple.keyBenefit.en}
              </p>
            </div>
          </div>

          {/* Right Column: Code Viewer */}
          <div className="lg:col-span-7 rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden shadow-2xl flex flex-col">
            {/* Code Window Header */}
            <div className="px-4 py-3 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-300 truncate">
                <FileCode className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate font-medium">
                  {activePrinciple.filePath}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-mono transition-colors shrink-0 cursor-pointer"
                  title={isExpanded ? (isEs ? "Contraer" : "Collapse") : (isEs ? "Ver completo" : "Expand")}
                >
                  {isExpanded ? (
                    <>
                      <Minimize2 className="w-3.5 h-3.5 text-blue-400" />
                      <span className="hidden sm:inline">{isEs ? "Contraer" : "Collapse"}</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-3.5 h-3.5 text-blue-400" />
                      <span className="hidden sm:inline">{isEs ? "Ver completo" : "Expand"}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-mono transition-colors shrink-0 cursor-pointer"
                title="Copiar código"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">
                      {isEs ? "¡Copiado!" : "Copied!"}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{isEs ? "Copiar" : "Copy"}</span>
                  </>
                )}
              </button>
              </div>
            </div>

            {/* Code Content with Line Numbers & Sleek Scroll */}
            <div
              className={`p-4 sm:p-5 font-mono text-xs overflow-auto custom-code-scroll bg-zinc-950/95 leading-relaxed transition-all duration-300 ${
                isExpanded ? "max-h-none" : "max-h-[380px]"
              }`}
            >
              <div className="table w-full">
                {activePrinciple.code.split("\n").map((line, idx) => (
                  <div key={idx} className="table-row hover:bg-zinc-900/40">
                    <span className="table-cell select-none pr-4 text-right text-[11px] text-zinc-600 font-mono w-7">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="table-cell font-mono text-zinc-200 text-[11px] sm:text-xs whitespace-pre">
                      {line || "\n"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll Hint & Quick Expand footer */}
            {!isExpanded && (
              <div className="px-4 py-2 bg-gradient-to-t from-zinc-950 via-zinc-900/60 to-transparent border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400 select-none">
                <span className="flex items-center gap-1.5 text-zinc-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {isEs ? "Rueda del ratón para explorar" : "Mouse wheel to explore"}
                </span>
                <button
                  onClick={() => setIsExpanded(true)}
                  className="text-emerald-400 hover:text-emerald-300 hover:underline cursor-pointer"
                >
                  {isEs ? "Ver código completo ↓" : "View full code ↓"}
                </button>
              </div>
            )}

            {/* Code Window Footer */}
            <div className="px-4 py-2 bg-zinc-900/40 border-t border-zinc-800 text-[10px] font-mono text-zinc-500 flex items-center justify-between">
              <span>TypeScript 5 • NestJS 11</span>
              <span className="text-emerald-400/80">Clean Code Standards</span>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
}
