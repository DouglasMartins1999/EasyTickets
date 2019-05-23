/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Contas;

import java.sql.*;
import java.util.List;
import java.util.ArrayList;

public class ContaDAO {

    private Connection connection;

    private PreparedStatement stmCreate;
    private PreparedStatement stmRead;
    private PreparedStatement stmReadByCPF;
    private PreparedStatement stmReadSaldo;
    private PreparedStatement stmReadByConta;
    private PreparedStatement stmUpdate;
    private PreparedStatement stmUpdateSaldo;
    private PreparedStatement stmDelete;

    public ContaDAO() {
        try {
            Class.forName("org.apache.derby.jdbc.ClientDriver");
            String url = "jdbc:derby://localhost:1527/easyticket";
            String user = "root";
            String pswd = "1234";

            this.connection = DriverManager.getConnection(url, user, pswd);

            this.stmCreate = this.connection.prepareStatement("INSERT INTO Contas (agencia, nome_titular, CPF, saldo, senha) VALUES(?, ?, ?, ?, ? )", Statement.RETURN_GENERATED_KEYS);
            this.stmRead = this.connection.prepareStatement("SELECT * FROM Contas");
            this.stmUpdate = this.connection.prepareStatement("UPDATE Contas SET agencia=?, nome_titular=?, CPF=?, saldo=?, senha=? WHERE conta=? ");
            this.stmDelete = this.connection.prepareStatement("DELETE FROM Contas WHERE conta=?");
            
            this.stmReadByCPF = this.connection.prepareStatement("SELECT nome_titular, conta, agencia FROM Contas WHERE CPF = ?");
            this.stmReadSaldo = this.connection.prepareStatement("SELECT saldo FROM Contas WHERE conta = ? AND senha = ?");
            this.stmUpdateSaldo = this.connection.prepareStatement("UPDATE Contas SET saldo=? WHERE conta = ?");
            this.stmReadByConta = this.connection.prepareStatement("SELECT nome_titular, CPF, agencia FROM Contas WHERE conta = ?");
            
        } catch (Exception e) {
            System.out.println("Ocorreu um erro" + e.getMessage());
            e.printStackTrace();
        }
    }

    public void close() {
        try {
            this.connection.close();
        } catch (Exception e) {
            System.out.println("Erro: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public List<Conta> read() {
        try {
            List<Conta> contas = new ArrayList();
            ResultSet r = this.stmRead.executeQuery();

            while (r.next()) {
                Conta c = new Conta();

                c.setCod(r.getInt("conta"));
                c.setAgencia(r.getInt("agencia"));
                c.setCpf(r.getLong("CPF"));
                c.setNomeTitular(r.getString("nome_titular"));
                c.setSaldo(r.getFloat("saldo"));
                c.setSenha(r.getInt("Senha"));

                contas.add(c);
            }
            return contas;
        } catch (Exception e) {
            System.out.println("Ocorreu um erro: " + e.getMessage());
            e.printStackTrace();
        }
        return null;
    }

    public Conta create(Conta c) {
        try {
            this.stmCreate.setString(2, c.getNomeTitular());
            this.stmCreate.setInt(1, c.getAgencia());
            this.stmCreate.setLong(3, c.getCpf());
            this.stmCreate.setFloat(4, c.getSaldo());
            this.stmCreate.setInt(5, c.getSenha());

            this.stmCreate.executeUpdate();
            ResultSet r = this.stmCreate.getGeneratedKeys();
            r.next();

            int id = r.getInt(1);
            c.setCod(id);

        } catch (Exception e) {
            System.out.println("Ocorreu um erro: " + e.getMessage());
            e.printStackTrace();
        }
        return null;
    }

    public int update(Conta c, int id) {
        try {
            this.stmUpdate.setInt(1, c.getAgencia());
            this.stmUpdate.setString(2, c.getNomeTitular());
            this.stmUpdate.setLong(3, c.getCpf());
            this.stmUpdate.setFloat(4, c.getSaldo());
            this.stmUpdate.setInt(5, c.getSenha());
            
            this.stmUpdate.setInt(6, id);

            int changed = this.stmUpdate.executeUpdate();
            return changed;
        } catch (Exception e) {
            System.out.println("Erro: " + e.getMessage());
            e.printStackTrace();
        }
        return 0;
    }
   
    public int delete(int id) {
        try {
            this.stmDelete.setInt(1, id);
            int removed = this.stmDelete.executeUpdate();
            return removed;
        } catch(Exception e) {
            System.out.println("Ocorreu: " + e.getMessage());
            e.printStackTrace();
        }
        return 0;
    }
    
    public ArrayList<Conta> readByCPF(long cpf){
        try {
            ArrayList<Conta> contas = new ArrayList();
            this.stmReadByCPF.setLong(1, cpf);
            ResultSet r = this.stmReadByCPF.executeQuery();

            while (r.next()) {
                Conta c = new Conta();

                c.setCod(r.getInt("conta"));
                c.setAgencia(r.getInt("agencia"));
                c.setCpf(cpf);
                c.setNomeTitular(r.getString("nome_titular"));

                contas.add(c);
            }
            return contas;
        } catch (Exception e){
            System.out.println("Erro:" + e.getMessage());
            e.printStackTrace();
        }
        return null;
    }
    
    public float readSaldo(int conta, int senha){
        try {
            this.stmReadSaldo.setInt(1, conta);
            this.stmReadSaldo.setInt(2, senha);
            ResultSet r = this.stmReadSaldo.executeQuery();
            r.next();
            
            return r.getFloat("saldo");
        } catch (Exception e){
            System.out.println("Erro:" + e.getMessage());
            e.printStackTrace();
        }
        return 0;
    }
    
    public int updateSaldo(int conta, float novoSaldo){
        try {
            if(novoSaldo < 0){ return -1; };
            this.stmUpdateSaldo.setFloat(1, novoSaldo);
            this.stmUpdateSaldo.setInt(2, conta);
            
            return this.stmUpdateSaldo.executeUpdate();
        } catch (Exception e){
            System.out.println("Erro:" + e.getMessage());
            e.printStackTrace();
        }
        return 0;
    }
    
    public Conta readByConta(int conta){
        try {
            this.stmReadByConta.setInt(1, conta);
            ResultSet r = this.stmReadByConta.executeQuery();
            r.next();
                    
            Conta c = new Conta();
            c.setAgencia(r.getInt("agencia"));
            c.setNomeTitular(r.getString("nome_titular"));
            c.setCpf(r.getLong("CPF"));
            
            return c;
        } catch(Exception e){
            System.out.println("Erro:" + e.getMessage());
            e.printStackTrace();
        }
        return null;
    }
}
