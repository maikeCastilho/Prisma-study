import { FastifyInstance } from "fastify";
import { Prisma } from "@prisma/client";
import {date, z } from 'zod'
import { prisma } from "../lib/prisma";


export async function dependentesRoutes(app: FastifyInstance) {
    app.get('/dependente', async () => {
        const dependentes = await prisma.dependente.findMany({

        })
        return dependentes
    });


    app.get('/dependente/:id', async (request) => {
        const paramSchema = z.object({
            id: z.string().uuid(),
        })
        const { id } = paramSchema.parse(request.params)

        const dependente = await prisma.dependente.findFirst({
            where: {
                id
            }
        
        })
        return {
            dependente
        }
    })


    app.post('/dependente/cadastro', async (request) => {
        const bodySchema = z.object({
            nome_dependente: z.string(),
            data_nascimento: z.string(),
            grau_parentesco: z.string(),
            funcionarioId: z.string(), 
        })
        const {nome_dependente, data_nascimento, grau_parentesco, funcionarioId } = bodySchema.parse(request.body)
        const dependente = await prisma.dependente.create({
          data: {
            nome_dependente,
            data_nascimento,
            grau_parentesco,
            funcionarioId
          }
        })
        return {
            message: "Novo dependente cadastrado",
            dependente: dependente
        }
      })


    app.put('/dependente/:id', async (request) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        })
        const {id} = paramsSchema.parse(request.params)
        const bodySchema = z.object({
            nome_dependente: z.string(),
            data_nascimento: z.string(),
            grau_parentesco: z.string()
        })
        const {nome_dependente, data_nascimento, grau_parentesco, } = bodySchema.parse(request.body)
        const funcionario = await prisma.dependente.update({
            where: {
                id
            },
            data: {
                nome_dependente,
                data_nascimento,
                grau_parentesco,
            }
        })
        return funcionario
    })


    app.delete('/dependente/:id', async (request) => {
        const paramSchema = z.object({
            id: z.string().uuid(),
        })
        const { id } = paramSchema.parse(request.params)
        await prisma.dependente.delete({
            where:{
                id
            }
        })
        return {
            message: 'Dependente deletado'
        }
      })





    
}