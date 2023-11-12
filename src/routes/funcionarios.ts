import { FastifyInstance } from "fastify";
import { prisma } from '../lib/prisma'
import { date, z } from 'zod'
import { Prisma } from "@prisma/client";
import { calcFGTS, calcINSS, calcIrf, calcSAL, calcVT } from "../functions/financeCalc";

export async function funcionariosRoutes(app: FastifyInstance) {

    app.get('/funcionarios', async () => {
        const funcionario = await prisma.funcionario.findMany({

        })
        return funcionario
    });



    //buscando pelo id
    app.get('/funcionario/:id', async (request) => {
        try {
            const paramsSchema = z.object({
                id: z.string().uuid(),
            });
            const { id } = paramsSchema.parse(request.params);
            const funcionario = await prisma.funcionario.findFirst({
                where: {
                    id// Certifique-se de que id_user seja tratado como string
                },
            });
            return funcionario;
        } catch (error) {
            console.error('Erro interno no servidor', error);
            throw new Error('Error interno do servidor');
        }
    });


    //cadastro || lembre-se de habilitar os campos como nullable, se não 
    // você terá que passar todos os campos no data
    app.post('/funcionario/cadastro', async (request) => {
        const bodySchema = z.object({
            nome: z.string(),
            telefone: z.string(),
            email: z.string(),
            cpf: z.string()
        })

        const { nome, telefone, email, cpf } = bodySchema.parse(request.body)

        const funcionario = await prisma.funcionario.create({
            data: {
                nome,
                telefone,
                email,
                cpf
            }
        })
        return funcionario
    })


    //deletando funcionario pelo id
    app.delete('/funcionario/:id', async (request) => {
        const paramSchema = z.object({
            id: z.string().uuid(),
        })
        const { id } = paramSchema.parse(request.params)
        await prisma.funcionario.delete({
            where: {
                id
            }
        })
        return {
            message: 'Funcionario deletado'
        }
    })


    app.put('/funcionario/:id', async (request) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        })
        const { id } = paramsSchema.parse(request.params)
        const bodySchema = z.object({
            nome: z.string(),
            telefone: z.string(),
            email: z.string(),
            cpf: z.string()
        })
        const { nome, telefone, email, cpf } = bodySchema.parse(request.body)
        const funcionario = await prisma.funcionario.update({
            where: {
                id
            },
            data: {
                nome,
                telefone,
                email,
                cpf
            }
        })
        return funcionario
    })



    //Neste método estamos usando o Include e o Map: O include traz todos os campos da outra tabela
    //Enquanto o Map ajuda a trazer campos específicos
    app.get('/funcionario/dependente', async () => {
        const funcionario = await prisma.funcionario.findMany({
            include: {
                Dependente: true
            }
        })
        // return funcionario // se quiser trazer todos os outros campos, bas comentar o conteudo a baixo
        return funcionario.map(funcionario => {
            return {
                id: funcionario.id,
                name: funcionario.nome,
                dependente: funcionario.Dependente.map(dependente => {
                    return {
                        nome_dependente: dependente.nome_dependente,
                        grau_parentesco: dependente.grau_parentesco
                    }
                })
            }
        })
    })

    app.get("/funcionario/folha", async () => {
        const funcionarios = await prisma.funcionario.findMany()
        const dados = funcionarios.map(func => {
            return {
                id: func.id,
                nome: func.nome,
                salario: func.salario,
                codigodaFuncao: func.codFuncao,
                inss: calcINSS(func.salario),
                irf: calcIrf(func.salario),
                vt: calcVT(func.salario),
                fgts: calcFGTS(func.salario),
                salarioLiquido: calcSAL(func.salario)
            }
        })
        return dados
    })
}

