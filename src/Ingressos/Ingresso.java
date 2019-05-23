package Ingressos;

import Partidas.*;

public class Ingresso {
    private int cod;
    private Partida partida;
    private int assento;
    private int comprador;
    private double precoBase = 35.0;
    
    public Ingresso(){}
    
    public Ingresso(Partida p, int a){
        this.assento = a;
        this.partida = p;
    }
    
    public Ingresso(int p, int a){
        PartidasDAO dao = new PartidasDAO();
        this.partida = dao.read(p);
        this.assento = a;
        dao.close();
    }
    
    public Ingresso(int p, int a, int c){
        PartidasDAO dao = new PartidasDAO();
        this.partida = dao.read(p);
        this.assento = a;
        this.comprador = c;
        dao.close();
    }
    
    public double calcularTotal(){
        double multiplicador;
        
        if(this.assento > 32 || this.assento < 8){
            multiplicador = 1.0;
        } else if(this.assento > 24 || this.assento < 16){
            multiplicador = 1.5;
        } else {
            multiplicador = 2.0;
        }
        
        return this.precoBase * multiplicador * this.partida.getPeso();
    }
    
    public int getCod(){ return cod; }
    public Partida getPartida(){ return partida; }
    public int getAssento(){ return assento; }
    public int getComprador(){ return comprador; }
 
    public void setCod(int cod){ this.cod = cod; }
    public void setAssento(int a){ this.assento = a; }
    public void setComprador(int c){ this.comprador = c; }
    public void setPartida(Partida p){ this.partida = p; }
    public void setPartida(int p){
        PartidasDAO dao = new PartidasDAO();
        this.partida = dao.read(p);
        dao.close();
    }
    
    @Override
    public String toString(){
        return "Ingresso " + this.cod + "\n" +
            "Assento: " + this.assento + "\n" + 
            "Valor Total: R$" + this.calcularTotal() + "\n" +
            this.partida.toString();
    }
}
