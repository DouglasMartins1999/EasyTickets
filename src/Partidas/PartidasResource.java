package Partidas;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import io.dropwizard.jersey.params.*;
import java.util.*;

@Path("/partidas")
@Produces(MediaType.APPLICATION_JSON)
public class PartidasResource {
    private PartidasDAO dao;
    
    public PartidasResource(PartidasDAO d){
        this.dao = d;
    }
    
    @GET
    public List<Partida> read(){
        return dao.read();
    }
    
    @GET
    @Path("{id}")
    public Partida readOne(@PathParam("id") LongParam id){
        int i = (int)id.get().longValue();
        return dao.read(i);
    }
    
    @POST
    public Partida insert(Partida p){
        return dao.create(p);
    }
    
    @PUT
    @Path("{id}")
    public int update(@PathParam("id") LongParam id, Partida p){
        int i = (int)id.get().longValue();
        return dao.update(p, i);
    }
    
    @DELETE
    @Path("{id}")
    public int remove(@PathParam("id") LongParam id){
        int i = (int)id.get().longValue();
        return dao.delete(i);
    }
}
