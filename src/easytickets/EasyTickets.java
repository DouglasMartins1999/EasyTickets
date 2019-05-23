package easytickets;

import Partidas.*;
import Ingressos.*;
import Contas.*;

import ch.qos.logback.core.CoreConstants;
import io.dropwizard.Application;
import io.dropwizard.Configuration;
import io.dropwizard.setup.Environment;
import java.sql.*;

public class EasyTickets extends Application<Configuration> {

    public static void main(String[] args) throws Exception {
        EasyTickets server = new EasyTickets();
        server.run(new String[]{"server"});
    }

    @Override
    public void run(Configuration configuration, Environment environment) {
        PartidasDAO pDao = new PartidasDAO();
        IngressoDAO iDao = new IngressoDAO();
        ContaDAO cDao = new ContaDAO();

        environment.jersey().register(new PartidasResource(pDao));
        environment.jersey().register(new IngressoResource(iDao));
        environment.jersey().register(new ContaResource(cDao));
    }
}
