package Partidas;

import java.sql.*;
import java.util.List;
import java.util.ArrayList;

public class PartidasDAO {
    private Connection conn;
    
    private PreparedStatement stmCreate;
    private PreparedStatement stmReadAll;
    private PreparedStatement stmReadOne;
    private PreparedStatement stmUpdateAll;
    private PreparedStatement stmUpdateScore;
    private PreparedStatement stmDelete;
    
    public PartidasDAO(){
        try {
            Class.forName("org.apache.derby.jdbc.ClientDriver");
            String url = "jdbc:derby//localhost:1527/easyticket-db";
            String user = "root";
            String pswd = "1234";
            
            this.conn = DriverManager.getConnection(url, user, pswd);
            
            this.stmCreate = this.conn.prepareStatement("INSERT INTO Partidas (campeonato, estadio, nome_mandante, nome_visitante, placar_mandante, placar_visitante, datetime, peso) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", Statement.RETURN_GENERATED_KEYS);
            this.stmReadAll = this.conn.prepareStatement("SELECT * FROM Partidas");
            this.stmReadOne = this.conn.prepareStatement("SELECT * FROM Partidas WHERE ? = ?");
            this.stmUpdateAll = this.conn.prepareStatement("UPDATE Partidas SET nome_mandante=?, nome_visitante=?, placar_mandante=?, placar_visitante=?, estadio=?, campeonato=?, datetime=?, peso=? WHERE id=?");
            this.stmUpdateScore = this.conn.prepareStatement("UPDATE Partidas SET placar_mandante=?, placar_visitante=? WHERE id=?");
            this.stmDelete = this.conn.prepareStatement("DELETE FROM Partidas WHERE id=?");
            
        } catch(Exception e){
            System.out.println("Erro: " + e.getMessage());
        }
    }
    
    public void close(){
        try {
            this.conn.close();
        } catch(Exception e){
            System.out.println("Erro: " + e.getMessage());
        }
    }
    
    public List<Partida> read(){
        try {
            List<Partida> partidas = new ArrayList();
            ResultSet r = this.stmReadAll.executeQuery();
            
            while(r.next()){
                Partida p = new Partida();
                
                p.setCod(r.getInt("id"));
                p.setNomeMandante(r.getString("nome_mandante"));
                p.setNomeVisitante(r.getString("nome_visitante"));
                p.setPlacarMandante(r.getInt("placar_mandante"));
                p.setPlacarVisitante(r.getInt("placar_visitante"));
                p.setEstadio(r.getString("estadio"));
                p.setCampeonato(r.getString("campeonato"));
                p.setData(r.getInt("datetime"));
                p.setPeso(r.getDouble("peso"));
                
                partidas.add(p);
            }
            
            return partidas;
        } catch (Exception e) {
            System.out.println("Erro: " + e.getMessage());
        }
        return null;
    }
    
    public Partida read(int id){
        try {
            this.stmReadOne.setInt(1, id);
            ResultSet r = this.stmReadOne.executeQuery();
            r.next();
            
            Partida p = new Partida();
                
            p.setCod(r.getInt("id"));
            p.setNomeMandante(r.getString("nome_mandante"));
            p.setNomeVisitante(r.getString("nome_visitante"));
            p.setPlacarMandante(r.getInt("placar_mandante"));
            p.setPlacarVisitante(r.getInt("placar_visitante"));
            p.setEstadio(r.getString("estadio"));
            p.setCampeonato(r.getString("campeonato"));
            p.setData(r.getInt("datetime"));
            p.setPeso(r.getDouble("peso"));
            
            return p;
        } catch (Exception e) {
            System.out.println("Erro: " + e.getMessage());
        }
        return null;
    }
    
    public Partida create(Partida p){
        try {
            this.stmCreate.setString(1, p.getCampeonato());
            this.stmCreate.setString(2, p.getEstadio());
            this.stmCreate.setString(3, p.getNomeMandante());
            this.stmCreate.setString(4, p.getNomeVisitante());
            this.stmCreate.setInt(5, p.getPlacarMandante());
            this.stmCreate.setInt(6, p.getPlacarVisitante());
            this.stmCreate.setInt(7, p.getData());
            this.stmCreate.setDouble(8, p.getPeso());
            
            this.stmCreate.executeUpdate();
            ResultSet r = this.stmCreate.getGeneratedKeys();
            r.next();
            
            int id = r.getInt(1);
            p.setCod(id);
            
            return p;
        } catch(Exception e){
            System.out.println("Erro: " + e.getMessage());
        }
        return null;
    }
    
    public int update(Partida p, int id){
        try {
            this.stmUpdateAll.setString(1, p.getNomeMandante());
            this.stmUpdateAll.setString(2, p.getNomeVisitante());
            this.stmUpdateAll.setInt(3, p.getPlacarMandante());
            this.stmUpdateAll.setInt(4, p.getPlacarVisitante());
            this.stmUpdateAll.setString(5, p.getEstadio());
            this.stmUpdateAll.setString(6, p.getCampeonato());
            this.stmUpdateAll.setInt(7, p.getData());
            this.stmUpdateAll.setDouble(8, p.getPeso());
            this.stmUpdateAll.setInt(9, id);
            
            int changed = this.stmUpdateAll.executeUpdate();
            return changed;
            
        } catch(Exception e){
            System.out.println("Erro: " + e.getMessage());
        }
        return 0;
    }
    
    public int updateScore(int placarMandante, int placarVisitante, int id){
        try {
            this.stmUpdateScore.setInt(1, placarMandante);
            this.stmUpdateScore.setInt(2, placarVisitante);
            this.stmUpdateScore.setInt(3, id);
            
            int changed = this.stmUpdateScore.executeUpdate();
            return changed;
        } catch(Exception e){
            System.out.println("Erro: " + e.getMessage());
        }
        return 0;
    }
    
    public int delete(int id){
        try {
            this.stmDelete.setInt(1, id);
            int removed = this.stmDelete.executeUpdate();
            return removed;
            
        } catch (Exception e){
            System.out.println("Erro: " + e.getMessage());
        }
        return 0;
    }
}