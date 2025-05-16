import { PrismaClient } from '@prisma/client';

import client from '../config/default';

const { isProduction } = client;

// Prevent multiple instances of Prisma Client in development

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}
export const prisma = global.prisma || new PrismaClient();

const connectDatabase = async () => {
  try {
    await prisma.$connect();
    console.log('🚀 ~ database connected.');
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        '🚀 ~ file: client.js:14 ~ connectDatabase ~ error:',
        error
      );
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log('🚀 ~ database disconnected.');
  }
};

export default connectDatabase;
