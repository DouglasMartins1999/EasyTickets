/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Contas;

/**
 *
 * @author JUJA
 */
public class Conta {

    private int cod;
    private int agencia;
    private String nomeTitular;
    private long cpf;
    private float saldo;
    private int senha;

    public Conta() {
    }

    public Conta(int agencia, String nomeTiTular, long cpf, float saldo, int senha) {
        this.agencia = agencia;
        this.nomeTitular = nomeTiTular;
        this.cpf = cpf;
        this.saldo = saldo;
        this.senha = senha;
    }

    public int getAgencia() {
        return agencia;
    }

    public int getCod() {
        return cod;
    }

    public long getCpf() {
        return cpf;
    }

    public String getNomeTitular() {
        return nomeTitular;
    }

    public float getSaldo() {
        return saldo;
    }

    public int getSenha() {
        return senha;
    }

    public void setCod(int cod) {
        this.cod = cod;
    }

    public void setAgencia(int agencia) {
        this.agencia = agencia;
    }

    public void setNomeTitular(String nomeTitular) {
        this.nomeTitular = nomeTitular;
    }

    public void setCpf(long cpf) {
        this.cpf = cpf;
    }

    public void setSenha(int senha) {
        this.senha = senha;
    }

    public void setSaldo(float saldo) {
        this.saldo = saldo;
    }
}
