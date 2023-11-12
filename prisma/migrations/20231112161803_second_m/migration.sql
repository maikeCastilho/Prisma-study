-- AlterTable
ALTER TABLE `dependentes` MODIFY `nome_dependente` VARCHAR(191) NULL,
    MODIFY `data_nascimento` VARCHAR(191) NULL,
    MODIFY `grau_parentesco` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `funcionarios` MODIFY `nome` VARCHAR(191) NULL,
    MODIFY `telefone` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `cpf` VARCHAR(191) NULL,
    MODIFY `codFuncao` VARCHAR(191) NULL,
    MODIFY `codDepartamento` VARCHAR(191) NULL,
    MODIFY `salario` DECIMAL(65, 30) NULL;
