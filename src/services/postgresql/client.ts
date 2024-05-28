import {PrismaClient} from '@prisma/client';

export const prisma = new PrismaClient();

/*
 * https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections#prismaclient-in-long-running-applications
 * Prisma recommends to create only one instance to be reusable in the app to avoid hot reloading
 */
