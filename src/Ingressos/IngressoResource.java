package Ingressos;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import io.dropwizard.jersey.params.*;
import java.util.*;

@Path("/ingressos")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class IngressoResource {
    private IngressoDAO dao;
    
    public IngressoResource(IngressoDAO d){
        this.dao = d;
    }
    
    @GET
    public List readByPartida(@QueryParam("partida") LongParam p, @QueryParam("onlyseats") boolean oS){
        if(p != null){
            int i = (int)p.get().longValue();
            List<Ingresso> ingressos = dao.getByPartida(i);
            
            if(oS && ingressos.size() > 0){
                List seats = new ArrayList();
                for(int x = 0; x < ingressos.size(); x++){
                    seats.add(ingressos.get(x).getAssento());
                }
                return seats;
                
            } else {
                return ingressos;
            }
        }
        return new ArrayList();
        
    }
    
    @GET
    @Path("{id}")
    public Ingresso readOne(@PathParam("id") LongParam id){
        int i = (int)id.get().longValue();
        return dao.get(i);
    }
    
    @POST
    public Ingresso insert(Ingresso i){
        return dao.insert(i);
    }
}
