// Mock axios for Jest tests to handle ES module compatibility
const mockAxiosInstance = {
  get: jest.fn(() => Promise.resolve({ data: { success: false, user: null } })),
  post: jest.fn(() => Promise.resolve({ data: { success: false } })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({ data: {} })),
  patch: jest.fn(() => Promise.resolve({ data: {} })),
  interceptors: {
    request: { use: jest.fn(), eject: jest.fn() },
    response: { use: jest.fn(), eject: jest.fn() }
  }
};

const mockAxios = {
  create: jest.fn(() => mockAxiosInstance),
  get: jest.fn(() => Promise.resolve({ data: { success: false, user: null } })),
  post: jest.fn(() => Promise.resolve({ data: { success: false } })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({ data: {} })),
  patch: jest.fn(() => Promise.resolve({ data: {} })),
  interceptors: {
    request: { use: jest.fn(), eject: jest.fn() },
    response: { use: jest.fn(), eject: jest.fn() }
  },
  default: {
    create: jest.fn(() => mockAxiosInstance),
    get: jest.fn(() => Promise.resolve({ data: { success: false, user: null } })),
    post: jest.fn(() => Promise.resolve({ data: { success: false } })),
    put: jest.fn(() => Promise.resolve({ data: {} })),
    delete: jest.fn(() => Promise.resolve({ data: {} })),
    patch: jest.fn(() => Promise.resolve({ data: {} }))
  }
};

module.exports = mockAxios;
module.exports.default = mockAxios;
