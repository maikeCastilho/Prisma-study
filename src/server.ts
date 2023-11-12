import fastify from "fastify";
import { funcionariosRoutes }from "./routes/funcionarios";
import { dependentesRoutes } from "./routes/dependentes";

const app = fastify();

app.register(funcionariosRoutes)
app.register(dependentesRoutes)

app.listen({
    port: 3333,
}).then(()=>{
    console.log('HTTP server running on port 3333')
})