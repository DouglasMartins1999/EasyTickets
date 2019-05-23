/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Contas;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import io.dropwizard.jersey.params.*;
import java.util.*;

@Path("/contas")
@Produces(MediaType.APPLICATION_JSON)
public class ContaResource {

    private ContaDAO dao;
    
    public ContaResource(ContaDAO c) {
        this.dao = c;
    }
    
    @GET
    public List<Conta> read() {
        return dao.read();
    }
    
    @GET
    @Path("cliente/{cpf}")
    public ArrayList<Conta> readCPF(@PathParam("cpf") long cpf){
        return dao.readByCPF(cpf);
    }

    @GET
    @Path("{conta}")
    public Conta readByConta(@PathParam("conta") int conta){
        return dao.readByConta(conta);
    }
    
    @POST
    @Path("{conta}/saldo")
    public float readSaldo(@PathParam("conta") int conta, int senha){
        return dao.readSaldo(conta, senha);
    }
    
    @POST
    public Conta insert(Conta c) {
        return dao.create(c);
    }
    
    @PUT
    @Path("{id}")
    public int update(@PathParam("id") LongParam id, Conta c) {
        int i = (int)id.get().longValue();
        return dao.update(c, i);
    }
    
    @PUT
    @Path("{id}/saldo")
    public int updateSaldo(@PathParam("id") LongParam id, Transacao t){
        int i = (int)id.get().longValue();
        float saldoAtual = dao.readSaldo(i, t.getSenha());
        float novoSaldo = saldoAtual + t.getTransacao();
        return dao.updateSaldo(i, novoSaldo);
    }
    
    @DELETE
    @Path("{id}")
    public int remove(@PathParam("id") LongParam id) {
        int i = (int) id.get().longValue();
        return dao.delete(i);
    }
}