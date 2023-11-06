import { BoardRepository } from "@/components/board/repository";
import { BoardRepositoryImpMockInstance } from "@/components/board/repositoryImpMock";

export function NewBoardRepository(): BoardRepository {
    return BoardRepositoryImpMockInstance;
}
