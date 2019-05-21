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
    private PreparedStatement stmUpdate;
    private PreparedStatement stmDelete;

    public ContaDAO() {
        try {
            Class.forName("org.apache.derby.jdbc.ClientDriver");
            String url = "jdbc:derby://localhost:1527/easyticket";
            String user = "root";
            String pswd = "1234";

            this.connection = DriverManager.getConnection(url, user, pswd);

            this.stmCreate = this.connection.prepareStatement("INSERT INTO Contas (agencia, nome_titular, cpf, saldo, senha) VALUES(?, ?, ?, ?, ? )", Statement.RETURN_GENERATED_KEYS);
            this.stmRead = this.connection.prepareStatement("SELECT * FROM Contas");
            this.stmUpdate = this.connection.prepareStatement("UPDATE Contas SET agencia=?, nome_titular=?, cpf=?, saldo=?, senha=? WHERE conta=? ");
            this.stmDelete = this.connection.prepareStatement("DELETE FROM Contas WHERE conta=?");
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

                c.setCod(r.getInt("id"));
                c.setAgencia(r.getInt("agencia"));
                c.setCpf(r.getInt("cpf"));
                c.setNomeTitular(r.getString("nomeTitular"));
                c.setSaldo(r.getFloat("saldo"));
                c.setSenha(r.getString("Senha"));

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
            this.stmCreate.setString(1, c.getNomeTitular());
            this.stmCreate.setInt(2, c.getAgencia());
            this.stmCreate.setInt(3, c.getCpf());
            this.stmCreate.setFloat(4, c.getSaldo());
            this.stmCreate.setString(5, c.getSenha());

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
            this.stmCreate.setInt(1, c.getAgencia());
            this.stmCreate.setString(2, c.getNomeTitular());
            this.stmCreate.setInt(3, c.getCpf());
            this.stmCreate.setFloat(4, c.getSaldo());
            this.stmCreate.setString(5, c.getSenha());

            int changed = this.stmUpdate.executeUpdate();
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
}
