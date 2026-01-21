import { Prisma, PrismaClient } from "@prisma/client/extension";
const prisma = new PrismaClient({
    log: ["query"],
});
export default prisma;
//# sourceMappingURL=db.js.map