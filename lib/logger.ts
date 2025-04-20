// 简单的日志工具，用于在客户端和服务器端记录日志

// 服务器端日志
export const serverLog = {
  info: (message: string, ...args: any[]) => {
    console.log(`[服务器] INFO: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[服务器] ERROR: ${message}`, ...args);
  },
  warn: (message: string, ...args: any[]) => {
    console.warn(`[服务器] WARN: ${message}`, ...args);
  },
  debug: (message: string, ...args: any[]) => {
    console.debug(`[服务器] DEBUG: ${message}`, ...args);
  }
};

// 客户端日志 - 同时记录到控制台和发送到服务器
export const clientLog = {
  info: async (message: string, ...args: any[]) => {
    console.log(`[客户端] INFO: ${message}`, ...args);
    try {
      await fetch('/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          level: 'info', 
          message, 
          args: args.map(arg => {
            try {
              return JSON.stringify(arg);
            } catch (e) {
              return String(arg);
            }
          })
        })
      });
    } catch (e) {
      // 忽略发送日志失败的错误
    }
  },
  error: async (message: string, ...args: any[]) => {
    console.error(`[客户端] ERROR: ${message}`, ...args);
    try {
      await fetch('/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          level: 'error', 
          message, 
          args: args.map(arg => {
            try {
              return JSON.stringify(arg);
            } catch (e) {
              return String(arg);
            }
          })
        })
      });
    } catch (e) {
      // 忽略发送日志失败的错误
    }
  },
  warn: async (message: string, ...args: any[]) => {
    console.warn(`[客户端] WARN: ${message}`, ...args);
    try {
      await fetch('/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          level: 'warn', 
          message, 
          args: args.map(arg => {
            try {
              return JSON.stringify(arg);
            } catch (e) {
              return String(arg);
            }
          })
        })
      });
    } catch (e) {
      // 忽略发送日志失败的错误
    }
  },
  debug: async (message: string, ...args: any[]) => {
    console.debug(`[客户端] DEBUG: ${message}`, ...args);
    try {
      await fetch('/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          level: 'debug', 
          message, 
          args: args.map(arg => {
            try {
              return JSON.stringify(arg);
            } catch (e) {
              return String(arg);
            }
          })
        })
      });
    } catch (e) {
      // 忽略发送日志失败的错误
    }
  }
};
