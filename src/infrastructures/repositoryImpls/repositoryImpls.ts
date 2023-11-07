import { BoardRepository } from "@/components/board/repositories/repository";
import { NewBoardRepositoryImpPrisma } from "@/components/board/repositories/repositoryImpPrisma";
import { prisma } from "@/lib/prisma";

export function NewBoardRepository(): BoardRepository {
    return NewBoardRepositoryImpPrisma(prisma);
}
