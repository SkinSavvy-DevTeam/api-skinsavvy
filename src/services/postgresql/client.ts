import {PrismaClient} from '@prisma/client';

export const prisma = new PrismaClient();

/*
 * https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections#prismaclient-in-long-running-applications
 * Prisma recommends to create only one instance to be reusable in the app to avoid hot reloading
 */

/*
 * TODO: Read this docs to establish more favorable and secure way to connect to Cloud SQL
 * https://github.com/GoogleCloudPlatform/cloud-sql-nodejs-connector/blob/main/examples/prisma/postgresql/connect.mjs
 */
