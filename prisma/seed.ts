import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
    await prisma.user.create({
        data: {
            name: "admin",
            email: "admin@admin.com",
            password: "$2a$08$yzLOd5VImtrk909A.8othe5N77KbHo/9y8R7gHk8XYYW4QHSA03NG", //123
            role: "ADMIN",
        },
    });
}

main()
    .catch((e) => {
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
