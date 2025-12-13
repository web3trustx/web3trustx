'use client';

import { useState } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

interface Endpoint {
  id: string;
  method: 'GET' | 'POST';
  route: string;
  description: string;
  category: string;
  parameters: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
  response: string;
  codeExamples: {
    javascript: string;
    python: string;
    csharp: string;
  };
}

const endpoints: Endpoint[] = [
  {
    id: 'token-metadata',
    method: 'GET',
    route: '/beta/evm/:chain/:address/metadata',
    description: 'Get token metadata including name, symbol, decimals, and basic information',
    category: 'tokens',
    parameters: [
      { name: 'chain', type: 'string', required: true, description: 'Blockchain network (bsc, ethereum)' },
      { name: 'address', type: 'string', required: true, description: 'Token contract address' },
    ],
    response: `{
  "success": true,
  "data": {
    "address": "0x55d398326f99059ff775485246999027b3197955",
    "name": "Tether USD",
    "symbol": "USDT",
    "decimals": 18,
    "totalSupply": "26625413040.487393470854834021",
    "chain": "bsc"
  }
}`,
    codeExamples: {
      javascript: `const response = await fetch(
  'https://api.web3trustx.com/beta/evm/bsc/0x55d398...b3197955/metadata'
);

const data = await response.json();
console.log(data);`,
      python: `import requests

url = 'https://api.web3trustx.com/beta/evm/bsc/0x55d398...b3197955/metadata'

response = requests.get(url)
data = response.json()
print(data)`,
      csharp: `var client = new HttpClient();

var response = await client.GetStringAsync(
    "https://api.web3trustx.com/beta/evm/bsc/0x55d398...b3197955/metadata"
);

Console.WriteLine(response);`,
    },
  },
  {
    id: 'token-price',
    method: 'GET',
    route: '/beta/evm/:chain/:address/price',
    description: 'Get current token price in USD with market data',
    category: 'tokens',
    parameters: [
      { name: 'chain', type: 'string', required: true, description: 'Blockchain network (bsc, ethereum)' },
      { name: 'address', type: 'string', required: true, description: 'Token contract address' },
    ],
    response: `{
  "success": true,
  "data": {
    "address": "0x55d398326f99059ff775485246999027b3197955",
    "priceUSD": "1.0003",
    "priceChange24h": "0.02",
    "marketCap": "26641789123.45",
    "chain": "bsc"
  }
}`,
    codeExamples: {
      javascript: `const response = await fetch(
  'https://api.web3trustx.com/beta/evm/bsc/0x55d398...b3197955/price'
);

const data = await response.json();
console.log(data);`,
      python: `import requests

url = 'https://api.web3trustx.com/beta/evm/bsc/0x55d398...b3197955/price'

response = requests.get(url)
data = response.json()
print(data)`,
      csharp: `var client = new HttpClient();

var response = await client.GetStringAsync(
    "https://api.web3trustx.com/beta/evm/bsc/0x55d398...b3197955/price"
);

Console.WriteLine(response);`,
    },
  },
  {
    id: 'token-liquidity',
    method: 'GET',
    route: '/beta/evm/:chain/:address/liquidity',
    description: 'Get token liquidity information across DEXs',
    category: 'tokens',
    parameters: [
      { name: 'chain', type: 'string', required: true, description: 'Blockchain network (bsc, ethereum)' },
      { name: 'address', type: 'string', required: true, description: 'Token contract address' },
    ],
    response: `{
  "success": true,
  "data": {
    "address": "0x55d398326f99059ff775485246999027b3197955",
    "totalLiquidityUSD": "1523456789.12",
    "pools": [
      {
        "dex": "PancakeSwap",
        "liquidityUSD": "987654321.00",
        "pairAddress": "0xabc..."
      }
    ],
    "chain": "bsc"
  }
}`,
    codeExamples: {
      javascript: `const response = await fetch(
  'https://api.web3trustx.com/beta/evm/bsc/0x55d398...b3197955/liquidity'
);

const data = await response.json();
console.log(data);`,
      python: `import requests

url = 'https://api.web3trustx.com/beta/evm/bsc/0x55d398...b3197955/liquidity'

response = requests.get(url)
data = response.json()
print(data)`,
      csharp: `var client = new HttpClient();

var response = await client.GetStringAsync(
    "https://api.web3trustx.com/beta/evm/bsc/0x55d398...b3197955/liquidity"
);

Console.WriteLine(response);`,
    },
  },
  {
    id: 'token-volume',
    method: 'GET',
    route: '/beta/evm/:chain/:address/volume',
    description: 'Get 24h trading volume and transaction metrics',
    category: 'tokens',
    parameters: [
      { name: 'chain', type: 'string', required: true, description: 'Blockchain network (bsc, ethereum)' },
      { name: 'address', type: 'string', required: true, description: 'Token contract address' },
    ],
    response: `{
  "success": true,
  "data": {
    "address": "0x55d398326f99059ff775485246999027b3197955",
    "volume24hUSD": "456789012.34",
    "transactions24h": 125847,
    "buys24h": 67432,
    "sells24h": 58415,
    "chain": "bsc"
  }
}`,
    codeExamples: {
      javascript: `const response = await fetch(
  'https://api.web3trustx.com/beta/evm/bsc/0x55d398...b3197955/volume'
);

const data = await response.json();
console.log(data);`,
      python: `import requests

url = 'https://api.web3trustx.com/beta/evm/bsc/0x55d398...b3197955/volume'

response = requests.get(url)
data = response.json()
print(data)`,
      csharp: `var client = new HttpClient();

var response = await client.GetStringAsync(
    "https://api.web3trustx.com/beta/evm/bsc/0x55d398...b3197955/volume"
);

Console.WriteLine(response);`,
    },
  },
  {
    id: 'token-holders',
    method: 'GET',
    route: '/beta/evm/:chain/:address/holders',
    description: 'Get token holder count and distribution statistics',
    category: 'tokens',
    parameters: [
      { name: 'chain', type: 'string', required: true, description: 'Blockchain network (bsc, ethereum)' },
      { name: 'address', type: 'string', required: true, description: 'Token contract address' },
    ],
    response: `{
  "success": true,
  "data": {
    "address": "0x55d398326f99059ff775485246999027b3197955",
    "totalHolders": 5847291,
    "top10HoldersPercent": "45.23",
    "top50HoldersPercent": "67.89",
    "chain": "bsc"
  }
}`,
    codeExamples: {
      javascript: `const response = await fetch(
  'https://api.web3trustx.com/beta/evm/bsc/0x55d398...b3197955/holders'
);

const data = await response.json();
console.log(data);`,
      python: `import requests

url = 'https://api.web3trustx.com/beta/evm/bsc/0x55d398...b3197955/holders'

response = requests.get(url)
data = response.json()
print(data)`,
      csharp: `var client = new HttpClient();

var response = await client.GetStringAsync(
    "https://api.web3trustx.com/beta/evm/bsc/0x55d398...b3197955/holders"
);

Console.WriteLine(response);`,
    },
  },
  {
    id: 'token-scan',
    method: 'GET',
    route: '/beta/evm/:chain/:address/scan',
    description: 'Comprehensive token security scan with risk analysis',
    category: 'security',
    parameters: [
      { name: 'chain', type: 'string', required: true, description: 'Blockchain network (bsc, ethereum)' },
      { name: 'address', type: 'string', required: true, description: 'Token contract address' },
    ],
    response: `{
  "success": true,
  "data": {
    "address": "0x55d398326f99059ff775485246999027b3197955",
    "riskScore": 15,
    "riskLevel": "low",
    "contractVerified": true,
    "honeypot": false,
    "canSell": true,
    "ownershipRenounced": true,
    "liquidityLocked": true,
    "warnings": [],
    "chain": "bsc"
  }
}`,
    codeExamples: {
      javascript: `const response = await fetch(
  'https://api.web3trustx.com/beta/evm/bsc/0x55d398...b3197955/scan'
);

const data = await response.json();
console.log(data);`,
      python: `import requests

url = 'https://api.web3trustx.com/beta/evm/bsc/0x55d398...b3197955/scan'

response = requests.get(url)
data = response.json()
print(data)`,
      csharp: `var client = new HttpClient();

var response = await client.GetStringAsync(
    "https://api.web3trustx.com/beta/evm/bsc/0x55d398...b3197955/scan"
);

Console.WriteLine(response);`,
    },
  },
];

export default function APIDocumentation() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState<'javascript' | 'python' | 'csharp'>('javascript');

  const categories = [
    { id: 'all', label: t.trustxdataApi.documentation.categories.all },
    { id: 'contracts', label: t.trustxdataApi.documentation.categories.contracts },
    { id: 'tokens', label: t.trustxdataApi.documentation.categories.tokens },
    { id: 'wallets', label: t.trustxdataApi.documentation.categories.wallets },
    { id: 'security', label: t.trustxdataApi.documentation.categories.security },
  ];

  const filteredEndpoints = endpoints.filter(endpoint => {
    const matchesCategory = selectedCategory === 'all' || endpoint.category === selectedCategory;
    const matchesSearch = endpoint.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          endpoint.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-3">{t.trustxdataApi.documentation.title}</h2>
        <p className="text-gray-400">{t.trustxdataApi.documentation.subtitle}</p>
      </div>

      {/* Search and Filter */}
      <div className="card-cyber p-6">
        <input
          type="text"
          placeholder={t.trustxdataApi.documentation.search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 bg-dark-lighter border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors mb-4"
        />

        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Endpoints List */}
      <div className="space-y-4">
        {filteredEndpoints.map((endpoint, index) => (
          <motion.div
            key={endpoint.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="card-cyber overflow-hidden"
          >
            <button
              onClick={() => setExpandedEndpoint(expandedEndpoint === endpoint.id ? null : endpoint.id)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-4 text-left">
                <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  endpoint.method === 'GET' ? 'bg-green-500/20 text-green-500' : 'bg-blue-500/20 text-blue-500'
                }`}>
                  {endpoint.method}
                </span>
                <div>
                  <code className="text-primary font-mono text-sm">{endpoint.route}</code>
                  <p className="text-gray-400 text-sm mt-1">{endpoint.description}</p>
                </div>
              </div>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                  expandedEndpoint === endpoint.id ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <AnimatePresence>
              {expandedEndpoint === endpoint.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-white/10"
                >
                  <div className="p-6 space-y-6">
                    {/* Parameters */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">
                        {t.trustxdataApi.documentation.endpoint.parameters}
                      </h4>
                      <div className="space-y-2">
                        {endpoint.parameters.map(param => (
                          <div key={param.name} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                            <code className="text-primary font-mono text-sm">{param.name}</code>
                            <span className={`px-2 py-0.5 rounded text-xs ${
                              param.required ? 'bg-red-500/20 text-red-500' : 'bg-gray-500/20 text-gray-400'
                            }`}>
                              {param.required ? t.trustxdataApi.documentation.endpoint.required : t.trustxdataApi.documentation.endpoint.optional}
                            </span>
                            <span className="text-gray-400 text-sm">{param.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Response Example */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">
                        {t.trustxdataApi.documentation.endpoint.response}
                      </h4>
                      <div className="relative">
                        <pre className="bg-dark-lighter p-4 rounded-lg overflow-x-auto">
                          <code className="text-sm text-gray-300">{endpoint.response}</code>
                        </pre>
                        <button
                          onClick={() => copyToClipboard(endpoint.response)}
                          className="absolute top-2 right-2 p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                          title="Copy"
                        >
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Code Examples */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">
                        {t.trustxdataApi.documentation.endpoint.codeExamples}
                      </h4>
                      <div className="flex gap-2 mb-3">
                        {(['javascript', 'python', 'csharp'] as const).map(lang => (
                          <button
                            key={lang}
                            onClick={() => setSelectedLang(lang)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                              selectedLang === lang
                                ? 'bg-primary text-white'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                            }`}
                          >
                            {lang === 'javascript' ? 'JavaScript' : lang === 'python' ? 'Python' : 'C#'}
                          </button>
                        ))}
                      </div>
                      <div className="relative">
                        <pre className="bg-dark-lighter p-4 rounded-lg overflow-x-auto">
                          <code className="text-sm text-gray-300">{endpoint.codeExamples[selectedLang]}</code>
                        </pre>
                        <button
                          onClick={() => copyToClipboard(endpoint.codeExamples[selectedLang])}
                          className="absolute top-2 right-2 p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                          title="Copy"
                        >
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Try It Button */}
                    <button className="btn-primary w-full">
                      {t.trustxdataApi.documentation.endpoint.tryIt}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {filteredEndpoints.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No endpoints found matching your search.</p>
        </div>
      )}
    </div>
  );
}
