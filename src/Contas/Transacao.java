package Contas;

public class Transacao {
    private float transacao;
    private int senha;
    
    public Transacao(){};
    public Transacao(double t, int senha){
        this.transacao = (float)t;
        this.senha = senha;
    }
    
    public float getTransacao(){ return transacao; };
    public int getSenha(){ return senha; };
    
    public void setTransacao(float t){ this.transacao = t; };
    public void setSenha(int s){ this.senha = s; };
}