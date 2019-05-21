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
    @DELETE
    @Path("{id}")
    public int remove(@PathParam("id") LongParam id) {
        int i = (int) id.get().longValue();
        return dao.delete(i);
    }
}
