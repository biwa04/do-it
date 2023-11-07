import { BoardRepository } from "@/components/board/repository";
import { NewBoardRepositoryImpPrisma } from "@/components/board/repositoryImpPrisma";
import { prisma } from "@/lib/prisma";

export function NewBoardRepository(): BoardRepository {
    return NewBoardRepositoryImpPrisma(prisma);
}
