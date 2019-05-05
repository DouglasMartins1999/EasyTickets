package Ingressos;

import java.sql.*;
import java.util.List;
import java.util.ArrayList;
import Partidas.*;

public class IngressoDAO {
    private Connection conn;
    
    private PreparedStatement stmCreate;
    private PreparedStatement stmReadByPartida;
    private PreparedStatement stmReadOne;

    
    public IngressoDAO(){
        try {
            Class.forName("org.apache.derby.jdbc.ClientDriver");
            String url = "jdbc:derby://localhost:1527/easyticket";
            String user = "root";
            String pswd = "1234";
            
            this.conn = DriverManager.getConnection(url, user, pswd);
            
            this.stmCreate = this.conn.prepareStatement("INSERT INTO Ingressos (partida, assento, preco) VALUES (?, ?, ?)", Statement.RETURN_GENERATED_KEYS);
            this.stmReadByPartida = this.conn.prepareStatement("SELECT * FROM Ingressos WHERE partida = ?");
            this.stmReadOne = this.conn.prepareStatement("SELECT * FROM Ingressos WHERE codigo = ?");
            
        } catch(Exception e){
            System.out.println("Erro: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    public void close(){
        try {
            this.conn.close();
        } catch(Exception e){
            System.out.println("Erro: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    public Ingresso insert(Ingresso i){
        try {
            this.stmCreate.setInt(1, i.getPartida().getCod());
            this.stmCreate.setInt(2, i.getAssento());
            this.stmCreate.setDouble(3, i.calcularTotal());
            
            this.stmCreate.executeUpdate();
            ResultSet r = this.stmCreate.getGeneratedKeys();
            r.next();
            
            int id = r.getInt(1);
            i.setCod(id);

            return i;
        } catch(Exception e){
            System.out.println("Erro: " + e.getMessage());
            e.printStackTrace();
        }
        return null;
    }
    
    public List<Ingresso> getByPartida(int p){
        try {
            List<Ingresso> ingressos = new ArrayList();
            
            PartidasDAO dao = new PartidasDAO();
            Partida partida = dao.read(p);
            dao.close();
            
            this.stmReadByPartida.setInt(1, p);
            ResultSet r = this.stmReadByPartida.executeQuery();
            
            while(r.next()){
                Ingresso i = new Ingresso();
                
                i.setCod(r.getInt("codigo"));
                i.setPartida(partida);
                i.setAssento(r.getInt("assento"));
                
                ingressos.add(i);
            }
            
            return ingressos;
            
        } catch(Exception e){
            System.out.println("Erro: " + e.getMessage());
            e.printStackTrace();
        }
        return null;
    }
    
    public Ingresso get(int id){
        try {
            this.stmReadOne.setInt(1, id);
            ResultSet r = this.stmReadOne.executeQuery();
            r.next();
            
            Ingresso i = new Ingresso();

            i.setCod(r.getInt("codigo"));
            i.setPartida(r.getInt("partida"));
            i.setAssento(r.getInt("assento"));

            return i;
        } catch(Exception e){
            System.out.println("Erro: " + e.getMessage());
            e.printStackTrace();
        }
        return null;
    }
}
