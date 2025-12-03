// ============================================================================
// TOKENOMICS DATA - Web3TrustX (WTX)
// Source of Truth para toda la información del tokenomics
// ============================================================================

export interface TokenCategory {
  id: string;
  name: string;
  nameEs: string;
  percentage: number;
  tokens: number;
  color: string;
  colorLight: string;
  icon: string;
  cliff: string;
  cliffEs: string;
  vesting: string;
  vestingEs: string;
  burnMechanism?: string;
  burnMechanismEs?: string;
  objective: string;
  objectiveEs: string;
  details: string;
  detailsEs: string;
  phases?: Phase[];
  subAllocations?: SubAllocation[];
  releaseNotes?: string;
  releaseNotesEs?: string;
  governance?: string;
  governanceEs?: string;
}

export interface Phase {
  name: string;
  nameEs: string;
  duration: string;
  durationEs: string;
  percentage: number;
  tokens: number;
  mechanism: string;
  mechanismEs: string;
  notes?: string;
  notesEs?: string;
}

export interface SubAllocation {
  id: string;
  name: string;
  nameEs: string;
  percentage: number;
  tokens: number;
  description: string;
  descriptionEs: string;
  release: string;
  releaseEs: string;
}

export interface Principle {
  id: string;
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
}

export interface CirculationStat {
  id: string;
  label: string;
  labelEs: string;
  percentage: number;
  tokens: number;
  description: string;
  descriptionEs: string;
  categoryId: string;
}

export interface TokenomicsMilestone {
  id: string;
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
  date: Date;
  categoryId: string;
  tag: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  titleEs: string;
  date: Date;
  endDate?: Date;
  categoryId: string;
  type: 'unlock' | 'burn' | 'cliff' | 'tge' | 'phase';
  amount?: number;
  description: string;
  descriptionEs: string;
}

// ============================================================================
// DATOS GLOBALES
// ============================================================================
export const GLOBAL_DATA = {
  totalSupply: 1_000_000_000,
  tokenSymbol: 'WTX',
  tokenName: 'Web3TrustX',
  network: 'BNB Chain (BEP-20)',
  initialPrice: 0.00085,
  fdv: 850_000,
  initialLiquidity: 51_000,
  liquidityLockMonths: 24,
  initialCirculating: 18_750_000,
  initialCirculatingPercentage: 1.88,
  launchDate: new Date('2026-03-02'),
  liquidityPoolWTX: 30_000_000,
  liquidityPoolUSD: 51_000,
  liquidityPoolSplitUSD: {
    wtx: 25_500,
    bnb: 25_500,
  },
  initialAirdropPercentage: 0.35,
};

const tokensFromPercentage = (percentage: number): number => {
  return Math.round(GLOBAL_DATA.totalSupply * (percentage / 100));
};

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

// ============================================================================
// PRINCIPIOS Y MÉTRICAS INICIALES
// ============================================================================
export const TOKENOMICS_PRINCIPLES: Principle[] = [
  {
    id: 'stability',
    title: 'Technical resilience & market stability',
    titleEs: 'Solidez técnica y estabilidad de mercado',
    description:
      'Fixed 1B supply, programmed vesting models, locked liquidity and transparent cliffs protect price discovery from day one.',
    descriptionEs:
      'El supply fijo de 1B, los vestings programados, la liquidez bloqueada y los cliffs transparentes protegen la cotización desde el día uno.',
  },
  {
    id: 'deflation',
    title: 'Structural deflation & responsible usage',
    titleEs: 'Deflación estructural y uso responsable',
    description:
      'Ecosystem, community and security programs burn unused allocations in every cycle, keeping circulating growth slow and measurable.',
    descriptionEs:
      'Ecosistema, comunidad y seguridad queman los lotes no utilizados en cada ciclo, manteniendo un crecimiento circulante lento y medible.',
  },
  {
    id: 'transparency',
    title: 'Progressive decentralization & aligned incentives',
    titleEs: 'Transparencia y alineación de incentivos',
    description:
      'Multisig-controlled funds, auditable unlock calendars and DAO supervision ensure all stakeholders progress alongside product milestones.',
    descriptionEs:
      'Fondos controlados por multisig, calendarios auditables y supervisión DAO garantizan que cada actor avance al ritmo de los hitos del producto.',
  },
];

export const INITIAL_CIRCULATION: CirculationStat[] = [
  {
    id: 'airdrop-initial',
    label: 'Genesis Airdrop',
    labelEs: 'Airdrop génesis',
    percentage: 0.35,
    tokens: tokensFromPercentage(0.35),
    description: 'Activates the leaderboard with a measured 0.35% release at TGE.',
    descriptionEs: 'Activa el ranking con un 0,35% liberado en el TGE de forma controlada.',
    categoryId: 'community',
  },
  {
    id: 'seed-initial',
    label: 'Seed release (15%)',
    labelEs: 'Liberación Seed (15%)',
    percentage: 0.525,
    tokens: tokensFromPercentage(0.525),
    description: 'Strategic investors receive 15% of their position to support early liquidity.',
    descriptionEs: 'Los inversores estratégicos reciben el 15% de su posición para apoyar la liquidez inicial.',
    categoryId: 'seed',
  },
  {
    id: 'presale-initial',
    label: 'Public Presale (20%)',
    labelEs: 'Preventa pública (20%)',
    percentage: 1,
    tokens: tokensFromPercentage(1),
    description: 'Early community holders unlock 20% at launch; the rest follows a cliff and vesting.',
    descriptionEs: 'Los primeros holders comunitarios reciben el 20% al lanzamiento; el resto sigue cliff y vesting.',
    categoryId: 'presale',
  },
];

export const TOKENOMICS_MILESTONES: TokenomicsMilestone[] = [
  {
    id: 'tge',
    title: 'Token Generation Event',
    titleEs: 'Evento de Generación de Token',
    description: 'WTX launches on BNB Chain with 1.88% circulating supply and locked liquidity.',
    descriptionEs: 'WTX se lanza en BNB Chain con 1,88% en circulación y liquidez bloqueada.',
    date: GLOBAL_DATA.launchDate,
    categoryId: 'global',
    tag: 'TGE',
  },
  {
    id: 'airdrop-week-one',
    title: 'Community unlock cycle starts',
    titleEs: 'Inicio de ciclos comunitarios',
    description: 'TGE+7 activates the 14-day airdrop cadence with on-chain ranked rewards.',
    descriptionEs: 'TGE+7 activa la cadencia de 14 días para el airdrop con rankings on-chain.',
    date: addDays(GLOBAL_DATA.launchDate, 7),
    categoryId: 'community',
    tag: 'TGE+7',
  },
  {
    id: 'marketing-go-live',
    title: 'Marketing & Ops unlock',
    titleEs: 'Desbloqueo Marketing & Ops',
    description: 'Month 3 ends the treasury cliff and begins 24 months of linear releases.',
    descriptionEs: 'El mes 3 finaliza el cliff de tesorería e inicia 24 meses de liberación lineal.',
    date: addMonths(GLOBAL_DATA.launchDate, 3),
    categoryId: 'marketing',
    tag: 'Month 3',
  },
  {
    id: 'reserve-first-block',
    title: 'Reserve block unlocked',
    titleEs: 'Bloque de reserva desbloqueado',
    description: 'Month 6 releases the first 1% technical reserve block with re-lock rules.',
    descriptionEs: 'El mes 6 libera el primer bloque del 1% de la reserva técnica con reglas de rebloqueo.',
    date: addMonths(GLOBAL_DATA.launchDate, 6),
    categoryId: 'reserve',
    tag: 'Month 6',
  },
  {
    id: 'liquidity-unlock',
    title: 'Liquidity lock expiration',
    titleEs: 'Fin de bloqueo de liquidez',
    description: 'LP tokens remain locked for 24 months to guarantee AMM depth and anti-rug protection.',
    descriptionEs: 'Los LP tokens permanecen bloqueados 24 meses para garantizar profundidad y protección anti-rug.',
    date: addMonths(GLOBAL_DATA.launchDate, GLOBAL_DATA.liquidityLockMonths),
    categoryId: 'liquidity',
    tag: 'Month 24',
  },
];

// ============================================================================
// CATEGORÍAS DEL TOKEN
// ============================================================================
export const TOKEN_CATEGORIES: TokenCategory[] = [
  {
    id: 'ecosystem',
    name: 'Ecosystem',
    nameEs: 'Ecosistema',
    percentage: 30,
    tokens: tokensFromPercentage(30),
    color: '#00B5AD',
    colorLight: '#00D4C8',
    icon: '🌐',
    cliff: '0 months',
    cliffEs: '0 meses',
    vesting: '4 macro phases · 4 subphases · 14-day cycles',
    vestingEs: '4 macrofases · 4 subfases · ciclos de 14 días',
    burnMechanism: 'Day 13 of every cycle burns 100% of unused tokens',
    burnMechanismEs: 'El día 13 de cada ciclo se quema el 100% de los tokens no usados',
    objective: 'Fund roadmap execution, multi-chain expansion, audits, integrations and sustainability.',
    objectiveEs: 'Financiar la ejecución de roadmap, expansión multichain, auditorías, integraciones y sostenibilidad.',
    details:
      '300M WTX are released in sync with the official roadmap: 4 phases · 4 subphases · 5 technical cycles of 14 days each. Every cycle starts with an automatic release, operates exclusively for ecosystem milestones and burns the unused balance on day 13.',
    detailsEs:
      '300M WTX se liberan en sincronía con el roadmap oficial: 4 fases · 4 subfases · 5 ciclos técnicos de 14 días cada uno. Cada ciclo libera automáticamente su lote, se usa solo para hitos del ecosistema y quema el sobrante en el día 13.',
    releaseNotes:
      'Phase 1 uses a progressive ramp (10% → 30% per cycle) to avoid inflation; phases 2-4 become linear across their subphases. Unlocks are programmatic, on-chain and fully auditable.',
    releaseNotesEs:
      'La Fase 1 aplica una rampa progresiva (10% → 30% por ciclo) para evitar inflación; las fases 2-4 se vuelven lineales a lo largo de sus subfases. Los desbloqueos son programáticos, on-chain y auditables.',
    governance:
      'Technical multisig oversees deployments, while DAO governance validates burns and major reallocations.',
    governanceEs:
      'Un multisig técnico supervisa los despliegues y la gobernanza DAO valida quemas y reasignaciones mayores.',
    phases: [
      {
        name: 'Phase 1 · Genesis Stability',
        nameEs: 'Fase 1 · Estabilidad Génesis',
        duration: '40 weeks (4 subphases)',
        durationEs: '40 semanas (4 subfases)',
        percentage: 25,
        tokens: tokensFromPercentage(30 * 0.25),
        mechanism: 'Progressive unlock (10→30% per cycle) to avoid early pressure.',
        mechanismEs: 'Desbloqueo progresivo (10→30% por ciclo) para evitar presión temprana.',
        notes: 'Focus on infra, audits and TrustX core modules.',
        notesEs: 'Foco en infraestructura, auditorías y módulos core de TrustX.',
      },
      {
        name: 'Phase 2 · Expansion',
        nameEs: 'Fase 2 · Expansión',
        duration: '40 weeks',
        durationEs: '40 semanas',
        percentage: 25,
        tokens: tokensFromPercentage(30 * 0.25),
        mechanism: 'Linear unlock powering multichain deployments and integrations.',
        mechanismEs: 'Desbloqueo lineal que impulsa despliegues multichain e integraciones.',
      },
      {
        name: 'Phase 3 · Trust Fabric',
        nameEs: 'Fase 3 · Trust Fabric',
        duration: '40 weeks',
        durationEs: '40 semanas',
        percentage: 25,
        tokens: tokensFromPercentage(30 * 0.25),
        mechanism: 'Focus on security layers, TrustXData and institutional tooling.',
        mechanismEs: 'Foco en capas de seguridad, TrustXData y herramientas institucionales.',
      },
      {
        name: 'Phase 4 · Sustainability',
        nameEs: 'Fase 4 · Sostenibilidad',
        duration: '40 weeks+',
        durationEs: '40 semanas+',
        percentage: 25,
        tokens: tokensFromPercentage(30 * 0.25),
        mechanism: 'Long-tail support for ecosystem maintenance and DAO services.',
        mechanismEs: 'Soporte de largo plazo para mantenimiento del ecosistema y servicios DAO.',
      },
    ],
  },
  {
    id: 'community',
    name: 'Community',
    nameEs: 'Comunidad',
    percentage: 28,
    tokens: tokensFromPercentage(28),
    color: '#00D4FF',
    colorLight: '#4DE5FF',
    icon: '👥',
    cliff: 'Program-specific',
    cliffEs: 'Según programa',
    vesting: 'Mirrors ecosystem cadence (14-day cycles & subphase scoring)',
    vestingEs: 'Replica la cadencia del ecosistema (ciclos de 14 días y subfases)',
    burnMechanism: 'Unclaimed rewards and unused cycle allocations are fully burned.',
    burnMechanismEs: 'Las recompensas no reclamadas y los lotes no usados se queman por completo.',
    objective: 'Reward real users, secure the network, incentivize liquidity and long-term loyalty.',
    objectiveEs: 'Recompensar usuarios reales, asegurar la red, incentivar liquidez y fidelidad a largo plazo.',
    details:
      'Five strategic programs (airdrop, participation, security, LP mining, loyalty) follow the same 14-day cadence as the ecosystem fund. Each program validates activity, burns leftovers and never accumulates pending allocations.',
    detailsEs:
      'Cinco programas estratégicos (airdrop, participación, seguridad, LP mining y fidelización) siguen la misma cadencia de 14 días que el fondo de ecosistema. Cada programa valida actividad, quema sobrantes y nunca acumula pendientes.',
    releaseNotes:
      'Airdrop cycles start at D+7 to avoid overlapping with TGE operations. Participation, LP and loyalty pools only release tokens if the corresponding app/module is live.',
    releaseNotesEs:
      'Los ciclos de airdrop inician en D+7 para no solaparse con el TGE. Participación, LP y fidelización solo liberan tokens si la app/módulo correspondiente está activo.',
    subAllocations: [
      {
        id: 'airdrop',
        name: 'Airdrop Program',
        nameEs: 'Programa Airdrop',
        percentage: 7,
        tokens: tokensFromPercentage(7),
        description:
          '0.35% unlocks at TGE to seed rankings; the remaining supply is split into two 25-cycle phases with 4% per cycle (≈1.2M WTX).',
        descriptionEs:
          'El 0,35% se libera en el TGE para iniciar rankings; el resto se divide en dos fases de 25 ciclos con 4% por ciclo (≈1,2M WTX).',
        release: 'Cycles run every 14 days starting on D+7; unused allocations burn automatically.',
        releaseEs: 'Los ciclos se ejecutan cada 14 días desde D+7; los lotes no asignados se queman automáticamente.',
      },
      {
        id: 'participation',
        name: 'Participation & Activities',
        nameEs: 'Participación & Actividades',
        percentage: 11,
        tokens: tokensFromPercentage(11),
        description: 'Rewards sustained usage of TrustX apps with dynamic scoring and no carry-over between cycles.',
        descriptionEs: 'Premia el uso sostenido de las apps TrustX con puntuación dinámica y sin arrastres entre ciclos.',
        release: '14-day cycles per subphase; Subphase 1.1 applies a progressive ramp, the rest are linear (20% per cycle).',
        releaseEs: 'Ciclos de 14 días por subfase; la Subfase 1.1 aplica rampa progresiva y el resto son lineales (20% por ciclo).',
      },
      {
        id: 'security',
        name: 'Security & Reports',
        nameEs: 'Seguridad & Reportes',
        percentage: 4,
        tokens: tokensFromPercentage(4),
        description: 'Official bounty program for vulnerabilities, alerts and TrustXShield reports with hybrid validation.',
        descriptionEs: 'Programa oficial de recompensas por vulnerabilidades, alertas y reportes TrustXShield con validación híbrida.',
        release: 'Unlocked at the end of every 10-week subphase; unused balances burn and top bounty per user is 300k WTX.',
        releaseEs: 'Se desbloquea al finalizar cada subfase de 10 semanas; los remanentes se queman y el tope por usuario es 300k WTX.',
      },
      {
        id: 'lp-mining',
        name: 'LP Mining',
        nameEs: 'LP Mining',
        percentage: 3,
        tokens: tokensFromPercentage(3),
        description: 'Sustainable liquidity incentives with either linear or decreasing models across ~80 cycles.',
        descriptionEs: 'Incentivos de liquidez sostenibles con modelos lineales o decrecientes a lo largo de ~80 ciclos.',
        release: 'Rewards are issued only while pools need depth; unused tokens are burned or re-locked.',
        releaseEs: 'Las recompensas se emiten solo mientras los pools necesiten profundidad; los tokens sobrantes se queman o rebloquean.',
      },
      {
        id: 'loyalty',
        name: 'Loyalty & Enduring Rewards',
        nameEs: 'Fidelización & Recompensa Perdurable',
        percentage: 3,
        tokens: tokensFromPercentage(3),
        description: 'Long-term missions, TrustXHub achievements, holding programs and milestone-based drops.',
        descriptionEs: 'Misiones de largo plazo, logros en TrustXHub, programas de holding y drops basados en hitos.',
        release: 'Follows the same 14-day review as participation; rewards are granted only to verified long-term users.',
        releaseEs: 'Sigue la misma revisión de 14 días que participación; las recompensas solo se otorgan a usuarios verificados de largo plazo.',
      },
    ],
  },
  {
    id: 'team',
    name: 'Team & Advisors',
    nameEs: 'Equipo & Asesores',
    percentage: 12.5,
    tokens: tokensFromPercentage(12.5),
    color: '#FFD700',
    colorLight: '#FFE44D',
    icon: '👔',
    cliff: '24 months',
    cliffEs: '24 meses',
    vesting: '72 months linear after cliff (96 months total)',
    vestingEs: '72 meses lineal tras el cliff (96 meses totales)',
    objective: 'Secure long-term talent, advisors and mission-critical contributors.',
    objectiveEs: 'Asegurar talento, asesores y contribuyentes críticos a largo plazo.',
    details:
      'Tokens remain fully locked for 24 months. Afterwards they vest monthly across 72 months, audited via designated wallets. Usage for LP, sales or speculation is forbidden.',
    detailsEs:
      'Los tokens permanecen bloqueados 24 meses. Después se liberan mensualmente durante 72 meses, auditados mediante wallets designadas. Su uso para LP, ventas o especulación está prohibido.',
    governance:
      'Releases are validated through multisig plus third-party audits; yearly contribution reviews keep vesting rights active.',
    governanceEs:
      'Las liberaciones se validan mediante multisig y auditorías externas; revisiones anuales de contribución mantienen los derechos de vesting.',
  },
  {
    id: 'seed',
    name: 'Seed Round',
    nameEs: 'Ronda Seed',
    percentage: 3.5,
    tokens: tokensFromPercentage(3.5),
    color: '#9B59B6',
    colorLight: '#B87ACC',
    icon: '🌱',
    cliff: '3 months after TGE',
    cliffEs: '3 meses después del TGE',
    vesting: '15% TGE + 3-month cliff + 9-month linear vesting',
    vestingEs: '15% TGE + cliff de 3 meses + vesting lineal de 9 meses',
    objective: 'Bootstrap product development, infrastructure and strategic alliances.',
    objectiveEs: 'Impulsar desarrollo del producto, infraestructura y alianzas estratégicas.',
    details:
      'Institutional partners receive 15% at launch. The remaining 85% unlocks monthly across nine releases after a three-month cliff. Tokens cannot form coordinated sell walls, LP positions or market-making desks.',
    detailsEs:
      'Los socios institucionales reciben 15% al lanzamiento. El 85% restante se libera mensualmente en nueve entregas tras un cliff de tres meses. Los tokens no pueden formar muros de venta coordinados, posiciones LP ni mesas de market-making.',
    releaseNotes:
      'Wallets are monitored on-chain with full vesting dashboards and compliance checks.',
    releaseNotesEs:
      'Las wallets se monitorizan on-chain con tableros de vesting y controles de cumplimiento.',
  },
  {
    id: 'presale',
    name: 'Public Presale',
    nameEs: 'Preventa Pública',
    percentage: 5,
    tokens: tokensFromPercentage(5),
    color: '#2ECC71',
    colorLight: '#58D68D',
    icon: '🎯',
    cliff: '2 months',
    cliffEs: '2 meses',
    vesting: '20% TGE + 2-month cliff + 4-month linear vesting',
    vestingEs: '20% TGE + cliff de 2 meses + vesting lineal de 4 meses',
    objective: 'Open community participation before launch to decentralize supply.',
    objectiveEs: 'Permitir participación comunitaria previa al lanzamiento y descentralizar el supply.',
    details:
      'Users gain 20% liquidity at TGE, while the remaining 80% unlocks evenly over four months after a two-month cliff. Anti-sybil controls, purchase caps and optional whitelists maintain fairness.',
    detailsEs:
      'Los usuarios obtienen 20% de liquidez en el TGE y el 80% restante se libera uniformemente durante cuatro meses tras un cliff de dos meses. Controles anti-sybil, límites de compra y whitelists opcionales mantienen la equidad.',
  },
  {
    id: 'marketing',
    name: 'Marketing & Operations',
    nameEs: 'Marketing & Operaciones',
    percentage: 7,
    tokens: tokensFromPercentage(7),
    color: '#E67E22',
    colorLight: '#F39C12',
    icon: '📢',
    cliff: '3 months',
    cliffEs: '3 meses',
    vesting: '24-month linear release after cliff',
    vestingEs: 'Liberación lineal de 24 meses tras el cliff',
    burnMechanism: 'Unused quarterly budgets return to multisig for re-lock or burn.',
    burnMechanismEs: 'Los presupuestos trimestrales no usados vuelven al multisig para rebloqueo o quema.',
    objective: 'Fuel brand expansion, infrastructure upkeep, partnerships and global adoption.',
    objectiveEs: 'Impulsar expansión de marca, infraestructura, alianzas y adopción global.',
    details:
      'After a 3-month observation period, tokens unlock monthly for 24 months covering infra, marketing, partnerships and operations. Every spend requires documentation, KPIs and quarterly public reports.',
    detailsEs:
      'Tras 3 meses de observación, los tokens se liberan mensualmente durante 24 meses para infraestructura, marketing, alianzas y operaciones. Cada gasto requiere documentación, KPIs e informes públicos trimestrales.',
  },
  {
    id: 'reserve',
    name: 'Technical Reserve',
    nameEs: 'Reserva Técnica',
    percentage: 11,
    tokens: tokensFromPercentage(11),
    color: '#7F8C8D',
    colorLight: '#95A5A6',
    icon: '🔒',
    cliff: '6 months',
    cliffEs: '6 meses',
    vesting: 'Blocks of 1% unlocked every 3 months after month 6',
    vestingEs: 'Bloques de 1% liberados cada 3 meses después del mes 6',
    objective: 'Guarantee resilience, security response and multichain expansion without impacting supply.',
    objectiveEs: 'Garantizar resiliencia, respuesta a incidentes y expansión multichain sin impactar el supply.',
    details:
      'Each unlock is limited to 1% of total supply. If a block is not fully used, the remainder is re-locked to the end of the schedule; balances under 10% are burned to keep the model deflationary.',
    detailsEs:
      'Cada desbloqueo se limita al 1% del supply total. Si un bloque no se usa por completo, el remanente se rebloquea al final del calendario; saldos menores al 10% se queman para mantener el modelo deflacionario.',
    releaseNotes:
      'Usage requires technical justification, multisig approval and annual third-party audits.',
    releaseNotesEs:
      'Su uso requiere justificación técnica, aprobación multisig y auditorías externas anuales.',
  },
  {
    id: 'liquidity',
    name: 'Liquidity',
    nameEs: 'Liquidez',
    percentage: 3,
    tokens: tokensFromPercentage(3),
    color: '#3498DB',
    colorLight: '#5DADE2',
    icon: '💧',
    cliff: '24-month lock',
    cliffEs: 'Bloqueo de 24 meses',
    vesting: 'Fully locked in AMM LP tokens (WTX/BNB)',
    vestingEs: 'Totalmente bloqueado en LPs del AMM (WTX/BNB)',
    objective: 'Provide deep, manipulation-resistant liquidity from minute one.',
    objectiveEs: 'Proporcionar liquidez profunda y resistente a manipulaciones desde el minuto uno.',
    details:
      '30M WTX pair with $25.5k in BNB to form a ~$51k pool (≈6% FDV). LP tokens are locked for 24 months, cannot be redeployed or used as incentives, and are managed via multisig with emergency-only migration rights.',
    detailsEs:
      '30M WTX se emparejan con $25,5k en BNB para formar un pool de ~$51k (≈6% del FDV). Los LP tokens quedan bloqueados 24 meses, no pueden redistribuirse ni usarse como incentivos y se gestionan vía multisig con derechos de migración solo por emergencia.',
  },
];

// ============================================================================
// EVENTOS DEL CALENDARIO
// ============================================================================
export const generateCalendarEvents = (): CalendarEvent[] => {
  const events: CalendarEvent[] = [];
  const launchDate = GLOBAL_DATA.launchDate;

  // Major events
  events.push({
    id: 'tge',
    title: 'Token Generation Event (TGE)',
    titleEs: 'Evento de Generación de Token (TGE)',
    date: launchDate,
    categoryId: 'global',
    type: 'tge',
    description: 'Official WTX launch on BNB Chain with 1.88% circulating supply.',
    descriptionEs: 'Lanzamiento oficial de WTX en BNB Chain con 1,88% de circulante.',
  });

  events.push({
    id: 'airdrop-kickoff',
    title: 'Community cycles start',
    titleEs: 'Inicio de ciclos comunitarios',
    date: addDays(launchDate, 7),
    categoryId: 'community',
    type: 'phase',
    description: 'Day +7 opens the first 14-day airdrop cycle with ranked rewards.',
    descriptionEs: 'El día +7 abre el primer ciclo de 14 días del airdrop con recompensas por ranking.',
  });

  events.push({
    id: 'liquidity-lock-end',
    title: 'Liquidity lock expiration',
    titleEs: 'Fin del bloqueo de liquidez',
    date: addMonths(launchDate, GLOBAL_DATA.liquidityLockMonths),
    categoryId: 'liquidity',
    type: 'cliff',
    description: 'LP tokens remain locked for 24 months to guarantee AMM depth.',
    descriptionEs: 'Los LP tokens permanecen bloqueados 24 meses para garantizar profundidad en el AMM.',
  });

  // Ecosystem unlocks (sample first year)
  const ecosystemCycles = 96; // 4 years · 14-day cadence
  const ecosystemPerCycle = tokensFromPercentage(30) / ecosystemCycles;
  for (let i = 0; i < Math.min(ecosystemCycles, 26); i++) {
    const cycleDate = addDays(launchDate, i * 14);
    events.push({
      id: `eco-unlock-${i}`,
      title: `Ecosystem Unlock Cycle ${i + 1}`,
      titleEs: `Desbloqueo Ecosistema Ciclo ${i + 1}`,
      date: cycleDate,
      categoryId: 'ecosystem',
      type: 'unlock',
      amount: Math.round(ecosystemPerCycle),
      description: `~${(ecosystemPerCycle / 1_000_000).toFixed(2)}M WTX released for roadmap milestones`,
      descriptionEs: `~${(ecosystemPerCycle / 1_000_000).toFixed(2)}M WTX liberados para hitos de roadmap`,
    });

    const burnDate = addDays(cycleDate, 13);
    events.push({
      id: `eco-burn-${i}`,
      title: `Ecosystem Burn Cycle ${i + 1}`,
      titleEs: `Quema Ecosistema Ciclo ${i + 1}`,
      date: burnDate,
      categoryId: 'ecosystem',
      type: 'burn',
      description: 'Unused portion burned (deflationary control).',
      descriptionEs: 'Se quema el remanente no utilizado (control deflacionario).',
    });
  }

  // Team cliff (24 months)
  events.push({
    id: 'team-cliff',
    title: 'Team cliff ends',
    titleEs: 'Fin de cliff del equipo',
    date: addMonths(launchDate, 24),
    categoryId: 'team',
    type: 'cliff',
    description: 'Team & advisors start their 72-month linear vesting.',
    descriptionEs: 'Equipo y asesores inician su vesting lineal de 72 meses.',
  });

  // Seed vesting (after 3-month cliff)
  const seedMonthlyAmount = Math.round((tokensFromPercentage(3.5) * 0.85) / 9);
  for (let m = 0; m < 9; m++) {
    events.push({
      id: `seed-vest-${m + 1}`,
      title: `Seed vesting month ${m + 1}`,
      titleEs: `Vesting Seed mes ${m + 1}`,
      date: addMonths(launchDate, 3 + m),
      categoryId: 'seed',
      type: 'unlock',
      amount: seedMonthlyAmount,
      description: 'Monthly unlock after cliff (85% remainder).',
      descriptionEs: 'Desbloqueo mensual tras el cliff (85% restante).',
    });
  }

  // Presale vesting (after 2-month cliff, 4 months)
  const presaleMonthlyAmount = Math.round((tokensFromPercentage(5) * 0.8) / 4);
  for (let m = 0; m < 4; m++) {
    events.push({
      id: `presale-vest-${m + 1}`,
      title: `Presale vesting month ${m + 1}`,
      titleEs: `Vesting Preventa mes ${m + 1}`,
      date: addMonths(launchDate, 2 + m),
      categoryId: 'presale',
      type: 'unlock',
      amount: presaleMonthlyAmount,
      description: 'Monthly unlock from the remaining 80% allocation.',
      descriptionEs: 'Desbloqueo mensual del 80% restante de la asignación.',
    });
  }

  // Marketing & Operations (24 months after 3-month cliff)
  const marketingMonthlyAmount = Math.round(tokensFromPercentage(7) / 24);
  for (let m = 0; m < 24; m++) {
    events.push({
      id: `marketing-unlock-${m + 1}`,
      title: `Marketing unlock ${m + 1}`,
      titleEs: `Desbloqueo Marketing ${m + 1}`,
      date: addMonths(launchDate, 3 + m),
      categoryId: 'marketing',
      type: 'unlock',
      amount: marketingMonthlyAmount,
      description: 'Budget released for infrastructure, growth and partnerships.',
      descriptionEs: 'Presupuesto liberado para infraestructura, crecimiento y alianzas.',
    });
  }

  // Technical reserve blocks (1% every 3 months after month 6)
  const reserveBlockAmount = tokensFromPercentage(1);
  for (let block = 0; block < 11; block++) {
    events.push({
      id: `reserve-block-${block + 1}`,
      title: `Reserve block ${block + 1}`,
      titleEs: `Bloque de reserva ${block + 1}`,
      date: addMonths(launchDate, 6 + block * 3),
      categoryId: 'reserve',
      type: 'unlock',
      amount: reserveBlockAmount,
      description: 'Maximum 1% of supply unlocked for technical contingencies.',
      descriptionEs: 'Se desbloquea como máximo 1% del supply para contingencias técnicas.',
    });
  }

  return events.sort((a, b) => a.date.getTime() - b.date.getTime());
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
export const formatTokenAmount = (amount: number): string => {
  if (amount >= 1_000_000_000) {
    return `${(amount / 1_000_000_000).toFixed(2)}B`;
  }
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(2)}M`;
  }
  if (amount >= 1_000) {
    return `${(amount / 1_000).toFixed(2)}K`;
  }
  return amount.toString();
};

export const formatUSD = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getCategoryById = (id: string): TokenCategory | undefined => {
  return TOKEN_CATEGORIES.find(cat => cat.id === id);
};
